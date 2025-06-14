
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];
type VideoInsert = Database['public']['Tables']['videos']['Insert'];
type VideoUpdate = Database['public']['Tables']['videos']['Update'];

export class VideoService {
  // Upload video file to storage
  static async uploadVideo(file: File, userId: string): Promise<{ url: string; path: string }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(fileName);

    return { url: publicUrl, path: fileName };
  }

  // Upload thumbnail to storage
  static async uploadThumbnail(file: File, userId: string): Promise<{ url: string; path: string }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}_thumb.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('thumbnails')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(fileName);

    return { url: publicUrl, path: fileName };
  }

  // Create video record in database
  static async createVideo(videoData: VideoInsert): Promise<Video> {
    const { data, error } = await supabase
      .from('videos')
      .insert(videoData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update video
  static async updateVideo(id: string, updates: VideoUpdate): Promise<Video> {
    const { data, error } = await supabase
      .from('videos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get videos for creator
  static async getCreatorVideos(creatorId: string): Promise<Video[]> {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get published videos for public viewing
  static async getPublishedVideos(): Promise<Video[]> {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'published')
      .eq('visibility', 'public')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Delete video
  static async deleteVideo(id: string): Promise<void> {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Update video analytics
  static async trackView(videoId: string, watchTime: number = 0): Promise<void> {
    const { error } = await supabase.rpc('update_video_analytics', {
      p_video_id: videoId,
      p_view_increment: 1,
      p_watch_time_increment: watchTime
    });

    if (error) throw error;
  }
}
