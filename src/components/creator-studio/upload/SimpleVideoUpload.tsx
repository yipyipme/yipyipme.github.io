
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
    monetization_enabled: false
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

  const handleSubmit = async () => {
    if (!user || !videoFile) {
      console.error('Missing user or video file');
      return;
    }

    console.log('Starting video upload process...');
    console.log('User:', user.id);
    console.log('Video file:', videoFile.name, videoFile.size);
    console.log('Form data:', formData);

    try {
      // Upload video with chunked upload
      console.log('Uploading video file...');
      const videoUrl = await uploadVideo(videoFile, {
        title: formData.title,
        category: formData.category
      });

      if (!videoUrl) {
        console.error('Video upload failed - no URL returned');
        return;
      }

      console.log('Video uploaded successfully:', videoUrl);

      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (thumbnailFile) {
        console.log('Uploading thumbnail...');
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
        console.log('Thumbnail uploaded:', thumbnailUrl);
      }

      // Create video record
      console.log('Creating video record in database...');
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
        status: 'published' as const, // Changed from 'processing' to 'published'
        processing_status: 'completed' as const, // Changed from 'pending' to 'completed'
        published_at: new Date().toISOString() // Add published timestamp
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

          {step === 1 && (
            <>
              <VideoFileUploader
                videoFile={videoFile}
                thumbnailFile={thumbnailFile}
                onVideoFileChange={handleVideoFileChange}
                onThumbnailChange={handleThumbnailChange}
                disabled={uploadState.isUploading}
              />

              <div className="flex justify-end gap-2">
                {uploadState.canResume && (
                  <Button
                    variant="outline"
                    onClick={resetUpload}
                    className="border-gray-700 text-gray-300"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Start Over
                  </Button>
                )}
                <Button
                  onClick={() => setStep(2)}
                  disabled={!videoFile || uploadState.isUploading}
                  className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
                >
                  Next: Video Details
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <VideoDetailsForm
                formData={formData}
                onFormDataChange={handleFormDataChange}
                categories={categories}
              />

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-gray-700 text-gray-300"
                  disabled={uploadState.isUploading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.title || uploadState.isUploading}
                  className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
                >
                  {uploadState.isUploading ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-spin" />
                      Uploading... ({uploadState.progress}%)
                    </>
                  ) : (
                    'Upload Video'
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleVideoUpload;
