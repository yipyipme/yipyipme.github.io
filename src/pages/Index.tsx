import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import VideoWatchPage from '@/components/VideoWatchPage';
import { VideoService } from '@/lib/services/videoService';
import type { Database } from '@/integrations/supabase/types';
import { platformStore } from '@/lib/store'; // ADD THIS

import QuickLinksSection from '@/components/home/QuickLinksSection';
import LiveBannerSection from '@/components/home/LiveBannerSection';
import TrendingSection from '@/components/home/TrendingSection';
import ForYouSection from '@/components/home/ForYouSection';
import BrandStatementSection from '@/components/home/BrandStatementSection';

type Video = Database['public']['Tables']['videos']['Row'];

const yellowBirdDefault =
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await VideoService.getPublishedVideos();
        // --- Combine DB videos with PLACEHOLDER videos (now in use everywhere) ---
        const dbVideos = videos || [];
        const placeholderVideos = platformStore.getFallbackVideos && platformStore.getFallbackVideos();
        // Be sure to not duplicate IDs (Demo: db first, then placeholders not already present)
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
        const fallback = platformStore.getFallbackVideos && platformStore.getFallbackVideos();
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
  const convertVideoForCard = (video: Video) => ({
    id: video.id,
    title: video.title,
    channel: 'Creator Channel', // We'll need to get creator info later
    thumbnail: video.thumbnail_url || yellowBirdDefault,
    duration: video.duration
      ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}`
      : '0:00',
    views: "0", // Default since video.views does not exist
    timeAgo: new Date(video.created_at).toLocaleDateString(),
    videoUrl: video.video_url,  // <-- make sure this is included and used in VideoWatchPage!
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
