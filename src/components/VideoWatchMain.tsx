import React, { useState } from 'react';
import EnhancedVideoPlayer from './EnhancedVideoPlayer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, Bell, BellRing } from 'lucide-react';
import BulletDanmaku from "./BulletDanmaku";

interface VideoWatchMainProps {
  video: any;
  chapters: any[];
  currentTime: number;
  setCurrentTime: (t: number) => void;
  onClose: () => void;
}

const VideoWatchMain = ({
  video,
  chapters,
  currentTime,
  setCurrentTime,
  onClose
}: VideoWatchMainProps) => {
  // keep all state that is specific to this panel/view!
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setLikes] = useState(3570);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [comment, setComment] = useState('');
  
  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(hasDisliked ? likes + 2 : likes + 1);
      setHasLiked(true);
      setHasDisliked(false);
    }
  };

  const handleDislike = () => {
    if (hasDisliked) {
      setHasDisliked(false);
    } else {
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
      setHasDisliked(true);
    }
  };

  const handleSubscribe = () => setIsSubscribed(!isSubscribed);
  const handleChapterClick = (t: number) => setCurrentTime(t);

  return (
    <div className="flex-1 space-y-6">
      {/* Video Player */}
      <div className="w-full">
        <EnhancedVideoPlayer
          videoUrl={video.videoUrl || video.video_url}
          title={video.title}
          onClose={onClose}
        />
      </div>
      {/* Video Info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{video.title}</h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400">{video.views} views</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">{video.timeAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 ${hasLiked ? 'text-blue-600 dark:text-blue-400' : ''}`}
            >
              <ThumbsUp className="h-5 w-5 mr-2" />
              {likes.toLocaleString()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className={`text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 ${hasDisliked ? 'text-red-600 dark:text-red-400' : ''}`}
            >
              <ThumbsDown className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20">
              <Share className="h-5 w-5 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20">
              <Download className="h-5 w-5 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* Creator Info */}
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`} />
            <AvatarFallback>{video.channel[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-gray-900 dark:text-white font-semibold">{video.channel}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">27,000 followers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSubscribe}
            className={`${
              isSubscribed 
                ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } px-6`}
          >
            {isSubscribed ? (
              <>
                <BellRing className="h-4 w-4 mr-2" />
                Subscribed
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            Charge
          </Button>
        </div>
      </div>
      {/* Description */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 dark:text-white font-semibold">Description</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDescription(!showDescription)}
            className="text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-white/10"
          >
            {showDescription ? 'Show less' : 'Show more'}
          </Button>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {showDescription 
            ? `It took me 2 months to animate this famous scene of "The Horse Racing"! This is a detailed breakdown of the animation process, techniques used, and the challenges I faced during production. The scene includes complex character movements, dynamic camera work, and detailed background animation that brings this classic moment to life.`
            : 'It took me 2 months to animate this famous scene of "The Horse Racing"! This is a detailed breakdown...'
          }
        </p>
        {showDescription && (
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">#Animation</Badge>
              <Badge variant="secondary">#HorseRacing</Badge>
              <Badge variant="secondary">#Tutorial</Badge>
              <Badge variant="secondary">#Behind-the-scenes</Badge>
            </div>
          </div>
        )}
      </div>
      {/* Chapters */}
      {/*
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <VideoChapters
          chapters={chapters}
          currentTime={currentTime}
          onChapterClick={handleChapterClick}
        />
      </div>
      */}
      {/* Comments */}
      <BulletDanmaku videoId={video.id || video.video_id} />
      {/* (remove the old comments box UI) */}
    </div>
  );
};

export default VideoWatchMain;
