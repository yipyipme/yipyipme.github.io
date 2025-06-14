
import { useState } from 'react';
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import VideoUpload from '@/components/creator-studio/VideoUpload';
import DashboardMetrics from '@/components/creator-studio/DashboardMetrics';
import QuickActions from '@/components/creator-studio/QuickActions';
import RecentActivity from '@/components/creator-studio/RecentActivity';
import PerformanceChart from '@/components/creator-studio/PerformanceChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Radio, 
  TrendingUp,
  Bell,
  Calendar,
  Users
} from 'lucide-react';

const CreatorStudio = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadSuccess = () => {
    window.location.reload();
  };

  return (
    <CreatorStudioLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Welcome back!</h1>
            <p className="text-gray-400 mt-2">Here's how your channel is performing today.</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowUploadModal(true)}
              className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern">
              <Radio className="h-4 w-4 mr-2" />
              Go Live
            </Button>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <DashboardMetrics />

        {/* Performance Overview & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions onUploadClick={() => setShowUploadModal(true)} />

        {/* Today's Focus */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#FDBD34]" />
              Today's Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <span className="text-blue-400 font-medium">Scheduled</span>
                </div>
                <p className="text-white font-semibold">Sunday Service Stream</p>
                <p className="text-gray-400 text-sm">Today at 10:00 AM</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">Pending</span>
                </div>
                <p className="text-white font-semibold">12 Comments to Review</p>
                <p className="text-gray-400 text-sm">Respond to your community</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-medium">Growing</span>
                </div>
                <p className="text-white font-semibold">+23 New Subscribers</p>
                <p className="text-gray-400 text-sm">This week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Modal */}
        {showUploadModal && (
          <VideoUpload
            onClose={() => setShowUploadModal(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
      </div>
    </CreatorStudioLayout>
  );
};

export default CreatorStudio;
