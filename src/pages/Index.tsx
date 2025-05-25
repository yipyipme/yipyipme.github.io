
import { useState } from 'react';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import VideoCard from '@/components/VideoCard';
import EnhancedVideoPlayer from '@/components/EnhancedVideoPlayer';
import { Play, TrendingUp, Users, Calendar, BookOpen, Zap, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredVideos = [
  {
    title: "Sunday Service: Walking by Faith",
    creator: "Pastor Mike Johnson",
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "45:20",
    views: "125K",
    timeAgo: "2 days ago",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    title: "Worship Night: Amazing Grace",
    creator: "Hillsong Worship",
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "1:23:15",
    views: "89K",
    timeAgo: "1 week ago",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    title: "Bible Study: Romans Chapter 8",
    creator: "Dr. Sarah Williams",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "52:30",
    views: "67K",
    timeAgo: "3 days ago",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    title: "Youth Service: Finding Purpose",
    creator: "Pastor David Lee",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "38:45",
    views: "43K",
    timeAgo: "5 days ago",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

const quickLinks = [
  { name: 'Sermons', icon: '🎙️', count: '12.5K', gradient: 'from-blue-500 to-purple-600' },
  { name: 'Worship', icon: '🎵', count: '8.2K', gradient: 'from-purple-500 to-pink-500' },
  { name: 'Bible Study', icon: '📖', count: '6.1K', gradient: 'from-green-500 to-blue-500' },
  { name: 'Podcasts', icon: '🎧', count: '4.8K', gradient: 'from-yellow-500 to-orange-500' },
  { name: 'Movies', icon: '🎬', count: '2.3K', gradient: 'from-red-500 to-pink-500' },
  { name: 'Kids', icon: '👨‍👩‍👧‍👦', count: '3.1K', gradient: 'from-cyan-500 to-blue-500' },
  { name: 'Devotionals', icon: '🙏', count: '5.7K', gradient: 'from-indigo-500 to-purple-500' },
  { name: 'Testimonies', icon: '✨', count: '1.9K', gradient: 'from-pink-500 to-rose-500' },
];

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  if (selectedVideo) {
    return (
      <EnhancedVideoPlayer
        videoUrl={selectedVideo.videoUrl}
        title={selectedVideo.title}
        onClose={closeVideoPlayer}
      />
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 space-y-16">
        {/* Hero Carousel */}
        <section>
          <HeroCarousel />
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Explore by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {quickLinks.map((link) => (
              <div
                key={link.name}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${link.gradient} rounded-2xl p-6 card-hover glass-effect border border-white/10`}>
                  <div className="text-3xl mb-3 animate-float">{link.icon}</div>
                  <span className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors text-center block">
                    {link.name}
                  </span>
                  <span className="text-xs text-white/80 mt-2 block">{link.count}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Services Banner */}
        <section>
          <div className="relative gradient-bg rounded-3xl p-8 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-black font-bold text-lg uppercase tracking-wider">LIVE NOW</span>
                </div>
                <h3 className="text-4xl font-bold text-black">Sunday Morning Service</h3>
                <p className="text-black/80 text-xl">Join 2.3K viewers watching live</p>
                <Button className="bg-black text-[#FDBD34] hover:bg-gray-900 btn-modern px-8 py-4 text-lg font-semibold">
                  <Play className="mr-3 h-6 w-6" fill="currentColor" />
                  Join Live Service
                </Button>
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
        </section>

        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-[#FDBD34]" />
              <h2 className="text-3xl font-bold text-white">Trending Now</h2>
              <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
            <Button variant="outline" className="border-[#FDBD34] text-[#FDBD34] hover:bg-[#FDBD34] hover:text-black btn-modern">
              View All
            </Button>
          </div>
          <div className="netflix-grid">
            {featuredVideos.map((video, index) => (
              <VideoCard 
                key={index} 
                {...video} 
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>
        </section>

        {/* For You Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Crown className="h-8 w-8 text-[#FDBD34]" />
            <h2 className="text-3xl font-bold text-white">Recommended for You</h2>
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <div className="netflix-grid">
            {featuredVideos.slice(0, 6).map((video, index) => (
              <VideoCard 
                key={index} 
                {...video} 
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
