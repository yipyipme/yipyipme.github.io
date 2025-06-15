
import React from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react";

interface VideoInfoBarProps {
  title: string;
  views: number;
  timeAgo: string;
  likes: number;
  hasLiked: boolean;
  hasDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

const VideoInfoBar: React.FC<VideoInfoBarProps> = ({
  title,
  views,
  timeAgo,
  likes,
  hasLiked,
  hasDisliked,
  onLike,
  onDislike,
}) => (
  <div className="flex flex-col gap-2 w-full">
    <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate">{title}</h1>
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-xs md:text-sm gap-1">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <span>{views} views</span>
        <span>•</span>
        <span>{timeAgo}</span>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onLike}
          className={`hover:bg-gray-200 dark:hover:bg-white/20 ${hasLiked ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}>
          <ThumbsUp className="h-4 w-4 mr-1" />
          {likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDislike}
          className={`hover:bg-gray-200 dark:hover:bg-white/20 ${hasDisliked ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
          <ThumbsDown className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white">
          <Share className="h-4 w-4 mr-1" />Share
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white">
          <Download className="h-4 w-4 mr-1" />Download
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default VideoInfoBar;
