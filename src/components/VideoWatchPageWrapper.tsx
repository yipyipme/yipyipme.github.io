
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoWatchPage from './VideoWatchPage';
import { VideoService } from '@/lib/services/videoService';
import { useState, useEffect } from 'react';
import type { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];

const VideoWatchPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        console.log('Loading video with ID:', id);
        const videos = await VideoService.getPublishedVideos();
        const foundVideo = videos.find(v => v.id === id);
        
        if (!foundVideo) {
          console.log('Video not found, redirecting to home');
          navigate('/');
          return;
        }

        console.log('Found video:', foundVideo);
        setVideo(foundVideo);
      } catch (error) {
        console.error('Error loading video:', error);
        navigate('/');
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
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white">Loading video...</div>
      </div>
    );
  }

  if (!video) {
    return null;
  }

  return (
    <>
      {/* VideoWatchPage will handle meta tags */}
      <VideoWatchPage 
        video={video} 
        onClose={handleClose}
      />
    </>
  );
};

export default VideoWatchPageWrapper;
