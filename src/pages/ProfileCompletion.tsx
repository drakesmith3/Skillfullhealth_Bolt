
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessionalProfileForm from '@/components/profile/ProfessionalProfileForm';
import StudentProfileForm from '@/components/profile/StudentProfileForm';
import EmployerProfileForm from '@/components/profile/EmployerProfileForm';
import TutorProfileForm from '@/components/profile/TutorProfileForm';
import ClientProfileForm from '@/components/profile/ClientProfileForm';

const ProfileCompletion: React.FC = () => {
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem('userRole');

  useEffect(() => {
    if (!userRole) {
      // If no user role is found, redirect to sign up
      navigate('/signup');
    }
  }, [userRole, navigate]);

  if (!userRole) {
    return null; // or a loading spinner
  }

  // Render the appropriate profile form based on user role
  switch (userRole.toLowerCase()) {
    case 'professional':
      return <ProfessionalProfileForm />;
    case 'student':
      return <StudentProfileForm />;
    case 'employer':
      return <EmployerProfileForm />;
    case 'tutor':
      return <TutorProfileForm />;
    case 'client':
      return <ClientProfileForm />;
    default:
      return <ProfessionalProfileForm />; // fallback
  }
};

export default ProfileCompletion;
