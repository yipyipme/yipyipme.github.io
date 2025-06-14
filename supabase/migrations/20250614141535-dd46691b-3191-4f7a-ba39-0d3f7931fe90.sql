
-- Create creator applications table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.creator_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel_name TEXT NOT NULL,
  channel_description TEXT NOT NULL,
  content_type TEXT NOT NULL,
  ministry_background TEXT,
  sample_content_urls TEXT[],
  status creator_status NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  review_notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.creator_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own applications" ON public.creator_applications;
DROP POLICY IF EXISTS "Users can insert their own applications" ON public.creator_applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON public.creator_applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.creator_applications;

-- Create policies for creator applications
CREATE POLICY "Users can view their own applications" ON public.creator_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own applications" ON public.creator_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications" ON public.creator_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update applications" ON public.creator_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_creator_applications_user_id ON public.creator_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_creator_applications_status ON public.creator_applications(status);
