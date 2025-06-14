
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Clock, 
  Users, 
  DollarSign, 
  Radio, 
  Heart,
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const DashboardMetrics = () => {
  const metrics = [
    { 
      title: 'Views', 
      value: '125.4K', 
      change: '+12.5%', 
      trend: 'up',
      icon: Eye, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    { 
      title: 'Watch Time', 
      value: '2,340h', 
      change: '+8.2%', 
      trend: 'up',
      icon: Clock, 
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    { 
      title: 'Subscribers', 
      value: '8,745', 
      change: '+156', 
      trend: 'up',
      icon: Users, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    { 
      title: 'Revenue', 
      value: '$1,234', 
      change: '+24.3%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    { 
      title: 'Live Viewers', 
      value: '245', 
      change: 'Live', 
      trend: 'neutral',
      icon: Radio, 
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    { 
      title: 'Engagement', 
      value: '87.5%', 
      change: '+2.1%', 
      trend: 'up',
      icon: Heart, 
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Performance Overview</h2>
        <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-[#FDBD34]">
          View Details
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-gray-900/50 border-gray-800 card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                {metric.trend !== 'neutral' && (
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? 
                      <ArrowUp className="h-3 w-3" /> : 
                      <ArrowDown className="h-3 w-3" />
                    }
                    {metric.change}
                  </div>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardMetrics;
