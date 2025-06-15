
import React from 'react';
import { Button } from '@/components/ui/button';
import ResumableVideoUploader from './ResumableVideoUploader';
import VideoFileUploader from './VideoFileUploader';

interface VideoUploadStepProps {
  userId: string;
  videoFile: File | null;
  thumbnailFile: File | null;
  onVideoFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResumableUpload: (url: string, file: File) => void;
  onUppyError: (msg: string) => void;
  onProgress: (percent: number) => void;
  resetUpload: () => void;
  disabled: boolean;
  maxFileSizeMB: number;
  onNext: () => void;
}

const VideoUploadStep: React.FC<VideoUploadStepProps> = ({
  userId,
  videoFile,
  thumbnailFile,
  onVideoFileChange,
  onThumbnailChange,
  onResumableUpload,
  onUppyError,
  onProgress,
  resetUpload,
  disabled,
  maxFileSizeMB,
  onNext,
}) => (
  <>
    <h2 className="text-lg text-white font-semibold mb-2">
      Video File *
    </h2>
    <ResumableVideoUploader
      userId={userId}
      onUploadSuccess={onResumableUpload}
      onUploadError={onUppyError}
      onProgress={onProgress}
      disabled={disabled}
      maxFileSizeMB={maxFileSizeMB}
    />
    <VideoFileUploader
      videoFile={videoFile}
      thumbnailFile={thumbnailFile}
      onVideoFileChange={onVideoFileChange}
      onThumbnailChange={onThumbnailChange}
      disabled={true}
    />
    <div className="flex justify-end gap-2">
      <Button
        onClick={onNext}
        disabled={!videoFile}
        className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
      >
        Next: Video Details
      </Button>
    </div>
  </>
);

export default VideoUploadStep;
