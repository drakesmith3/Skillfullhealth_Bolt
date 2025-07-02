-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types/enums
CREATE TYPE user_type AS ENUM ('professional', 'student', 'employer', 'tutor', 'client');
CREATE TYPE skill_level AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');
CREATE TYPE certificate_status AS ENUM ('CURRENT', 'EXPIRED', 'PENDING');
CREATE TYPE language_proficiency AS ENUM ('BASIC', 'INTERMEDIATE', 'FLUENT', 'NATIVE');
CREATE TYPE job_status AS ENUM ('ACTIVE', 'CLOSED', 'DRAFT');
CREATE TYPE job_type AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'LOCUM');
CREATE TYPE course_difficulty AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
CREATE TYPE enrollment_status AS ENUM ('ENROLLED', 'COMPLETED', 'DROPPED');
CREATE TYPE notification_type AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR');
CREATE TYPE feedback_type AS ENUM ('GENERAL', 'COURSE', 'JOB', 'EMPLOYER');
CREATE TYPE discussion_status AS ENUM ('OPEN', 'CLOSED');
CREATE TYPE referral_status AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    profession TEXT,
    institution TEXT,
    user_type user_type DEFAULT 'professional',
    phone_number TEXT,
    setup_2fa BOOLEAN DEFAULT FALSE,
    affiliate_link TEXT,
    upline_uin TEXT,
    profile_picture TEXT,
    headline TEXT,
    specialty TEXT,
    bio TEXT,
    location_city TEXT,
    location_state TEXT,
    location_country TEXT,
    glohsen_score INTEGER DEFAULT 0,
    profile_completeness INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    level skill_level NOT NULL,
    years_of_experience INTEGER DEFAULT 0,
    endorsements INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates table
CREATE TABLE certificates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    status certificate_status DEFAULT 'CURRENT',
    expiry_date DATE NOT NULL,
    url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education table
CREATE TABLE education (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience table
CREATE TABLE experience (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    position TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Awards table
CREATE TABLE awards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Publications table
CREATE TABLE publications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    publisher TEXT NOT NULL,
    date DATE NOT NULL,
    url TEXT,
    citations INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Languages table
CREATE TABLE languages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    proficiency language_proficiency NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    salary_min INTEGER,
    salary_max INTEGER,
    description TEXT NOT NULL,
    requirements TEXT[] DEFAULT '{}',
    posted_date TIMESTAMPTZ DEFAULT NOW(),
    deadline DATE,
    status job_status DEFAULT 'ACTIVE',
    job_type job_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    price DECIMAL(10,2) DEFAULT 0,
    duration_hours INTEGER DEFAULT 0,
    difficulty course_difficulty DEFAULT 'BEGINNER',
    category TEXT NOT NULL,
    thumbnail TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    enrollment_date TIMESTAMPTZ DEFAULT NOW(),
    completion_date TIMESTAMPTZ,
    progress_percentage INTEGER DEFAULT 0,
    status enrollment_status DEFAULT 'ENROLLED',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id)
);

-- Notifications table
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type DEFAULT 'INFO',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities table
CREATE TABLE activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feedback table
CREATE TABLE feedback (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    to_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    feedback_type feedback_type DEFAULT 'GENERAL',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    featured_image TEXT,
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    read_time INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discussions table
CREATE TABLE discussions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    status discussion_status DEFAULT 'OPEN',
    pinned BOOLEAN DEFAULT FALSE,
    replies_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MLM Referrals table
CREATE TABLE mlm_referrals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    referrer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    referred_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    status referral_status DEFAULT 'PENDING',
    commission_rate DECIMAL(5,2) DEFAULT 0.05,
    total_earnings DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(referrer_id, referred_id)
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_profiles_specialty ON profiles(specialty);
CREATE INDEX idx_profiles_location ON profiles(location_city, location_country);
CREATE INDEX idx_skills_profile_id ON skills(profile_id);
CREATE INDEX idx_certificates_profile_id ON certificates(profile_id);
CREATE INDEX idx_certificates_status ON certificates(status);
CREATE INDEX idx_education_profile_id ON education(profile_id);
CREATE INDEX idx_experience_profile_id ON experience(profile_id);
CREATE INDEX idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_courses_instructor_id ON courses(instructor_id);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_feedback_to_user_id ON feedback(to_user_id);
CREATE INDEX idx_feedback_from_user_id ON feedback(from_user_id);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_discussions_author_id ON discussions(author_id);
CREATE INDEX idx_discussions_status ON discussions(status);
CREATE INDEX idx_discussions_category ON discussions(category);
CREATE INDEX idx_mlm_referrals_referrer_id ON mlm_referrals(referrer_id);
CREATE INDEX idx_mlm_referrals_referred_id ON mlm_referrals(referred_id);

-- Create functions for incrementing counters
CREATE OR REPLACE FUNCTION increment_discussion_replies(discussion_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE discussions 
    SET replies_count = replies_count + 1,
        updated_at = NOW()
    WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_discussion_views(discussion_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE discussions 
    SET views_count = views_count + 1
    WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_awards_updated_at BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON languages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discussions_updated_at BEFORE UPDATE ON discussions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mlm_referrals_updated_at BEFORE UPDATE ON mlm_referrals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mlm_referrals ENABLE ROW LEVEL SECURITY;

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