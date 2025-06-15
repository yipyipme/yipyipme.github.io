import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, MessageCircle, Settings, 
  PictureInPicture, Monitor, Camera, MoreHorizontal, ArrowLeft,
  SkipBack, SkipForward, Repeat, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VideoPlayerOverlay from './VideoPlayerOverlay';
import VideoSkipIndicator from './VideoSkipIndicator';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  text: string;
  color: string;
  position: number;
  timestamp: number;
  speed: number;
}

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onClose?: () => void;
}

const EnhancedVideoPlayer = ({ videoUrl, title, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleTimeoutRef = useRef<NodeJS.Timeout>();
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [quality, setQuality] = useState('720p');
  const [playbackSpeed, setPlaybackSpeed] = useState('1');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loop, setLoop] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [showSkipIndicator, setShowSkipIndicator] = useState(false);
  const [skipDirection, setSkipDirection] = useState<'forward' | 'backward'>('forward');
  const [skipAmount, setSkipAmount] = useState(5);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const [videoError, setVideoError] = useState<string | null>(null);
  const [flyingBullets, setFlyingBullets] = useState<any[]>([]);

  const commentColors = [
    '#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1', 
    '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'
  ];

  const qualities = ['360p', '480p', '720p', '1080p', '1440p', '4K'];
  const speeds = ['0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2'];

  // Auto-hide title and controls
  const resetTitleTimeout = useCallback(() => {
    if (titleTimeoutRef.current) {
      clearTimeout(titleTimeoutRef.current);
    }
    setShowTitle(true);
    titleTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowTitle(false);
      }
    }, 3000);
  }, [isPlaying]);

  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => {
      setIsPlaying(false);
      if (autoPlay) {
        // Auto-play next video logic would go here
      }
    });

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [autoPlay]);

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'w':
          e.preventDefault();
          setIsWideScreen(!isWideScreen);
          break;
        case 't':
          e.preventDefault();
          setIsTheaterMode(!isTheaterMode);
          break;
        case 'd':
          e.preventDefault();
          setCommentsEnabled(!commentsEnabled);
          break;
        case 'arrowleft':
          e.preventDefault();
          skipTime(-5);
          showSkipFeedback('backward', 5);
          break;
        case 'arrowright':
          e.preventDefault();
          skipTime(5);
          showSkipFeedback('forward', 5);
          break;
        case 'j':
          e.preventDefault();
          skipTime(-10);
          showSkipFeedback('backward', 10);
          break;
        case 'l':
          e.preventDefault();
          skipTime(10);
          showSkipFeedback('forward', 10);
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case '?':
          e.preventDefault();
          setShowShortcuts(!showShortcuts);
          break;
        case 'escape':
          e.preventDefault();
          if (isFullscreen) {
            toggleFullscreen();
          } else if (isTheaterMode) {
            setIsTheaterMode(false);
          } else if (showShortcuts) {
            setShowShortcuts(false);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isWideScreen, isTheaterMode, commentsEnabled, isFullscreen, showShortcuts]);

  const showSkipFeedback = (direction: 'forward' | 'backward', amount: number) => {
    setSkipDirection(direction);
    setSkipAmount(amount);
    setShowSkipIndicator(true);
    setTimeout(() => setShowSkipIndicator(false), 1000);
  };

  const handleMouseMove = () => {
    resetTitleTimeout();
    resetControlsTimeout();
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

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
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else {
        await video.requestPictureInPicture();
        setIsPiP(true);
      }
    } catch (error) {
      console.error('PiP error:', error);
    }
  };

  const handleSpeedChange = (speed: string) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = parseFloat(speed);
    setPlaybackSpeed(speed);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      color: selectedColor,
      position: Math.random() * 80 + 10,
      timestamp: currentTime,
      speed: 3 + Math.random() * 2
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const takeScreenshot = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const link = document.createElement('a');
      link.download = `yipyip-screenshot-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
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

  const getContainerClasses = () => {
    let classes = "relative bg-black";
    
    if (isTheaterMode) {
      classes += " w-full max-w-none";
    } else if (isWideScreen) {
      classes += " w-full max-w-5xl mx-auto";
    } else {
      classes += " w-full max-w-4xl mx-auto";
    }
    
    if (isFullscreen) {
      classes += " h-screen";
    } else {
      // Enhanced height - slightly taller than standard 16:9
      classes += " rounded-lg overflow-hidden shadow-2xl" + " aspect-[16/9.5]";
    }
    
    return classes;
  };

  useEffect(() => {
    if (!videoUrl) {
      setVideoError("No video source provided.");
    } else {
      setVideoError(null);
    }
    console.log("[EnhancedVideoPlayer] videoUrl:", videoUrl);
  }, [videoUrl]);

  // Listen for realtime danmaku for the current video
  React.useEffect(() => {
    // Remove any prior subscription
    let channel: any;
    let isUnmounted = false;
    let currentVideoId = undefined;

    // Get videoId from URL if possible
    try {
      // URL: /watch/:id or similar, or pass via prop in future
      const urlParams = new URLSearchParams(window.location.search);
      currentVideoId = urlParams.get("id");
    } catch {}

    // Fallback - try to read from videoUrl or window context if needed
    if (!currentVideoId && videoUrl?.length > 24) {
      currentVideoId = videoUrl.split("/").pop()?.split(".")[0];
    }

    if (!currentVideoId) return; // Not robust, but better than nothing!

    // Function to add bullet to fly
    const addBullet = (b: { text: string; color?: string }) => {
      setFlyingBullets((bullets) => [
        ...bullets,
        {
          ...b,
          id: Math.random().toString(36).slice(2),
          position: Math.floor(Math.random() * 80) + 10,
          speed: 3 + Math.random() * 2,
        },
      ]);
    };

    // Listen for new bullets (custom event from BulletDanmaku)
    const handleNewBulletDomEvent = (e: CustomEvent) => {
      addBullet(e.detail);
    };
    window.addEventListener("new-bullet-danmaku", handleNewBulletDomEvent as any);

    // Listen to Supabase realtime additions for this video's bullets
    channel = supabase
      .channel('danmaku-bullets-' + currentVideoId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'video_bullet_comments',
          filter: `video_id=eq.${currentVideoId}`
        },
        payload => {
          if (!isUnmounted) {
            addBullet({
              text: payload.new.text,
              color: payload.new.color,
            });
          }
        }
      )
      .subscribe();

    return () => {
      isUnmounted = true;
      window.removeEventListener("new-bullet-danmaku", handleNewBulletDomEvent as any);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
    // eslint-disable-next-line
  }, [videoUrl]);

  return (
    <div className={`${isTheaterMode ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {isTheaterMode && (
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsTheaterMode(false)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
      )}
      
      <div className={getContainerClasses()}>
        <div 
          ref={containerRef}
          className="relative w-full h-full bg-black cursor-pointer group"
          onMouseEnter={handleMouseMove}
          onMouseLeave={() => !isPlaying && setShowControls(true)}
          onMouseMove={handleMouseMove}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            loop={loop}
            poster="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop"
            onError={() => setVideoError("Failed to load video. Check if the URL is accessible and valid.")}
          />
          {/* Error overlay if video fails */}
          {videoError && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 text-white text-lg">
              <div>
                <span className="font-bold">Video Error:</span> {videoError}
              </div>
              <div className="mt-2 text-sm break-all">{videoUrl}</div>
            </div>
          )}
          
          <VideoPlayerOverlay 
            title={title}
            showTitle={showTitle}
            onClose={onClose}
          />

          <VideoSkipIndicator 
            skipAmount={skipAmount}
            direction={skipDirection}
            show={showSkipIndicator}
          />
          
          {/* Danmaku Comments Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 select-none">
            {flyingBullets.map((bullet) => (
              <div
                key={bullet.id}
                className="absolute whitespace-nowrap text-lg font-bold animate-[slide-across_8s_linear] drop-shadow-lg"
                style={{
                  color: bullet.color || '#fff',
                  top: `${bullet.position}%`,
                  animationDuration: `${bullet.speed}s`,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  pointerEvents: "none"
                }}
                onAnimationEnd={() =>
                  setFlyingBullets((bullets) => bullets.filter((b) => b.id !== bullet.id))
                }
              >
                {bullet.text}
              </div>
            ))}
          </div>

          {/* Video Controls Overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
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

              {/* Main Controls */}
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

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      skipTime(-10);
                      showSkipFeedback('backward', 10);
                    }}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <SkipBack size={20} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      skipTime(10);
                      showSkipFeedback('forward', 10);
                    }}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <SkipForward size={20} />
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
                      setLoop(!loop);
                    }}
                    className={`text-white hover:bg-white/20 p-2 ${loop ? 'bg-purple-500/30' : ''}`}
                  >
                    <Repeat size={20} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      takeScreenshot();
                    }}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <Camera size={20} />
                  </Button>

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
                      togglePiP();
                    }}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <PictureInPicture size={20} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTheaterMode(!isTheaterMode);
                    }}
                    className={`text-white hover:bg-white/20 p-2 ${isTheaterMode ? 'bg-purple-500/30' : ''}`}
                  >
                    <Monitor size={20} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSettings(!showSettings);
                    }}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <Settings size={20} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <Maximize size={20} />
                  </Button>
                </div>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="absolute bottom-20 right-6 bg-black/90 rounded-lg p-4 space-y-3 min-w-48">
                  <div className="space-y-2">
                    <label className="text-white text-sm">Quality</label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {qualities.map((q) => (
                          <SelectItem key={q} value={q}>{q}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white text-sm">Speed</label>
                    <Select value={playbackSpeed} onValueChange={handleSpeedChange}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {speeds.map((speed) => (
                          <SelectItem key={speed} value={speed}>{speed}x</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Auto-play</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAutoPlay(!autoPlay)}
                      className={`text-white ${autoPlay ? 'bg-purple-500/30' : ''}`}
                    >
                      {autoPlay ? '✓' : '○'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Subtitles</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                      className={`text-white ${subtitlesEnabled ? 'bg-purple-500/30' : ''}`}
                    >
                      {subtitlesEnabled ? '✓' : '○'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comment Input Section */}
        {!isTheaterMode && (
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Send
              </Button>
            </div>
            
            <div className="text-gray-400 text-sm space-y-1">
              <p>Comments will scroll across the video. Press D to toggle display.</p>
              <p className="text-xs">
                Shortcuts: Space (play/pause), ← → (skip 5s), J/L (skip 10s), F (fullscreen), ? (help)
              </p>
            </div>
          </div>
        )}
      </div>

      <KeyboardShortcutsHelp 
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
};

export default EnhancedVideoPlayer;
