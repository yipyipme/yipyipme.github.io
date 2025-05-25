
import Layout from '@/components/Layout';
import { Heart, Clock } from 'lucide-react';

const WatchLater = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-2xl">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Watch Later</h1>
        </div>
        <div className="text-center py-16">
          <Clock className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Your watchlist is empty</h2>
          <p className="text-gray-500">Save videos to watch them later!</p>
        </div>
      </div>
    </Layout>
  );
};

export default WatchLater;
