
import Layout from '@/components/Layout';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VideoCard from '@/components/VideoCard';

const genres = [
  { name: 'Sermons & Preaching', count: '12.5K', icon: '🎙️' },
  { name: 'Worship & Music', count: '8.2K', icon: '🎵' },
  { name: 'Bible Study', count: '6.1K', icon: '📖' },
  { name: 'Podcasts & Talks', count: '4.8K', icon: '🎧' },
  { name: 'Christian Movies', count: '2.3K', icon: '🎬' },
  { name: 'Children & Families', count: '3.1K', icon: '👨‍👩‍👧‍👦' },
  { name: 'Devotionals', count: '5.7K', icon: '🙏' },
  { name: 'Testimonies', count: '1.9K', icon: '✨' },
];

const trendingVideos = [
  {
    title: "How to Find Purpose in Difficult Times",
    creator: "Pastor Mike Johnson",
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "45:20",
    views: "125K",
    timeAgo: "2 days ago"
  },
  {
    title: "Worship Night: Amazing Grace Collection",
    creator: "Hillsong Worship",
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "1:23:15",
    views: "89K",
    timeAgo: "1 week ago"
  },
  {
    title: "Bible Study: The Book of Romans Chapter 8",
    creator: "Dr. Sarah Williams",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: "52:30",
    views: "67K",
    timeAgo: "3 days ago"
  },
];

const Explore = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Content</h1>
          
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by topic, speaker, or keyword..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Genre Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genres.map((genre) => (
              <div
                key={genre.name}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-3xl mb-3">{genre.icon}</div>
                <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{genre.count} videos</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-semibold text-gray-900">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVideos.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Explore;
