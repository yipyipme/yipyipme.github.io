
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type LiveStream = Database['public']['Tables']['live_streams']['Row'];
type LiveStreamInsert = Database['public']['Tables']['live_streams']['Insert'];
type LiveStreamUpdate = Database['public']['Tables']['live_streams']['Update'];

export class StreamService {
  // Create new live stream
  static async createStream(streamData: Omit<LiveStreamInsert, 'stream_key' | 'rtmp_url'>): Promise<LiveStream> {
    // Generate stream key
    const { data: streamKey, error: keyError } = await supabase.rpc('generate_stream_key');
    if (keyError) throw keyError;

    const rtmpUrl = `rtmp://live.yipyip.com/live/${streamKey}`;

    const { data, error } = await supabase
      .from('live_streams')
      .insert({
        ...streamData,
        stream_key: streamKey,
        rtmp_url: rtmpUrl
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update stream
  static async updateStream(id: string, updates: LiveStreamUpdate): Promise<LiveStream> {
    const { data, error } = await supabase
      .from('live_streams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get streams for creator
  static async getCreatorStreams(creatorId: string): Promise<LiveStream[]> {
    const { data, error } = await supabase
      .from('live_streams')
      .select('*')
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get live streams for public viewing
  static async getLiveStreams(): Promise<LiveStream[]> {
    const { data, error } = await supabase
      .from('live_streams')
      .select('*')
      .eq('status', 'live')
      .eq('visibility', 'public')
      .order('current_viewers', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Update viewer count
  static async updateViewerCount(streamId: string, viewerCount: number): Promise<void> {
    const { error } = await supabase.rpc('update_stream_viewers', {
      p_stream_id: streamId,
      p_viewer_count: viewerCount
    });

    if (error) throw error;
  }

  // Start stream
  static async startStream(streamId: string): Promise<void> {
    await this.updateStream(streamId, {
      status: 'live',
      actual_start: new Date().toISOString()
    });
  }

  // End stream
  static async endStream(streamId: string): Promise<void> {
    await this.updateStream(streamId, {
      status: 'ended',
      actual_end: new Date().toISOString()
    });
  }
}
