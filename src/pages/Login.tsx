
import React from 'react';
import SignInPage from './SignInPage';

// This is a redirecting component to maintain backwards compatibility
const Login: React.FC = () => {
  return <SignInPage />;
};

export default Login;
