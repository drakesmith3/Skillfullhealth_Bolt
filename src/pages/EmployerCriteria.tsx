import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FaBuilding, FaChartLine, FaUserTie, FaSearch, FaFilter, FaSortAmountDown, FaPlusCircle, FaMinusCircle, FaArchive } from 'react-icons/fa';

const EmployerCriteriaPage: React.FC = () => {
  const [criteriaForm, setCriteriaForm] = useState({
    jobTitle: '',
    department: '',
    yearsExperience: [2, 5],
    educationLevel: 'bachelors',
    glohsenScoreMin: 75,
    location: '',
    remote: false,
    skillsRequired: [
      { id: 1, skill: 'Patient Assessment', required: true },
      { id: 2, skill: 'Electronic Health Records', required: true },
      { id: 3, skill: 'Critical Thinking', required: false },
      { id: 4, skill: 'Team Leadership', required: false },
    ],
    certifications: [
      { id: 1, certification: 'BLS/CPR', required: true },
      { id: 2, certification: 'Registered Nurse (RN)', required: true },
    ]
  });

  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSkillToggle = (id: number) => {
    setCriteriaForm(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.map(skill => 
        skill.id === id ? { ...skill, required: !skill.required } : skill
      )
    }));
  };

  const handleCertificationToggle = (id: number) => {
    setCriteriaForm(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, required: !cert.required } : cert
      )
    }));
  };

  const addSkill = () => {
    const newSkill = { 
      id: criteriaForm.skillsRequired.length > 0 ? Math.max(...criteriaForm.skillsRequired.map(s => s.id)) + 1 : 1, 
      skill: '', 
      required: false 
    };
    
    setCriteriaForm(prev => ({
      ...prev,
      skillsRequired: [...prev.skillsRequired, newSkill]
    }));
  };

  const addCertification = () => {
    const newCertification = { 
      id: criteriaForm.certifications.length > 0 ? Math.max(...criteriaForm.certifications.map(c => c.id)) + 1 : 1, 
      certification: '', 
      required: false 
    };
    
    setCriteriaForm(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
  };

  const removeSkill = (id: number) => {
    setCriteriaForm(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill.id !== id)
    }));
  };

  const removeCertification = (id: number) => {
    setCriteriaForm(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const updateSkill = (id: number, value: string) => {
    setCriteriaForm(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.map(skill => 
        skill.id === id ? { ...skill, skill: value } : skill
      )
    }));
  };

  const updateCertification = (id: number, value: string) => {
    setCriteriaForm(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, certification: value } : cert
      )
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteriaForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCriteriaForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setCriteriaForm(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setCriteriaForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Mock saved criteria templates
  const savedCriteria = [
    {
      id: 1,
      title: "Registered Nurse - ICU",
      department: "Nursing",
      education: "Bachelor's Degree",
      experience: "3-5 years",
      glohsenScore: 80,
      lastUsed: "2 weeks ago",
      matches: 24
    },
    {
      id: 2,
      title: "Physical Therapist",
      department: "Rehabilitation",
      education: "Doctorate",
      experience: "2+ years",
      glohsenScore: 75,
      lastUsed: "1 month ago",
      matches: 16
    },
    {
      id: 3,
      title: "Medical Lab Technician",
      department: "Laboratory",
      education: "Associate's Degree",
      experience: "1-3 years",
      glohsenScore: 70,
      lastUsed: "3 months ago",
      matches: 32
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="employer criteria" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Employer Hiring Criteria</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Define your ideal candidate profile using GLOHSEN's comprehensive criteria builder
          </p>
          
          <Tabs defaultValue="create" className="mb-10">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="create">Create New Criteria</TabsTrigger>
              <TabsTrigger value="saved">Saved Criteria</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <FaUserTie className="text-blue-600 text-2xl" />
                  <h2 className="text-2xl font-semibold">Candidate Requirements</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle" 
                      name="jobTitle"
                      value={criteriaForm.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., Registered Nurse, Physical Therapist" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department" 
                      name="department"
                      value={criteriaForm.department}
                      onChange={handleInputChange}
                      placeholder="e.g., Cardiology, Emergency, Pediatrics" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="educationLevel">Minimum Education</Label>
                    <Select 
                      value={criteriaForm.educationLevel} 
                      onValueChange={(value) => handleSelectChange('educationLevel', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="highschool">High School Diploma</SelectItem>
                        <SelectItem value="associates">Associate's Degree</SelectItem>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="doctorate">Doctorate/PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Years of Experience</Label>
                    <div className="mt-4 px-2">
                      <Slider 
                        value={criteriaForm.yearsExperience}
                        min={0}
                        max={15}
                        step={1}
                        onValueChange={(value) => handleSliderChange('yearsExperience', value)}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{criteriaForm.yearsExperience[0]} years</span>
                        <span>to</span>
                        <span>{criteriaForm.yearsExperience[1]} years</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location"
                      value={criteriaForm.location}
                      onChange={handleInputChange}
                      placeholder="City, State or 'Multiple Locations'" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-end">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="remote"
                        checked={criteriaForm.remote}
                        onCheckedChange={(checked) => handleSwitchChange('remote', checked)}
                      />
                      <Label htmlFor="remote">Remote position available</Label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-lg">Minimum GLOHSEN Score</Label>
                    <span className="font-semibold text-lg">{criteriaForm.glohsenScoreMin}</span>
                  </div>
                  <Slider 
                    value={[criteriaForm.glohsenScoreMin]} 
                    min={50}
                    max={100}
                    step={1}
                    onValueChange={(value) => setCriteriaForm(prev => ({...prev, glohsenScoreMin: value[0]}))}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <FaChartLine className="text-green-600 text-2xl" />
                  <h2 className="text-2xl font-semibold">Skills & Certifications</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium">Required Skills</h3>
                      <Button variant="outline" size="sm" onClick={addSkill}>
                        <FaPlusCircle className="mr-2" /> Add Skill
                      </Button>
                    </div>
                    <ScrollArea className="h-60 border rounded-md p-3">
                      {criteriaForm.skillsRequired.map((skill, index) => (
                        <div key={skill.id} className="flex items-center gap-2 mb-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                          <Input 
                            value={skill.skill} 
                            onChange={(e) => updateSkill(skill.id, e.target.value)}
                            placeholder={`Skill ${index + 1}`}
                            className="flex-grow"
                          />
                          <Checkbox 
                            id={`skill-${skill.id}`} 
                            checked={skill.required} 
                            onCheckedChange={() => handleSkillToggle(skill.id)}
                          />
                          <Label htmlFor={`skill-${skill.id}`} className="text-sm cursor-pointer">Required</Label>
                          <Button variant="ghost" size="icon" onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700">
                            <FaMinusCircle />
                          </Button>
                        </div>
                      ))}
                      {criteriaForm.skillsRequired.length === 0 && <p className="text-sm text-gray-500">No skills added yet.</p>}
                    </ScrollArea>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium">Required Certifications</h3>
                      <Button variant="outline" size="sm" onClick={addCertification}>
                        <FaPlusCircle className="mr-2" /> Add Certification
                      </Button>
                    </div>
                    <ScrollArea className="h-60 border rounded-md p-3">
                      {criteriaForm.certifications.map((cert, index) => (
                        <div key={cert.id} className="flex items-center gap-2 mb-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                          <Input 
                            value={cert.certification} 
                            onChange={(e) => updateCertification(cert.id, e.target.value)}
                            placeholder={`Certification ${index + 1}`}
                            className="flex-grow"
                          />
                          <Checkbox 
                            id={`cert-${cert.id}`} 
                            checked={cert.required} 
                            onCheckedChange={() => handleCertificationToggle(cert.id)}
                          />
                          <Label htmlFor={`cert-${cert.id}`} className="text-sm cursor-pointer">Required</Label>
                          <Button variant="ghost" size="icon" onClick={() => removeCertification(cert.id)} className="text-red-500 hover:text-red-700">
                            <FaMinusCircle />
                          </Button>
                        </div>
                      ))}
                      {criteriaForm.certifications.length === 0 && <p className="text-sm text-gray-500">No certifications added yet.</p>}
                    </ScrollArea>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Save & Apply Criteria
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCriteria.map((criteria) => (
                  <Card key={criteria.id} className="hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{criteria.title}</CardTitle>
                      <CardDescription>{criteria.department}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p><strong>Education:</strong> {criteria.education}</p>
                      <p><strong>Experience:</strong> {criteria.experience}</p>
                      <p><strong>GLOHSEN Score:</strong> {criteria.glohsenScore}+</p>
                      <p className="text-xs text-gray-500">Last used: {criteria.lastUsed}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Badge variant="secondary">{criteria.matches} Matches</Badge>
                      <Button size="sm">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {savedCriteria.length === 0 && (
                <div className="text-center py-10">
                  <FaArchive className="mx-auto text-4xl text-gray-400 mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">You haven't saved any criteria templates yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default EmployerCriteriaPage;
