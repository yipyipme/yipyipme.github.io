
-- Create table for video bullet comments (danmaku)
CREATE TABLE public.video_bullet_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL,
  user_id UUID NOT NULL,
  text TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable row-level security
ALTER TABLE public.video_bullet_comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all bullet comments
CREATE POLICY "Allow read bullet comments" ON public.video_bullet_comments
  FOR SELECT USING (true);

-- Allow logged-in users to insert their own bullet comments
CREATE POLICY "Allow authenticated insert bullet comments" ON public.video_bullet_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- (optional: for future moderation)
-- Allow delete/update only by comment owner or admins
CREATE POLICY "Allow comment owner update/delete" ON public.video_bullet_comments
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow comment owner delete" ON public.video_bullet_comments
  FOR DELETE USING (auth.uid() = user_id);

-- (optional, not enabled) For admin/moderator roles, update these policies as needed.
