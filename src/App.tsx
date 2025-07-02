import React from "react";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GlohsenScoreProvider } from "./contexts/GlohsenScoreContext";
import { AccessibilityProvider } from "./components/accessibility/AccessibilityProvider";
import { SecurityProvider } from "./components/security/SecurityProvider";
import { SoundProvider } from "./contexts/SoundContext";
import { audioPlayer } from "./utils/AudioPlayer";
import { generateFaviconDataURL } from "./utils/generateFavicon";
import FloatingActionButtons from "./components/FloatingActionButtons";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import DashboardPage from "./pages/ProfessionalDashboard";
import SignUp from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import EmployerDashboard from "./pages/EmployerDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AccountSettings from "./pages/AccountSettings";
import NotificationsPage from "./pages/NotificationsPage";
import KPITrackingPage from "./pages/KPITrackingPage";
import GlohsenScore from "./pages/GlohsenScore";
import EmployerCriteriaPage from "./pages/EmployerCriteriaPage";
import Blog from "./pages/Blog";
import CourseEnrollment from "./pages/CourseEnrollment";
import CourseCreation from "./pages/CourseCreation";
import JobBoard from "./pages/JobBoard";
import JobApplication from "./pages/JobApplication";
import CommunityForum from "./pages/CommunityForum";
import GamesAndQuizzes from "./pages/GamesAndQuizzes";
import DiagnosisDetective from "./pages/DiagnosisDetective";
import GeneralFeedbackForm from "./pages/GeneralFeedbackForm";
import EmployerPayment from "./pages/EmployerPayment";
import KPIDashboard from "./pages/KPIDashboard";
import ProfessionalPurse from "./pages/ProfessionalPurse";
import TutorPurse from "./pages/TutorPurse";
import ProfileCompletion from "./pages/ProfileCompletion";
import AdminDashboard from "./pages/AdminDashboard";
import Sitemap from "./pages/Sitemap";
import ActivityHistoryPage from "./pages/ActivityHistoryPage";
import DashboardLayout, { UserType } from "./components/dashboard/DashboardLayout";
import SignedOutPage from "./pages/SignedOutPage";
import MLMDashboard from "./components/dashboard/MLMDashboard";
import MLMTreePage from "./pages/MLMTreePage";
import ProfessionalsHandbook from './pages/ProfessionalsHandbook';
import EmployersHandbook from './pages/EmployersHandbook';
import TutorsHandbook from './pages/TutorsHandbook';
import StudentsHandbook from './pages/StudentsHandbook';
import FAQPage from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookieSettings from "./pages/CookieSettings";
import RefundPolicy from "./pages/RefundPolicy";
import Testimonials from "./pages/Testimonials";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import Support from "./pages/Support";
import ParticlePerformanceTest from "./pages/ParticlePerformanceTest";
import ParticleButterflyExperience from "./pages/ParticleButterflyExperience";

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
    "/purse/professional": "Professional Purse",
    "/purse/tutor": "Tutor Purse",
    "/courses": "Courses",
    "/job-board": "Job Board",
    "/community-forum": "Community Forum",
    "/games-quizzes": "Games & Quizzes",
    "/blog": "Blog",
    "/feedback": "Feedback",
    "/profile-completion": "Complete Your Profile",
    "/admin/dashboard": "Admin Dashboard",
    "/sitemap": "Site Map",
    "/activity": "Activity History",
    "/mlm-tree": "MLM Network Tree",
    "/signin": "Sign In",
    "/login": "Sign In"
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
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const userType = user.user_metadata?.user_type || 'student';
  const userName = user.user_metadata?.full_name || user.email || 'User';
  const pageTitle = getPageTitle(location.pathname);

  return (
    <DashboardLayout userType={userType as UserType} userName={userName} pageTitle={pageTitle}>
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

// Main App component wrapped with providers
const AppContent = () => {
  // Sound management state
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Initialize sound system
  useEffect(() => {
    // Initially mute audioPlayer to comply with autoplay restrictions
    audioPlayer.muted = true;

    // Preload common sound effects
    audioPlayer.preload(['/click.mp3', '/page-turn.mp3']);

    // Listen for first user interaction to enable audio
    const enableAudio = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        audioPlayer.muted = false;
        setIsSoundEnabled(true);

        // Play a click sound immediately upon enabling audio (first interaction)
        audioPlayer.play('/click.mp3', volume).catch(error => {
          console.warn('Failed to play initial click sound:', error);
        });

        // Remove listeners after first interaction
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('keydown', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
      }
    };

    // Add listeners for user interaction
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      // Clean up listeners
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, [hasUserInteracted, volume]);

  // Create click sound function
  const playClickSound = useCallback(() => {
    if (isSoundEnabled && hasUserInteracted) {
      audioPlayer.play('/click.mp3', volume).catch(error => {
        console.warn('Failed to play click sound:', error);
      });
    }
  }, [isSoundEnabled, hasUserInteracted, volume]);

  // Toggle sound function
  const toggleSound = useCallback(() => {
    const muted = audioPlayer.toggleMute();
    setIsSoundEnabled(!muted);
  }, []);

  // Generate and set favicon when app loads
  useEffect(() => {
    const faviconDataURL = generateFaviconDataURL(32);
    if (faviconDataURL) {
      // Create or update favicon link element
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        document.head.appendChild(favicon);
      }
      favicon.href = faviconDataURL;
    }
  }, []);

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <SecurityProvider>
          <GlohsenScoreProvider>
            <SoundProvider
              playClickSound={playClickSound}
              isSoundEnabled={isSoundEnabled}
              toggleSound={toggleSound}
              volume={volume}
              setVolume={setVolume}
            >
              <Router 
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true
                }}
              >
                <Routes>
                  {/* Fully Public Routes - No sidebar */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/login" element={<SignInPage />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/signed-out" element={<SignedOutPage />} />

                  {/* Legacy route redirects */}
                  <Route path="/student-dashboard" element={<Navigate to="/dashboard/student" replace />} />
                  <Route path="/professional-dashboard" element={<Navigate to="/dashboard/professional" replace />} />
                  <Route path="/employer-dashboard" element={<Navigate to="/dashboard/employer" replace />} />
                  <Route path="/tutor-dashboard" element={<Navigate to="/dashboard/tutor" replace />} />
                  <Route path="/client-dashboard" element={<Navigate to="/dashboard/client" replace />} />

                  {/* Profile Completion Route */}
                  <Route path="/profile-completion" element={<ProfileCompletion />} />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />

                  {/* Account Settings Routes - No sidebar/footer */}
                  <Route path="/account-settings" element={<AccountSettings />} />
                  <Route path="/account-settings/professional" element={<AccountSettings />} />
                  <Route path="/account-settings/:userType" element={<AccountSettings />} />

                  {/* Public Content Routes - Sidebar if logged in, otherwise no sidebar */}
                  <Route element={<PublicContentLayout />}>
                    <Route path="/particle-performance" element={<ParticlePerformanceTest />} />
                    <Route path="/butterfly-experience" element={<ParticleButterflyExperience />} />
                    <Route path="/courses" element={<CourseEnrollment />} />
                    <Route path="/job-board" element={<JobBoard />} />
                    <Route path="/jobs" element={<JobBoard />} />
                    <Route path="/community-forum" element={<CommunityForum />} />
                    <Route path="/forum" element={<CommunityForum />} />
                    <Route path="/community" element={<CommunityForum />} />
                    <Route path="/discussion" element={<CommunityForum />} />
                    <Route path="/games-quizzes" element={<GamesAndQuizzes />} />
                    <Route path="/diagnosis-detective" element={<DiagnosisDetective />} />
                    <Route path="/medical-quizzes-games" element={<GamesAndQuizzes />} />
                    <Route path="/games" element={<GamesAndQuizzes />} />
                    <Route path="/quizzes" element={<GamesAndQuizzes />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/feedback" element={<GeneralFeedbackForm />} />
                    <Route path="/ProfessionalsHandbook" element={<ProfessionalsHandbook />} />
                    <Route path="/EmployersHandbook" element={<EmployersHandbook />} />
                    <Route path="/TutorsHandbook" element={<TutorsHandbook />} />
                    <Route path="/StudentsHandbook" element={<StudentsHandbook />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/cookie-settings" element={<CookieSettings />} />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                    <Route path="/accessibility" element={<AccessibilityStatement />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/general-feedback" element={<GeneralFeedbackForm />} />
                  </Route>

                  {/* Authenticated Routes - Always have sidebar */}
                  <Route element={<AuthenticatedLayout />}>
                    <Route path="/dashboard/professional" element={<DashboardPage />} />
                    <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                    <Route path="/dashboard/tutor" element={<TutorDashboard />} />
                    <Route path="/dashboard/student" element={<StudentDashboard />} />
                    <Route path="/dashboard/client" element={<ClientDashboard />} />
                    
                    {/* Course and Job Routes */}
                    <Route path="/courses/create" element={<CourseCreation />} />
                    <Route path="/jobs/:jobId/apply" element={<JobApplication />} />

                    <Route path="/dashboard/:userType/notifications" element={<NotificationsPage />} />
                    <Route path="/dashboard/:userType/inbox" element={<NotificationsPage />} />
                    <Route path="/notifications/professional" element={<NotificationsPage />} />
                    <Route path="/notifications/:userType" element={<NotificationsPage />} />
                    <Route path="/score" element={<GlohsenScore />} />
                    <Route path="/score/calculate" element={<GlohsenScore />} />
                    <Route path="/score/details" element={<GlohsenScore />} />

                    <Route path="/employer/criteria" element={<EmployerCriteriaPage />} />
                    <Route path="/employer/payment" element={<EmployerPayment />} />

                    <Route path="/kpi-tracking" element={<KPITrackingPage />} />
                    <Route path="/kpi-dashboard" element={<KPIDashboard />} />
                    <Route path="/purse/professional" element={<ProfessionalPurse />} />
                    <Route path="/purse/tutor" element={<TutorPurse />} />
                    <Route path="/activity" element={<ActivityHistoryPage />} />
                    <Route path="/mlm" element={<MLMDashboard userId="temp-user-id" userType="professional" />} />
                    <Route path="/mlm-tree" element={<MLMTreePage />} />
                  </Route>
                </Routes>
                <FloatingActionButtons />
              </Router>
            </SoundProvider>
          </GlohsenScoreProvider>
        </SecurityProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
};

// Main App function that provides AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
