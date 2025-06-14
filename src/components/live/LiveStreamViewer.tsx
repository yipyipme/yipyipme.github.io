
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Users, Heart, Share2, MessageSquare } from 'lucide-react';
import StreamChat from './StreamChat';
import { StreamService } from '@/lib/services/streamService';
import { supabase } from '@/integrations/supabase/client';

const LiveStreamViewer = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const [viewerCount, setViewerCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const { data: stream, isLoading } = useQuery({
    queryKey: ['live-stream', streamId],
    queryFn: async () => {
      if (!streamId) throw new Error('Stream ID required');
      
      const { data, error } = await supabase
        .from('live_streams')
        .select(`
          *,
          profiles:creator_id (
            full_name,
            username
          )
        `)
        .eq('id', streamId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!streamId
  });

  useEffect(() => {
    if (!stream) return;

    setViewerCount(stream.current_viewers || 0);

    // Subscribe to viewer count updates
    const channel = supabase
      .channel('stream-viewers')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_streams',
          filter: `id=eq.${streamId}`
        },
        (payload) => {
          const updatedStream = payload.new as any;
          setViewerCount(updatedStream.current_viewers || 0);
        }
      )
      .subscribe();

    // Simulate viewer count update (in real app, this would be handled by the streaming server)
    const updateViewerCount = () => {
      if (stream.status === 'live') {
        StreamService.updateViewerCount(stream.id, viewerCount + 1);
      }
    };

    updateViewerCount();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [stream, streamId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading stream...</div>
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Stream not found</div>
      </div>
    );
  }

  const creatorName = stream.profiles?.full_name || stream.profiles?.username || 'Unknown Creator';

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3">
            <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
              {stream.status === 'live' ? (
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">📹</div>
                  <p>Live Stream Player</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Integration with streaming service required
                  </p>
                </div>
              ) : (
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">⏰</div>
                  <p>Stream is {stream.status}</p>
                  {stream.scheduled_start && (
                    <p className="text-sm text-gray-400 mt-2">
                      Scheduled for {new Date(stream.scheduled_start).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Stream Info */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-white">{stream.title}</h1>
                      {stream.status === 'live' && (
                        <Badge className="bg-red-500 animate-pulse">
                          🔴 LIVE
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {viewerCount} watching
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {creatorName}
                      </div>
                      {stream.category && (
                        <Badge variant="outline" className="border-[#FDBD34] text-[#FDBD34]">
                          {stream.category}
                        </Badge>
                      )}
                    </div>

                    {stream.description && (
                      <p className="text-gray-300 text-sm mb-4">{stream.description}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant={isFollowing ? "default" : "outline"}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={isFollowing ? "bg-[#FDBD34] text-black" : "border-gray-700 text-gray-300"}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    <Heart className="h-4 w-4 mr-2" />
                    Donate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            {stream.chat_enabled ? (
              <StreamChat streamId={stream.id} />
            ) : (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Chat is disabled for this stream</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamViewer;
