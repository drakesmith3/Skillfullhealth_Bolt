
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GlohsenScoreProvider } from "./contexts/GlohsenScoreContext";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import DashboardPage from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EmployerDashboard from "./pages/EmployerDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AccountSettings from "./pages/AccountSettings";
import NotificationsPage from "./pages/NotificationsPage";
import KPITrackingPage from "./pages/KPITrackingPage";
import GlohsenScoreResultsPage from "./pages/GlohsenScoreResults";
import GlohsenScoreCalculatorPage from "./pages/GlohsenScoreCalculatorPage";
import EmployerCriteriaPage from "./pages/EmployerCriteriaPage";
import Blog from "./pages/Blog";
import CourseEnrollment from "./pages/CourseEnrollment";
import JobBoard from "./pages/JobBoard";
import CommunityForum from "./pages/CommunityForum";
import MedicalGamesQuizzes from "./pages/MedicalGamesQuizzes";
import GeneralFeedbackForm from "./pages/GeneralFeedbackForm";
import EmployerPayment from "./pages/EmployerPayment";
import KPIDashboard from "./pages/KPIDashboard";
import ProfessionalWallet from "./pages/ProfessionalWallet";
import TutorWallet from "./pages/TutorWallet";
import ProfileCompletion from "./pages/ProfileCompletion";
import DashboardLayout, { UserType } from "./components/dashboard/DashboardLayout";

// Helper functions to interact with localStorage
const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

const getUserType = (): UserType | null => {
  const userType = localStorage.getItem('userType');
  if (userType && ['professional', 'student', 'employer', 'tutor', 'client', 'admin'].includes(userType)) {
    return userType as UserType;
  }
  return null;
};

const getUserName = (): string | null => {
  return localStorage.getItem('userName');
};

// Function to derive pageTitle from path
const getPageTitle = (pathname: string): string => {
  const pathParts = pathname.split('/').filter(part => part);
  if (pathParts.length === 0 && pathname === '/') return "Home";

  let title = pathParts
    .map(part => part.replace(/-/g, ' '))
    .map(part => part.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
    .join(' > ');

  const customTitles: { [key: string]: string } = {
    "/dashboard/professional": "Professional Dashboard",
    "/dashboard/employer": "Employer Dashboard",
    "/dashboard/tutor": "Tutor Dashboard",
    "/dashboard/student": "Student Dashboard",
    "/dashboard/client": "Client Dashboard",
    "/account-settings": "Account Settings",
    "/score": "Glohsen Score Results",
    "/score/calculate": "Glohsen Score Calculator",
    "/score/details": "Glohsen Score Details",
    "/employer/criteria": "Employer Criteria",
    "/employer/payment": "Employer Payment",
    "/kpi-tracking": "KPI Tracking",
    "/kpi-dashboard": "KPI Dashboard",
    "/wallet/professional": "Professional Wallet",
    "/wallet/tutor": "Tutor Wallet",
    "/courses": "Courses",
    "/job-board": "Job Board",
    "/community-forum": "Community Forum",
    "/games-quizzes": "Games & Quizzes",
    "/blog": "Blog",
    "/feedback": "Feedback",
    "/profile-completion": "Complete Your Profile",
  };

  if (customTitles[pathname]) {
    return customTitles[pathname];
  }
  
  if (pathname.includes('/dashboard/') && pathname.includes('/notifications')) title = "Notifications";
  if (pathname.includes('/dashboard/') && pathname.includes('/inbox')) title = "Inbox";

  return title || "Page";
};

// Layout for authenticated users
const AuthenticatedLayout = () => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const userType = getUserType();
  const userName = getUserName();

  const safeUserType = userType || 'student'; 
  const safeUserName = userName || 'User';
  const pageTitle = getPageTitle(location.pathname);

  return (
    <DashboardLayout userType={safeUserType} userName={safeUserName} pageTitle={pageTitle}>
      <Outlet />
    </DashboardLayout>
  );
};

// Layout for public content that shows sidebar if logged in
const PublicContentLayout = () => {
  const location = useLocation();
  if (isAuthenticated()) {
    const userType = getUserType();
    const userName = getUserName();
    const safeUserType = userType || 'student';
    const safeUserName = userName || 'User';
    const pageTitle = getPageTitle(location.pathname);

    return (
      <DashboardLayout userType={safeUserType} userName={safeUserName} pageTitle={pageTitle}>
        <Outlet />
      </DashboardLayout>
    );
  }
  return <Outlet />;
};

function App() {
  return (
    <ThemeProvider>
      <GlohsenScoreProvider>
        <Router>
          <Routes>
            {/* Fully Public Routes - No sidebar */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            {/* Profile Completion Route */}
            <Route path="/profile-completion" element={<ProfileCompletion />} />

            {/* Public Content Routes - Sidebar if logged in, otherwise no sidebar */}
            <Route element={<PublicContentLayout />}>
              <Route path="/courses" element={<CourseEnrollment />} />
              <Route path="/job-board" element={<JobBoard />} />
              <Route path="/jobs" element={<JobBoard />} />
              <Route path="/community-forum" element={<CommunityForum />} />
              <Route path="/forum" element={<CommunityForum />} />
              <Route path="/community" element={<CommunityForum />} />
              <Route path="/discussion" element={<CommunityForum />} />
              <Route path="/games-quizzes" element={<MedicalGamesQuizzes />} />
              <Route path="/games" element={<MedicalGamesQuizzes />} />
              <Route path="/quizzes" element={<MedicalGamesQuizzes />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/feedback" element={<GeneralFeedbackForm />} />
            </Route>

            {/* Authenticated Routes - Always have sidebar */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard/professional" element={<DashboardPage />} />
              <Route path="/dashboard/employer" element={<EmployerDashboard />} />
              <Route path="/dashboard/tutor" element={<TutorDashboard />} />
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/client" element={<ClientDashboard />} />
              
              <Route path="/dashboard/:userType/notifications" element={<NotificationsPage />} />
              <Route path="/dashboard/:userType/inbox" element={<NotificationsPage />} />
              
              <Route path="/account-settings" element={<AccountSettings />} />
              
              <Route path="/score" element={<GlohsenScoreResultsPage />} />
              <Route path="/score/calculate" element={<GlohsenScoreCalculatorPage />} />
              <Route path="/score/details" element={<GlohsenScoreResultsPage />} />
              
              <Route path="/employer/criteria" element={<EmployerCriteriaPage />} />
              <Route path="/employer/payment" element={<EmployerPayment />} />
              
              <Route path="/kpi-tracking" element={<KPITrackingPage />} />
              <Route path="/kpi-dashboard" element={<KPIDashboard />} />
              
              <Route path="/wallet/professional" element={<ProfessionalWallet />} />
              <Route path="/wallet/tutor" element={<TutorWallet />} />
            </Route>
          </Routes>
        </Router>
      </GlohsenScoreProvider>
    </ThemeProvider>
  );
}

export default App;
