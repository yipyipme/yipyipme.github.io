
import { Play, User, Clock } from 'lucide-react';

interface VideoCardProps {
  title: string;
  creator: string;
  thumbnail: string;
  duration: string;
  views: string;
  timeAgo: string;
  onClick?: () => void;
}

const VideoCard = ({ title, creator, thumbnail, duration, views, timeAgo, onClick }: VideoCardProps) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative rounded-lg overflow-hidden bg-gray-200 aspect-video">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-12 w-12" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
          {duration}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <User className="h-4 w-4" />
          <span>{creator}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          <span>{views} views</span>
          <span>•</span>
          <Clock className="h-3 w-3" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
