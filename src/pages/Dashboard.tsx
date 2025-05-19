import React, { useState, useEffect } from "react";
import ProfileCertificates from "@/components/ProfileCertificates";
import { ProfessionalDashboardTabs } from "@/components/ProfessionalDashboardTabs";
import PreHeader from "@/components/PreHeader";
import Footer from "@/components/Footer";

const certificates = [
  // ...your certificate objects...
];

const DashboardPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="dashboard" />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <ProfessionalDashboardTabs />
        <ProfileCertificates certificates={certificates} />
      </main>
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default DashboardPage;
