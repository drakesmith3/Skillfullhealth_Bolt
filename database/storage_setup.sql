-- Enable storage extension
CREATE EXTENSION IF NOT EXISTS "storage" SCHEMA "storage";

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  ('documents', 'documents', false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']),
  ('certificates', 'certificates', false, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/png']),
  ('course-materials', 'course-materials', false, 104857600, ARRAY['video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav', 'application/pdf', 'image/jpeg', 'image/png']),
  ('blog-images', 'blog-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  ('company-logos', 'company-logos', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Avatar bucket policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload an avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Documents bucket policies (private)
CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own documents" ON storage.objects
  FOR UPDATE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own documents" ON storage.objects
  FOR DELETE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Certificates bucket policies (private)
CREATE POLICY "Users can view their own certificates" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own certificates" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own certificates" ON storage.objects
  FOR UPDATE USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own certificates" ON storage.objects
  FOR DELETE USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Course materials bucket policies
CREATE POLICY "Enrolled students can view course materials" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'course-materials' AND (
      -- Course instructors can access their materials
      auth.uid()::text = (storage.foldername(name))[1] OR
      -- Students enrolled in the course can access materials
      EXISTS (
        SELECT 1 FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE e.student_id = auth.uid()
        AND c.instructor_id::text = (storage.foldername(name))[1]
      )
    )
  );

CREATE POLICY "Instructors can upload course materials" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'course-materials' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Instructors can update their course materials" ON storage.objects
  FOR UPDATE USING (bucket_id = 'course-materials' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Instructors can delete their course materials" ON storage.objects
  FOR DELETE USING (bucket_id = 'course-materials' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Blog images bucket policies (public)
CREATE POLICY "Blog images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Company logos bucket policies (public)
CREATE POLICY "Company logos are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'company-logos');

CREATE POLICY "Employers can upload company logos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'company-logos' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'employer')
  );

CREATE POLICY "Employers can update their company logos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'company-logos' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'employer')
  );

CREATE POLICY "Employers can delete their company logos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'company-logos' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'employer')
  );

-- Helper function to get file extension
CREATE OR REPLACE FUNCTION storage.extension(name text)
RETURNS text AS $$
BEGIN
  RETURN lower(substring(name from '\.([^\.]*)$'));
END;
$$ LANGUAGE plpgsql;

-- Helper function to get folder name
CREATE OR REPLACE FUNCTION storage.filename(name text)
RETURNS text AS $$
BEGIN
  RETURN substring(name from '[^/]*$');
END;
$$ LANGUAGE plpgsql;