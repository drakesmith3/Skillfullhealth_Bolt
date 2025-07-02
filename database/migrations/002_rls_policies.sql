-- Migration 002: Row Level Security Policies
-- This migration creates comprehensive RLS policies for data security

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

DROP POLICY IF EXISTS "Skills are viewable by everyone" ON skills;
DROP POLICY IF EXISTS "Users can insert their own skills" ON skills;
DROP POLICY IF EXISTS "Users can update their own skills" ON skills;
DROP POLICY IF EXISTS "Users can delete their own skills" ON skills;

DROP POLICY IF EXISTS "Certificates are viewable by everyone" ON certificates;
DROP POLICY IF EXISTS "Users can insert their own certificates" ON certificates;
DROP POLICY IF EXISTS "Users can update their own certificates" ON certificates;
DROP POLICY IF EXISTS "Users can delete their own certificates" ON certificates;

DROP POLICY IF EXISTS "Education is viewable by everyone" ON education;
DROP POLICY IF EXISTS "Users can insert their own education" ON education;
DROP POLICY IF EXISTS "Users can update their own education" ON education;
DROP POLICY IF EXISTS "Users can delete their own education" ON education;

DROP POLICY IF EXISTS "Experience is viewable by everyone" ON experience;
DROP POLICY IF EXISTS "Users can insert their own experience" ON experience;
DROP POLICY IF EXISTS "Users can update their own experience" ON experience;
DROP POLICY IF EXISTS "Users can delete their own experience" ON experience;

DROP POLICY IF EXISTS "Awards are viewable by everyone" ON awards;
DROP POLICY IF EXISTS "Users can insert their own awards" ON awards;
DROP POLICY IF EXISTS "Users can update their own awards" ON awards;
DROP POLICY IF EXISTS "Users can delete their own awards" ON awards;

DROP POLICY IF EXISTS "Publications are viewable by everyone" ON publications;
DROP POLICY IF EXISTS "Users can insert their own publications" ON publications;
DROP POLICY IF EXISTS "Users can update their own publications" ON publications;
DROP POLICY IF EXISTS "Users can delete their own publications" ON publications;

DROP POLICY IF EXISTS "Languages are viewable by everyone" ON languages;
DROP POLICY IF EXISTS "Users can insert their own languages" ON languages;
DROP POLICY IF EXISTS "Users can update their own languages" ON languages;
DROP POLICY IF EXISTS "Users can delete their own languages" ON languages;

DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON jobs;
DROP POLICY IF EXISTS "Employers can insert jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can update their own jobs" ON jobs;
DROP POLICY IF EXISTS "Employers can delete their own jobs" ON jobs;

DROP POLICY IF EXISTS "Courses are viewable by everyone" ON courses;
DROP POLICY IF EXISTS "Instructors can insert courses" ON courses;
DROP POLICY IF EXISTS "Instructors can update their own courses" ON courses;
DROP POLICY IF EXISTS "Instructors can delete their own courses" ON courses;

DROP POLICY IF EXISTS "Enrollments are viewable by student and instructor" ON enrollments;
DROP POLICY IF EXISTS "Students can enroll in courses" ON enrollments;
DROP POLICY IF EXISTS "Students can update their own enrollments" ON enrollments;

DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can delete their own notifications" ON notifications;

DROP POLICY IF EXISTS "Activities are viewable by everyone" ON activities;
DROP POLICY IF EXISTS "Users can insert their own activities" ON activities;

DROP POLICY IF EXISTS "Feedback is viewable by everyone" ON feedback;
DROP POLICY IF EXISTS "Users can insert feedback" ON feedback;
DROP POLICY IF EXISTS "Users can update their own feedback" ON feedback;
DROP POLICY IF EXISTS "Users can delete their own feedback" ON feedback;

DROP POLICY IF EXISTS "Published blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Authors can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authors can update their own blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authors can delete their own blog posts" ON blog_posts;

DROP POLICY IF EXISTS "Discussions are viewable by everyone" ON discussions;
DROP POLICY IF EXISTS "Users can insert discussions" ON discussions;
DROP POLICY IF EXISTS "Authors can update their own discussions" ON discussions;
DROP POLICY IF EXISTS "Authors can delete their own discussions" ON discussions;

DROP POLICY IF EXISTS "Users can view their own referrals" ON mlm_referrals;
DROP POLICY IF EXISTS "Users can insert referrals" ON mlm_referrals;
DROP POLICY IF EXISTS "Users can update their own referrals" ON mlm_referrals;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Skills policies
CREATE POLICY "Skills are viewable by everyone" ON skills FOR SELECT USING (true);
CREATE POLICY "Users can insert their own skills" ON skills FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update their own skills" ON skills FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete their own skills" ON skills FOR DELETE USING (auth.uid() = profile_id);

