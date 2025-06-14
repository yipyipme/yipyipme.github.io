
import React, { useState, useEffect } from 'react';
import { X, ThumbsUp, ThumbsDown, Share, Download, Flag, MoreHorizontal, User, Bell, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Header from './Header';
import EnhancedVideoPlayer from './EnhancedVideoPlayer';
import VideoCard from './VideoCard';
import { platformStore } from '@/lib/store';

interface VideoWatchPageProps {
  video: any;
  onClose: () => void;
}

const VideoWatchPage = ({ video, onClose }: VideoWatchPageProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setLikes] = useState(3570);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [comment, setComment] = useState('');
  
  const suggestedVideos = platformStore.getPublishedVideos().slice(0, 8);
  const relatedEpisodes = platformStore.getPublishedVideos().slice(0, 3);

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

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-gray-950 overflow-y-auto">
      {/* Include the original header */}
      <Header onMenuToggle={() => {}} />

      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Video Player */}
          <div className="w-full">
            <EnhancedVideoPlayer
              videoUrl={video.videoUrl}
              title={video.title}
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

          {/* Comments Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Comments</h3>
              <span className="text-gray-600 dark:text-gray-400">150 bullet comments have been sent</span>
            </div>
            
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Please log in ... Barrage Etiquette >"
                  className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              
              <Button 
                disabled={!comment.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send
              </Button>
            </div>
            
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              647 people are online, 150 bullet comments have been sent
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 space-y-6">
          {/* Auto-play toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-900 dark:text-white">Automatic streaming</span>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </div>
          </div>

          {/* Current Episode Info */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900 dark:text-white font-semibold">Barrage list</h3>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="text-blue-600 dark:text-blue-400 text-sm">天气的动画(1/1)</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">273,000 views • Introduction</div>
              <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                🎵 It took me 2 months to animate th... 04:44
              </div>
            </div>
          </div>

          {/* Related Episodes */}
          {relatedEpisodes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-gray-900 dark:text-white font-semibold">Related Episodes</h3>
              <div className="space-y-3">
                {relatedEpisodes.map((episode, index) => (
                  <div key={episode.id} className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
                    <div className="relative w-24 h-14 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden shrink-0">
                      <img 
                        src={episode.thumbnail} 
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {episode.duration}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2 mb-1">
                        {episode.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{episode.channel}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{episode.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Videos */}
          <div className="space-y-4">
            <h3 className="text-gray-900 dark:text-white font-semibold">Suggested Videos</h3>
            <div className="space-y-3">
              {suggestedVideos.map((suggestedVideo, index) => (
                <div key={suggestedVideo.id} className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
                  <div className="relative w-32 h-18 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden shrink-0">
                    <img 
                      src={suggestedVideo.thumbnail} 
                      alt={suggestedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {suggestedVideo.duration}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2 mb-1">
                      {suggestedVideo.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{suggestedVideo.channel}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{suggestedVideo.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoWatchPage;
