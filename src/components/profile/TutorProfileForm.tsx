
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

interface TutorFormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  college: string;
  profession: string;
  expertiseSubspecialties: string[];
  coursesOfInterest: string;
}

const TutorProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TutorFormData>({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    college: '',
    profession: '',
    expertiseSubspecialties: [],
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

  const professions = [
    'Medicine & Surgery',
    'Pharmacy',
    'Physiotherapy',
    'Medical Lab Science',
    'Nursing',
    'Others'
  ];

  const subspecialtiesByProfession = {
    'Medicine & Surgery': [
      'INTERNAL MEDICINE', 'SURGERY', 'ANATOMY', 'PHYSIOLOGY', 'MEDICAL BIOCHEMISTRY',
      'PATHOLOGY', 'PSYCHIATRY', 'PEDIATRICS', 'OBS & GYNAE', 'PUBLIC HEALTH',
      'OCCUPATIONAL HEALTH & SAFETY/MEDICINE', 'OPHTHALMOLOGY', 'BIO-INFORMATICS',
      'BIOTECHNOLOGY/BIOENGINEERING', 'CARDIOLOGY', 'DENTISTRY', 'DENTAL SURGERY',
      'NEUROSURGERY', 'PLASTIC SURGERY', 'ONCOLOGY', 'GERIATRICS', 'LIFESTYLE & WELLNESS',
      'SPORTS', 'GASTROENTEROLOGY', 'RHEUMATOLOGY', 'PAEDIATRIC SURGERY', 'EMERGENCY MEDICINE', 'ACADEMICS'
    ],
    'Nursing': [
      'Peri-op Nursing', 'Midwifery', 'Paediatrics nursing', 'Mental health nursing',
      'Public health nursing', 'nursing assistant', 'Academics'
    ],
    'Pharmacy': [
      'Community pharmacist', 'Hospital pharmacist', 'Industrial pharmacist', 'Academics'
    ],
    'Physiotherapy': [
      'Orthopaedics Physiotherapy', 'Physical Therapy', 'Paediatrics Physiotherapy',
      'Sports', 'Acute Care', 'Academics'
    ],
    'Others': [
      'Clinical Psychology', 'Physician assistant', 'Surgical assistant', 'Medical transcriber'
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubspecialtyChange = (subspecialty: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      expertiseSubspecialties: checked
        ? [...prev.expertiseSubspecialties, subspecialty].slice(0, 4) // Maximum 4
        : prev.expertiseSubspecialties.filter(s => s !== subspecialty)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tutor profile data:', formData);
    
    localStorage.setItem('profileCompleted', 'true');
    navigate('/dashboard/tutor');
  };

  const handleSkip = () => {
    navigate('/dashboard/tutor');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Tutor/Adviser Profile</CardTitle>
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

              {/* College/University and Profession */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    placeholder="Enter your institution"
                  />
                </div>
                <div>
                  <Label htmlFor="profession">Profession *</Label>
                  <Select value={formData.profession} onValueChange={(value) => handleSelectChange('profession', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select profession" />
                    </SelectTrigger>
                    <SelectContent>
                      {professions.map(prof => (
                        <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Expertise Subspecialities */}
              {formData.profession && (
                <div>
                  <Label>Expertise Subspecialties (Maximum 4)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-48 overflow-y-auto">
                    {subspecialtiesByProfession[formData.profession as keyof typeof subspecialtiesByProfession]?.map(sub => (
                      <div key={sub} className="flex items-center space-x-2">
                        <Checkbox
                          id={sub}
                          checked={formData.expertiseSubspecialties.includes(sub)}
                          onCheckedChange={(checked) => handleSubspecialtyChange(sub, checked as boolean)}
                          disabled={!formData.expertiseSubspecialties.includes(sub) && formData.expertiseSubspecialties.length >= 4}
                        />
                        <Label htmlFor={sub} className="text-sm">{sub}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses of Interest */}
              <div>
                <Label htmlFor="coursesOfInterest">Courses of Interest</Label>
                <Textarea
                  id="coursesOfInterest"
                  name="coursesOfInterest"
                  value={formData.coursesOfInterest}
                  onChange={handleInputChange}
                  placeholder="Specify courses you're interested in teaching or learning..."
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

export default TutorProfileForm;
