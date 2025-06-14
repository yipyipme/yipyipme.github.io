
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface VideoFiltersProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: string) => void;
}

const VideoFilters = ({ 
  searchQuery, 
  statusFilter, 
  onSearchChange, 
  onStatusChange 
}: VideoFiltersProps) => {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2"
      >
        <option value="all">All Status</option>
        <option value="draft">Draft</option>
        <option value="processing">Processing</option>
        <option value="review">Review</option>
        <option value="published">Published</option>
      </select>
    </div>
  );
};

export default VideoFilters;
