
-- Update existing buckets to support video file uploads with proper MIME types
UPDATE storage.buckets 
SET 
  file_size_limit = 2147483648, -- 2GB limit
  allowed_mime_types = ARRAY[
    'video/mp4', 
    'video/mov', 
    'video/avi', 
    'video/webm', 
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/x-flv',
    'video/x-ms-wmv',
    'video/x-m4v',
    'video/3gpp',
    'application/octet-stream'
  ]
WHERE id = 'videos';

-- Update thumbnails bucket
UPDATE storage.buckets 
SET 
  file_size_limit = 10485760, -- 10MB limit
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
WHERE id = 'thumbnails';

-- Ensure storage policies exist (create if they don't)
DO $$
BEGIN
  -- Check and create policies for videos bucket
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public uploads to videos bucket'
  ) THEN
    CREATE POLICY "Allow public uploads to videos bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'videos');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public access to videos'
  ) THEN
    CREATE POLICY "Allow public access to videos" ON storage.objects
    FOR SELECT USING (bucket_id = 'videos');
  END IF;

  -- Check and create policies for thumbnails bucket
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public uploads to thumbnails bucket'
  ) THEN
    CREATE POLICY "Allow public uploads to thumbnails bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'thumbnails');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public access to thumbnails'
  ) THEN
    CREATE POLICY "Allow public access to thumbnails" ON storage.objects
    FOR SELECT USING (bucket_id = 'thumbnails');
  END IF;
END $$;
