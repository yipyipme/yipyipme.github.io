
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Upload, 
  Users, 
  MessageSquare, 
  DollarSign,
  Bell,
  Play
} from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    { 
      type: 'upload', 
      title: 'Sunday Service: Walking by Faith', 
      time: '2 hours ago', 
      views: '1.2K views',
      icon: Upload,
      color: 'text-blue-400'
    },
    { 
      type: 'subscriber', 
      title: 'New subscriber milestone reached', 
      time: '4 hours ago', 
      views: '8,745 subscribers',
      icon: Users,
      color: 'text-green-400'
    },
    { 
      type: 'comment', 
      title: 'New comments on "Prayer Night"', 
      time: '6 hours ago', 
      views: '12 new comments',
      icon: MessageSquare,
      color: 'text-yellow-400'
    },
    { 
      type: 'donation', 
      title: 'Donation received from supporter', 
      time: '8 hours ago', 
      views: '$50 donation',
      icon: DollarSign,
      color: 'text-purple-400'
    },
    { 
      type: 'live', 
      title: 'Wednesday Bible Study ended', 
      time: '1 day ago', 
      views: '89 viewers',
      icon: Play,
      color: 'text-red-400'
    }
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-800 h-fit">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#FDBD34]" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
              <div className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm line-clamp-2">{activity.title}</p>
                <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
              </div>
              <div className="text-[#FDBD34] text-xs font-medium shrink-0">
                {activity.views}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
