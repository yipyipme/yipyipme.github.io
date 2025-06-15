
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';
import LiveStreamCard from '@/components/LiveStreamCard';
import HeroCarousel from '@/components/HeroCarousel';
import { VideoService } from '@/lib/services/videoService';
import type { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];

const Index = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  // Load published videos from database
  useEffect(() => {
    const loadVideos = async () => {
      try {
        console.log('Loading published videos from database...');
        const publishedVideos = await VideoService.getPublishedVideos();
        console.log('Loaded videos:', publishedVideos);
        setVideos(publishedVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  // Convert database video to VideoCard props format
  const convertVideoToCardProps = (video: Video) => ({
    title: video.title,
    channel: 'YipYip Gospel', // Default channel name since we don't have creator info joined
    thumbnail: video.thumbnail_url || 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=300&fit=crop',
    duration: formatDuration(video.duration),
    views: formatViews(0), // We'll need to implement view tracking
    timeAgo: formatTimeAgo(video.created_at),
  });

  const formatDuration = (seconds: number | null): string => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
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

  const handleVideoClick = (video: Video) => {
    console.log('Video clicked:', video);
    navigate(`/watch/${video.id}`);
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock live streams for now
  const liveStreams = [
    {
      id: '1',
      title: 'Sunday Service - Live Worship',
      creator: 'Grace Community Church',
      thumbnail: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=300&fit=crop',
      viewers: 2300,
      category: 'Worship',
      status: 'live' as const
    },
    {
      id: '2', 
      title: 'Bible Study - Book of Romans',
      creator: 'Pastor James Miller',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      viewers: 892,
      category: 'Teaching',
      status: 'live' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header onMenuToggle={handleMenuToggle} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="p-6 space-y-8">
            {/* Hero Section */}
            <HeroCarousel />
            
            {/* Live Streams Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Live Now</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {liveStreams.map((stream) => (
                  <LiveStreamCard key={stream.id} stream={stream} />
                ))}
              </div>
            </section>

            {/* Recent Videos Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Recent Videos</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-gray-400">Loading videos...</div>
                </div>
              ) : videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video) => (
                    <VideoCard
                      key={video.id}
                      {...convertVideoToCardProps(video)}
                      onClick={() => handleVideoClick(video)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400">No videos available yet.</div>
                  <div className="text-gray-500 text-sm mt-2">Upload your first video to get started!</div>
                </div>
              )}
            </section>

            {/* Featured Content */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Featured Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Daily Devotionals</h3>
                  <p className="text-purple-100 mb-4">Start your day with inspiring messages and scripture.</p>
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                    Explore Now
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Youth Ministry</h3>
                  <p className="text-green-100 mb-4">Engaging content designed for young believers.</p>
                  <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    Join Community
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Prayer Requests</h3>
                  <p className="text-orange-100 mb-4">Share your prayers and support others in faith.</p>
                  <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                    Pray Together
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
