
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Clock, 
  Users, 
  DollarSign, 
  Radio, 
  TrendingUp, 
  Upload, 
  MessageSquare,
  Heart,
  Play,
  Calendar
} from 'lucide-react';

const CreatorStudio = () => {
  const metrics = [
    { title: 'Total Views', value: '125.4K', change: '+12.5%', icon: Eye, color: 'text-blue-400' },
    { title: 'Watch Time', value: '2,340 hrs', change: '+8.2%', icon: Clock, color: 'text-green-400' },
    { title: 'Subscribers', value: '8,745', change: '+156', icon: Users, color: 'text-purple-400' },
    { title: 'Revenue', value: '$1,234', change: '+24.3%', icon: DollarSign, color: 'text-yellow-400' },
    { title: 'Live Viewers', value: '245', change: 'Online', icon: Radio, color: 'text-red-400' },
    { title: 'Members', value: '432', change: '+18', icon: Heart, color: 'text-pink-400' },
  ];

  const recentActivity = [
    { type: 'upload', title: 'Sunday Service: Walking by Faith', time: '2 hours ago', views: '1.2K views' },
    { type: 'subscriber', title: 'New subscriber milestone', time: '4 hours ago', views: '8,745 subscribers' },
    { type: 'comment', title: 'Comment on "Prayer Night"', time: '6 hours ago', views: '12 new comments' },
    { type: 'donation', title: 'Donation received', time: '8 hours ago', views: '$50 donation' },
  ];

  return (
    <CreatorStudioLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Creator Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back! Here's how your channel is performing.</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern">
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern">
              <Radio className="h-4 w-4 mr-2" />
              Go Live
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <p className="text-xs text-green-400 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-[#FDBD34]" />
                  <p>Views & Watch Time Trend Chart</p>
                  <p className="text-sm text-gray-500 mt-2">Interactive chart coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#FDBD34]/20 flex items-center justify-center">
                      {activity.type === 'upload' && <Upload className="h-5 w-5 text-[#FDBD34]" />}
                      {activity.type === 'subscriber' && <Users className="h-5 w-5 text-[#FDBD34]" />}
                      {activity.type === 'comment' && <MessageSquare className="h-5 w-5 text-[#FDBD34]" />}
                      {activity.type === 'donation' && <DollarSign className="h-5 w-5 text-[#FDBD34]" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.title}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                    <div className="text-[#FDBD34] text-sm font-medium">
                      {activity.views}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2 border-gray-700 text-gray-300 hover:text-[#FDBD34] hover:border-[#FDBD34] btn-modern">
                <Upload className="h-6 w-6" />
                <span>Upload Video</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 border-gray-700 text-gray-300 hover:text-[#FDBD34] hover:border-[#FDBD34] btn-modern">
                <Radio className="h-6 w-6" />
                <span>Schedule Stream</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 border-gray-700 text-gray-300 hover:text-[#FDBD34] hover:border-[#FDBD34] btn-modern">
                <Users className="h-6 w-6" />
                <span>Create Tier</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 border-gray-700 text-gray-300 hover:text-[#FDBD34] hover:border-[#FDBD34] btn-modern">
                <MessageSquare className="h-6 w-6" />
                <span>Community Post</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CreatorStudioLayout>
  );
};

export default CreatorStudio;
