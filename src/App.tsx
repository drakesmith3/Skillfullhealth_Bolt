
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import SignUp from "./pages/SignUp";
import CalculateScore from "./pages/CalculateScore";
import FeedbackForm from "./pages/FeedbackForm";
import CommunityForum from "./pages/CommunityForum"; // New page for community discussions
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AIActivityAgent from "./components/AIActivityAgent"; // Import AI Activity Agent

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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </AIActivityAgent>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
