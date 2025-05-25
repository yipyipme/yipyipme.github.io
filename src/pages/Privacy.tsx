
import Layout from '@/components/Layout';
import { Lock, Eye } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Privacy Policy</h1>
        </div>
        <div className="text-center py-16">
          <Eye className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Your Privacy Matters</h2>
          <p className="text-gray-500">Privacy policy and data protection information coming soon.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
