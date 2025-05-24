
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

interface EmployerFormData {
  repName: string;
  designation: string;
  facilityName: string;
  hqLocation: string;
  branchLocation: string;
  purposes: string[];
}

const EmployerProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EmployerFormData>({
    repName: '',
    designation: '',
    facilityName: '',
    hqLocation: '',
    branchLocation: '',
    purposes: []
  });

  const purposeOptions = [
    'To network',
    'To source for locum professionals',
    'To employ permanent staff'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePurposeChange = (purpose: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      purposes: checked
        ? [...prev.purposes, purpose]
        : prev.purposes.filter(p => p !== purpose)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Employer profile data:', formData);
    
    localStorage.setItem('profileCompleted', 'true');
    
    // If employer wants to set criteria, redirect to criteria page
    if (formData.purposes.includes('To source for locum professionals') || 
        formData.purposes.includes('To employ permanent staff')) {
      navigate('/employer/criteria');
    } else {
      navigate('/dashboard/employer');
    }
  };

  const handleSkip = () => {
    navigate('/dashboard/employer');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Employer Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Representative Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="repName">Company Representative Name *</Label>
                  <Input
                    id="repName"
                    name="repName"
                    value={formData.repName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="designation">Designation *</Label>
                  <Input
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
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
                  name="facilityName"
                  value={formData.facilityName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Locations */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hqLocation">Location of Company HQ *</Label>
                  <Input
                    id="hqLocation"
                    name="hqLocation"
                    value={formData.hqLocation}
                    onChange={handleInputChange}
                    placeholder="City, State, Country"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="branchLocation">Location of Branch (if not HQ)</Label>
                  <Input
                    id="branchLocation"
                    name="branchLocation"
                    value={formData.branchLocation}
                    onChange={handleInputChange}
                    placeholder="City, State, Country"
                  />
                </div>
              </div>

              {/* What do you want to do today */}
              <div>
                <Label>What do you want to do today?</Label>
                <div className="space-y-2 mt-2">
                  {purposeOptions.map(purpose => (
                    <div key={purpose} className="flex items-center space-x-2">
                      <Checkbox
                        id={purpose}
                        checked={formData.purposes.includes(purpose)}
                        onCheckedChange={(checked) => handlePurposeChange(purpose, checked as boolean)}
                      />
                      <Label htmlFor={purpose}>{purpose}</Label>
                    </div>
                  ))}
                </div>
                {(formData.purposes.includes('To source for locum professionals') || 
                  formData.purposes.includes('To employ permanent staff')) && (
                  <p className="text-sm text-blue-600 mt-2">
                    You will be redirected to set your employer criteria after completing this profile.
                  </p>
                )}
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

export default EmployerProfileForm;
