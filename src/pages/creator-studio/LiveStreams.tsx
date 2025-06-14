
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import StreamCreationModal from '@/components/creator-studio/StreamCreationModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Radio, 
  Users, 
  Calendar, 
  Settings,
  Square,
  Eye,
  MessageSquare,
  Copy,
  Clock
} from 'lucide-react';
import { StreamService } from '@/lib/services/streamService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const LiveStreams = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentLiveStream, setCurrentLiveStream] = useState<any>(null);
  const { toast } = useToast();

  // Get current user for creator_id
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  const { data: streams = [], refetch } = useQuery({
    queryKey: ['creator-streams', userId],
    queryFn: () => userId ? StreamService.getCreatorStreams(userId) : Promise.resolve([]),
    enabled: !!userId
  });

  const liveStream = streams.find(stream => stream.status === 'live');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 animate-pulse';
      case 'scheduled': return 'bg-blue-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleEndStream = async (streamId: string) => {
    try {
      await StreamService.endStream(streamId);
      refetch();
      toast({
        title: "Stream Ended",
        description: "Your live stream has been ended successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to end stream. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartStream = async (streamId: string) => {
    try {
      await StreamService.startStream(streamId);
      refetch();
      toast({
        title: "Stream Started",
        description: "Your live stream is now live!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start stream. Please try again.",
        variant: "destructive",
      });
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
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
          >
            <Radio className="h-4 w-4 mr-2" />
            Create Stream
          </Button>
        </div>

        {/* Live Control Panel */}
        {liveStream && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Radio className="h-5 w-5 text-red-500" />
                Live Control Panel - {liveStream.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{liveStream.current_viewers || 0}</div>
                  <div className="text-gray-400 text-sm">Live Viewers</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">
                    {liveStream.actual_start 
                      ? Math.floor((Date.now() - new Date(liveStream.actual_start).getTime()) / 60000) 
                      : 0}m
                  </div>
                  <div className="text-gray-400 text-sm">Stream Duration</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{liveStream.max_viewers || 0}</div>
                  <div className="text-gray-400 text-sm">Peak Viewers</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{liveStream.total_viewers || 0}</div>
                  <div className="text-gray-400 text-sm">Total Views</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleEndStream(liveStream.id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
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
        )}

        {/* Stream History */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Your Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {streams.length === 0 ? (
                <div className="text-center py-8">
                  <Radio className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No streams yet. Create your first live stream!</p>
                </div>
              ) : (
                streams.map((stream) => (
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
                              {stream.current_viewers} watching
                            </div>
                          ) : stream.scheduled_start ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(stream.scheduled_start).toLocaleDateString()}
                            </div>
                          ) : null}
                          {stream.category && (
                            <Badge variant="outline" className="border-[#FDBD34] text-[#FDBD34]">
                              {stream.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {stream.status === 'scheduled' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartStream(stream.id)}
                          className="bg-[#FDBD34] text-black"
                        >
                          <Radio className="h-3 w-3 mr-1" />
                          Go Live
                        </Button>
                      )}
                      {stream.status === 'live' && (
                        <Button size="sm" className="bg-green-500 text-white">
                          <Eye className="h-3 w-3 mr-1" />
                          Live
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                        <Settings className="h-3 w-3 mr-1" />
                        Settings
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stream Setup Guide */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Stream Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">RTMP Settings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Server URL:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">rtmp://live.yipyip.com/live/</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('rtmp://live.yipyip.com/live/', 'Server URL')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">
                    Use your stream key from any of your created streams above
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

      <StreamCreationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onStreamCreated={() => {
          refetch();
          setShowCreateModal(false);
        }}
      />
    </CreatorStudioLayout>
  );
};

export default LiveStreams;
