
import { supabase } from '@/integrations/supabase/client';

export interface UploadSession {
  id: string;
  user_id: string;
  filename: string;
  total_size: number;
  chunk_size: number;
  total_chunks: number;
  uploaded_chunks: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed' | 'cancelled';
  metadata: any;
}

export interface ChunkUploadProgress {
  sessionId: string;
  chunkIndex: number;
  totalChunks: number;
  uploadedBytes: number;
  totalBytes: number;
  percentage: number;
  currentChunkProgress: number;
}

export class ChunkedUploadService {
  private static readonly CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
  private static readonly MAX_RETRIES = 3;

  static async createUploadSession(
    file: File,
    userId: string,
    metadata: any = {}
  ): Promise<UploadSession> {
    const chunkSize = this.CHUNK_SIZE;
    const totalChunks = Math.ceil(file.size / chunkSize);

    const { data, error } = await supabase
      .from('upload_sessions')
      .insert({
        user_id: userId,
        filename: file.name,
        total_size: file.size,
        chunk_size: chunkSize,
        total_chunks: totalChunks,
        metadata: {
          ...metadata,
          file_type: file.type,
          last_modified: file.lastModified,
        }
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async uploadFileInChunks(
    file: File,
    session: UploadSession,
    bucket: string,
    path: string,
    onProgress?: (progress: ChunkUploadProgress) => void,
    onError?: (error: Error, chunkIndex: number) => void
  ): Promise<string> {
    const { chunk_size, total_chunks, id: sessionId } = session;
    let uploadedChunks = session.uploaded_chunks;

    // Update session status to uploading
    await this.updateSessionStatus(sessionId, 'uploading');

    const chunks: Blob[] = [];
    for (let i = 0; i < total_chunks; i++) {
      const start = i * chunk_size;
      const end = Math.min(start + chunk_size, file.size);
      chunks.push(file.slice(start, end));
    }

    // Upload chunks sequentially to avoid overwhelming the server
    for (let i = uploadedChunks; i < total_chunks; i++) {
      try {
        await this.uploadChunk(chunks[i], bucket, path, i, sessionId);
        uploadedChunks++;

        // Update progress
        const progress: ChunkUploadProgress = {
          sessionId,
          chunkIndex: i,
          totalChunks: total_chunks,
          uploadedBytes: uploadedChunks * chunk_size,
          totalBytes: file.size,
          percentage: Math.round((uploadedChunks / total_chunks) * 100),
          currentChunkProgress: 100
        };

        onProgress?.(progress);

        // Update session progress
        await this.updateSessionProgress(sessionId, uploadedChunks);

      } catch (error) {
        console.error(`Failed to upload chunk ${i}:`, error);
        onError?.(error as Error, i);
        
        // Try to retry the chunk
        let retryCount = 0;
        while (retryCount < this.MAX_RETRIES) {
          try {
            await this.uploadChunk(chunks[i], bucket, path, i, sessionId);
            uploadedChunks++;
            break;
          } catch (retryError) {
            retryCount++;
            if (retryCount >= this.MAX_RETRIES) {
              await this.updateSessionStatus(sessionId, 'failed');
              throw new Error(`Failed to upload chunk ${i} after ${this.MAX_RETRIES} retries`);
            }
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }
      }
    }

    // All chunks uploaded successfully
    await this.updateSessionStatus(sessionId, 'completed');
    
    // Get the final file URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicUrl;
  }

  private static async uploadChunk(
    chunk: Blob,
    bucket: string,
    basePath: string,
    chunkIndex: number,
    sessionId: string
  ): Promise<void> {
    const chunkPath = `${basePath}_chunk_${chunkIndex}`;
    
    const { error } = await supabase.storage
      .from(bucket)
      .upload(chunkPath, chunk, {
        upsert: true
      });

    if (error) throw error;
  }

  static async updateSessionStatus(
    sessionId: string,
    status: UploadSession['status']
  ): Promise<void> {
    const { error } = await supabase
      .from('upload_sessions')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    if (error) throw error;
  }

  static async updateSessionProgress(
    sessionId: string,
    uploadedChunks: number
  ): Promise<void> {
    const { error } = await supabase
      .from('upload_sessions')
      .update({ 
        uploaded_chunks: uploadedChunks,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    if (error) throw error;
  }

  static async getUploadSession(sessionId: string): Promise<UploadSession | null> {
    const { data, error } = await supabase
      .from('upload_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) return null;
    return data;
  }

  static async cancelUploadSession(sessionId: string): Promise<void> {
    await this.updateSessionStatus(sessionId, 'cancelled');
  }

  static async cleanupFailedUploads(bucket: string, sessionId: string): Promise<void> {
    const session = await this.getUploadSession(sessionId);
    if (!session) return;

    // Clean up partial chunks
    for (let i = 0; i < session.total_chunks; i++) {
      const chunkPath = `${session.filename}_chunk_${i}`;
      await supabase.storage
        .from(bucket)
        .remove([chunkPath]);
    }
  }
}
