import React, { useState } from 'react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FaSearch, FaStar, FaRegStar, FaStarHalfAlt, FaUserGraduate, FaClock, FaChalkboardTeacher, FaAward, FaPlayCircle } from 'react-icons/fa';

const CourseEnrollment: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    level: 'all',
    format: 'all'
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Advanced Cardiac Life Support (ACLS)",
      description: "Comprehensive training on managing cardiac emergencies, including rhythm recognition, medication protocols, and team dynamics.",
      instructor: "Dr. Emily Chen, MD",
      rating: 4.8,
      reviews: 256,
      students: 1842,
      duration: "16 hours",
      level: "Intermediate",
      format: "Blended",
      category: "Emergency Medicine",
      price: 249,
      image: "/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png",
      best_seller: true,
      glohsen_impact: 15,
      modules: 8,
      completion_rate: 92
    },
    {
      id: 2,
      title: "Fundamentals of Medical Ethics",
      description: "Explore key ethical principles and frameworks for healthcare decision-making, patient autonomy, and professional responsibility.",
      instructor: "Prof. Sarah Johnson, PhD",
      rating: 4.6,
      reviews: 189,
      students: 1205,
      duration: "12 hours",
      level: "Beginner",
      format: "Online",
      category: "Ethics & Law",
      price: 199,
      image: "/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png",
      best_seller: false,
      glohsen_impact: 10,
      modules: 6,
      completion_rate: 88
    },
    {
      id: 3,
      title: "Pharmacology for Primary Care",
      description: "Comprehensive review of medications commonly used in primary care settings, including mechanisms, indications, and patient education.",
      instructor: "Dr. Marcus Wells, PharmD",
      rating: 4.9,
      reviews: 312,
      students: 2103,
      duration: "24 hours",
      level: "Advanced",
      format: "Online",
      category: "Pharmacology",
      price: 299,
      image: "/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png",
      best_seller: true,
      glohsen_impact: 18,
      modules: 12,
      completion_rate: 85
    },
    {
      id: 4,
      title: "Effective Healthcare Communication",
      description: "Develop advanced communication skills for patient interactions, difficult conversations, and interdisciplinary collaboration.",
      instructor: "Dr. Alicia Ramirez, PhD",
      rating: 4.7,
      reviews: 178,
      students: 1546,
      duration: "10 hours",
      level: "All Levels",
      format: "Online",
      category: "Professional Skills",
      price: 149,
      image: "/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png",
      best_seller: false,
      glohsen_impact: 12,
      modules: 5,
      completion_rate: 94
    },
    {
      id: 5,
      title: "Advanced Physical Assessment",
      description: "Master comprehensive head-to-toe assessment techniques, abnormal findings interpretation, and documentation best practices.",
      instructor: "Prof. James Wilson, DNP",
      rating: 4.8,
      reviews: 231,
      students: 1687,
      duration: "20 hours",
      level: "Intermediate",
      format: "Blended",
      category: "Clinical Skills",
      price: 279,
      image: "/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png",
      best_seller: false,
      glohsen_impact: 16,
      modules: 10,
      completion_rate: 89
    },
    {
      id: 6,
      title: "Healthcare Informatics Foundations",
      description: "Introduction to healthcare data systems, electronic health records, data analytics, and their application in clinical settings.",
      instructor: "Dr. Tisha Patel, PhD",
      rating: 4.5,
      reviews: 164,
      students: 973,
      duration: "14 hours",
      level: "Beginner",
      format: "Online",
      category: "Technology",
      price: 229,
      image: "/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png",
      best_seller: false,
      glohsen_impact: 14,
      modules: 7,
      completion_rate: 82
    }
  ];

  // Filter courses based on selected filters
  const filteredCourses = courses.filter(course => {
    const searchMatch = course.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                      course.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                      course.instructor.toLowerCase().includes(filters.search.toLowerCase());
    
    const categoryMatch = filters.category === 'all' || course.category === filters.category;
    const levelMatch = filters.level === 'all' || course.level === filters.level;
    const formatMatch = filters.format === 'all' || course.format === filters.format;
    
    return searchMatch && categoryMatch && levelMatch && formatMatch;
  });

  // Mock enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced Cardiac Life Support (ACLS)",
      instructor: "Dr. Emily Chen, MD",
      progress: 65,
      lastAccessed: "Yesterday",
      nextModule: "Cardiac Rhythm Management",
      category: "Emergency Medicine",
      dueDate: "June 15, 2025",
      image: "/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png",
    },
    {
      id: 3,
      title: "Pharmacology for Primary Care",
      instructor: "Dr. Marcus Wells, PharmD",
      progress: 30,
      lastAccessed: "2 days ago",
      nextModule: "Antihypertensive Medications",
      category: "Pharmacology",
      dueDate: "July 3, 2025",
      image: "/lovable-uploads/1cf8c162-b731-4398-8e39-0447a4c8c6c9.png",
    }
  ];

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="courses" />
      
      <main className="container mx-auto px-4 py-8 mt-16 mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Healthcare Courses</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Enhance your skills and advance your career with our professional healthcare courses
        </p>
        
        <Tabs defaultValue="browse" className="mb-10">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="mt-6">
            {/* Search and filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search courses, instructors, or keywords"
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                
                <div className="w-full md:w-56">
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => handleFilterChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                      <SelectItem value="Ethics & Law">Ethics & Law</SelectItem>
                      <SelectItem value="Pharmacology">Pharmacology</SelectItem>
                      <SelectItem value="Professional Skills">Professional Skills</SelectItem>
                      <SelectItem value="Clinical Skills">Clinical Skills</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <Select 
                    value={filters.level} 
                    onValueChange={(value) => handleFilterChange('level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="All Levels">Mixed Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <Select 
                    value={filters.format} 
                    onValueChange={(value) => handleFilterChange('format', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Formats</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Blended">Blended</SelectItem>
                      <SelectItem value="In-person">In-person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
              </p>
            </div>
            
            {/* Course cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search filters</p>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                      {course.best_seller && (
                        <Badge className="absolute top-3 left-3 bg-yellow-500">Bestseller</Badge>
                      )}
                      <Badge className="absolute top-3 right-3 bg-red-700">+{course.glohsen_impact} GLOHSEN points</Badge>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">{course.category}</Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-2 pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <StarRating rating={course.rating} />
                          <span className="ml-2 text-sm">{course.rating} ({course.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <FaUserGraduate className="mr-1" />
                          {course.students} students
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <FaChalkboardTeacher className="mr-1" />
                          {course.format}
                        </span>
                      </div>
                      
                      <p className="text-sm">Instructor: {course.instructor}</p>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between items-center pt-2">
                      <div className="text-xl font-bold">${course.price}</div>
                      <Button className="bg-red-700 hover:bg-red-800">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="my-courses" className="mt-6">
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">You haven't enrolled in any courses yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Browse our catalog to find courses that match your interests</p>
                <Button className="bg-red-700 hover:bg-red-800">Browse Courses</Button>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">My Enrolled Courses</h2>
                
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div>
                            <Badge variant="outline" className="mb-2">{course.category}</Badge>
                            <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Instructor: {course.instructor}</p>
                            
                            <div className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Progress: {course.progress}%</span>
                                <span className="text-sm">Due: {course.dueDate}</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                            
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <p>Last accessed: {course.lastAccessed}</p>
                              <p>Next module: {course.nextModule}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 md:text-right">                            <Button className="bg-red-700 hover:bg-red-800">
                              <FaPlayCircle className="mr-2" />
                              Continue Learning
                            </Button>
                            <Button variant="outline">View Certificate</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                  <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/30 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Recommended for You</h3>
                  <p className="mb-4">Based on your GLOHSEN Score and career goals</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {courses.slice(1, 4).map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="h-32 overflow-hidden">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="py-3">
                          <CardTitle className="text-base line-clamp-1">{course.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="pt-0">
                          <Button variant="outline" className="w-full">View Course</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Learning path section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-2 text-center">Structured Learning Paths</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Follow a curated course sequence to master specialized healthcare domains
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <FaAward className="text-[#D4AF37] text-2xl" />
                  <Badge>16 weeks</Badge>
                </div>
                <CardTitle>Acute Care Excellence</CardTitle>
                <CardDescription>Master the skills needed for critical care and emergency settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">5 courses • 72 hours • CE credits available</p>
                <p className="text-sm font-medium mb-1">You'll learn:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  <li>Advanced patient assessment</li>
                  <li>Emergency interventions</li>
                  <li>Critical care pharmacology</li>
                  <li>Team leadership in crisis</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-700 hover:bg-red-800 text-white">View Path</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <FaAward className="text-[#D4AF37] text-2xl" />
                  <Badge>12 weeks</Badge>
                </div>
                <CardTitle>Healthcare Leadership</CardTitle>
                <CardDescription>Develop the skills to lead teams and manage healthcare systems</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">4 courses • 56 hours • CE credits available</p>
                <p className="text-sm font-medium mb-1">You'll learn:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  <li>Healthcare management</li>
                  <li>Quality improvement</li>
                  <li>Team building and communication</li>
                  <li>Healthcare finance basics</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black">View Path</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <FaAward className="text-[#D4AF37] text-2xl" />
                  <Badge>10 weeks</Badge>
                </div>
                <CardTitle>Digital Health Innovation</CardTitle>
                <CardDescription>Explore healthcare technology and data-driven patient care</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">3 courses • 48 hours • CE credits available</p>
                <p className="text-sm font-medium mb-1">You'll learn:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  <li>Healthcare informatics</li>
                  <li>Telehealth best practices</li>
                  <li>Data analytics in healthcare</li>
                  <li>Digital patient engagement</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-black hover:bg-gray-800 text-white">View Path</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer isActive={false} />
    </div>
  );
};

export default CourseEnrollment;
