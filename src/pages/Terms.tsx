
import Layout from '@/components/Layout';
import { FileText, Shield } from 'lucide-react';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-2xl">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Terms of Service</h1>
        </div>
        <div className="text-center py-16">
          <Shield className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Legal Information</h2>
          <p className="text-gray-500">Terms and conditions will be available here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
