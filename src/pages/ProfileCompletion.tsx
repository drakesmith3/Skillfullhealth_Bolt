// filepath: c:\Users\sijio\gloshen-storyscape\src\pages\ProfileCompletion.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload } from 'lucide-react';

interface FormData {
  // Common fields
  firstName: string;
  middleName: string;
  lastName: string;
  age: string;
  gender: string;
  
  // Professional fields
  profession: string;
  subspecialties: string[];
  registrationStatus: string;
  registrationNumber: string;
  shortBio: string;
  skills: string;
  licenses: string;
  cvFile: File | null;
  hobbies: string;
  volunteerExperience: string;
  religiousSpiritual: string;
  
  // Student fields
  university: string;
  currentLevel: string;
  coursesOfInterest: string;
  
  // Employer fields
  companyRepName: string;
  designation: string;
  facilityName: string;
  hqLocation: string;
  branchLocation: string;
  employmentGoal: string;
  
  // Tutor fields
  expertise: string[];
  
  // Client fields
  address: string;
  email: string;
  phoneNumber: string;
}

const PROFESSION_OPTIONS = [
  'Medicine & Surgery',
  'Pharmacy',
  'Physiotherapy', 
  'Medical Lab Science',
  'Nursing',
  'Others'
];

const SUBSPECIALTIES = {
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
    'Public health nursing', 'Nursing assistant', 'Academics'
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

const ProfileCompletion: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    profession: '',
    subspecialties: [],
    registrationStatus: '',
    registrationNumber: '',
    shortBio: '',
    skills: '',
    licenses: '',
    cvFile: null,
    hobbies: '',
    volunteerExperience: '',
    religiousSpiritual: '',
    university: '',
    currentLevel: '',
    coursesOfInterest: '',
    companyRepName: '',
    designation: '',
    facilityName: '',
    hqLocation: '',
    branchLocation: '',
    employmentGoal: '',
    expertise: [],
    address: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    // Get user type from session storage or localStorage
    const userRole = sessionStorage.getItem('userRole') || localStorage.getItem('userType');
    if (userRole) {
      setUserType(userRole.toLowerCase());
    }
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | string[] | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubspecialtyToggle = (subspecialty: string) => {
    const currentSubspecialties = formData.subspecialties;
    if (currentSubspecialties.includes(subspecialty)) {
      handleInputChange('subspecialties', currentSubspecialties.filter(s => s !== subspecialty));
    } else if (currentSubspecialties.length < 4) {
      handleInputChange('subspecialties', [...currentSubspecialties, subspecialty]);
    }
  };

  const handleExpertiseToggle = (expertise: string) => {
    const currentExpertise = formData.expertise;
    if (currentExpertise.includes(expertise)) {
      handleInputChange('expertise', currentExpertise.filter(e => e !== expertise));
    } else if (currentExpertise.length < 4) {
      handleInputChange('expertise', [...currentExpertise, expertise]);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('cvFile', file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields based on user type
      const isValid = validateForm();
      
      if (!isValid) {
        alert('Please fill in all required fields.');
        return;
      }

      // Save profile data to localStorage
      const profileData = {
        ...formData,
        userType,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem('profileData', JSON.stringify(profileData));
      localStorage.setItem('profileCompleted', 'true');
      
      // TODO: Send data to backend API
      console.log('Profile data saved:', profileData);
      
      alert('Profile saved successfully!');
      
      // Navigate to appropriate dashboard
      if (userType) {
        // Special handling for employers with employment goals
        if (userType === 'employer' && (formData.employmentGoal === 'locum' || formData.employmentGoal === 'permanent')) {
          navigate('/employer/criteria');
        } else {
          navigate(`/dashboard/${userType}`);
        }
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An error occurred while saving your profile. Please try again.');
    }
  };

  const validateForm = (): boolean => {
    switch (userType) {
      case 'professional':
        return !!(formData.firstName && formData.lastName && formData.age && 
                 formData.gender && formData.profession && formData.registrationNumber);
      case 'student':
        return !!(formData.firstName && formData.lastName && formData.age && 
                 formData.gender && formData.university);
      case 'employer':
        return !!(formData.companyRepName && formData.designation && 
                 formData.facilityName && formData.hqLocation);
      case 'tutor':
        return !!(formData.firstName && formData.lastName && formData.age && 
                 formData.gender && formData.profession);
      case 'client':
        return !!(formData.firstName && formData.lastName && formData.age && formData.gender);
      default:
        return false;
    }
  };

  const handleSkip = () => {
    const userRole = sessionStorage.getItem('userRole') || localStorage.getItem('userType');
    sessionStorage.removeItem('redirectToProfileCompletion');

    if (userRole) {
      navigate(`/dashboard/${userRole.toLowerCase()}`);
    } else {
      navigate('/');
    }
  };  const renderForm = () => {
    const ageRanges = ['< 20 years', '20-34 years', '35-49 years', '50-65 years', '> 65 years'];
    const genderOptions = ['Male', 'Female', 'I prefer to not disclose for now'];
    const levelOptions = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', '600 Level', 'Graduate', 'Postgraduate'];
    const religiousSpiritualOptions = ['Religious', 'Spiritual', 'All of the above', 'None of the above (e.g. Agnostic, Atheist, etc)', 'I don\'t understand the question', 'I prefer to not disclose for now'];

    switch (userType) {
      case 'professional':
        return (
          <div className="space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age Range *</Label>
                <Select value={formData.age} onValueChange={(value) => handleInputChange('age', value)}>
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
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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
              <Select value={formData.profession} onValueChange={(value) => handleInputChange('profession', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profession" />
                </SelectTrigger>
                <SelectContent>
                  {PROFESSION_OPTIONS.map(prof => (
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
                  {SUBSPECIALTIES[formData.profession as keyof typeof SUBSPECIALTIES]?.map(sub => (
                    <div key={sub} className="flex items-center space-x-2">
                      <Checkbox
                        id={sub}
                        checked={formData.subspecialties.includes(sub)}
                        onCheckedChange={(checked) => checked && handleSubspecialtyToggle(sub)}
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
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                placeholder="Enter your registration number"
                required
              />
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="isPermanentRegistration"
                  checked={formData.registrationStatus === 'permanent'}
                  onCheckedChange={(checked) => handleInputChange('registrationStatus', checked ? 'permanent' : 'temporary')}
                />
                <Label htmlFor="isPermanentRegistration">Permanent Registration</Label>
              </div>
            </div>

            {/* Bio and Skills */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="shortBio">Short Bio (for employers to see)</Label>
                <Textarea
                  id="shortBio"
                  value={formData.shortBio}
                  onChange={(e) => handleInputChange('shortBio', e.target.value)}
                  placeholder="Tell employers about yourself..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  placeholder="List your key skills..."
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="licenses">Licenses/Certificates</Label>
                <Textarea
                  id="licenses"
                  value={formData.licenses}
                  onChange={(e) => handleInputChange('licenses', e.target.value)}
                  placeholder="List your licenses and certificates..."
                  rows={2}
                />
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <Label htmlFor="cvFile">Upload CV/Resume</Label>
              <Input
                id="cvFile"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="hobbies">Hobbies</Label>
                <Input
                  id="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                  placeholder="Your hobbies and interests..."
                />
              </div>
              <div>
                <Label htmlFor="volunteerExperience">Volunteer Positions/Jobs</Label>
                <Textarea
                  id="volunteerExperience"
                  value={formData.volunteerExperience}
                  onChange={(e) => handleInputChange('volunteerExperience', e.target.value)}
                  placeholder="Describe your volunteer experience..."
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="religiousSpiritual">Do you consider yourself</Label>
                <Select value={formData.religiousSpiritual} onValueChange={(value) => handleInputChange('religiousSpiritual', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {religiousSpiritualOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>                </Select>
              </div>
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age Range *</Label>
                <Select value={formData.age} onValueChange={(value) => handleInputChange('age', value)}>
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
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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

            {/* University and Level */}
            <div>
              <Label htmlFor="university">College/University *</Label>
              <Input
                id="university"
                value={formData.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
                placeholder="Enter your institution name"
                required
              />
            </div>

            <div>
              <Label htmlFor="currentLevel">Present Class/Level</Label>
              <Select value={formData.currentLevel} onValueChange={(value) => handleInputChange('currentLevel', value)}>
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
              <Label htmlFor="coursesOfInterest">Courses of Interest</Label>              <Textarea
                id="coursesOfInterest"
                value={formData.coursesOfInterest}
                onChange={(e) => handleInputChange('coursesOfInterest', e.target.value)}
                placeholder="Tell us about the courses you're interested in..."
                rows={3}
              />
            </div>
          </div>
        );      case 'employer':
        return (
          <div className="space-y-6">
            {/* Representative Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyRepName">Company Representative Name *</Label>
                <Input
                  id="companyRepName"
                  value={formData.companyRepName}
                  onChange={(e) => handleInputChange('companyRepName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  placeholder="e.g., HR Manager, Director"
                  required
                />
              </div>
            </div>

            {/* Facility Information */}
            <div>
              <Label htmlFor="facilityName">Hospital/Health Facility Name *</Label>
              <Input
                id="facilityName"
                value={formData.facilityName}
                onChange={(e) => handleInputChange('facilityName', e.target.value)}
                required
              />
            </div>

            {/* Locations */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="hqLocation">Location of Company HQ *</Label>
                <Input
                  id="hqLocation"
                  value={formData.hqLocation}
                  onChange={(e) => handleInputChange('hqLocation', e.target.value)}
                  placeholder="City, State, Country"
                  required
                />
              </div>
              <div>
                <Label htmlFor="branchLocation">Location of Branch (if not HQ)</Label>
                <Input
                  id="branchLocation"
                  value={formData.branchLocation}
                  onChange={(e) => handleInputChange('branchLocation', e.target.value)}
                  placeholder="City, State, Country"
                />
              </div>
            </div>

            {/* Employment Goal */}
            <div>
              <Label htmlFor="employmentGoal">What do you want to do today?</Label>
              <RadioGroup value={formData.employmentGoal} onValueChange={(value) => handleInputChange('employmentGoal', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="network" id="network" />
                  <Label htmlFor="network">To network</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="locum" id="locum" />
                  <Label htmlFor="locum">To source for locum professionals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="permanent" id="permanent" />
                  <Label htmlFor="permanent">To employ permanent staff</Label>
                </div>              </RadioGroup>
            </div>
          </div>
        );      case 'tutor':
        return (
          <div className="space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age Range *</Label>
                <Select value={formData.age} onValueChange={(value) => handleInputChange('age', value)}>
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
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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

            {/* University and Profession */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="university">College/University</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  placeholder="Enter your institution"
                />
              </div>
              <div>
                <Label htmlFor="profession">Profession *</Label>
                <Select value={formData.profession} onValueChange={(value) => handleInputChange('profession', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROFESSION_OPTIONS.map(prof => (
                      <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Expertise Subspecialties */}
            {formData.profession && (
              <div>
                <Label>Expertise Subspecialties (Maximum 4)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-48 overflow-y-auto">
                  {SUBSPECIALTIES[formData.profession as keyof typeof SUBSPECIALTIES]?.map(sub => (
                    <div key={sub} className="flex items-center space-x-2">
                      <Checkbox
                        id={sub}
                        checked={formData.expertise.includes(sub)}
                        onCheckedChange={(checked) => checked && handleExpertiseToggle(sub)}
                        disabled={!formData.expertise.includes(sub) && formData.expertise.length >= 4}
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
                value={formData.coursesOfInterest}
                onChange={(e) => handleInputChange('coursesOfInterest', e.target.value)}                placeholder="Specify courses you're interested in teaching or learning..."
                rows={3}
              />
            </div>
          </div>
        );      case 'client':
        return (
          <div className="space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age Range *</Label>
                <Select value={formData.age} onValueChange={(value) => handleInputChange('age', value)}>
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
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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

            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your full address"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+234 800 000 0000"                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              Please select your user type to complete your profile.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Complete Your {userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : ''} Profile
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Help us tailor your experience by completing your profile. You can always do this later from your dashboard.
            </p>
          </CardHeader>          <CardContent>
            <form onSubmit={handleSubmit}>
              {renderForm()}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button type="submit" className="w-full sm:w-auto">
                  Save and Continue
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSkip}
                  className="w-full sm:w-auto"
                >
                  Skip, Complete Later
                </Button>
              </div>
            </form>
          </CardContent>        </Card>
      </div>
    </div>
  );
};

export default ProfileCompletion;
