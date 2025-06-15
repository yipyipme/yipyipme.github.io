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

  const isVideoFile = useCallback((file: File): boolean => {
    // Check file extension as fallback
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv', '.wmv', '.m4v', '.3gp'];
    const fileName = file.name.toLowerCase();
    const hasVideoExtension = videoExtensions.some(ext => fileName.endsWith(ext));
    
    // Check MIME type, but allow application/octet-stream if it has video extension
    const videoMimeTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    const hasVideoMimeType = videoMimeTypes.includes(file.type);
    
    // Accept if either MIME type is correct OR it's octet-stream with video extension
    return hasVideoMimeType || (file.type === 'application/octet-stream' && hasVideoExtension);
  }, []);

  const validateFile = useCallback((file: File, type: 'video' | 'image'): string | null => {
    const maxSizes = {
      video: 2 * 1024 * 1024 * 1024, // 2GB
      image: 10 * 1024 * 1024 // 10MB
    };

    if (file.size > maxSizes[type]) {
      return `File size must be less than ${type === 'video' ? '2GB' : '10MB'}`;
    }

    if (type === 'video') {
      if (!isVideoFile(file)) {
        return 'Invalid video file. Please upload MP4, MOV, AVI, WebM, or other supported video formats.';
      }
    } else {
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedImageTypes.includes(file.type)) {
        return `Invalid file type. Allowed types: ${allowedImageTypes.join(', ')}`;
      }
    }

    return null;
  }, [isVideoFile]);

  const updateProgress = useCallback((progress: number) => {
    setUploadState(prev => ({
      ...prev,
      progress,
      error: null
    }));
  }, []);

  const handleError = useCallback((error: Error, chunkIndex?: number) => {
    console.error('Upload error:', error, 'at chunk:', chunkIndex);
    
    setUploadState(prev => ({
      ...prev,
      error: error.message,
      canResume: false // Standard upload can't resume
    }));

    toast({
      title: "Upload Error",
      description: error.message,
      variant: "destructive"
    });
  }, [toast]);

  /**
   * Uploads the entire video file in a single request.
   * Swaps out previous chunked upload for a direct storage upload.
   */
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

      // Upload directly to storage (single-file upload)
      const { url } = await VideoService.uploadVideo(file, user.id);
      
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        progress: 100,
        currentFile: null,
        session: null // Not using chunked session
      }));

      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded successfully",
      });

      return url;

    } catch (error: any) {
      handleError(error);
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        currentFile: null
      }));
      return null;
    }
  }, [user, validateFile, handleError, toast]);

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
