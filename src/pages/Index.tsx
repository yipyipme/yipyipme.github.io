
import { useState } from 'react';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import VideoCard from '@/components/VideoCard';
import EnhancedVideoPlayer from '@/components/EnhancedVideoPlayer';
import { Play, TrendingUp, Users, Calendar, BookOpen } from 'lucide-react';
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
  { name: 'Sermons', icon: '🎙️', count: '12.5K' },
  { name: 'Worship', icon: '🎵', count: '8.2K' },
  { name: 'Bible Study', icon: '📖', count: '6.1K' },
  { name: 'Podcasts', icon: '🎧', count: '4.8K' },
  { name: 'Movies', icon: '🎬', count: '2.3K' },
  { name: 'Kids', icon: '👨‍👩‍👧‍👦', count: '3.1K' },
  { name: 'Devotionals', icon: '🙏', count: '5.7K' },
  { name: 'Testimonies', icon: '✨', count: '1.9K' },
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
      <div className="container mx-auto px-4 py-8">
        {/* Hero Carousel */}
        <section className="mb-12">
          <HeroCarousel />
        </section>

        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Explore by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {quickLinks.map((link) => (
              <div
                key={link.name}
                className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-2xl mb-2">{link.icon}</div>
                <span className="text-sm font-medium text-gray-900 group-hover:gradient-text transition-colors text-center">
                  {link.name}
                </span>
                <span className="text-xs text-gray-500 mt-1">{link.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Trending Now</h2>
            </div>
            <Button variant="outline" className="text-purple-600 border-purple-300 hover:bg-purple-50">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVideos.map((video, index) => (
              <VideoCard 
                key={index} 
                {...video} 
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>
        </section>

        {/* Live Services Banner */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">LIVE NOW</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Sunday Morning Service</h3>
                <p className="text-purple-100 mb-4">Join 2.3K viewers watching live</p>
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  <Play className="mr-2 h-4 w-4" />
                  Join Live Service
                </Button>
              </div>
              <div className="hidden md:flex items-center gap-6 text-purple-100">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2.3K</div>
                  <div className="text-sm">Watching</div>
                </div>
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">9:00</div>
                  <div className="text-sm">AM EST</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For You Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-semibold text-gray-900">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.slice(0, 3).map((video, index) => (
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
