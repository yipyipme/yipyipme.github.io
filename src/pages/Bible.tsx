
import Layout from '@/components/Layout';
import { BookOpen, Star, Heart } from 'lucide-react';

const Bible = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-2xl">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Bible & Devotionals</h1>
        </div>
        <div className="text-center py-16">
          <Star className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Coming Soon</h2>
          <p className="text-gray-500">Daily devotionals and Bible study content will be available here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Bible;
