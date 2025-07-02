import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { FaPaperPlane, FaFileUpload, FaUser, FaBriefcase, FaCalendarAlt, FaDollarSign, FaMapMarkerAlt, FaClock, FaBuilding } from 'react-icons/fa';
import { jobService } from '../services/jobService';
import { useAuth } from '../contexts/AuthContext';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  requirements: string[];
  posted_date: string;
  deadline?: string;
  status: string;
  job_type: string;
  employer: {
    full_name: string;
    profile_picture?: string;
  };
}

interface Application {
  cover_letter: string;
  resume_url: string;
  portfolio_url: string;
  expected_salary: number;
  availability_date: string;
}

const JobApplication: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  
  const [application, setApplication] = useState<Application>({
    cover_letter: '',
    resume_url: '',
    portfolio_url: '',
    expected_salary: 0,
    availability_date: ''
  });

  const [applicationProgress, setApplicationProgress] = useState(0);

  useEffect(() => {
    if (jobId) {
      loadJob();
      checkApplicationStatus();
    }
  }, [jobId]);

  useEffect(() => {
    calculateProgress();
  }, [application]);

  const loadJob = async () => {
    if (!jobId) return;
    
    setIsLoading(true);
    try {
      const jobData = await jobService.getJobById(jobId);
      setJob(jobData);
    } catch (error) {
      console.error('Error loading job:', error);
      toast.error('Failed to load job details');
      navigate('/job-board');
    } finally {
      setIsLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    if (!jobId || !user) return;
    
    try {
      const hasApplication = await jobService.hasUserApplied(jobId, user.id);
      setHasApplied(hasApplication);
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const calculateProgress = () => {
    let completedFields = 0;
    const totalFields = 5;

    if (application.cover_letter.trim()) completedFields++;
    if (application.resume_url.trim()) completedFields++;
    if (application.expected_salary > 0) completedFields++;
    if (application.availability_date) completedFields++;
    if (application.portfolio_url.trim()) completedFields++;

    setApplicationProgress((completedFields / totalFields) * 100);
  };

  const handleInputChange = (field: keyof Application, value: string | number) => {
    setApplication(prev => ({ ...prev, [field]: value }));
  };

  const validateApplication = (): boolean => {
    if (!application.cover_letter.trim()) {
      toast.error('Cover letter is required');
      return false;
    }

    if (!application.resume_url.trim()) {
      toast.error('Resume URL is required');
      return false;
    }

    if (!application.expected_salary || application.expected_salary <= 0) {
      toast.error('Expected salary is required');
      return false;
    }

    if (!application.availability_date) {
      toast.error('Availability date is required');
      return false;
    }

    return true;
  };

  const submitApplication = async () => {
    if (!validateApplication() || !jobId || !user) return;

    setIsSubmitting(true);
    try {
      const success = await jobService.applyToJob(jobId, {
        ...application,
        applicant_id: user.id
      });

      if (success) {
        toast.success('Application submitted successfully!');
        setHasApplied(true);
        // Navigate back to job board after a delay
        setTimeout(() => {
          navigate('/job-board');
        }, 2000);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    if (max) return `Up to $${max.toLocaleString()}`;
    return 'Negotiable';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
            <p className="mb-4">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/job-board')}>
              Back to Job Board
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="mb-4">Please sign in to apply for this job.</p>
            <Button onClick={() => navigate('/signin')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hasApplied) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPaperPlane className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Application Submitted</h2>
            <p className="mb-4">You have already applied for this job. The employer will review your application and contact you if selected.</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/job-board')} variant="outline">
                Browse More Jobs
              </Button>
              <Button onClick={() => navigate('/dashboard/professional')}>
                View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" onClick={() => navigate('/job-board')} className="mb-4">
          ← Back to Job Board
        </Button>
        <h1 className="text-3xl font-bold mb-2">Apply for Position</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete your application for this role
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Details */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                {job.employer.profile_picture && (
                  <img
                    src={job.employer.profile_picture}
                    alt={job.employer.full_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <FaBuilding className="mr-1" />
                    {job.company}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  <span>{job.location}</span>
                </div>
                
                <div className="flex items-center">
                  <FaDollarSign className="mr-2 text-gray-400" />
                  <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                </div>
                
                <div className="flex items-center">
                  <FaBriefcase className="mr-2 text-gray-400" />
                  <Badge variant="outline">{job.job_type.replace('_', ' ')}</Badge>
                </div>
                
                <div className="flex items-center">
                  <FaClock className="mr-2 text-gray-400" />
                  <span>Posted {formatDate(job.posted_date)}</span>
                </div>
                
                {job.deadline && (
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    <span>Deadline: {formatDate(job.deadline)}</span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Job Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4">
                  {job.description}
                </p>
              </div>

              {job.requirements.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span className="line-clamp-2">{req}</span>
                      </li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="text-gray-500 italic">
                        +{job.requirements.length - 3} more requirements
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Application Form</CardTitle>
                  <CardDescription>
                    Fill out all sections to complete your application
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    Progress: {Math.round(applicationProgress)}%
                  </div>
                  <Progress value={applicationProgress} className="w-24 mt-1" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Cover Letter */}
              <div>
                <Label htmlFor="coverLetter" className="text-base font-semibold">
                  Cover Letter *
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  Explain why you're interested in this position and what makes you a good fit
                </p>
                <Textarea
                  id="coverLetter"
                  value={application.cover_letter}
                  onChange={(e) => handleInputChange('cover_letter', e.target.value)}
                  placeholder="Dear Hiring Manager,&#10;&#10;I am writing to express my interest in the [Position Title] role at [Company Name]..."
                  rows={8}
                  className="resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {application.cover_letter.length}/2000 characters
                </p>
              </div>

              {/* Resume Upload */}
              <div>
                <Label htmlFor="resumeUrl" className="text-base font-semibold">
                  Resume/CV *
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  Provide a link to your resume (Google Drive, Dropbox, personal website, etc.)
                </p>
                <div className="flex space-x-2">
                  <Input
                    id="resumeUrl"
                    type="url"
                    value={application.resume_url}
                    onChange={(e) => handleInputChange('resume_url', e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                  <Button variant="outline" type="button">
                    <FaFileUpload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>

              {/* Portfolio (Optional) */}
              <div>
                <Label htmlFor="portfolioUrl" className="text-base font-semibold">
                  Portfolio/Work Samples
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  Optional: Share links to your professional portfolio, publications, or work samples
                </p>
                <Input
                  id="portfolioUrl"
                  type="url"
                  value={application.portfolio_url}
                  onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              {/* Expected Salary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expectedSalary" className="text-base font-semibold">
                    Expected Salary (Annual) *
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Your salary expectation in USD
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <Input
                      id="expectedSalary"
                      type="number"
                      value={application.expected_salary || ''}
                      onChange={(e) => handleInputChange('expected_salary', parseInt(e.target.value) || 0)}
                      placeholder="75000"
                      className="pl-8"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="availabilityDate" className="text-base font-semibold">
                    Availability Date *
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    When can you start working?
                  </p>
                  <Input
                    id="availabilityDate"
                    type="date"
                    value={application.availability_date}
                    onChange={(e) => handleInputChange('availability_date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Application Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Application Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Cover Letter:</span>
                    <span className={`ml-2 ${application.cover_letter ? 'text-green-600' : 'text-red-500'}`}>
                      {application.cover_letter ? 'Completed' : 'Required'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Resume:</span>
                    <span className={`ml-2 ${application.resume_url ? 'text-green-600' : 'text-red-500'}`}>
                      {application.resume_url ? 'Provided' : 'Required'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Portfolio:</span>
                    <span className={`ml-2 ${application.portfolio_url ? 'text-green-600' : 'text-gray-400'}`}>
                      {application.portfolio_url ? 'Provided' : 'Optional'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Expected Salary:</span>
                    <span className={`ml-2 ${application.expected_salary > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {application.expected_salary > 0 ? `$${application.expected_salary.toLocaleString()}` : 'Required'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Availability:</span>
                    <span className={`ml-2 ${application.availability_date ? 'text-green-600' : 'text-red-500'}`}>
                      {application.availability_date ? formatDate(application.availability_date) : 'Required'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-gray-50 dark:bg-gray-800">
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By submitting this application, you agree to our terms and privacy policy.
                  </p>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      size="lg"
                      disabled={applicationProgress < 80 || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2 h-4 w-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Submit Application</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to submit your application for <strong>{job.title}</strong> at <strong>{job.company}</strong>? 
                        This action cannot be undone, but you can update your application later if needed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Review Again</AlertDialogCancel>
                      <AlertDialogAction onClick={submitApplication}>
                        Yes, Submit Application
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;