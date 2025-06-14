
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Plus, 
  Clock,
  CheckCircle,
  MessageSquare,
  User,
  Calendar
} from 'lucide-react';

const Prayers = () => {
  const prayerRequests = [
    {
      id: '1',
      title: 'Prayer for healing',
      content: 'Please pray for my grandmother who is in the hospital. She needs strength and healing.',
      author: 'Sarah M.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
      prayers: 23,
      comments: 5
    },
    {
      id: '2',
      title: 'Job opportunity',
      content: 'Seeking prayers for a job interview tomorrow. May God\'s will be done.',
      author: 'John D.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'active',
      prayers: 18,
      comments: 3
    },
    {
      id: '3',
      title: 'Family reconciliation',
      content: 'Please pray for my family to come together in love and forgiveness.',
      author: 'Anonymous',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      status: 'answered',
      prayers: 45,
      comments: 12
    }
  ];

  return (
    <CreatorStudioLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-[#FDBD34] to-[#FF8A3D] p-3 rounded-2xl">
              <Heart className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Prayer Requests</h1>
              <p className="text-gray-400 mt-2">Manage and respond to community prayer requests</p>
            </div>
          </div>
          <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern">
            <Plus className="h-4 w-4 mr-2" />
            Add Prayer Topic
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Requests</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {prayerRequests.filter(p => p.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Answered Prayers</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {prayerRequests.filter(p => p.status === 'answered').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Prayers</CardTitle>
              <Heart className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {prayerRequests.reduce((sum, p) => sum + p.prayers, 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
            </CardContent>
          </Card>
        </div>

        {/* Prayer Requests List */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Prayer Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prayerRequests.map((prayer) => (
                <div key={prayer.id} className="p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-semibold">{prayer.title}</h3>
                      <Badge 
                        variant={prayer.status === 'answered' ? 'default' : 'secondary'}
                        className={prayer.status === 'answered' ? 'bg-green-600' : ''}
                      >
                        {prayer.status === 'answered' ? 'Answered' : 'Active'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern">
                        Respond
                      </Button>
                      {prayer.status === 'active' && (
                        <Button variant="outline" size="sm" className="border-green-700 text-green-300 hover:text-green-200 btn-modern">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mark Answered
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">{prayer.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {prayer.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {prayer.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {prayer.prayers} prayers
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {prayer.comments} comments
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CreatorStudioLayout>
  );
};

export default Prayers;
