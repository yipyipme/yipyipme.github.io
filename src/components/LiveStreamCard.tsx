
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Clock } from 'lucide-react';

export interface LiveStream {
  id: string;
  title: string;
  creator: string;
  viewers: number;
  thumbnail: string;
  category: string;
  status: 'live' | 'scheduled' | 'ended';
  scheduledTime?: Date;
}

interface LiveStreamCardProps {
  stream: LiveStream;
  onClick?: () => void;
}

const LiveStreamCard = ({ stream, onClick }: LiveStreamCardProps) => {
  const formatViewers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getStatusBadge = () => {
    switch (stream.status) {
      case 'live':
        return (
          <Badge className="bg-red-600 text-white hover:bg-red-700">
            🔴 LIVE
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge variant="secondary" className="bg-yellow-600 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        );
      case 'ended':
        return (
          <Badge variant="outline" className="border-gray-600 text-gray-400">
            Ended
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer card-hover"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={stream.thumbnail} 
          alt={stream.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 left-2">
          {getStatusBadge()}
        </div>
        {stream.status === 'live' && (
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-sm flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {formatViewers(stream.viewers)}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-white font-semibold mb-2 line-clamp-2">{stream.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{stream.creator}</span>
          <Badge variant="outline" className="border-[#FDBD34] text-[#FDBD34]">
            {stream.category}
          </Badge>
        </div>
        {stream.status === 'scheduled' && stream.scheduledTime && (
          <p className="text-xs text-gray-500 mt-2">
            Starts: {stream.scheduledTime.toLocaleDateString()} at {stream.scheduledTime.toLocaleTimeString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveStreamCard;
