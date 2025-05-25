
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Globe, User, MapPin, Briefcase, Award } from "lucide-react";
import Footer from '../components/Footer';

const ProfileCompletion: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    primarySpecialty: '',
    subspecialties: [] as string[],
    yearsOfExperience: '',
    currentWorkplace: '',
    licenseNumber: '',
    availability: 'yes'
  });

  const primarySpecialties = [
    'Medicine',
    'Surgery', 
    'Nursing',
    'Dentistry',
    'Pharmacy',
    'Physiotherapy',
    'Laboratory Science',
    'Radiology'
  ];

  const subspecialtiesByPrimary: { [key: string]: string[] } = {
    'Medicine': [
      'Family Medicine/GP',
      'General Practice',
      'Internal Medicine',
      'Cardiology',
      'Dermatology',
      'Endocrinology',
      'Gastroenterology',
      'Geriatrics',
      'Hematology',
      'Infectious Disease',
      'Nephrology',
      'Neurology',
      'Oncology',
      'Pulmonology',
      'Rheumatology'
    ],
    'Surgery': [
      'General Surgery',
      'Family Medicine/GP',
      'General Practice',
      'Cardiothoracic Surgery',
      'Neurosurgery',
      'Orthopedic Surgery',
      'Plastic Surgery',
      'Urology',
      'Vascular Surgery',
      'Pediatric Surgery'
    ],
    'Nursing': [
      'General Nursing',
      'Pediatric Nursing',
      'Psychiatric Nursing',
      'Surgical Nursing',
      'Critical Care Nursing',
      'Emergency Nursing',
      'Oncology Nursing',
      'Midwifery'
    ],
    'Dentistry': [
      'General Dentistry',
      'Oral Surgery',
      'Orthodontics',
      'Periodontics',
      'Endodontics',
      'Prosthodontics',
      'Pediatric Dentistry'
    ]
  };

  const availableSubspecialties = formData.primarySpecialty 
    ? subspecialtiesByPrimary[formData.primarySpecialty] || []
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubspecialtyChange = (subspecialty: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      subspecialties: checked 
        ? [...prev.subspecialties, subspecialty].slice(0, 4) // Max 4 subspecialties
        : prev.subspecialties.filter(s => s !== subspecialty)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile completion data:', formData);
    
    // Save profile data
    localStorage.setItem('profileData', JSON.stringify(formData));
    localStorage.setItem('profileCompleted', 'true');
    
    // Navigate to dashboard based on user type
    const userType = localStorage.getItem('userType') || 'professional';
    navigate(`/dashboard/${userType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#ea384c] via-[#D4AF37] to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-4">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-white animate-spin" />
            <span className="text-white text-xl font-bold">GLOHSEN</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#ea384c] to-[#D4AF37] bg-clip-text text-transparent">
              Complete Your Professional Profile
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Please provide additional information to complete your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-6 w-6 text-[#ea384c]" />
                  <h3 className="text-xl font-semibold">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-6 w-6 text-[#ea384c]" />
                  <h3 className="text-xl font-semibold">Location</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Briefcase className="h-6 w-6 text-[#ea384c]" />
                  <h3 className="text-xl font-semibold">Professional Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primarySpecialty">Primary Specialty</Label>
                    <Select value={formData.primarySpecialty} onValueChange={(value) => setFormData(prev => ({ ...prev, primarySpecialty: value, subspecialties: [] }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {primarySpecialties.map(specialty => (
                          <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="number"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="currentWorkplace">Current Workplace</Label>
                    <Input
                      id="currentWorkplace"
                      name="currentWorkplace"
                      value={formData.currentWorkplace}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Professional License Number</Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Subspecialties */}
              {formData.primarySpecialty && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="h-6 w-6 text-[#ea384c]" />
                    <h3 className="text-xl font-semibold">Subspecialties (Max 4)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableSubspecialties.map(subspecialty => (
                      <div key={subspecialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={subspecialty}
                          checked={formData.subspecialties.includes(subspecialty)}
                          onCheckedChange={(checked) => handleSubspecialtyChange(subspecialty, checked as boolean)}
                          disabled={!formData.subspecialties.includes(subspecialty) && formData.subspecialties.length >= 4}
                        />
                        <Label htmlFor={subspecialty} className="text-sm">
                          {subspecialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#ea384c] to-[#D4AF37] hover:from-[#d12e42] hover:to-[#B8941F] text-white font-semibold">
                Complete Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer isActive={false} />
    </div>
  );
};

export default ProfileCompletion;
