import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];
type VideoInsert = Database['public']['Tables']['videos']['Insert'];
type VideoUpdate = Database['public']['Tables']['videos']['Update'];

export class VideoService {
  // Upload video file to storage with enhanced error handling
  static async uploadVideo(file: File, userId: string): Promise<{ url: string; path: string }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    try {
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, file);

      if (error) {
        // Enhanced error handling
        if (error.message.includes('file size')) {
          throw new Error('Video file is too large. Maximum size is 2GB.');
        }
        if (error.message.includes('file type')) {
          throw new Error('Invalid video format. Please use MP4, MOV, AVI, or WebM.');
        }
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      return { url: publicUrl, path: fileName };
    } catch (error: any) {
      console.error('Video upload failed:', error);
      throw new Error(error.message || 'Failed to upload video. Please try again.');
    }
  }

  // Upload thumbnail to storage with validation
  static async uploadThumbnail(file: File, userId: string): Promise<{ url: string; path: string }> {
    // Validate thumbnail file
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('Thumbnail file is too large. Maximum size is 10MB.');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid thumbnail format. Please use JPEG, PNG, or WebP.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}_thumb.${fileExt}`;
    
    try {
      const { data, error } = await supabase.storage
        .from('thumbnails')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(fileName);

      return { url: publicUrl, path: fileName };
    } catch (error: any) {
      console.error('Thumbnail upload failed:', error);
      throw new Error(error.message || 'Failed to upload thumbnail. Please try again.');
    }
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
