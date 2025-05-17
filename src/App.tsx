
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import SignUp from "./pages/SignUp";
import CalculateScore from "./pages/CalculateScore";
import FeedbackForm from "./pages/FeedbackForm";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AIActivityAgent>
            <BrowserRouter>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/calculate-score" element={<CalculateScore />} />
                  <Route path="/feedback" element={<FeedbackForm />} />
                  <Route path="/community" element={<CommunityForum />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/job-board" element={<JobBoard />} />
                  <Route path="/courses" element={<CourseEnrollment />} />
                  <Route path="/employer-criteria" element={<EmployerCriteria />} />
                  <Route path="/kpi-dashboard" element={<KPIDashboard />} />
                  <Route path="/glohsen-score-results" element={<GlohsenScoreResults />} />
                  <Route path="/games-quizzes" element={<MedicalGamesQuizzes />} />
                  <Route path="/cookie-settings" element={<CookieSettings />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/dashboard/professional" element={<ProfessionalDashboard />} />
                  <Route path="/dashboard/student" element={<StudentDashboard />} />
                  <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                  <Route path="/dashboard/tutor" element={<TutorDashboard />} />
                  
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
                <FloatingActionButtons />
              </ErrorBoundary>
            </BrowserRouter>
          </AIActivityAgent>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
