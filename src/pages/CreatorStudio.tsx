
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import DashboardMetrics from '@/components/creator-studio/DashboardMetrics';
import QuickActions from '@/components/creator-studio/QuickActions';
import RecentActivity from '@/components/creator-studio/RecentActivity';
import PerformanceChart from '@/components/creator-studio/PerformanceChart';
import CreatorApplicationReview from '@/components/admin/CreatorApplicationReview';
import VideoUpload from '@/components/creator-studio/VideoUpload';

const CreatorStudio = () => {
  const { profile } = useAuth();
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadClick = () => {
    setShowUpload(true);
  };

  const handleUploadSuccess = () => {
    setShowUpload(false);
  };

  return (
    <CreatorStudioLayout>
      <div className="space-y-6 w-full">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Creator Studio
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Manage your channel, upload content, and connect with your audience. 
            Spread the Gospel through digital media.
          </p>
        </div>

        {/* Admin Section - Creator Application Review */}
        {profile?.role === 'admin' && (
          <div className="space-y-6 w-full">
            <CreatorApplicationReview />
            <div className="border-t border-gray-800 pt-6">
              <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardMetrics />
            <PerformanceChart />
            <RecentActivity />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions onUploadClick={handleUploadClick} />
          </div>
        </div>
      </div>

      {/* Video Upload Modal */}
      {showUpload && (
        <VideoUpload 
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </CreatorStudioLayout>
  );
};

export default CreatorStudio;
