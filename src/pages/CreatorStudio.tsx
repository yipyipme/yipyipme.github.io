
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import DashboardMetrics from '@/components/creator-studio/DashboardMetrics';
import QuickActions from '@/components/creator-studio/QuickActions';
import RecentActivity from '@/components/creator-studio/RecentActivity';
import PerformanceChart from '@/components/creator-studio/PerformanceChart';
import CreatorApplicationReview from '@/components/admin/CreatorApplicationReview';
import SimpleVideoUpload from '@/components/creator-studio/upload/SimpleVideoUpload';

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
      <div className="w-full h-full space-y-8">
        {/* Welcome Section */}
        <div className="text-center w-full">
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

        {/* Dashboard Metrics - Full Width */}
        <div className="w-full">
          <DashboardMetrics />
        </div>

        {/* Quick Actions - Separate Row */}
        <div className="w-full">
          <QuickActions onUploadClick={handleUploadClick} />
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
          {/* Performance Chart */}
          <div className="w-full">
            <PerformanceChart />
          </div>
          
          {/* Recent Activity */}
          <div className="w-full">
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Video Upload Modal */}
      {showUpload && (
        <SimpleVideoUpload 
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </CreatorStudioLayout>
  );
};

export default CreatorStudio;
