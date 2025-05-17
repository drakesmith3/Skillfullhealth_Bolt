
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

const queryClient = new QueryClient();

const App = () => (
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
                <Route path="/professional-student" element={<ComingSoon title="Professional/Student" />} />
                <Route path="/employer" element={<ComingSoon title="Employer" />} />
                <Route path="/tutor" element={<ComingSoon title="Tutor" />} />
                <Route path="/about" element={<ComingSoon title="About Us" />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookies-policy" element={<CookiesPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/accessibility" element={<AccessibilityStatement />} />
                <Route path="/dashboard/professional" element={<ProfessionalDashboard />} />
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

// Temporary component for pages under development
const ComingSoon = ({ title }: { title: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4">
    <PreHeader currentPage={title.toLowerCase()} />
    <div className="mt-20 text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">This page is coming soon!</p>
      <a href="/" className="px-6 py-3 bg-amber-500 text-black rounded-full hover:bg-amber-600 transition-colors">
        Return to Home
      </a>
    </div>
  </div>
);

export default App;
