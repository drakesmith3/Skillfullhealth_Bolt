import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, FaSearch } from 'react-icons/fa';

const JobBoardPage: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    location: 'all',
    jobType: 'all',
    experience: 'all',
    remote: false,
  });

  // Mock job data
  const jobListings = [
    {
      id: 1,
      title: 'Registered Nurse - Intensive Care Unit',
      company: 'Memorial Healthcare System',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$75,000 - $95,000',
      posted: '2 days ago',
      experience: '3-5 years',
      description: 'Join our award-winning ICU team providing high-quality care for critically ill patients. Responsibilities include patient assessment, implementing care plans, and collaborating with the multidisciplinary team.',
      requirements: ['Valid RN license', 'BLS and ACLS certification', '3+ years ICU experience', 'BSN preferred'],
      remote: false,
      glohsenScore: 82,
    },
    {
      id: 2,
      title: 'Family Nurse Practitioner',
      company: 'CityHealth Primary Care',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110,000 - $130,000',
      posted: '1 week ago',
      experience: '5+ years',
      description: 'Seeking experienced FNP for our growing telehealth platform. You will provide comprehensive primary care services to patients of all ages through our virtual care system.',
      requirements: ['MSN and FNP certification', 'Current state license', '5+ years as FNP', 'Telehealth experience preferred'],
      remote: true,
      glohsenScore: 88,
    },
    {
      id: 3,
      title: 'Physical Therapist',
      company: 'Rehabilitation Specialists',
      location: 'Chicago, IL',
      type: 'Part-time',
      salary: '$45 - $60 per hour',
      posted: '3 days ago',
      experience: '1-3 years',
      description: 'Part-time physical therapist needed for outpatient orthopedic clinic. Flexible scheduling available with opportunities to transition to full-time.',
      requirements: ['DPT degree', 'State license', 'Orthopedic experience', 'Manual therapy skills'],
      remote: false,
      glohsenScore: 75,
    },
    {
      id: 4,
      title: 'Medical Laboratory Technician',
      company: 'Precision Diagnostics',
      location: 'Denver, CO',
      type: 'Full-time',
      salary: '$55,000 - $70,000',
      posted: '5 days ago',
      experience: '0-1 years',
      description: 'Entry-level position for recent MLT graduates. Training provided on our state-of-the-art equipment. Opportunities for advancement and specialization.',
      requirements: ['Associate\'s degree in Medical Laboratory Science', 'MLT certification', 'Attention to detail', 'Strong computer skills'],
      remote: false,
      glohsenScore: 68,
    },
    {
      id: 5,
      title: 'Telemedicine Physician - Internal Medicine',
      company: 'VirtualCare Connect',
      location: 'Remote',
      type: 'Contract',
      salary: '$200,000 - $240,000',
      posted: '1 day ago',
      experience: '5+ years',
      description: 'Practice medicine from anywhere! Join our growing telemedicine platform providing care to patients nationwide. Flexible scheduling with full-time hours available.',
      requirements: ['MD/DO with board certification in Internal Medicine', 'Active licenses in multiple states', 'Comfort with telemedicine technology', 'Excellent communication skills'],
      remote: true,
      glohsenScore: 92,
    },
    {
      id: 6,
      title: 'Occupational Health Nurse',
      company: 'Industrial Safety Partners',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$80,000 - $95,000',
      posted: '1 week ago',
      experience: '3-5 years',
      description: 'Implement occupational health programs for our corporate clients. Conduct health assessments, develop safety protocols, and provide employee education.',
      requirements: ['RN license', 'Occupational health certification preferred', 'Experience with OSHA regulations', 'Strong presentation skills'],
      remote: false,
      glohsenScore: 84,
    },
  ];

  const filteredJobs = jobListings.filter(job => {
    // Search text filter
    const searchMatch = job.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                        job.description.toLowerCase().includes(filters.search.toLowerCase());
    
    // Location filter
    const locationMatch = filters.location === 'all' || job.location.includes(filters.location);
    
    // Job type filter
    const typeMatch = filters.jobType === 'all' || job.type === filters.jobType;
    
    // Experience filter
    const experienceMatch = filters.experience === 'all' || job.experience.includes(filters.experience);
    
    // Remote filter
    const remoteMatch = !filters.remote || job.remote;
    
    return searchMatch && locationMatch && typeMatch && experienceMatch && remoteMatch;
  });

  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="job board" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Healthcare Job Board</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Find your ideal healthcare position with employers who value your GLOHSEN Score
        </p>
        
        {/* Search and filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search jobs, keywords, or companies"
                className="pl-10"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select 
                value={filters.location} 
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Boston">Boston, MA</SelectItem>
                  <SelectItem value="Chicago">Chicago, IL</SelectItem>
                  <SelectItem value="Denver">Denver, CO</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Seattle">Seattle, WA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Select 
                value={filters.jobType} 
                onValueChange={(value) => handleFilterChange('jobType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Select 
                value={filters.experience} 
                onValueChange={(value) => handleFilterChange('experience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Experience</SelectItem>
                  <SelectItem value="0-1">Entry Level (0-1 years)</SelectItem>
                  <SelectItem value="1-3">Junior (1-3 years)</SelectItem>
                  <SelectItem value="3-5">Mid-Level (3-5 years)</SelectItem>
                  <SelectItem value="5+">Senior (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Checkbox 
              id="remote"
              checked={filters.remote}
              onCheckedChange={(checked) => handleFilterChange('remote', Boolean(checked))}
            />
            <label htmlFor="remote" className="text-sm font-medium">
              Remote Only
            </label>
          </div>
            <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>
            
            <Button className="bg-red-600 hover:bg-red-700">
              Advanced Search
            </Button>
          </div>
        </div>
        
        {/* Job listings */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search filters</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-1 text-red-600 dark:text-red-400">{job.title}</h2>
                      <p className="font-medium mb-2">{job.company}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <FaBriefcase className="mr-1" />
                          {job.type}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-1" />
                          {job.experience}
                        </span>
                        <span className="flex items-center">
                          <FaDollarSign className="mr-1" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                      <div className="flex flex-col items-center">
                      <div className="mb-2 bg-amber-100 dark:bg-amber-900/50 px-3 py-1 rounded-full text-sm font-medium">
                        <span className="mr-1">GLOHSEN Score:</span>
                        <span className="text-amber-700 dark:text-amber-300">{job.glohsenScore}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Posted {job.posted}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mt-3">{job.description}</p>
                </div>
                
                {expandedJob === job.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-2">Requirements:</h3>
                    <ul className="list-disc list-inside mb-4 pl-2 text-gray-600 dark:text-gray-300">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                      <div className="flex gap-3 mt-4">
                      <Button className="bg-red-600 hover:bg-red-700">Apply Now</Button>
                      <Button variant="outline">Save Job</Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
          {/* Job alert signup */}
        <div className="mt-12 bg-amber-50 dark:bg-amber-900/30 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Never Miss a Job Opportunity</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get personalized job alerts based on your GLOHSEN Score and career goals
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-3">
            <Input placeholder="Enter your email" className="md:w-64" />
            <Button className="bg-red-600 hover:bg-red-700">Create Job Alert</Button>
          </div>
        </div>
      </main>
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default JobBoardPage;
