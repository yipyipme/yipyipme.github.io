
import React, { useState } from 'react';
import { X, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useEnhancedUpload } from '@/hooks/useEnhancedUpload';
import { VideoService } from '@/lib/services/videoService';
import VideoFileUploader from './VideoFileUploader';
import UploadProgress from './UploadProgress';

interface SimpleVideoUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

const SimpleVideoUpload = ({ onClose, onSuccess }: SimpleVideoUploadProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { uploadState, uploadVideo, uploadThumbnail, pauseUpload, resumeUpload, cancelUpload } = useEnhancedUpload();

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('SimpleVideoUpload state:', {
    videoFile: videoFile?.name,
    title,
    user: user?.id,
    uploadState
  });

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Video file selected:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Thumbnail file selected:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload videos",
        variant: "destructive"
      });
      return;
    }

    if (!videoFile || !title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a video file and enter a title",
        variant: "destructive"
      });
      return;
    }

    console.log('Starting video upload process...');
    setIsSubmitting(true);

    try {
      // Upload video file
      console.log('Uploading video file...');
      const videoUrl = await uploadVideo(videoFile, {
        title,
        description,
        category
      });

      if (!videoUrl) {
        throw new Error('Failed to upload video file');
      }

      console.log('Video uploaded successfully:', videoUrl);

      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (thumbnailFile) {
        console.log('Uploading thumbnail...');
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
        console.log('Thumbnail uploaded:', thumbnailUrl);
      }

      // Create video record in database
      console.log('Creating video record in database...');
      const videoData = {
        creator_id: user.id,
        title: title.trim(),
        description: description.trim() || null,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        category: category.trim() || null,
        file_size: videoFile.size,
        video_format: videoFile.type,
        status: 'published' as const,
        visibility: 'public' as const,
        processing_status: 'completed' as const,
        processing_progress: 100
      };

      console.log('Video data to save:', videoData);

      const savedVideo = await VideoService.createVideo(videoData);
      console.log('Video saved to database:', savedVideo);

      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded and is now live!",
      });

      onSuccess();
      onClose();

    } catch (error: any) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "An error occurred while uploading your video",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (uploadState.isUploading) {
      cancelUpload();
    }
    onClose();
  };

  const isUploading = uploadState.isUploading || isSubmitting;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Upload Video</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            disabled={isUploading}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {uploadState.isUploading ? (
            <UploadProgress
              uploadState={uploadState}
              onPause={pauseUpload}
              onResume={resumeUpload}
              onCancel={cancelUpload}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <VideoFileUploader
                videoFile={videoFile}
                thumbnailFile={thumbnailFile}
                onVideoFileChange={handleVideoFileChange}
                onThumbnailChange={handleThumbnailChange}
                disabled={isUploading}
              />

              {/* Video Details */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter video title"
                    className="bg-gray-800 border-gray-700 text-white"
                    disabled={isUploading}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter video description"
                    className="bg-gray-800 border-gray-700 text-white"
                    rows={4}
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category (e.g., Sermon, Worship, Teaching)"
                    className="bg-gray-800 border-gray-700 text-white"
                    disabled={isUploading}
                  />
                </div>
              </div>

              {/* Upload Status */}
              {uploadState.error && (
                <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-400 text-sm">{uploadState.error}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isUploading}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!videoFile || !title.trim() || isUploading}
                  className="flex-1 bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
                >
                  {isSubmitting ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Video
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleVideoUpload;
