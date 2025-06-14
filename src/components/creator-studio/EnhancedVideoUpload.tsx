import { useState } from 'react';
import { X, Upload, Image, FileVideo, AlertCircle, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useEnhancedUpload } from '@/hooks/useEnhancedUpload';
import { VideoService } from '@/lib/services/videoService';
import { useAuth } from '@/contexts/AuthContext';

interface EnhancedVideoUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

const EnhancedVideoUpload = ({ onClose, onSuccess }: EnhancedVideoUploadProps) => {
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
      setVideoFile(file);
      resetUpload(); // Reset any previous upload state
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async () => {
    if (!user || !videoFile) return;

    try {
      // Upload video with chunked upload
      const videoUrl = await uploadVideo(videoFile, {
        title: formData.title,
        category: formData.category
      });

      if (!videoUrl) return;

      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }

      // Create video record
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
        status: 'processing' as const,
        processing_status: 'pending' as const
      };

      await VideoService.createVideo(videoData);

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

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(1)} MB`;
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

          {/* Upload Progress */}
          {uploadState.isUploading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">
                  Uploading: {uploadState.currentFile}
                </span>
                <div className="flex gap-2">
                  {uploadState.isPaused ? (
                    <Button size="sm" variant="outline" onClick={resumeUpload}>
                      <Play className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={pauseUpload}>
                      <Pause className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={cancelUpload}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Progress value={uploadState.progress} className="w-full" />
              <div className="text-sm text-gray-400 text-center">
                {uploadState.progress}% completed
                {uploadState.isPaused && " (Paused)"}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video File *
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FDBD34] transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    className="hidden"
                    id="video-upload"
                    disabled={uploadState.isUploading}
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <FileVideo className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-300 mb-2">
                      {videoFile ? (
                        <span>
                          {videoFile.name} ({formatFileSize(videoFile.size)})
                        </span>
                      ) : (
                        'Click to select video file or drag & drop'
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      MP4, MOV, AVI, WebM up to 2GB
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Thumbnail (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FDBD34] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail-upload"
                    disabled={uploadState.isUploading}
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer">
                    <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-300 text-sm">
                      {thumbnailFile ? thumbnailFile.name : 'Click to select thumbnail'}
                    </p>
                  </label>
                </div>
              </div>

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
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter video title"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your video content"
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-[#FDBD34]/20 text-[#FDBD34]">
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-2 text-[#FDBD34] hover:text-red-400"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add tags (press Enter)"
                  className="bg-gray-800 border-gray-700 text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Visibility
                </label>
                <Select
                  value={formData.visibility}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="public" className="text-white">Public</SelectItem>
                    <SelectItem value="unlisted" className="text-white">Unlisted</SelectItem>
                    <SelectItem value="private" className="text-white">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedVideoUpload;
