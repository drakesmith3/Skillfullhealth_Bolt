import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CalculateScore from "./pages/CalculateScore";
import GeneralFeedbackForm from "./pages/GeneralFeedbackForm";
import CommunityForum from "./pages/CommunityForum";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AIActivityAgent from "./components/AIActivityAgent"; 
import FloatingActionButtons from "./components/FloatingActionButtons";
import PreHeader from "./components/PreHeader";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
import JobBoard from "./pages/JobBoard";
import CourseEnrollment from "./pages/CourseEnrollment";
import EmployerCriteria from "./pages/EmployerCriteria";
import KPIDashboard from "./pages/KPIDashboard";
import GlohsenScoreResults from "./pages/GlohsenScoreResults";
import MedicalGamesQuizzes from "./pages/MedicalGamesQuizzes";
import StudentDashboard from "./pages/StudentDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import CookieSettings from "./pages/CookieSettings";
import Home from "./pages/Home";
import ProfileCompletion from "./pages/ProfileCompletion";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const App = () => {  // Check if we need to redirect based on session storage
  React.useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    const redirectToProfileCompletion = sessionStorage.getItem('redirectToProfileCompletion');
    const userRole = sessionStorage.getItem('userRole');
    
    if (redirectToProfileCompletion === 'true' && userRole) {
      // Priority to profile completion if set
      if (window.location.pathname !== '/profile-completion') {
        // Navigate to profile completion with query params as fallback
        const profileCompletionUrl = `/profile-completion?role=${userRole}`;
        setTimeout(() => {
          window.history.replaceState(
            { userRole, isNewUser: true, completionPercentage: 0 }, 
            '', 
            profileCompletionUrl
          );
          // Trigger a navigation event to make sure React Router picks up the change
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 100);
      }
    } else if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      // Use the router to navigate instead of changing window.location
      // This prevents a full page reload
      if (window.location.pathname === '/' && redirectPath !== '/') {
        // Small delay to ensure app is fully initialized
        setTimeout(() => {
          window.history.replaceState(null, '', redirectPath);
          // Trigger a navigation event to make sure React Router picks up the change
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 100);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AIActivityAgent>
          <BrowserRouter>
            <ErrorBoundary>                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/calculate-score" element={<CalculateScore />} />
                  <Route path="/feedback" element={<GeneralFeedbackForm />} />
                  <Route path="/community" element={<CommunityForum />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/job-board" element={<JobBoard />} />
                  <Route path="/courses" element={<CourseEnrollment />} />
                  <Route path="/employer-criteria" element={<EmployerCriteria />} />
                  <Route path="/kpi-dashboard" element={<KPIDashboard />} />
                  <Route path="/glohsen-score-results" element={<GlohsenScoreResults />} />
                  <Route path="/games-quizzes" element={<MedicalGamesQuizzes />} />                  <Route path="/cookie-settings" element={<CookieSettings />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/dashboard/professional" element={<ProfessionalDashboard />} />
                  <Route path="/dashboard/student" element={<StudentDashboard />} />
                  <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                  <Route path="/dashboard/tutor" element={<TutorDashboard />} />
                    {/* Profile Completion */}
                  <Route path="/profile-completion" element={<ProfileCompletion />} />
                  
                  {/* Legal pages */}
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/cookies-policy" element={<CookiesPolicy />} />
                  <Route path="/refund-policy" element={<RefundPolicy />} />
                  <Route path="/accessibility" element={<AccessibilityStatement />} />
                  
                  {/* Placeholder routes - redirect to proper pages instead of showing ComingSoon */}
                  <Route path="/professional-student" element={<CalculateScore />} />
                  <Route path="/employer" element={<EmployerCriteria />} />
                  <Route path="/tutor" element={<CourseEnrollment />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FloatingActionButtons />              </ErrorBoundary>
            </BrowserRouter>
          </AIActivityAgent>
        </TooltipProvider>
      </QueryClientProvider>
  );
};

export default App;
