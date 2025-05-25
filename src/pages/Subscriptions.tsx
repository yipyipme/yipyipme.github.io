
import Layout from '@/components/Layout';
import { Users, Bell, Star } from 'lucide-react';

const Subscriptions = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">My Subscriptions</h1>
        </div>
        <div className="text-center py-16">
          <Bell className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">No subscriptions yet</h2>
          <p className="text-gray-500">Start following your favorite creators and churches!</p>
        </div>
      </div>
    </Layout>
  );
};

export default Subscriptions;
