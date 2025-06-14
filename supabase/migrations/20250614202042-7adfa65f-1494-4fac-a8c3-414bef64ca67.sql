
-- Check if buckets exist and update them if needed, otherwise create them
DO $$
BEGIN
  -- Update existing buckets or insert if they don't exist
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
  VALUES 
    ('videos', 'videos', true, 2147483648, ARRAY['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime']),
    ('thumbnails', 'thumbnails', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
  ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;
END $$;

-- Create upload sessions table for chunked uploads
CREATE TABLE IF NOT EXISTS public.upload_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  filename TEXT NOT NULL,
  total_size BIGINT NOT NULL,
  chunk_size INTEGER NOT NULL DEFAULT 5242880, -- 5MB chunks
  total_chunks INTEGER NOT NULL,
  uploaded_chunks INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'uploading', 'completed', 'failed', 'cancelled')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);

-- Enable RLS on upload_sessions
ALTER TABLE public.upload_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for upload_sessions (drop existing if they exist)
DROP POLICY IF EXISTS "Users can manage their upload sessions" ON public.upload_sessions;
CREATE POLICY "Users can manage their upload sessions" ON public.upload_sessions
FOR ALL USING (auth.uid() = user_id);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_upload_sessions_user_status ON public.upload_sessions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_upload_sessions_expires ON public.upload_sessions(expires_at);

-- Create function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_upload_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.upload_sessions 
  WHERE expires_at < NOW() AND status != 'completed';
END;
$$;
