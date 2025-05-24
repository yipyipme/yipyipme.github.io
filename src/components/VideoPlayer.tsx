
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface Comment {
  id: string;
  text: string;
  color: string;
  position: number;
  timestamp: number;
  speed: number;
}

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [commentsEnabled, setCommentsEnabled] = useState(true);

  const commentColors = [
    '#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1', 
    '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'
  ];

  // Sample video URL - in a real app, this would be passed as props
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(value);
    video.volume = value[0] / 100;
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      color: selectedColor,
      position: Math.random() * 80 + 10, // Random vertical position
      timestamp: currentTime,
      speed: 3 + Math.random() * 2 // Random speed between 3-5
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addComment();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
      <div 
        ref={containerRef}
        className="relative aspect-video bg-black cursor-pointer group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => !isPlaying && setShowControls(true)}
        onMouseMove={() => setShowControls(true)}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop"
        />
        
        {/* Danmaku Comments Overlay */}
        {commentsEnabled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="absolute whitespace-nowrap text-lg font-bold animate-[slide-across_8s_linear_infinite] drop-shadow-lg"
                style={{
                  color: comment.color,
                  top: `${comment.position}%`,
                  animationDuration: `${comment.speed}s`,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                {comment.text}
              </div>
            ))}
          </div>
        )}

        {/* Video Controls Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
            {/* Progress Bar */}
            <div className="w-full">
              <Slider
                value={[duration ? (currentTime / duration) * 100 : 0]}
                onValueChange={handleSeek}
                max={100}
                step={0.1}
                className="w-full cursor-pointer"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="text-white hover:bg-white/20 p-2"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={volume}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCommentsEnabled(!commentsEnabled);
                  }}
                  className={`text-white hover:bg-white/20 p-2 ${commentsEnabled ? 'bg-blue-500/30' : ''}`}
                >
                  <MessageCircle size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    } else {
                      containerRef.current?.requestFullscreen();
                    }
                  }}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <Maximize size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Input Section */}
      <div className="bg-gray-900 p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {commentColors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  selectedColor === color ? 'border-white scale-110' : 'border-gray-600'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a danmaku comment..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            style={{ color: selectedColor }}
          />
          <Button 
            onClick={addComment}
            disabled={!newComment.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Send
          </Button>
        </div>
        
        <p className="text-gray-400 text-sm">
          Comments will scroll across the video. Click the message icon to toggle display.
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
