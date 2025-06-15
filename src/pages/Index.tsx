
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import VideoWatchPage from '@/components/VideoWatchPage';
import { VideoService } from '@/lib/services/videoService';
import type { Database } from '@/integrations/supabase/types';

import QuickLinksSection from '@/components/home/QuickLinksSection';
import LiveBannerSection from '@/components/home/LiveBannerSection';
import TrendingSection from '@/components/home/TrendingSection';
import ForYouSection from '@/components/home/ForYouSection';
import BrandStatementSection from '@/components/home/BrandStatementSection';

type Video = Database['public']['Tables']['videos']['Row'];

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await VideoService.getPublishedVideos();
        setFeaturedVideos(videos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  // Convert database video to VideoCard format
  const convertVideoForCard = (video: Video) => ({
    id: video.id,
    title: video.title,
    channel: 'Creator Channel', // We'll need to get creator info later
    thumbnail: video.thumbnail_url || '/placeholder.svg',
    duration: video.duration
      ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}`
      : '0:00',
    views: video.views != null ? String(video.views) : "0",
    timeAgo: new Date(video.created_at).toLocaleDateString(),
    ...video,
  });

  if (selectedVideo) {
    return (
      <VideoWatchPage
        video={selectedVideo}
        onClose={closeVideoPlayer}
      />
    );
  }

  return (
    <Layout>
      <div className="w-screen overflow-x-hidden">
        <section className="w-screen overflow-x-hidden">
          <HeroCarousel />
        </section>
        <QuickLinksSection />
        <LiveBannerSection />
        <TrendingSection
          loading={loading}
          featuredVideos={featuredVideos}
          onVideoClick={handleVideoClick}
          convertVideoForCard={convertVideoForCard}
        />
        <ForYouSection
          loading={loading}
          featuredVideos={featuredVideos}
          onVideoClick={handleVideoClick}
          convertVideoForCard={convertVideoForCard}
        />
        <BrandStatementSection />
      </div>
    </Layout>
  );
};

export default Home;
