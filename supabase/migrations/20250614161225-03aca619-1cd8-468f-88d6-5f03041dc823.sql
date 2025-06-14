
-- Create videos table for real video management
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  file_size BIGINT, -- in bytes
  video_format TEXT,
  resolution TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'review', 'published', 'archived')),
  category TEXT,
  tags TEXT[],
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
  monetization_enabled BOOLEAN DEFAULT false,
  ads_enabled BOOLEAN DEFAULT false,
  membership_required BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  processing_progress INTEGER DEFAULT 0, -- 0-100
  thumbnail_generated BOOLEAN DEFAULT false,
  transcoding_completed BOOLEAN DEFAULT false
);

-- Create video analytics table
CREATE TABLE IF NOT EXISTS public.video_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  view_count BIGINT DEFAULT 0,
  unique_viewers BIGINT DEFAULT 0,
  total_watch_time BIGINT DEFAULT 0, -- in seconds
  average_watch_time DECIMAL(10,2) DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  dislikes_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  click_through_rate DECIMAL(5,2) DEFAULT 0,
  retention_rate DECIMAL(5,2) DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create live streams table
CREATE TABLE IF NOT EXISTS public.live_streams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  stream_key TEXT UNIQUE NOT NULL,
  rtmp_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended', 'cancelled')),
  thumbnail_url TEXT,
  category TEXT,
  tags TEXT[],
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
  max_viewers INTEGER DEFAULT 0,
  current_viewers INTEGER DEFAULT 0,
  total_viewers INTEGER DEFAULT 0,
  chat_enabled BOOLEAN DEFAULT true,
  chat_moderation_level TEXT DEFAULT 'moderate' CHECK (chat_moderation_level IN ('off', 'light', 'moderate', 'strict')),
  recording_enabled BOOLEAN DEFAULT true,
  recording_url TEXT,
  scheduled_start TIMESTAMPTZ,
  actual_start TIMESTAMPTZ,
  actual_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create stream analytics table
CREATE TABLE IF NOT EXISTS public.stream_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stream_id UUID NOT NULL REFERENCES public.live_streams(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  concurrent_viewers INTEGER DEFAULT 0,
  chat_messages_count INTEGER DEFAULT 0,
  new_followers INTEGER DEFAULT 0,
  donations_count INTEGER DEFAULT 0,
  donations_amount DECIMAL(10,2) DEFAULT 0,
  average_watch_time DECIMAL(10,2) DEFAULT 0,
  peak_concurrent_viewers INTEGER DEFAULT 0
);

-- Create viewer sessions table for detailed analytics
CREATE TABLE IF NOT EXISTS public.viewer_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES public.live_streams(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  watch_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  watch_end TIMESTAMPTZ,
  watch_duration INTEGER DEFAULT 0, -- in seconds
  progress_percent DECIMAL(5,2) DEFAULT 0,
  device_type TEXT,
  browser TEXT,
  country TEXT,
  region TEXT,
  referrer TEXT,
  exit_point DECIMAL(5,2) DEFAULT 0,
  interactions JSONB DEFAULT '{}', -- likes, shares, comments during session
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create video comments table
CREATE TABLE IF NOT EXISTS public.video_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.video_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'pending', 'hidden', 'deleted')),
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  timestamp_seconds INTEGER, -- timestamp in video where comment was made
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create stream chat messages table
CREATE TABLE IF NOT EXISTS public.stream_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stream_id UUID NOT NULL REFERENCES public.live_streams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'chat' CHECK (message_type IN ('chat', 'donation', 'follow', 'subscription', 'system')),
  donation_amount DECIMAL(10,2),
  is_moderator BOOLEAN DEFAULT false,
  is_highlighted BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'deleted', 'hidden')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create revenue analytics table
CREATE TABLE IF NOT EXISTS public.revenue_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  ad_revenue DECIMAL(10,2) DEFAULT 0,
  subscription_revenue DECIMAL(10,2) DEFAULT 0,
  donation_revenue DECIMAL(10,2) DEFAULT 0,
  merchandise_revenue DECIMAL(10,2) DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  subscribers_gained INTEGER DEFAULT 0,
  subscribers_lost INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(creator_id, date)
);

-- Create video processing jobs table
CREATE TABLE IF NOT EXISTS public.video_processing_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK (job_type IN ('upload', 'transcode', 'thumbnail', 'metadata')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  progress INTEGER DEFAULT 0, -- 0-100
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewer_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_processing_jobs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for videos
CREATE POLICY "Creators can manage their own videos" ON public.videos
  FOR ALL USING (creator_id = auth.uid());

CREATE POLICY "Published videos are viewable by everyone" ON public.videos
  FOR SELECT USING (status = 'published' AND visibility = 'public');

-- Create RLS policies for video analytics
CREATE POLICY "Creators can view their video analytics" ON public.video_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.videos 
      WHERE videos.id = video_analytics.video_id 
      AND videos.creator_id = auth.uid()
    )
  );

