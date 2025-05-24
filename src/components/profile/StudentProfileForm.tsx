
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface StudentFormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  college: string;
  currentLevel: string;
  coursesOfInterest: string;
}

const StudentProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    college: '',
    currentLevel: '',
    coursesOfInterest: ''
  });

  const ageRanges = [
    '< 20 years',
    '20-34 years',
    '35-49 years',
    '50-65 years',
    '> 65 years'
  ];

  const genderOptions = [
    'Male',
    'Female',
    'I prefer to not disclose for now'
  ];

  const levelOptions = [
    '100 Level',
    '200 Level',
    '300 Level',
    '400 Level',
    '500 Level',
    '600 Level',
    'Graduate',
    'Postgraduate'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Student profile data:', formData);
    
    localStorage.setItem('profileCompleted', 'true');
    navigate('/dashboard/student');
  };

  const handleSkip = () => {
    navigate('/dashboard/student');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Student Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age Range *</Label>
                  <Select value={formData.age} onValueChange={(value) => handleSelectChange('age', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageRanges.map(range => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* College/University */}
              <div>
                <Label htmlFor="college">College/University *</Label>
                <Input
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="Enter your institution name"
                  required
                />
              </div>

              {/* Current Level */}
              <div>
                <Label htmlFor="currentLevel">Present Class/Level</Label>
                <Select value={formData.currentLevel} onValueChange={(value) => handleSelectChange('currentLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Courses of Interest */}
              <div>
                <Label htmlFor="coursesOfInterest">Courses of Interest</Label>
                <Textarea
                  id="coursesOfInterest"
                  name="coursesOfInterest"
                  value={formData.coursesOfInterest}
                  onChange={handleInputChange}
                  placeholder="Tell us about the courses you're interested in..."
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button type="submit" className="w-full sm:w-auto">
                  Save and Continue
                </Button>
                <Button type="button" variant="outline" onClick={handleSkip} className="w-full sm:w-auto">
                  Skip, Complete Later
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfileForm;
