
import React from 'react';
import SignUpPage from './SignUpPage';

// This is a redirecting component to maintain backwards compatibility
const SignUp: React.FC = () => {
  return <SignUpPage />;
};

export default SignUp;
