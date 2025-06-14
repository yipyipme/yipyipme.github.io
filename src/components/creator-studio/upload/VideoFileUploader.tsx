
import { FileVideo, Image } from 'lucide-react';

interface VideoFileUploaderProps {
  videoFile: File | null;
  thumbnailFile: File | null;
  onVideoFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const VideoFileUploader = ({
  videoFile,
  thumbnailFile,
  onVideoFileChange,
  onThumbnailChange,
  disabled = false
}: VideoFileUploaderProps) => {
  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Video File *
        </label>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FDBD34] transition-colors">
          <input
            type="file"
            accept="video/*,.mp4,.mov,.avi,.webm,.mkv,.flv,.wmv,.m4v,.3gp"
            onChange={onVideoFileChange}
            className="hidden"
            id="video-upload"
            disabled={disabled}
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
              MP4, MOV, AVI, WebM, MKV and other video formats up to 2GB
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
            onChange={onThumbnailChange}
            className="hidden"
            id="thumbnail-upload"
            disabled={disabled}
          />
          <label htmlFor="thumbnail-upload" className="cursor-pointer">
            <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-300 text-sm">
              {thumbnailFile ? thumbnailFile.name : 'Click to select thumbnail'}
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default VideoFileUploader;
