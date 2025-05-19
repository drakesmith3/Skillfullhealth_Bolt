import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PreHeader from "@/components/PreHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFoundPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="not found" />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! Page Not Found.</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name
          changed,
          <br />
          or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button size="lg">Go to Homepage</Button>
        </Link>
      </main>
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default NotFoundPage;
