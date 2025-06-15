
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoWatchPage from './VideoWatchPage';
import { VideoService } from '@/lib/services/videoService';
import type { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];

const VideoWatchPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        console.log('Loading video with ID:', id);
        setLoading(true);
        
        // Get all published videos and find the one with matching ID
        const publishedVideos = await VideoService.getPublishedVideos();
        const foundVideo = publishedVideos.find(v => v.id === id);
        
        if (!foundVideo) {
          console.error('Video not found:', id);
          setError('Video not found');
          return;
        }

        console.log('Video loaded:', foundVideo);
        setVideo(foundVideo);
        
        // Track view (optional - implement later)
        try {
          await VideoService.trackView(foundVideo.id);
        } catch (viewError) {
          console.error('Failed to track view:', viewError);
          // Don't fail the whole page if view tracking fails
        }

      } catch (error) {
        console.error('Error loading video:', error);
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id, navigate]);

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading video...</div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-lg mb-4">{error || 'Video not found'}</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-[#FDBD34] text-black px-4 py-2 rounded-lg hover:bg-[#FDBD34]/80"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Convert database video to the format expected by VideoWatchPage
  const videoForWatchPage = {
    id: video.id,
    title: video.title,
    description: video.description || '',
    videoUrl: video.video_url || '',
    thumbnail: video.thumbnail_url || '',
    views: '0', // We'll implement view counting later
    timeAgo: formatTimeAgo(video.created_at),
    channel: 'YipYip Gospel', // Default for now
    duration: formatDuration(video.duration)
  };

  const formatDuration = (seconds: number | null): string => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInWeeks > 0) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <VideoWatchPage 
      video={videoForWatchPage} 
      onClose={handleClose}
    />
  );
};

export default VideoWatchPageWrapper;
