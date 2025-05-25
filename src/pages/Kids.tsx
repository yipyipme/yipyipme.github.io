
import Layout from '@/components/Layout';
import { Baby, Smile, Heart } from 'lucide-react';

const Kids = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-2xl">
            <Baby className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Kids Corner</h1>
        </div>
        <div className="text-center py-16">
          <Smile className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Fun Content for Kids</h2>
          <p className="text-gray-500">Bible stories, songs, and activities for children coming soon!</p>
        </div>
      </div>
    </Layout>
  );
};

export default Kids;
