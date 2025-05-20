
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar, Clock, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JobsHistory = () => {
  const [filter, setFilter] = useState("all");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  
  const toggleJobDetails = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };
  
  const appliedJobs = [
    {
      id: "JOB-123456",
      title: "Locum Medical Officer",
      facility: "General Hospital Lagos",
      location: "Lagos, Nigeria",
      type: "14-day Locum",
      salary: "₦450,000",
      startDate: "2025-06-01",
      endDate: "2025-06-14",
      status: "Active",
      appliedDate: "2025-05-10",
      description: "General medical practice role working with a team of specialists in a busy hospital setting. Responsibilities include patient assessment, diagnosis, and treatment.",
      requirements: ["Valid Medical License", "BLS and ACLS", "Minimum 2 years experience"],
      contactPerson: "Dr. Adewale Johnson",
      employerFeedback: "Resume reviewed, interview scheduled for May 25th."
    },
    {
      id: "JOB-789012",
      title: "Emergency Department Physician",
      facility: "Mercy Medical Center",
      location: "Abuja, Nigeria",
      type: "30-day Locum",
      salary: "₦950,000",
      startDate: "2025-07-01",
      endDate: "2025-07-30",
      status: "Pending",
      appliedDate: "2025-05-15",
      description: "Emergency department role handling acute cases. Will be part of a team providing 24-hour emergency medical services.",
      requirements: ["Valid Medical License", "Emergency Medicine Experience", "ACLS and ATLS", "Minimum 3 years experience"],
      contactPerson: "Dr. Elizabeth Okafor",
      employerFeedback: "Application received, currently under review."
    },
    {
      id: "JOB-345678",
      title: "Primary Care Physician",
      facility: "Community Health Center",
      location: "Port Harcourt, Nigeria",
      type: "365-day Locum",
      salary: "₦12,000,000",
      startDate: "2025-08-01",
      endDate: "2026-07-31",
      status: "Rejected",
      appliedDate: "2025-05-05",
      description: "Long-term primary care position focusing on community health needs.",
      requirements: ["Valid Medical License", "Family Medicine experience", "Public Health knowledge", "5+ years experience"],
      contactPerson: "Dr. Samuel Okoye",
      employerFeedback: "Position requires more experience in rural healthcare. Thank you for your interest."
    }
  ];
  
  const qualifiedJobs = [
    {
      id: "JOB-901234",
      title: "Specialist Medical Officer",
      facility: "University Teaching Hospital",
      location: "Ibadan, Nigeria",
      type: "30-day Locum",
      salary: "₦900,000",
      startDate: "2025-06-15",
      endDate: "2025-07-14",
      match: "95% Match",
      description: "Specialist role working in the internal medicine department."
    },
    {
      id: "JOB-567890",
      title: "ICU Physician",
      facility: "Premier Hospital",
      location: "Lagos, Nigeria",
      type: "14-day Locum",
      salary: "₦550,000",
      startDate: "2025-06-10",
      endDate: "2025-06-23",
      match: "90% Match",
      description: "Critical care role in a busy ICU department."
    },
    {
      id: "JOB-234567",
      title: "Rural Health Doctor",
      facility: "Community Health Initiative",
      location: "Kaduna, Nigeria",
      type: "30-day Locum",
      salary: "₦850,000",
      startDate: "2025-07-01",
      endDate: "2025-07-30",
      match: "85% Match",
      description: "Rural healthcare position focusing on community outreach and primary care."
    }
  ];
  
  const backupLocumJobs = [
    {
      id: "JOB-678901",
      title: "General Practitioner",
      facility: "City Medical Center",
      location: "Lagos, Nigeria",
      type: "14-day Locum",
      salary: "₦400,000",
      startDate: "2025-06-01",
      endDate: "2025-06-14",
      primaryDoctor: "Dr. Aisha Mohammed",
      status: "On Call",
      description: "Backup locum doctor position for general practice role."
    },
    {
      id: "JOB-890123",
      title: "Pediatrician",
      facility: "Children's Hospital",
      location: "Enugu, Nigeria",
      type: "30-day Locum",
      salary: "₦950,000",
      startDate: "2025-07-15",
      endDate: "2025-08-14",
      primaryDoctor: "Dr. Emmanuel Okonkwo",
      status: "On Call",
      description: "Backup pediatrician position in specialist children's hospital."
    }
  ];

  // Filter jobs based on the selected filter
  const filteredAppliedJobs = filter === "all" 
    ? appliedJobs 
    : appliedJobs.filter(job => job.status.toLowerCase() === filter.toLowerCase());
  
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Briefcase className="mr-2 h-6 w-6 text-[#D4AF37]" />
          Jobs History
        </h2>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Input 
            className="w-64" 
            placeholder="Search jobs..." 
            type="search"
          />
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="applied" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          <TabsTrigger value="qualified">Qualified Jobs</TabsTrigger>
          <TabsTrigger value="backup">Backup Locum</TabsTrigger>
        </TabsList>

        <TabsContent value="applied" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <span className="text-sm text-gray-500">
              Showing {filteredAppliedJobs.length} jobs
            </span>
          </div>
          
          <div className="space-y-4">
            {filteredAppliedJobs.map((job) => (
              <div key={job.id} className="bg-white/50 backdrop-blur rounded-lg border shadow-sm overflow-hidden">
                <div className="p-4 cursor-pointer" onClick={() => toggleJobDetails(job.id)}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <Badge className={
                          job.status === "Active" ? "bg-green-100 text-green-800" : 
                          job.status === "Pending" ? "bg-amber-100 text-amber-800" : 
                          "bg-red-100 text-red-800"
                        }>
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{job.facility}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {job.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> {job.startDate} to {job.endDate}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> Applied on {job.appliedDate}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <div className="text-lg font-bold text-[#D4AF37]">{job.salary}</div>
                      <div className="text-sm text-gray-600">{job.type}</div>
                      <Button size="sm" variant="ghost" className="mt-2" onClick={() => toggleJobDetails(job.id)}>
                        {expandedJobId === job.id ? (
                          <>Less Details <ChevronUp className="ml-1 h-4 w-4" /></>
                        ) : (
                          <>More Details <ChevronDown className="ml-1 h-4 w-4" /></>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {expandedJobId === job.id && (
                  <div className="p-4 border-t bg-gray-50/50">
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Job Description</h4>
                      <p className="text-sm text-gray-600">{job.description}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Requirements</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Contact Person</h4>
                      <p className="text-sm text-gray-600">{job.contactPerson}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Employer Feedback</h4>
                      <p className="text-sm text-gray-600">{job.employerFeedback}</p>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="default" className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                        Contact Employer
                      </Button>
                      {job.status === "Active" && (
                        <Button size="sm" variant="destructive">
                          Withdraw Application
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {filteredAppliedJobs.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                No jobs found with the selected filter
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="qualified" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              Based on your GLOHSEN score and profile, you qualify for these jobs
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualifiedJobs.map((job) => (
              <div key={job.id} className="bg-white/50 backdrop-blur rounded-lg border shadow-sm p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <Badge className="bg-green-100 text-green-800">{job.match}</Badge>
                </div>
                <p className="text-sm text-gray-600">{job.facility}</p>
                <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                <p className="mt-2 text-sm">{job.description}</p>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-[#D4AF37] font-bold">{job.salary}</div>
                  <div className="text-xs text-gray-500">{job.type}</div>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  {job.startDate} to {job.endDate}
                </div>
                
                <Button size="sm" className="mt-4 w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              You are listed as a backup locum for these positions
            </span>
          </div>
          
          <div className="space-y-4">
            {backupLocumJobs.map((job) => (
              <div key={job.id} className="bg-white/50 backdrop-blur rounded-lg border shadow-sm p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.facility}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>Primary Doctor: {job.primaryDoctor}</span>
                      <span>{job.startDate} to {job.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <div className="text-lg font-bold text-[#D4AF37]">{job.salary}</div>
                    <div className="text-sm text-gray-600">{job.type}</div>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">{job.status}</Badge>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-2">Job Description</h4>
                  <p className="text-sm text-gray-600">{job.description}</p>
                  
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="default" className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact Primary Doctor
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default JobsHistory;