-- Create RLS policies for live streams
CREATE POLICY "Creators can manage their own streams" ON public.live_streams
  FOR ALL USING (creator_id = auth.uid());

CREATE POLICY "Public streams are viewable by everyone" ON public.live_streams
  FOR SELECT USING (visibility = 'public');

-- Create RLS policies for stream analytics
CREATE POLICY "Creators can view their stream analytics" ON public.stream_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.live_streams 
      WHERE live_streams.id = stream_analytics.stream_id 
      AND live_streams.creator_id = auth.uid()
    )
  );

-- Create RLS policies for viewer sessions
CREATE POLICY "Creators can view sessions for their content" ON public.viewer_sessions
  FOR SELECT USING (
    (video_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.videos 
      WHERE videos.id = viewer_sessions.video_id 
      AND videos.creator_id = auth.uid()
    )) OR
    (stream_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.live_streams 
      WHERE live_streams.id = viewer_sessions.stream_id 
      AND live_streams.creator_id = auth.uid()
    ))
  );

-- Create RLS policies for comments
CREATE POLICY "Everyone can view published comments" ON public.video_comments
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can create comments" ON public.video_comments
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own comments" ON public.video_comments
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Creators can moderate comments on their videos" ON public.video_comments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.videos 
      WHERE videos.id = video_comments.video_id 
      AND videos.creator_id = auth.uid()
    )
  );

-- Create RLS policies for stream chat
CREATE POLICY "Everyone can view active chat messages" ON public.stream_chat_messages
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can send chat messages" ON public.stream_chat_messages
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create RLS policies for revenue analytics
CREATE POLICY "Creators can view their own revenue analytics" ON public.revenue_analytics
  FOR ALL USING (creator_id = auth.uid());

-- Create RLS policies for processing jobs
CREATE POLICY "Creators can view their video processing jobs" ON public.video_processing_jobs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.videos 
      WHERE videos.id = video_processing_jobs.video_id 
      AND videos.creator_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_videos_creator_id ON public.videos(creator_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON public.videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_published_at ON public.videos(published_at);
CREATE INDEX IF NOT EXISTS idx_video_analytics_video_id ON public.video_analytics(video_id);
CREATE INDEX IF NOT EXISTS idx_live_streams_creator_id ON public.live_streams(creator_id);
CREATE INDEX IF NOT EXISTS idx_live_streams_status ON public.live_streams(status);
CREATE INDEX IF NOT EXISTS idx_stream_analytics_stream_id ON public.stream_analytics(stream_id);
CREATE INDEX IF NOT EXISTS idx_viewer_sessions_video_id ON public.viewer_sessions(video_id);
CREATE INDEX IF NOT EXISTS idx_viewer_sessions_stream_id ON public.viewer_sessions(stream_id);
CREATE INDEX IF NOT EXISTS idx_video_comments_video_id ON public.video_comments(video_id);
CREATE INDEX IF NOT EXISTS idx_stream_chat_stream_id ON public.stream_chat_messages(stream_id);
CREATE INDEX IF NOT EXISTS idx_revenue_analytics_creator_date ON public.revenue_analytics(creator_id, date);

-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public) 
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for videos bucket
CREATE POLICY "Authenticated users can upload videos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'videos' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can view all videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "Users can update their own videos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'videos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create storage policies for thumbnails bucket
CREATE POLICY "Authenticated users can upload thumbnails" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'thumbnails' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can view all thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'thumbnails');

CREATE POLICY "Users can update their own thumbnails" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'thumbnails' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create function to generate stream keys
CREATE OR REPLACE FUNCTION generate_stream_key() 
RETURNS TEXT AS $$
BEGIN
  RETURN 'sk_' || encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update video analytics
CREATE OR REPLACE FUNCTION update_video_analytics(
  p_video_id UUID,
  p_view_increment INTEGER DEFAULT 1,
  p_watch_time_increment INTEGER DEFAULT 0
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.video_analytics (video_id, view_count, total_watch_time, updated_at)
  VALUES (p_video_id, p_view_increment, p_watch_time_increment, NOW())
  ON CONFLICT (video_id) DO UPDATE SET
    view_count = video_analytics.view_count + p_view_increment,
    total_watch_time = video_analytics.total_watch_time + p_watch_time_increment,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update stream viewer count
CREATE OR REPLACE FUNCTION update_stream_viewers(
  p_stream_id UUID,
  p_viewer_count INTEGER
) RETURNS VOID AS $$
BEGIN
  UPDATE public.live_streams 
  SET 
    current_viewers = p_viewer_count,
    max_viewers = GREATEST(max_viewers, p_viewer_count),
    updated_at = NOW()
  WHERE id = p_stream_id;
  
  INSERT INTO public.stream_analytics (stream_id, concurrent_viewers, timestamp)
  VALUES (p_stream_id, p_viewer_count, NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