-- Certificates policies
CREATE POLICY "Certificates are viewable by everyone" ON certificates FOR SELECT USING (true);
CREATE POLICY "Users can insert their own certificates" ON certificates FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update their own certificates" ON certificates FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete their own certificates" ON certificates FOR DELETE USING (auth.uid() = profile_id);

-- Education policies
CREATE POLICY "Education is viewable by everyone" ON education FOR SELECT USING (true);
CREATE POLICY "Users can insert their own education" ON education FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update their own education" ON education FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete their own education" ON education FOR DELETE USING (auth.uid() = profile_id);

-- Experience policies
CREATE POLICY "Experience is viewable by everyone" ON experience FOR SELECT USING (true);
CREATE POLICY "Users can insert their own experience" ON experience FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update their own experience" ON experience FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete their own experience" ON experience FOR DELETE USING (auth.uid() = profile_id);

-- Awards policies
CREATE POLICY "Awards are viewable by everyone" ON awards FOR SELECT USING (true);
CREATE POLICY "Users can insert their own awards" ON awards FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update their own awards" ON awards FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete their own awards" ON awards FOR DELETE USING (auth.uid() = profile_id);

-- Publications policies
CREATE POLICY "Publications are viewable by everyone" ON publications FOR SELECT USING (true);
CREATE POLICY "Users can insert their own publications" ON publications FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update their own publications" ON publications FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete their own publications" ON publications FOR DELETE USING (auth.uid() = profile_id);

-- Languages policies
CREATE POLICY "Languages are viewable by everyone" ON languages FOR SELECT USING (true);
CREATE POLICY "Users can insert their own languages" ON languages FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update their own languages" ON languages FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete their own languages" ON languages FOR DELETE USING (auth.uid() = profile_id);

-- Jobs policies
CREATE POLICY "Jobs are viewable by everyone" ON jobs FOR SELECT USING (true);
CREATE POLICY "Employers can insert jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = employer_id);
CREATE POLICY "Employers can update their own jobs" ON jobs FOR UPDATE USING (auth.uid() = employer_id);
CREATE POLICY "Employers can delete their own jobs" ON jobs FOR DELETE USING (auth.uid() = employer_id);

-- Courses policies
CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
CREATE POLICY "Instructors can insert courses" ON courses FOR INSERT WITH CHECK (auth.uid() = instructor_id);
CREATE POLICY "Instructors can update their own courses" ON courses FOR UPDATE USING (auth.uid() = instructor_id);
CREATE POLICY "Instructors can delete their own courses" ON courses FOR DELETE USING (auth.uid() = instructor_id);

-- Enrollments policies
CREATE POLICY "Enrollments are viewable by student and instructor" ON enrollments FOR SELECT USING (
    auth.uid() = student_id OR 
    auth.uid() IN (SELECT instructor_id FROM courses WHERE id = course_id)
);
CREATE POLICY "Students can enroll in courses" ON enrollments FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update their own enrollments" ON enrollments FOR UPDATE USING (auth.uid() = student_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert notifications" ON notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own notifications" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- Activities policies
CREATE POLICY "Activities are viewable by everyone" ON activities FOR SELECT USING (true);
CREATE POLICY "Users can insert their own activities" ON activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Feedback policies
CREATE POLICY "Feedback is viewable by everyone" ON feedback FOR SELECT USING (true);
CREATE POLICY "Users can insert feedback" ON feedback FOR INSERT WITH CHECK (auth.uid() = from_user_id);
CREATE POLICY "Users can update their own feedback" ON feedback FOR UPDATE USING (auth.uid() = from_user_id);
CREATE POLICY "Users can delete their own feedback" ON feedback FOR DELETE USING (auth.uid() = from_user_id);

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can insert blog posts" ON blog_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their own blog posts" ON blog_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their own blog posts" ON blog_posts FOR DELETE USING (auth.uid() = author_id);

-- Discussions policies
CREATE POLICY "Discussions are viewable by everyone" ON discussions FOR SELECT USING (true);
CREATE POLICY "Users can insert discussions" ON discussions FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their own discussions" ON discussions FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their own discussions" ON discussions FOR DELETE USING (auth.uid() = author_id);

-- MLM Referrals policies
CREATE POLICY "Users can view their own referrals" ON mlm_referrals FOR SELECT USING (
    auth.uid() = referrer_id OR auth.uid() = referred_id
);
CREATE POLICY "Users can insert referrals" ON mlm_referrals FOR INSERT WITH CHECK (auth.uid() = referrer_id);
CREATE POLICY "Users can update their own referrals" ON mlm_referrals FOR UPDATE USING (auth.uid() = referrer_id);