
import Layout from '@/components/Layout';
import { Settings as SettingsIcon, User, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-2xl">
            <SettingsIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Settings</h1>
        </div>
        <div className="text-center py-16">
          <User className="h-24 w-24 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Customize Your Experience</h2>
          <p className="text-gray-500">Profile settings and preferences will be available here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
