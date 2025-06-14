
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, DollarSign, Users, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AnalyticsService } from '@/lib/services/analyticsService';

interface Metrics {
  totalViews: number;
  totalRevenue: number;
  subscriberCount: number;
  averageWatchTime: number;
}

const DashboardMetrics = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<Metrics>({
    totalViews: 0,
    totalRevenue: 0,
    subscriberCount: 0,
    averageWatchTime: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMetrics = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await AnalyticsService.getDashboardMetrics(user.id);
        setMetrics(data);
      } catch (err: any) {
        console.error('Error loading metrics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [user]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gray-900 border-gray-800 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Error loading metrics: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const metricsData = [
    {
      title: 'Total Views',
      value: formatNumber(metrics.totalViews),
      icon: Eye,
      change: '+12%',
      trend: 'up' as const,
      color: 'text-blue-400'
    },
    {
      title: 'Revenue',
      value: formatCurrency(metrics.totalRevenue),
      icon: DollarSign,
      change: '+8.2%',
      trend: 'up' as const,
      color: 'text-green-400'
    },
    {
      title: 'Subscribers',
      value: formatNumber(metrics.subscriberCount),
      icon: Users,
      change: '+15%',
      trend: 'up' as const,
      color: 'text-purple-400'
    },
    {
      title: 'Avg Watch Time',
      value: formatTime(metrics.averageWatchTime),
      icon: Clock,
      change: '-2%',
      trend: 'down' as const,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <Card key={index} className="bg-gray-900/50 border-gray-800 card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{metric.title}</p>
                <p className="text-2xl font-bold text-white mt-2">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
                  )}
                  <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gray-800/50`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
