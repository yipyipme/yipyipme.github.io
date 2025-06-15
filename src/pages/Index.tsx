import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import VideoWatchPage from '@/components/VideoWatchPage';
import { VideoService } from '@/lib/services/videoService';
import type { Database } from '@/integrations/supabase/types';
import { platformStore } from '@/lib/store';

import QuickLinksSection from '@/components/home/QuickLinksSection';
import LiveBannerSection from '@/components/home/LiveBannerSection';
import TrendingSection from '@/components/home/TrendingSection';
import ForYouSection from '@/components/home/ForYouSection';
import BrandStatementSection from '@/components/home/BrandStatementSection';

type Video = Database['public']['Tables']['videos']['Row'];

const yellowBirdDefault =
  "/lovable-uploads/ce3ad5bb-20c1-491d-b826-d894cf9d1e7f.png";

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [featuredVideos, setFeaturedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await VideoService.getPublishedVideos();
        // --- Combine DB videos with PLACEHOLDER videos (now in use everywhere) ---
        const dbVideos = videos || [];
        // Use the public fallback method for easy removal later:
        const placeholderVideos = platformStore['getFallbackVideos']?.();
        // Merge without casting to Video[], allow all fields to exist side by side
        const merged =
          placeholderVideos && Array.isArray(placeholderVideos)
            ? [
                ...dbVideos,
                ...placeholderVideos.filter(
                  (p) => !dbVideos.some((v: any) => v.id === p.id)
                ),
              ]
            : dbVideos;
        setFeaturedVideos(merged);
      } catch (error) {
        // fallback if DB completely fails
        const fallback = platformStore['getFallbackVideos']?.();
        setFeaturedVideos(fallback || []);
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
  const convertVideoForCard = (video: any) => ({
    id: video.id,
    title: video.title,
    channel: video.channel || 'Creator Channel', // We'll need to get creator info later
    thumbnail: video.thumbnail_url || video.thumbnail || yellowBirdDefault,
    duration: video.duration
      ? typeof video.duration === 'number'
        ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}`
        : video.duration
      : '0:00',
    views: video.views != null ? String(video.views) : "0",
    timeAgo: video.timeAgo || (video.created_at ? new Date(video.created_at).toLocaleDateString() : ''),
    videoUrl: video.video_url,
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
