
import { useState, useCallback } from 'react';
import { ChunkedUploadService, ChunkUploadProgress, UploadSession } from '@/lib/services/chunkedUploadService';
import { VideoService } from '@/lib/services/videoService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface UploadState {
  isUploading: boolean;
  progress: number;
  currentFile: string | null;
  error: string | null;
  session: UploadSession | null;
  canResume: boolean;
  isPaused: boolean;
}

export interface UseEnhancedUploadReturn {
  uploadState: UploadState;
  uploadVideo: (file: File, metadata?: any) => Promise<string | null>;
  uploadThumbnail: (file: File) => Promise<string | null>;
  pauseUpload: () => void;
  resumeUpload: () => void;
  cancelUpload: () => void;
  resetUpload: () => void;
}

export const useEnhancedUpload = (): UseEnhancedUploadReturn => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    currentFile: null,
    error: null,
    session: null,
    canResume: false,
    isPaused: false
  });

  const [currentUploadController, setCurrentUploadController] = useState<AbortController | null>(null);

  const validateFile = useCallback((file: File, type: 'video' | 'image'): string | null => {
    const maxSizes = {
      video: 2 * 1024 * 1024 * 1024, // 2GB
      image: 10 * 1024 * 1024 // 10MB
    };

    const allowedTypes = {
      video: ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'],
      image: ['image/jpeg', 'image/png', 'image/webp']
    };

    if (file.size > maxSizes[type]) {
      return `File size must be less than ${type === 'video' ? '2GB' : '10MB'}`;
    }

    if (!allowedTypes[type].includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes[type].join(', ')}`;
    }

    return null;
  }, []);

  const updateProgress = useCallback((progress: ChunkUploadProgress) => {
    setUploadState(prev => ({
      ...prev,
      progress: progress.percentage,
      error: null
    }));
  }, []);

  const handleError = useCallback((error: Error, chunkIndex?: number) => {
    console.error('Upload error:', error, 'at chunk:', chunkIndex);
    
    setUploadState(prev => ({
      ...prev,
      error: error.message,
      canResume: !!chunkIndex // Can resume if it was a chunk error
    }));

    toast({
      title: "Upload Error",
      description: error.message,
      variant: "destructive"
    });
  }, [toast]);

  const uploadVideo = useCallback(async (file: File, metadata: any = {}): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload videos",
        variant: "destructive"
      });
      return null;
    }

    const validationError = validateFile(file, 'video');
    if (validationError) {
      setUploadState(prev => ({ ...prev, error: validationError }));
      toast({
        title: "Invalid File",
        description: validationError,
        variant: "destructive"
      });
      return null;
    }

    try {
      setUploadState(prev => ({
        ...prev,
        isUploading: true,
        progress: 0,
        currentFile: file.name,
        error: null,
        isPaused: false
      }));

      // Create upload session
      const session = await ChunkedUploadService.createUploadSession(
        file,
        user.id,
        metadata
      );

      setUploadState(prev => ({ ...prev, session }));

      // Generate unique path for the video
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Start chunked upload
      const videoUrl = await ChunkedUploadService.uploadFileInChunks(
        file,
        session,
        'videos',
        fileName,
        updateProgress,
        handleError
      );

      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        progress: 100,
        currentFile: null,
        session: null
      }));

      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded successfully",
      });

      return videoUrl;

    } catch (error: any) {
      handleError(error);
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        currentFile: null
      }));
      return null;
    }
  }, [user, validateFile, updateProgress, handleError, toast]);

  const uploadThumbnail = useCallback(async (file: File): Promise<string | null> => {
    if (!user) return null;

    const validationError = validateFile(file, 'image');
    if (validationError) {
      toast({
        title: "Invalid Thumbnail",
        description: validationError,
        variant: "destructive"
      });
      return null;
    }

    try {
      // For thumbnails, use regular upload since they're smaller
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}_thumb.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('thumbnails')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(fileName);

      return publicUrl;

    } catch (error: any) {
      handleError(error);
      return null;
    }
  }, [user, validateFile, handleError, toast]);

  const pauseUpload = useCallback(() => {
    if (currentUploadController) {
      currentUploadController.abort();
    }
    setUploadState(prev => ({ ...prev, isPaused: true }));
  }, [currentUploadController]);

  const resumeUpload = useCallback(async () => {
    // Implementation for resuming upload would go here
    // This would require storing the current state and resuming from the last uploaded chunk
    setUploadState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const cancelUpload = useCallback(async () => {
    if (currentUploadController) {
      currentUploadController.abort();
    }

    if (uploadState.session) {
      await ChunkedUploadService.cancelUploadSession(uploadState.session.id);
      await ChunkedUploadService.cleanupFailedUploads('videos', uploadState.session.id);
    }

    setUploadState({
      isUploading: false,
      progress: 0,
      currentFile: null,
      error: null,
      session: null,
      canResume: false,
      isPaused: false
    });

    toast({
      title: "Upload Cancelled",
      description: "Your upload has been cancelled and cleaned up",
    });
  }, [currentUploadController, uploadState.session, toast]);

  const resetUpload = useCallback(() => {
    setUploadState({
      isUploading: false,
      progress: 0,
      currentFile: null,
      error: null,
      session: null,
      canResume: false,
      isPaused: false
    });
  }, []);

  return {
    uploadState,
    uploadVideo,
    uploadThumbnail,
    pauseUpload,
    resumeUpload,
    cancelUpload,
    resetUpload
  };
};
