
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type VideoAnalytics = Database['public']['Tables']['video_analytics']['Row'];
type RevenueAnalytics = Database['public']['Tables']['revenue_analytics']['Row'];
type ViewerSession = Database['public']['Tables']['viewer_sessions']['Row'];

export class AnalyticsService {
  // Get video analytics for creator
  static async getVideoAnalytics(creatorId: string): Promise<VideoAnalytics[]> {
    const { data, error } = await supabase
      .from('video_analytics')
      .select(`
        *,
        videos!inner(creator_id, title)
      `)
      .eq('videos.creator_id', creatorId);

    if (error) throw error;
    return data || [];
  }

  // Get revenue analytics for creator
  static async getRevenueAnalytics(creatorId: string, days: number = 30): Promise<RevenueAnalytics[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('revenue_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Track viewer session
  static async trackViewerSession(sessionData: {
    videoId?: string;
    streamId?: string;
    viewerId?: string;
    sessionId: string;
    deviceType?: string;
    browser?: string;
    country?: string;
    referrer?: string;
  }): Promise<ViewerSession> {
    const { data, error } = await supabase
      .from('viewer_sessions')
      .insert({
        video_id: sessionData.videoId,
        stream_id: sessionData.streamId,
        viewer_id: sessionData.viewerId,
        session_id: sessionData.sessionId,
        device_type: sessionData.deviceType,
        browser: sessionData.browser,
        country: sessionData.country,
        referrer: sessionData.referrer
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Update session end time
  static async endViewerSession(sessionId: string, watchDuration: number, progressPercent: number): Promise<void> {
    const { error } = await supabase
      .from('viewer_sessions')
      .update({
        watch_end: new Date().toISOString(),
        watch_duration: watchDuration,
        progress_percent: progressPercent
      })
      .eq('session_id', sessionId);

    if (error) throw error;
  }

  // Get dashboard metrics for creator
  static async getDashboardMetrics(creatorId: string): Promise<{
    totalViews: number;
    totalRevenue: number;
    subscriberCount: number;
    averageWatchTime: number;
  }> {
    // Get total views from video analytics
    const { data: videoStats, error: videoError } = await supabase
      .from('video_analytics')
      .select(`
        view_count,
        total_watch_time,
        videos!inner(creator_id)
      `)
      .eq('videos.creator_id', creatorId);

    if (videoError) throw videoError;

    const totalViews = videoStats?.reduce((sum, stat) => sum + (stat.view_count || 0), 0) || 0;
    const totalWatchTime = videoStats?.reduce((sum, stat) => sum + (stat.total_watch_time || 0), 0) || 0;
    const averageWatchTime = totalViews > 0 ? totalWatchTime / totalViews : 0;

    // Get total revenue
    const { data: revenueStats, error: revenueError } = await supabase
      .from('revenue_analytics')
      .select('total_revenue')
      .eq('creator_id', creatorId);

    if (revenueError) throw revenueError;

    const totalRevenue = revenueStats?.reduce((sum, stat) => sum + (stat.total_revenue || 0), 0) || 0;

    // Get subscriber count from creator profile
    const { data: profile, error: profileError } = await supabase
      .from('creator_profiles')
      .select('subscriber_count')
      .eq('id', creatorId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') throw profileError;

    return {
      totalViews,
      totalRevenue,
      subscriberCount: profile?.subscriber_count || 0,
      averageWatchTime
    };
  }
}
