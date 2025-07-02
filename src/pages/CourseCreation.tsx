import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { FaPlus, FaEdit, FaTrash, FaVideo, FaFileText, FaQuestionCircle, FaSave, FaEye, FaUpload, FaBook } from 'react-icons/fa';
import { courseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';

interface CourseModule {
  id?: string;
  title: string;
  description: string;
  content: string;
  video_url: string;
  order_index: number;
  duration_minutes: number;
  is_preview: boolean;
}

interface Assessment {
  id?: string;
  title: string;
  description: string;
  assessment_type: 'QUIZ' | 'ASSIGNMENT' | 'PRACTICAL' | 'FINAL_EXAM';
  questions: any[];
  passing_score: number;
  time_limit_minutes?: number;
  max_attempts: number;
}

interface Course {
  id?: string;
  title: string;
  description: string;
  price: number;
  duration_hours: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  thumbnail: string;
  modules: CourseModule[];
  assessments: Assessment[];
}

const CourseCreation: React.FC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [existingCourses, setExistingCourses] = useState<any[]>([]);
  
  const [course, setCourse] = useState<Course>({
    title: '',
    description: '',
    price: 0,
    duration_hours: 0,
    difficulty: 'BEGINNER',
    category: '',
    thumbnail: '',
    modules: [],
    assessments: []
  });

  const [currentModule, setCurrentModule] = useState<CourseModule>({
    title: '',
    description: '',
    content: '',
    video_url: '',
    order_index: 0,
    duration_minutes: 0,
    is_preview: false
  });

  const [currentAssessment, setCurrentAssessment] = useState<Assessment>({
    title: '',
    description: '',
    assessment_type: 'QUIZ',
    questions: [],
    passing_score: 70,
    time_limit_minutes: 60,
    max_attempts: 3
  });

  const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null);
  const [editingAssessmentIndex, setEditingAssessmentIndex] = useState<number | null>(null);

  const steps = [
    { title: 'Course Details', icon: FaBook },
    { title: 'Modules', icon: FaVideo },
    { title: 'Assessments', icon: FaQuestionCircle },
    { title: 'Review & Publish', icon: FaEye }
  ];

  const categories = [
    'Emergency Medicine',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Surgery',
    'Internal Medicine',
    'Pharmacology',
    'Ethics & Law',
    'Professional Skills',
    'Clinical Skills',
    'Technology',
    'Public Health',
    'Mental Health',
    'Nursing',
    'Allied Health'
  ];

  useEffect(() => {
    if (user) {
      loadExistingCourses();
    }
  }, [user]);

  const loadExistingCourses = async () => {
    try {
      const courses = await courseService.getCoursesByInstructor(user?.id || '');
      setExistingCourses(courses);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const handleCourseChange = (field: keyof Course, value: any) => {
    setCourse(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleChange = (field: keyof CourseModule, value: any) => {
    setCurrentModule(prev => ({ ...prev, [field]: value }));
  };

  const handleAssessmentChange = (field: keyof Assessment, value: any) => {
    setCurrentAssessment(prev => ({ ...prev, [field]: value }));
  };

  const addModule = () => {
    if (!currentModule.title.trim()) {
      toast.error('Module title is required');
      return;
    }

    const newModule = {
      ...currentModule,
      order_index: course.modules.length
    };

    if (editingModuleIndex !== null) {
      const updatedModules = [...course.modules];
      updatedModules[editingModuleIndex] = newModule;
      setCourse(prev => ({ ...prev, modules: updatedModules }));
      setEditingModuleIndex(null);
    } else {
      setCourse(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
    }

    setCurrentModule({
      title: '',
      description: '',
      content: '',
      video_url: '',
      order_index: 0,
      duration_minutes: 0,
      is_preview: false
    });

    toast.success('Module saved successfully');
  };

  const editModule = (index: number) => {
    setCurrentModule(course.modules[index]);
    setEditingModuleIndex(index);
  };

  const deleteModule = (index: number) => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index)
    }));
    toast.success('Module deleted successfully');
  };

  const addAssessment = () => {
    if (!currentAssessment.title.trim()) {
      toast.error('Assessment title is required');
      return;
    }

    if (editingAssessmentIndex !== null) {
      const updatedAssessments = [...course.assessments];
      updatedAssessments[editingAssessmentIndex] = currentAssessment;
      setCourse(prev => ({ ...prev, assessments: updatedAssessments }));
      setEditingAssessmentIndex(null);
    } else {
      setCourse(prev => ({ ...prev, assessments: [...prev.assessments, currentAssessment] }));
    }

    setCurrentAssessment({
      title: '',
      description: '',
      assessment_type: 'QUIZ',
      questions: [],
      passing_score: 70,
      time_limit_minutes: 60,
      max_attempts: 3
    });

    toast.success('Assessment saved successfully');
  };

  const editAssessment = (index: number) => {
    setCurrentAssessment(course.assessments[index]);
    setEditingAssessmentIndex(index);
  };

  const deleteAssessment = (index: number) => {
    setCourse(prev => ({
      ...prev,
      assessments: prev.assessments.filter((_, i) => i !== index)
    }));
    toast.success('Assessment deleted successfully');
  };

  const saveCourse = async () => {
    setIsLoading(true);
    try {
      const courseData = {
        title: course.title,
        description: course.description,
        price: course.price,
        duration_hours: course.duration_hours,
        difficulty: course.difficulty,
        category: course.category,
        thumbnail: course.thumbnail
      };

      const savedCourse = await courseService.createCourse(courseData);
      if (savedCourse) {
        toast.success('Course created successfully!');
        loadExistingCourses();
        // Reset form
        setCourse({
          title: '',
          description: '',
          price: 0,
          duration_hours: 0,
          difficulty: 'BEGINNER',
          category: '',
          thumbnail: '',
          modules: [],
          assessments: []
        });
        setCurrentStep(0);
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Failed to create course');
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressPercentage = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return course.title && course.description && course.category;
      case 1:
        return course.modules.length > 0;
      case 2:
        return true; // Assessments are optional
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p>Please sign in to create courses.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Course Creation Studio</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create engaging healthcare courses to share your expertise
        </p>
      </div>

      {/* Existing Courses */}
      {existingCourses.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Courses</CardTitle>
            <CardDescription>Manage your existing courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {existingCourses.map((existingCourse) => (
                <Card key={existingCourse.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{existingCourse.title}</CardTitle>
                    <Badge variant="outline">{existingCourse.category}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      ${existingCourse.price} • {existingCourse.difficulty}
                    </p>
                    <p className="text-sm line-clamp-2">{existingCourse.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FaEdit className="mr-2 h-4 w-4" />
                      Edit Course
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course Creation Form */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Create New Course</CardTitle>
              <CardDescription>Step {currentStep + 1} of {steps.length}</CardDescription>
            </div>
            <div className="text-sm text-gray-500">
              Progress: {Math.round(getProgressPercentage())}%
            </div>
          </div>
          <Progress value={getProgressPercentage()} className="mt-4" />
        </CardHeader>

        <CardContent>
          {/* Step Navigation */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    index <= currentStep
                      ? 'bg-red-700 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-center">{step.title}</span>
              </div>
            ))}
          </div>

          <Tabs value={currentStep.toString()} className="w-full">
            {/* Step 1: Course Details */}
            <TabsContent value="0">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={course.title}
                    onChange={(e) => handleCourseChange('title', e.target.value)}
                    placeholder="Enter course title"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Course Description *</Label>
                  <Textarea
                    id="description"
                    value={course.description}
                    onChange={(e) => handleCourseChange('description', e.target.value)}
                    placeholder="Describe what students will learn"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={course.category} onValueChange={(value) => handleCourseChange('category', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={course.difficulty} onValueChange={(value) => handleCourseChange('difficulty', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={course.price}
                      onChange={(e) => handleCourseChange('price', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (Hours)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={course.duration_hours}
                      onChange={(e) => handleCourseChange('duration_hours', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="thumbnail">Course Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    value={course.thumbnail}
                    onChange={(e) => handleCourseChange('thumbnail', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1200x675px (16:9 aspect ratio)
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Step 2: Modules */}
            <TabsContent value="1">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Course Modules</h3>
                  <Badge variant="outline">{course.modules.length} modules</Badge>
                </div>

                {/* Module Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {editingModuleIndex !== null ? 'Edit Module' : 'Add New Module'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="moduleTitle">Module Title *</Label>
                      <Input
                        id="moduleTitle"
                        value={currentModule.title}
                        onChange={(e) => handleModuleChange('title', e.target.value)}
                        placeholder="Enter module title"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="moduleDescription">Module Description</Label>
                      <Textarea
                        id="moduleDescription"
                        value={currentModule.description}
                        onChange={(e) => handleModuleChange('description', e.target.value)}
                        placeholder="Describe this module"
                        rows={3}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="moduleContent">Module Content</Label>
                      <Textarea
                        id="moduleContent"
                        value={currentModule.content}
                        onChange={(e) => handleModuleChange('content', e.target.value)}
                        placeholder="Enter module content (Markdown supported)"
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="videoUrl">Video URL</Label>
                        <Input
                          id="videoUrl"
                          value={currentModule.video_url}
                          onChange={(e) => handleModuleChange('video_url', e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration (Minutes)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={currentModule.duration_minutes}
                          onChange={(e) => handleModuleChange('duration_minutes', parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isPreview"
                        checked={currentModule.is_preview}
                        onChange={(e) => handleModuleChange('is_preview', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="isPreview">Make this module a free preview</Label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={addModule} className="w-full">
                      <FaSave className="mr-2 h-4 w-4" />
                      {editingModuleIndex !== null ? 'Update Module' : 'Add Module'}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Existing Modules */}
                {course.modules.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Course Modules</h4>
                    {course.modules.map((module, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{module.title}</CardTitle>
                              <CardDescription>{module.description}</CardDescription>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => editModule(index)}>
                                <FaEdit className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <FaTrash className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Module</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this module? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteModule(index)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>{module.duration_minutes} minutes</span>
                            {module.video_url && <Badge variant="outline">Video</Badge>}
                            {module.is_preview && <Badge variant="outline">Preview</Badge>}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Step 3: Assessments */}
            <TabsContent value="2">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Course Assessments</h3>
                  <Badge variant="outline">{course.assessments.length} assessments</Badge>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {editingAssessmentIndex !== null ? 'Edit Assessment' : 'Add New Assessment'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="assessmentTitle">Assessment Title *</Label>
                        <Input
                          id="assessmentTitle"
                          value={currentAssessment.title}
                          onChange={(e) => handleAssessmentChange('title', e.target.value)}
                          placeholder="Enter assessment title"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="assessmentType">Assessment Type</Label>
                        <Select 
                          value={currentAssessment.assessment_type} 
                          onValueChange={(value) => handleAssessmentChange('assessment_type', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="QUIZ">Quiz</SelectItem>
                            <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                            <SelectItem value="PRACTICAL">Practical</SelectItem>
                            <SelectItem value="FINAL_EXAM">Final Exam</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="assessmentDescription">Description</Label>
                      <Textarea
                        id="assessmentDescription"
                        value={currentAssessment.description}
                        onChange={(e) => handleAssessmentChange('description', e.target.value)}
                        placeholder="Describe this assessment"
                        rows={3}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="passingScore">Passing Score (%)</Label>
                        <Input
                          id="passingScore"
                          type="number"
                          value={currentAssessment.passing_score}
                          onChange={(e) => handleAssessmentChange('passing_score', parseInt(e.target.value) || 70)}
                          placeholder="70"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="timeLimit">Time Limit (Minutes)</Label>
                        <Input
                          id="timeLimit"
                          type="number"
                          value={currentAssessment.time_limit_minutes || ''}
                          onChange={(e) => handleAssessmentChange('time_limit_minutes', parseInt(e.target.value) || undefined)}
                          placeholder="60"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="maxAttempts">Max Attempts</Label>
                        <Input
                          id="maxAttempts"
                          type="number"
                          value={currentAssessment.max_attempts}
                          onChange={(e) => handleAssessmentChange('max_attempts', parseInt(e.target.value) || 3)}
                          placeholder="3"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={addAssessment} className="w-full">
                      <FaSave className="mr-2 h-4 w-4" />
                      {editingAssessmentIndex !== null ? 'Update Assessment' : 'Add Assessment'}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Existing Assessments */}
                {course.assessments.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Course Assessments</h4>
                    {course.assessments.map((assessment, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{assessment.title}</CardTitle>
                              <CardDescription>{assessment.description}</CardDescription>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => editAssessment(index)}>
                                <FaEdit className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <FaTrash className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this assessment? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteAssessment(index)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            <Badge variant="outline">{assessment.assessment_type}</Badge>
                            <span>Passing: {assessment.passing_score}%</span>
                            {assessment.time_limit_minutes && <span>{assessment.time_limit_minutes} min</span>}
                            <span>{assessment.max_attempts} attempts</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Step 4: Review & Publish */}
            <TabsContent value="3">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Review Your Course</h3>

                <Card>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-700">${course.price}</div>
                        <div className="text-sm text-gray-500">Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-700">{course.duration_hours}h</div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-700">{course.modules.length}</div>
                        <div className="text-sm text-gray-500">Modules</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-700">{course.assessments.length}</div>
                        <div className="text-sm text-gray-500">Assessments</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge>{course.category}</Badge>
                      <Badge variant="outline">{course.difficulty}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Publishing Checklist</h4>
                  <ul className="space-y-1 text-sm">
                    <li className={course.title ? 'text-green-600' : 'text-gray-500'}>
                      ✓ Course title and description
                    </li>
                    <li className={course.category ? 'text-green-600' : 'text-gray-500'}>
                      ✓ Category selected
                    </li>
                    <li className={course.modules.length > 0 ? 'text-green-600' : 'text-gray-500'}>
                      ✓ At least one module added
                    </li>
                    <li className={course.thumbnail ? 'text-green-600' : 'text-gray-500'}>
                      ✓ Course thumbnail (optional)
                    </li>
                  </ul>
                </div>

                <Button 
                  onClick={saveCourse} 
                  disabled={!isStepValid(0) || !isStepValid(1) || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? 'Publishing...' : 'Publish Course'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1 || !isStepValid(currentStep)}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseCreation;