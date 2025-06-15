
import React, { useState } from 'react';
import EnhancedVideoPlayer from './EnhancedVideoPlayer';
import VideoInfoBar from './VideoInfoBar';
import CreatorInfoStrip from './CreatorInfoStrip';
import TabbedContentArea from './TabbedContentArea';

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
      {/* Compact Video Info Bar */}
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
      {/* Tabbed Content */}
      <div>
        <TabbedContentArea video={video} relatedEpisodes={relatedEpisodes} />
      </div>
    </div>
  );
};

export default VideoWatchMain;
