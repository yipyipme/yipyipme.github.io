
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Pause, Play, X } from 'lucide-react';
import { UploadState } from '@/hooks/useEnhancedUpload';

interface UploadProgressProps {
  uploadState: UploadState;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
}

const UploadProgress = ({ uploadState, onPause, onResume, onCancel }: UploadProgressProps) => {
  if (!uploadState.isUploading) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">
          Uploading: {uploadState.currentFile}
        </span>
        <div className="flex gap-2">
          {uploadState.isPaused ? (
            <Button size="sm" variant="outline" onClick={onResume}>
              <Play className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={onPause}>
              <Pause className="h-4 w-4" />
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onCancel}>
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
  );
};

export default UploadProgress;
