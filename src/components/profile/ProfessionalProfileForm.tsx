
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

interface ProfessionalFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  age: string;
  gender: string;
  profession: string;
  subspecialties: string[];
  registrationNumber: string;
  isPermanentRegistration: boolean;
  bio: string;
  skills: string;
  licenses: string;
  cvFile: File | null;
  hobbies: string;
  volunteerWork: string;
  religiousSpiritual: string;
}

const ProfessionalProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfessionalFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    profession: '',
    subspecialties: [],
    registrationNumber: '',
    isPermanentRegistration: false,
    bio: '',
    skills: '',
    licenses: '',
    cvFile: null,
    hobbies: '',
    volunteerWork: '',
    religiousSpiritual: ''
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

  const religiousSpiritualOptions = [
    'Religious',
    'Spiritual',
    'All of the above',
    'None of the above (e.g. Agnostic, Atheist, etc)',
    'I don\'t understand the question',
    'I prefer to not disclose for now'
  ];

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
      subspecialties: checked
        ? [...prev.subspecialties, subspecialty].slice(0, 4) // Maximum 4
        : prev.subspecialties.filter(s => s !== subspecialty)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cvFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Professional profile data:', formData);
    
    // Save profile data and navigate to dashboard
    localStorage.setItem('profileCompleted', 'true');
    navigate('/dashboard/professional');
  };

  const handleSkip = () => {
    navigate('/dashboard/professional');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Professional Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
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

              {/* Profession */}
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

              {/* Subspecialties */}
              {formData.profession && (
                <div>
                  <Label>Subspecialties (Maximum 4)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-48 overflow-y-auto">
                    {subspecialtiesByProfession[formData.profession as keyof typeof subspecialtiesByProfession]?.map(sub => (
                      <div key={sub} className="flex items-center space-x-2">
                        <Checkbox
                          id={sub}
                          checked={formData.subspecialties.includes(sub)}
                          onCheckedChange={(checked) => handleSubspecialtyChange(sub, checked as boolean)}
                          disabled={!formData.subspecialties.includes(sub) && formData.subspecialties.length >= 4}
                        />
                        <Label htmlFor={sub} className="text-sm">{sub}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Registration */}
              <div>
                <Label htmlFor="registrationNumber">Professional Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your registration number"
                  required
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="isPermanentRegistration"
                    checked={formData.isPermanentRegistration}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPermanentRegistration: checked as boolean }))}
                  />
                  <Label htmlFor="isPermanentRegistration">Permanent Registration</Label>
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">Short Bio (for employers to see)</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell employers about yourself..."
                  rows={3}
                />
              </div>

              {/* Skills, Licenses, CV */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="List your key skills..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="licenses">Licenses/Certificates</Label>
                  <Textarea
                    id="licenses"
                    name="licenses"
                    value={formData.licenses}
                    onChange={handleInputChange}
                    placeholder="List your licenses and certificates..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="cvFile">Upload CV/Resume</Label>
                  <Input
                    id="cvFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hobbies">Hobbies</Label>
                  <Input
                    id="hobbies"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleInputChange}
                    placeholder="Your hobbies and interests..."
                  />
                </div>
                <div>
                  <Label htmlFor="volunteerWork">Volunteer Positions/Jobs</Label>
                  <Textarea
                    id="volunteerWork"
                    name="volunteerWork"
                    value={formData.volunteerWork}
                    onChange={handleInputChange}
                    placeholder="Describe your volunteer experience..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="religiousSpiritual">Do you consider yourself</Label>
                  <Select value={formData.religiousSpiritual} onValueChange={(value) => handleSelectChange('religiousSpiritual', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {religiousSpiritualOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

export default ProfessionalProfileForm;
