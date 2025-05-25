
import Layout from '@/components/Layout';
import { History as HistoryIcon, RotateCcw } from 'lucide-react';

const History = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
            <HistoryIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Watch History</h1>
        </div>
        <div className="text-center py-16">
          <RotateCcw className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">No history yet</h2>
          <p className="text-gray-500">Your recently watched videos will appear here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default History;
