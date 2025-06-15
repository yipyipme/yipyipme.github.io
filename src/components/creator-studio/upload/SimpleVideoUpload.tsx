import { useState } from 'react';
import { X, Upload, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEnhancedUpload } from '@/hooks/useEnhancedUpload';
import { VideoService } from '@/lib/services/videoService';
import { useAuth } from '@/contexts/AuthContext';
import VideoFileUploader from './VideoFileUploader';
import VideoDetailsForm from './VideoDetailsForm';
import UploadProgress from './UploadProgress';
import ResumableVideoUploader from './ResumableVideoUploader';
import VideoUploadStep from './VideoUploadStep';
import VideoDetailsStep from './VideoDetailsStep';

interface SimpleVideoUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

const SimpleVideoUpload = ({ onClose, onSuccess }: SimpleVideoUploadProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    visibility: 'public',
    monetization_enabled: false,
    video_url: '' as string | undefined,
  });

  const { 
    uploadState, 
    uploadVideo, 
    uploadThumbnail, 
    pauseUpload, 
    resumeUpload, 
    cancelUpload, 
    resetUpload 
  } = useEnhancedUpload();

  const categories = [
    'Sermons', 'Bible Study', 'Worship', 'Testimonies', 'Youth', 'Kids',
    'Music', 'Prayer', 'Devotionals', 'Teaching', 'Events', 'Other'
  ];

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Video file selected:', file.name, file.size, file.type);
      setVideoFile(file);
      resetUpload();
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Thumbnail file selected:', file.name, file.size, file.type);
      setThumbnailFile(file);
    }
  };

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleResumableUpload = (url: string, file: File) => {
    setVideoFile(file);
    setFormData(prev => ({
      ...prev,
      video_url: url
    }));
    resetUpload();
  };

  const handleUppyError = (msg: string) => {
    console.error('Uppy Error:', msg);
  };

  const handleSubmit = async () => {
    if (!user || !videoFile) {
      console.error('Missing user or video file');
      return;
    }

    try {
      const videoUrl = formData.video_url;

      if (!videoUrl) {
        console.error('Video upload failed - no URL returned');
        return;
      }

      let thumbnailUrl: string | undefined = undefined;
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile) ?? undefined;
      }

      const videoData = {
        creator_id: user.id,
        title: formData.title,
        description: formData.description,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        category: formData.category,
        tags: formData.tags,
        visibility: formData.visibility as 'public' | 'unlisted' | 'private',
        monetization_enabled: formData.monetization_enabled,
        file_size: videoFile.size,
        video_format: videoFile.type,
        status: 'published' as const,
        processing_status: 'completed' as const,
        published_at: new Date().toISOString()
      };

      console.log('Video data to save:', videoData);

      const savedVideo = await VideoService.createVideo(videoData);
      console.log('Video saved to database:', savedVideo);

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Upload failed:', err);
    }
  };

  const handleClose = () => {
    if (uploadState.isUploading) {
      cancelUpload();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Upload Video</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {uploadState.error && (
            <Alert className="border-red-600 bg-red-950/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-400">
                {uploadState.error}
                {uploadState.canResume && (
                  <Button
                    variant="link"
                    className="text-red-400 p-0 ml-2"
                    onClick={resumeUpload}
                  >
                    Try Resume
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}

          <UploadProgress 
            uploadState={uploadState}
            onPause={pauseUpload}
            onResume={resumeUpload}
            onCancel={cancelUpload}
          />

          {step === 1 && user?.id && (
            <VideoUploadStep
              userId={user.id}
              videoFile={videoFile}
              thumbnailFile={thumbnailFile}
              onVideoFileChange={handleVideoFileChange}
              onThumbnailChange={handleThumbnailChange}
              onResumableUpload={handleResumableUpload}
              onUppyError={handleUppyError}
              onProgress={() => {}} // handled visually by Uppy
              resetUpload={resetUpload}
              disabled={uploadState.isUploading}
              maxFileSizeMB={51200}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <VideoDetailsStep
              formData={formData}
              onFormDataChange={handleFormDataChange}
              categories={categories}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              isUploading={uploadState.isUploading}
              uploadProgress={uploadState.progress}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default SimpleVideoUpload;
