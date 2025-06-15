import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import VideoCard from '@/components/VideoCard';
import VideoWatchPage from '@/components/VideoWatchPage';
import DoveIcon from '@/components/brand/DoveIcon';
import BrandedButton from '@/components/brand/BrandedButton';
import { Play, TrendingUp, Users, Calendar, BookOpen, Zap, Crown, Star } from 'lucide-react';
import { VideoService } from '@/lib/services/videoService';
import type { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];

const quickLinks = [
  { name: 'Sermons', icon: '🎙️', count: '12.5K', gradient: 'from-blue-500 to-purple-600', href: '/explore?category=sermons' },
  { name: 'Worship', icon: '🎵', count: '8.2K', gradient: 'from-purple-500 to-pink-500', href: '/explore?category=worship' },
  { name: 'Bible Study', icon: '📖', count: '6.1K', gradient: 'from-green-500 to-blue-500', href: '/explore?category=bible-study' },
  { name: 'Podcasts', icon: '🎧', count: '4.8K', gradient: 'from-yellow-500 to-orange-500', href: '/explore?category=podcasts' },
  { name: 'Movies', icon: '🎬', count: '2.3K', gradient: 'from-red-500 to-pink-500', href: '/explore?category=movies' },
  { name: 'Kids', icon: '👨‍👩‍👧‍👦', count: '3.1K', gradient: 'from-cyan-500 to-blue-500', href: '/kids' },
  { name: 'Devotionals', icon: '🙏', count: '5.7K', gradient: 'from-indigo-500 to-purple-500', href: '/explore?category=devotionals' },
  { name: 'Testimonies', icon: '✨', count: '1.9K', gradient: 'from-pink-500 to-rose-500', href: '/explore?category=testimonies' },
];

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [featuredVideos, setFeaturedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        console.log('Loading published videos from database...');
        const videos = await VideoService.getPublishedVideos();
        console.log('Loaded videos:', videos);
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
    duration: video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : '0:00',
    views: '0', // We'll get from analytics later, ensure it's a string
    timeAgo: new Date(video.created_at).toLocaleDateString(),
    // Include original video data for the watch page
    ...video
  });

  // Only render VideoWatchPage if we have a selected video
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
        {/* Hero Carousel - Full width */}
        <section className="w-screen overflow-x-hidden">
          <HeroCarousel />
        </section>

        {/* Quick Links */}
        <section className="w-full px-4 md:px-6 py-8">
          <div className="w-full">
            <div className="flex items-center gap-4 mb-8">
              <DoveIcon size="lg" animate className="text-[#FDBD34]" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explore by Category</h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
              {quickLinks.map((link) => (
                <div
                  key={link.name}
                  className="group cursor-pointer"
                  onClick={() => window.location.href = link.href}
                >
                  <div className={`bg-gradient-to-br ${link.gradient} rounded-2xl p-6 card-hover glass-effect border border-white/10 relative overflow-hidden`}>
                    <div className="absolute top-2 right-2">
                      <DoveIcon size="sm" className="text-white/30" />
                    </div>
                    <div className="text-3xl mb-3 animate-float">{link.icon}</div>
                    <span className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors text-center block">
                      {link.name}
                    </span>
                    <span className="text-xs text-white/80 mt-2 block">{link.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Services Banner */}
        <section className="w-full px-4 md:px-6 py-8">
          <div className="w-full">
            <div className="relative gradient-bg rounded-3xl p-8 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-black font-bold text-lg uppercase tracking-wider">LIVE NOW</span>
                    <DoveIcon size="sm" className="text-black animate-float" />
                  </div>
                  <h3 className="text-4xl font-bold text-black">Sunday Morning Service</h3>
                  <p className="text-black/80 text-xl">Join 2.3K viewers watching live</p>
                  <BrandedButton showIcon>
                    <Play className="mr-3 h-6 w-6" fill="currentColor" />
                    Join Live Service
                  </BrandedButton>
                </div>
                <div className="hidden md:flex items-center gap-8 text-black">
                  <div className="text-center space-y-2">
                    <Users className="h-12 w-12 mx-auto" />
                    <div className="text-3xl font-bold">2.3K</div>
                    <div className="text-sm font-medium">Watching</div>
                  </div>
                  <div className="text-center space-y-2">
                    <Calendar className="h-12 w-12 mx-auto" />
                    <div className="text-3xl font-bold">9:00</div>
                    <div className="text-sm font-medium">AM EST</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="w-full px-4 md:px-6 py-8">
          <div className="w-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-[#FDBD34]" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
                <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                <DoveIcon size="md" animate />
              </div>
              <BrandedButton variant="outline">
                View All
              </BrandedButton>
            </div>
            {loading ? (
              <div className="text-center text-gray-400">Loading videos...</div>
            ) : featuredVideos.length > 0 ? (
              <div className="netflix-grid">
                {featuredVideos.slice(0, 4).map((video) => {
                  const cardData = convertVideoForCard(video);
                  return (
                    <VideoCard 
                      key={video.id} 
                      title={cardData.title}
                      channel={cardData.channel}
                      thumbnail={cardData.thumbnail}
                      duration={cardData.duration}
                      views={cardData.views}
                      timeAgo={cardData.timeAgo}
                      onClick={() => handleVideoClick(cardData)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-400">No videos uploaded yet</div>
            )}
          </div>
        </section>

        {/* For You Section */}
        <section className="w-full px-4 md:px-6 py-8">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-8">
              <Crown className="h-8 w-8 text-[#FDBD34]" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recommended for You</h2>
              <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
            {loading ? (
              <div className="text-center text-gray-400">Loading videos...</div>
            ) : featuredVideos.length > 0 ? (
              <div className="netflix-grid">
                {featuredVideos.slice(0, 6).map((video) => {
                  const cardData = convertVideoForCard(video);
                  return (
                    <VideoCard 
                      key={video.id} 
                      title={cardData.title}
                      channel={cardData.channel}
                      thumbnail={cardData.thumbnail}
                      duration={cardData.duration}
                      views={cardData.views}
                      timeAgo={cardData.timeAgo}
                      onClick={() => handleVideoClick(cardData)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-400">No videos uploaded yet</div>
            )}
          </div>
        </section>

        {/* Brand Statement Section */}
        <section className="text-center py-16 px-4 md:px-6 w-screen">
          <div className="max-w-4xl mx-auto space-y-6">
            <DoveIcon size="xl" animate className="mx-auto" />
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Spreading the Gospel through digital media, connecting believers worldwide in faith, worship, and spiritual growth.
            </p>
            <div className="flex justify-center gap-4">
              <BrandedButton variant="primary" showIcon>
                Start Your Journey
              </BrandedButton>
              <BrandedButton variant="outline">
                Learn More
              </BrandedButton>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
