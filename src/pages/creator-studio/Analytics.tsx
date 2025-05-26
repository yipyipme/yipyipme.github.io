
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  DollarSign, 
  Calendar,
  Download
} from 'lucide-react';
import { platformStore } from '@/lib/store';

const Analytics = () => {
  const analytics = platformStore.getAnalytics();

  const metrics = [
    { 
      title: 'Total Views', 
      value: analytics.totalViews.toLocaleString(), 
      change: '+12.5%', 
      icon: Eye, 
      color: 'text-blue-400' 
    },
    { 
      title: 'Watch Time', 
      value: `${analytics.watchTime.toLocaleString()} hrs`, 
      change: '+8.2%', 
      icon: Clock, 
      color: 'text-green-400' 
    },
    { 
      title: 'Subscribers', 
      value: analytics.subscribers.toLocaleString(), 
      change: '+156', 
      icon: Users, 
      color: 'text-purple-400' 
    },
    { 
      title: 'Revenue', 
      value: `$${analytics.revenue.toLocaleString()}`, 
      change: '+24.3%', 
      icon: DollarSign, 
      color: 'text-yellow-400' 
    },
  ];

  const recentVideos = [
    { title: 'Sunday Service: Walking by Faith', views: '12.5K', engagement: '8.4%' },
    { title: 'Worship Night: Amazing Grace', views: '9.8K', engagement: '7.2%' },
    { title: 'Bible Study: Romans Chapter 8', views: '6.7K', engagement: '9.1%' },
    { title: 'Youth Service: Finding Purpose', views: '4.3K', engagement: '6.8%' },
  ];

  const audienceData = [
    { age: '18-24', percentage: '15%', viewers: '1.3K' },
    { age: '25-34', percentage: '28%', viewers: '2.4K' },
    { age: '35-44', percentage: '25%', viewers: '2.2K' },
    { age: '45-54', percentage: '20%', viewers: '1.7K' },
    { age: '55+', percentage: '12%', viewers: '1.1K' },
  ];

  return (
    <CreatorStudioLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400 mt-2">Track your channel's performance and growth</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <p className="text-xs text-green-400 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Views & Watch Time Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-[#FDBD34]" />
                  <p className="text-gray-400">Performance chart visualization</p>
                  <p className="text-sm text-gray-500 mt-2">Chart component would render here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Videos */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Top Performing Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FDBD34] rounded text-black font-bold flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm line-clamp-1">{video.title}</p>
                        <p className="text-gray-400 text-xs">{video.views} views</p>
                      </div>
                    </div>
                    <div className="text-[#FDBD34] text-sm font-medium">
                      {video.engagement}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audience Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Audience Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audienceData.map((demo, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">{demo.age}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#FDBD34] h-2 rounded-full" 
                          style={{ width: demo.percentage }}
                        ></div>
                      </div>
                      <span className="text-[#FDBD34] font-medium w-12 text-right">{demo.percentage}</span>
                      <span className="text-gray-400 text-sm w-16 text-right">{demo.viewers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Direct/Search</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-[#FDBD34] h-2 rounded-full w-3/5"></div>
                    </div>
                    <span className="text-[#FDBD34] font-medium">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Recommended</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full w-1/4"></div>
                    </div>
                    <span className="text-blue-400 font-medium">25%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">External Links</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-1/10"></div>
                    </div>
                    <span className="text-green-400 font-medium">10%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Social Media</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full w-1/20"></div>
                    </div>
                    <span className="text-purple-400 font-medium">5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CreatorStudioLayout>
  );
};

export default Analytics;
