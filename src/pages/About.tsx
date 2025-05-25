
import Layout from '@/components/Layout';
import { Info, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-2xl">
            <Info className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">About YipYip</h1>
        </div>
        <div className="text-center py-16">
          <Heart className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Connecting Faith Communities</h2>
          <p className="text-gray-500">YipYip is the premier platform for Christian content and community.</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
