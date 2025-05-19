// filepath: c:\Users\sijio\gloshen-storyscape\src\pages\ProfileCompletion.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

const ProfileCompletion: React.FC = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    const userRole = sessionStorage.getItem('userRole');
    // Clear the flag that forces profile completion
    sessionStorage.removeItem('redirectToProfileCompletion'); 

    if (userRole) {
      navigate(`/dashboard/${userRole.toLowerCase()}`);
    } else {
      // Fallback if role is not found, though it should be set if they reached this page
      navigate('/'); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Complete Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Help us tailor your experience by completing your profile. You can always do this later from your dashboard.
        </p>
        
        {/* Placeholder for profile completion form components */}
        <div className="mb-8">
          <p className="text-gray-500 dark:text-gray-300">[Profile form elements will go here]</p>
          {/* Example: <InputField label="Full Name" name="fullName" /> */}
          {/* Example: <SelectField label="Your Role" name="role" options={['Student', 'Professional', 'Tutor', 'Employer']} /> */}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => alert('Submit Profile - Placeholder')}
            className="w-full sm:w-auto"
          >
            Save and Continue
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="w-full sm:w-auto"
          >
            Skip, Do This Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
