
import { Play, User, Clock, MoreVertical, Heart, Share } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group cursor-pointer card-hover"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-xl">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-[#FDBD34] rounded-full p-4 shadow-2xl animate-pulse-glow">
            <Play className="text-black h-8 w-8 ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-black/90 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
          {duration}
        </div>

        {/* Action buttons */}
        <div className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/50 hover:bg-[#FDBD34] hover:text-black text-white backdrop-blur-sm h-8 w-8 btn-modern"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/50 hover:bg-[#FDBD34] hover:text-black text-white backdrop-blur-sm h-8 w-8 btn-modern"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Share className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/50 hover:bg-[#FDBD34] hover:text-black text-white backdrop-blur-sm h-8 w-8 btn-modern"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Live indicator */}
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
          LIVE
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-gray-100 line-clamp-2 group-hover:text-[#FDBD34] transition-colors duration-300 text-lg">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <User className="h-4 w-4" />
          <span className="hover:text-[#FDBD34] transition-colors cursor-pointer">{creator}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{views} views</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
