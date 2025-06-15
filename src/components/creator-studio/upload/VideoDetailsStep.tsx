
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import VideoDetailsForm from './VideoDetailsForm';

interface VideoDetailsStepProps {
  formData: any;
  onFormDataChange: (updates: Partial<any>) => void;
  categories: string[];
  onBack: () => void;
  onSubmit: () => void;
  isUploading: boolean;
  uploadProgress: number;
}

const VideoDetailsStep: React.FC<VideoDetailsStepProps> = ({
  formData,
  onFormDataChange,
  categories,
  onBack,
  onSubmit,
  isUploading,
  uploadProgress
}) => (
  <>
    <VideoDetailsForm
      formData={formData}
      onFormDataChange={onFormDataChange}
      categories={categories}
    />
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onBack}
        className="border-gray-700 text-gray-300"
        disabled={isUploading}
      >
        Back
      </Button>
      <Button
        onClick={onSubmit}
        disabled={!formData.title || isUploading}
        className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
      >
        {isUploading ? (
          <>
            <Upload className="h-4 w-4 mr-2 animate-spin" />
            Uploading... ({uploadProgress}%)
          </>
        ) : (
          'Upload Video'
        )}
      </Button>
    </div>
  </>
);

export default VideoDetailsStep;
