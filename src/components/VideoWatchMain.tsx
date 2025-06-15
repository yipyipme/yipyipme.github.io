
import React, { useState } from 'react';
import EnhancedVideoPlayer from './EnhancedVideoPlayer';
import VideoInfoBar from './VideoInfoBar';
import CreatorInfoStrip from './CreatorInfoStrip';
import YipYipDanmakuTrigger from './YipYipDanmakuTrigger';
import VideoComments from './VideoComments';
import { Badge } from "@/components/ui/badge";

interface VideoWatchMainProps {
  video: any;
  chapters: any[];
  currentTime: number;
  setCurrentTime: (t: number) => void;
  onClose: () => void;
  relatedEpisodes: any[];
}

const VideoWatchMain = ({
  video,
  chapters,
  currentTime,
  setCurrentTime,
  onClose,
  relatedEpisodes
}: VideoWatchMainProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setLikes] = useState(3570);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

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

  return (
    <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto gap-4">
      {/* Video Player */}
      <div>
        <EnhancedVideoPlayer
          videoUrl={video.videoUrl || video.video_url}
          title={video.title}
          onClose={onClose}
        />
      </div>
      {/* YipYip Danmaku Send Button */}
      <YipYipDanmakuTrigger videoId={video.id || video.video_id} />
      {/* Action Bar */}
      <VideoInfoBar 
        title={video.title}
        views={video.views}
        timeAgo={video.timeAgo}
        likes={likes}
        hasLiked={hasLiked}
        hasDisliked={hasDisliked}
        onLike={handleLike}
        onDislike={handleDislike}
      />
      {/* Creator Info Strip */}
      <CreatorInfoStrip 
        channel={video.channel}
        isSubscribed={isSubscribed}
        onSubscribe={handleSubscribe}
        followers="27,000"
        avatarUrl={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`}
      />
      {/* Video Description Block */}
      <section className="bg-gray-100 dark:bg-gray-900/60 rounded-xl px-5 py-4 mt-1 mb-2 shadow-sm space-y-4">
        <div className="text-gray-800 dark:text-gray-200 text-base leading-relaxed whitespace-pre-line">
          {video.description ||
            'It took me 2 months to animate this famous scene of "The Horse Racing"! This is a detailed breakdown of the animation process, techniques used, and the challenges I faced during production. The scene includes complex character movements, dynamic camera work, and detailed background animation that brings this classic moment to life.'}
        </div>
        {video.tags &&
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag: string) => (
              <Badge variant="secondary" key={tag}>#{tag}</Badge>
            ))}
          </div>
        }
      </section>
      {/* General Comments Section */}
      <section className="bg-white dark:bg-gray-900/80 rounded-xl mb-4 px-4 py-5 shadow ring-1 ring-gray-200/50 dark:ring-gray-700/30">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
          Comments
          <span className="font-normal text-gray-400 text-base">
            {/* Optionally show count if available */}
          </span>
        </h3>
        {/* Comment list and input */}
        <VideoComments videoId={video.id || video.video_id} />
      </section>
    </div>
  );
};

export default VideoWatchMain;
