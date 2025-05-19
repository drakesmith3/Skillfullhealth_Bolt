import React, { useState, useEffect } from "react";
import PreHeader from "@/components/PreHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button"; // Assuming Button is a ShadCN component

const EmployerPaymentPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="employer payment" />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6">Employer Payment</h1>
          {/* Placeholder for payment form or details */}
          <p className="mb-4">Payment processing details and form will be here.</p>
          <Button>Proceed to Payment</Button>
        </div>
      </main>
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default EmployerPaymentPage;
