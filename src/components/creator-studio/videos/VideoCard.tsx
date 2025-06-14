
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Edit, 
  Trash2,
  Calendar,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];

interface VideoCardProps {
  video: Video;
  onDelete: (id: string) => void;
}

const VideoCard = ({ video, onDelete }: VideoCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'review': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'Unknown';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this video?')) {
      onDelete(video.id);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-[#FDBD34]/30 transition-colors">
      <div className="relative">
        {video.thumbnail_url ? (
          <img 
            src={video.thumbnail_url} 
            alt={video.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
            <Play className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" className="bg-[#FDBD34] text-black">
            <Play className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
        <Badge className={`absolute top-2 left-2 ${getStatusColor(video.status)} text-white`}>
          {video.status}
        </Badge>
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
        
        <div className="space-y-2 mb-3">
          {video.category && (
            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
              {video.category}
            </Badge>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(video.created_at)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatFileSize(video.file_size)}
            </div>
          </div>

          {video.processing_status === 'processing' && (
            <div className="text-xs text-blue-400">
              Processing: {video.processing_progress}%
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:text-[#FDBD34]">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-red-700 text-red-400 hover:bg-red-500/10"
            onClick={handleDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
