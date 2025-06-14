
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';

const PerformanceChart = () => {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#FDBD34]" />
            Performance Trends
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-[#FDBD34]">
              7 Days
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-[#FDBD34]">
              30 Days
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <div className="text-center space-y-4">
            <TrendingUp className="h-16 w-16 mx-auto text-[#FDBD34]" />
            <div>
              <p className="text-lg font-medium">Interactive Chart Coming Soon</p>
              <p className="text-sm text-gray-500 mt-2">
                Track your views, watch time, and engagement over time
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-400">+15%</div>
                <div className="text-xs text-gray-400">Views</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-400">+8%</div>
                <div className="text-xs text-gray-400">Watch Time</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-400">+23</div>
                <div className="text-xs text-gray-400">Subscribers</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
