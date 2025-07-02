import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedUserTypes?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  allowedUserTypes = [],
  redirectTo = "/signin"
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if authentication is required and user is not authenticated
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if user type is restricted
  if (user && allowedUserTypes.length > 0) {
    const userType = user.user_metadata?.user_type;
    if (!allowedUserTypes.includes(userType)) {
      // Redirect to appropriate dashboard based on user type
      const dashboardRoutes: { [key: string]: string } = {
        professional: "/dashboard/professional",
        student: "/dashboard/student",
        tutor: "/dashboard/tutor",
        employer: "/dashboard/employer",
        client: "/dashboard/client",
        admin: "/admin/dashboard"
      };
      
      const userDashboard = dashboardRoutes[userType] || "/dashboard/student";
      return <Navigate to={userDashboard} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
