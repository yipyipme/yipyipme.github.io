
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share, ThumbsDown, ThumbsUp, Download, MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VideoInfoBarProps {
  title: string;
  views: number;
  timeAgo: string;
  likes: number;
  hasLiked: boolean;
  hasDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  videoId: string; // ADDED this prop
}

const getVideoShareUrl = (videoId: string) => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/watch/${videoId}`;
  }
  return '';
};

const VideoInfoBar: React.FC<VideoInfoBarProps> = ({
  title,
  views,
  timeAgo,
  likes,
  hasLiked,
  hasDisliked,
  onLike,
  onDislike,
  videoId,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = getVideoShareUrl(videoId);
    const shareData = {
      title,
      url: shareUrl,
    };
    // Modern Web Share API, if available
    // @ts-ignore
    if (navigator.share) {
      try {
        // @ts-ignore
        await navigator.share(shareData);
        return;
      } catch (e) {
        // fallback
      }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Video link copied to clipboard. Share it anywhere!",
      });
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
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
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white"
            onClick={handleShare}
            aria-label="Share Video"
          >
            <Share className="h-4 w-4 mr-1" />
            {copied ? "Copied!" : "Share"}
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
};

export default VideoInfoBar;
