-- Migration 003: Additional Tables for Enhanced Functionality
-- This migration adds tables for course modules, assessments, payments, job applications, etc.

-- Drop existing tables if they exist
DROP TABLE IF EXISTS course_assessments CASCADE;
DROP TABLE IF EXISTS course_modules CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS discussion_replies CASCADE;
DROP TABLE IF EXISTS course_reviews CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS kpi_tracking CASCADE;

-- Drop types if they exist
DROP TYPE IF EXISTS application_status CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;
DROP TYPE IF EXISTS assessment_type CASCADE;

-- Create additional types
CREATE TYPE application_status AS ENUM ('PENDING', 'REVIEWED', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'REJECTED', 'ACCEPTED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');
CREATE TYPE assessment_type AS ENUM ('QUIZ', 'ASSIGNMENT', 'PRACTICAL', 'FINAL_EXAM');

-- Course modules table
CREATE TABLE course_modules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    video_url TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER DEFAULT 0,
    is_preview BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course assessments table
CREATE TABLE course_assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    module_id UUID REFERENCES course_modules(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    assessment_type assessment_type NOT NULL,
    questions JSONB NOT NULL,
    passing_score INTEGER DEFAULT 70,
    time_limit_minutes INTEGER,
    max_attempts INTEGER DEFAULT 3,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course reviews table
CREATE TABLE course_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title TEXT,
    review_text TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, user_id)
);

-- Job applications table
CREATE TABLE job_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
    applicant_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    cover_letter TEXT,
    resume_url TEXT,
    portfolio_url TEXT,
    expected_salary INTEGER,
    availability_date DATE,
    status application_status DEFAULT 'PENDING',
    notes TEXT,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(job_id, applicant_id)
);

-- Payments table
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    description TEXT NOT NULL,
    payment_method TEXT,
    transaction_id TEXT UNIQUE,
    status payment_status DEFAULT 'PENDING',
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discussion replies table
CREATE TABLE discussion_replies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    parent_reply_id UUID REFERENCES discussion_replies(id) ON DELETE CASCADE,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences table
CREATE TABLE user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    theme_preference VARCHAR(10) DEFAULT 'light',
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    accessibility_settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- KPI tracking table
CREATE TABLE kpi_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metric_date DATE NOT NULL,
    category TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, metric_name, metric_date)
);

-- Create indexes for new tables
CREATE INDEX idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX idx_course_modules_order ON course_modules(course_id, order_index);
CREATE INDEX idx_course_assessments_course_id ON course_assessments(course_id);
CREATE INDEX idx_course_assessments_module_id ON course_assessments(module_id);
CREATE INDEX idx_course_reviews_course_id ON course_reviews(course_id);
CREATE INDEX idx_course_reviews_user_id ON course_reviews(user_id);
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_applicant_id ON job_applications(applicant_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_course_id ON payments(course_id);
CREATE INDEX idx_discussion_replies_discussion_id ON discussion_replies(discussion_id);
CREATE INDEX idx_discussion_replies_author_id ON discussion_replies(author_id);
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_kpi_tracking_user_id ON kpi_tracking(user_id);
CREATE INDEX idx_kpi_tracking_metric ON kpi_tracking(metric_name, metric_date);

-- Create triggers for updated_at columns
CREATE TRIGGER update_course_modules_updated_at BEFORE UPDATE ON course_modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_assessments_updated_at BEFORE UPDATE ON course_assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_reviews_updated_at BEFORE UPDATE ON course_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discussion_replies_updated_at BEFORE UPDATE ON discussion_replies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for new tables
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for new tables

-- Course modules policies
CREATE POLICY "Course modules are viewable by everyone" ON course_modules FOR SELECT USING (true);
CREATE POLICY "Instructors can manage their course modules" ON course_modules FOR ALL USING (
    auth.uid() IN (SELECT instructor_id FROM courses WHERE id = course_id)
);

-- Course assessments policies
CREATE POLICY "Course assessments are viewable by enrolled students and instructors" ON course_assessments FOR SELECT USING (
    auth.uid() IN (SELECT instructor_id FROM courses WHERE id = course_id) OR
    auth.uid() IN (SELECT student_id FROM enrollments WHERE course_id = course_assessments.course_id)
);
CREATE POLICY "Instructors can manage their course assessments" ON course_assessments FOR ALL USING (
    auth.uid() IN (SELECT instructor_id FROM courses WHERE id = course_id)
);

-- Course reviews policies
CREATE POLICY "Course reviews are viewable by everyone" ON course_reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for courses they've enrolled in" ON course_reviews FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    auth.uid() IN (SELECT student_id FROM enrollments WHERE course_id = course_reviews.course_id)
);
CREATE POLICY "Users can update their own reviews" ON course_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON course_reviews FOR DELETE USING (auth.uid() = user_id);

-- Job applications policies
CREATE POLICY "Applicants and employers can view applications" ON job_applications FOR SELECT USING (
    auth.uid() = applicant_id OR 
    auth.uid() IN (SELECT employer_id FROM jobs WHERE id = job_id)
);
CREATE POLICY "Users can apply to jobs" ON job_applications FOR INSERT WITH CHECK (auth.uid() = applicant_id);
CREATE POLICY "Applicants can update their applications" ON job_applications FOR UPDATE USING (auth.uid() = applicant_id);
CREATE POLICY "Employers can update application status" ON job_applications FOR UPDATE USING (
    auth.uid() IN (SELECT employer_id FROM jobs WHERE id = job_id)
);

-- Payments policies
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create payments" ON payments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own payments" ON payments FOR UPDATE USING (auth.uid() = user_id);

-- Discussion replies policies
CREATE POLICY "Discussion replies are viewable by everyone" ON discussion_replies FOR SELECT USING (true);
CREATE POLICY "Users can create replies" ON discussion_replies FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update their replies" ON discussion_replies FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete their replies" ON discussion_replies FOR DELETE USING (auth.uid() = author_id);

-- User preferences policies
CREATE POLICY "Users can view their own preferences" ON user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their preferences" ON user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their preferences" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- KPI tracking policies
CREATE POLICY "Users can view their own KPIs" ON kpi_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their KPIs" ON kpi_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their KPIs" ON kpi_tracking FOR UPDATE USING (auth.uid() = user_id);

-- Create function to automatically increment discussion replies count
CREATE OR REPLACE FUNCTION increment_discussion_replies_on_reply()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE discussions 
    SET replies_count = replies_count + 1,
        updated_at = NOW()
    WHERE id = NEW.discussion_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for discussion replies
CREATE TRIGGER on_discussion_reply_created
    AFTER INSERT ON discussion_replies
    FOR EACH ROW EXECUTE FUNCTION increment_discussion_replies_on_reply();