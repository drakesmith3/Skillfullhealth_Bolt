import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { FaPlay, FaPause, FaCheck, FaClock, FaBook, FaQuestionCircle, FaArrowLeft, FaArrowRight, FaStar, FaDownload, FaCertificate } from 'react-icons/fa';
import { courseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';

interface CourseModule {
  id: string;
  title: string;
  description: string;
  content: string;
  video_url: string;
  order_index: number;
  duration_minutes: number;
  is_preview: boolean;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  assessment_type: string;
  questions: any[];
  passing_score: number;
  time_limit_minutes?: number;
  max_attempts: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    full_name: string;
    specialty: string;
    profile_picture?: string;
  };
  price: number;
  duration_hours: number;
  difficulty: string;
  category: string;
  thumbnail: string;
  modules: CourseModule[];
  assessments: Assessment[];
}

interface Enrollment {
  id: string;
  progress_percentage: number;
  status: string;
  enrollment_date: string;
  completion_date?: string;
}

const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState('content');
  const [isLoading, setIsLoading] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [moduleProgress, setModuleProgress] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (courseId && user) {
      loadCourseData();
    }
  }, [courseId, user]);

  const loadCourseData = async () => {
    if (!courseId || !user) return;

    setIsLoading(true);
    try {
      // Load course details
      const courseData = await courseService.getCourseById(courseId);
      if (!courseData) {
        toast.error('Course not found');
        navigate('/courses');
        return;
      }

      // Load enrollment data
      const enrollments = await courseService.getUserEnrollments(user.id);
      const currentEnrollment = enrollments.find(e => e.course_id === courseId);
      
      if (!currentEnrollment) {
        toast.error('You are not enrolled in this course');
        navigate('/courses');
        return;
      }

      setCourse(courseData);
      setEnrollment(currentEnrollment);

      // Initialize module progress
      const progress: { [key: string]: boolean } = {};
      courseData.modules?.forEach(module => {
        progress[module.id] = false; // Load from actual progress data
      });
      setModuleProgress(progress);

    } catch (error) {
      console.error('Error loading course data:', error);
      toast.error('Failed to load course');
      navigate('/courses');
    } finally {
      setIsLoading(false);
    }
  };

  const markModuleComplete = async (moduleId: string) => {
    if (!enrollment) return;

    try {
      setModuleProgress(prev => ({ ...prev, [moduleId]: true }));
      
      // Calculate new progress percentage
      const completedModules = Object.values({ ...moduleProgress, [moduleId]: true }).filter(Boolean).length;
      const totalModules = course?.modules?.length || 1;
      const newProgress = Math.round((completedModules / totalModules) * 100);

      await courseService.updateEnrollmentProgress(enrollment.id, newProgress);
      
      setEnrollment(prev => prev ? { ...prev, progress_percentage: newProgress } : null);
      toast.success('Module marked as complete!');

      // Auto-advance to next module
      if (currentModuleIndex < (course?.modules?.length || 0) - 1) {
        setCurrentModuleIndex(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
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
            <p>Loading course...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course || !enrollment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Course Not Available</h2>
            <p className="mb-4">The course you're looking for is not available or you're not enrolled.</p>
            <Button onClick={() => navigate('/courses')}>
              Back to Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentModule = course.modules?.[currentModuleIndex];
  const isLastModule = currentModuleIndex === (course.modules?.length || 0) - 1;
  const isFirstModule = currentModuleIndex === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/courses')}>
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Button>
              <div>
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-sm text-gray-500">
                  Instructor: {course.instructor.full_name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="font-semibold">{enrollment.progress_percentage}%</div>
              </div>
              <Progress value={enrollment.progress_percentage} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
                <CardDescription>
                  {course.modules?.length || 0} modules • {course.duration_hours}h total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {course.modules?.map((module, index) => (
                      <div
                        key={module.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          index === currentModuleIndex
                            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setCurrentModuleIndex(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {moduleProgress[module.id] ? (
                              <FaCheck className="text-green-500 text-sm" />
                            ) : (
                              <div className={`w-4 h-4 rounded-full border-2 ${
                                index === currentModuleIndex ? 'border-red-500' : 'border-gray-300'
                              }`} />
                            )}
                            <span className="text-sm font-medium line-clamp-1">
                              {module.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <FaClock />
                            <span>{module.duration_minutes}m</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentModule?.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span>Module {currentModuleIndex + 1} of {course.modules?.length}</span>
                      <Badge variant="outline">
                        <FaClock className="mr-1 h-3 w-3" />
                        {formatDuration(currentModule?.duration_minutes || 0)}
                      </Badge>
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!isFirstModule && (
                      <Button
                        variant="outline"
                        onClick={() => setCurrentModuleIndex(prev => prev - 1)}
                      >
                        <FaArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                    )}
                    
                    {!isLastModule && (
                      <Button
                        onClick={() => setCurrentModuleIndex(prev => prev + 1)}
                      >
                        Next
                        <FaArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">
                      <FaBook className="mr-2 h-4 w-4" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="video">
                      <FaPlay className="mr-2 h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="notes">
                      <FaQuestionCircle className="mr-2 h-4 w-4" />
                      Notes
                    </TabsTrigger>
                  </TabsList>

                  {/* Content Tab */}
                  <TabsContent value="content" className="mt-6">
                    <div className="space-y-4">
                      {currentModule?.description && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Module Overview</h4>
                          <p className="text-sm">{currentModule.description}</p>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ 
                          __html: currentModule?.content || '<p>No content available for this module.</p>' 
                        }} />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Video Tab */}
                  <TabsContent value="video" className="mt-6">
                    {currentModule?.video_url ? (
                      <div className="space-y-4">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <iframe
                            src={currentModule.video_url}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                            title={currentModule.title}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant={videoPlaying ? "default" : "outline"}
                              onClick={() => setVideoPlaying(!videoPlaying)}
                            >
                              {videoPlaying ? <FaPause /> : <FaPlay />}
                            </Button>
                            <span className="text-sm text-gray-500">
                              Duration: {formatDuration(currentModule.duration_minutes)}
                            </span>
                          </div>
                          
                          <Button variant="outline">
                            <FaDownload className="mr-2 h-4 w-4" />
                            Download Resources
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-4xl mb-4">
                          <FaPlay />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No Video Available</h3>
                        <p className="text-gray-500">This module doesn't have a video component.</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Notes Tab */}
                  <TabsContent value="notes" className="mt-6">
                    <div className="space-y-4">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Key Takeaways</h4>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Important concepts covered in this module</li>
                          <li>Practical applications and examples</li>
                          <li>Additional resources for further learning</li>
                        </ul>
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                        <h4 className="font-semibold mb-2">Personal Notes</h4>
                        <p className="text-gray-500 text-sm mb-4">
                          Take notes while learning to enhance retention
                        </p>
                        <Button variant="outline">
                          Add Note
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="bg-gray-50 dark:bg-gray-800">
                <div className="w-full flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Enrolled on {formatDate(enrollment.enrollment_date)}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!moduleProgress[currentModule?.id || ''] && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button>
                            <FaCheck className="mr-2 h-4 w-4" />
                            Mark as Complete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Mark Module as Complete</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you've finished this module? This will update your progress and you can move to the next module.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => markModuleComplete(currentModule?.id || '')}>
                              Mark Complete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    
                    {enrollment.progress_percentage >= 100 && (
                      <Button className="bg-green-600 hover:bg-green-700">
                        <FaCertificate className="mr-2 h-4 w-4" />
                        Get Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Course Assessments */}
            {course.assessments && course.assessments.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Assessments</CardTitle>
                  <CardDescription>
                    Test your knowledge with these assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.assessments.map((assessment, index) => (
                      <Card key={assessment.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{assessment.title}</CardTitle>
                            <Badge variant="outline">{assessment.assessment_type}</Badge>
                          </div>
                          <CardDescription>{assessment.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>Passing: {assessment.passing_score}%</span>
                            {assessment.time_limit_minutes && (
                              <span>Time: {assessment.time_limit_minutes} min</span>
                            )}
                            <span>Attempts: {assessment.max_attempts}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant="outline">
                            Start Assessment
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;