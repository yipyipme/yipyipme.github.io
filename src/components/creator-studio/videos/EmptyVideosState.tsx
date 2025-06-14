
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyVideosStateProps {
  searchQuery: string;
  statusFilter: string;
  onUpload: () => void;
}

const EmptyVideosState = ({ searchQuery, statusFilter, onUpload }: EmptyVideosStateProps) => {
  const hasFilters = searchQuery || statusFilter !== 'all';

  return (
    <div className="text-center py-12">
      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-300 mb-2">No videos found</h3>
      <p className="text-gray-500 mb-4">
        {hasFilters 
          ? 'Try adjusting your search or filters' 
          : 'Upload your first video to get started'
        }
      </p>
      {!hasFilters && (
        <Button onClick={onUpload} className="bg-[#FDBD34] text-black">
          Upload Video
        </Button>
      )}
    </div>
  );
};

export default EmptyVideosState;
