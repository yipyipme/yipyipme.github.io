
import { useState } from 'react';
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Radio, 
  Users, 
  Calendar, 
  Settings,
  Play,
  Square,
  Eye,
  MessageSquare
} from 'lucide-react';
import { platformStore } from '@/lib/store';

const LiveStreams = () => {
  const [streams] = useState(platformStore.getLiveStreams());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 animate-pulse';
      case 'scheduled': return 'bg-blue-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <CreatorStudioLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Live Streams</h1>
            <p className="text-gray-400 mt-2">Manage your live streaming content</p>
          </div>
          <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80">
            <Radio className="h-4 w-4 mr-2" />
            Schedule Stream
          </Button>
        </div>

        {/* Live Control Panel */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Radio className="h-5 w-5 text-red-500" />
              Live Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">2,345</div>
                <div className="text-gray-400 text-sm">Live Viewers</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">1:23:45</div>
                <div className="text-gray-400 text-sm">Stream Duration</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">234</div>
                <div className="text-gray-400 text-sm">Comments</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">45</div>
                <div className="text-gray-400 text-sm">Prayer Requests</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="bg-red-500 text-white hover:bg-red-600">
                <Square className="h-4 w-4 mr-2" />
                End Stream
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Settings className="h-4 w-4 mr-2" />
                Stream Settings
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <MessageSquare className="h-4 w-4 mr-2" />
                Moderate Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stream History */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Stream History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {streams.map((stream) => (
                <div key={stream.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FDBD34] to-[#FF8A3D] rounded-lg flex items-center justify-center">
                      <Radio className="h-8 w-8 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{stream.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <Badge className={`${getStatusColor(stream.status)} text-white`}>
                          {stream.status}
                        </Badge>
                        {stream.status === 'live' ? (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {stream.viewers} watching
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {stream.scheduledTime?.toLocaleDateString() || 'No date set'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {stream.status === 'live' ? (
                      <Button size="sm" className="bg-[#FDBD34] text-black">
                        <Eye className="h-3 w-3 mr-1" />
                        View Live
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stream Setup Guide */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Setup Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Stream Settings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stream Key:</span>
                    <span className="text-white font-mono">sk_live_123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Server URL:</span>
                    <span className="text-white font-mono">rtmp://live.yipyip.com/</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Bitrate:</span>
                    <span className="text-white">6000 kbps</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Recommended Settings</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Resolution: 1920x1080 (1080p)</div>
                  <div>• Frame Rate: 30 FPS</div>
                  <div>• Video Bitrate: 4500-6000 kbps</div>
                  <div>• Audio Bitrate: 128 kbps</div>
                  <div>• Encoder: x264</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CreatorStudioLayout>
  );
};

export default LiveStreams;
