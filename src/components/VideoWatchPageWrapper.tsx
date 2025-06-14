
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoWatchPage from './VideoWatchPage';
import { platformStore } from '@/lib/store';

const VideoWatchPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the video by ID
  const videos = platformStore.getPublishedVideos();
  const video = videos.find(v => v.id === id);

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  // If video not found, redirect to home
  if (!video) {
    navigate('/');
    return null;
  }

  return (
    <VideoWatchPage 
      video={video} 
      onClose={handleClose}
    />
  );
};

export default VideoWatchPageWrapper;
