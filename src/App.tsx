
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <ThemeProvider>
      <GlohsenScoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/dashboard/professional" element={<DashboardPage />} />
            <Route path="/dashboard/employer" element={<EmployerDashboard />} />
            <Route path="/dashboard/tutor" element={<TutorDashboard />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/:userType/notifications" element={<NotificationsPage />} />
            <Route path="/dashboard/:userType/inbox" element={<NotificationsPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/score" element={<GlohsenScoreResultsPage />} />
            <Route path="/score/calculate" element={<GlohsenScoreCalculatorPage />} />
            <Route path="/score/details" element={<GlohsenScoreResultsPage />} />
            <Route path="/employer/criteria" element={<EmployerCriteriaPage />} />
            <Route path="/kpi-tracking" element={<KPITrackingPage />} />
          </Routes>
        </Router>
      </GlohsenScoreProvider>
    </ThemeProvider>
  );
}

export default App;
