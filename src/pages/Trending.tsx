
import Layout from '@/components/Layout';
import VideoCard from '@/components/VideoCard';
import { TrendingUp, Flame, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trendingVideos = [
  {
    title: "Viral Worship Moment Goes Global",
    creator: "Bethel Music",
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "12:45",
    views: "2.1M",
    timeAgo: "6 hours ago"
  },
  {
    title: "Breaking: Revival Sweeps College Campus",
    creator: "Campus Ministry Network",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "25:30",
    views: "890K",
    timeAgo: "12 hours ago"
  }
];

const Trending = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-3 rounded-2xl">
            <Flame className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Trending Now</h1>
          <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingVideos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Trending;
