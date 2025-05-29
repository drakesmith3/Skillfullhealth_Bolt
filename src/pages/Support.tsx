import React from 'react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';

const Support: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="support" />
      <main className="container mx-auto px-4 py-8 mt-16 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Support</h1>
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="mb-4">Need help? Our support team is here to assist you. Please check our <a href="/faq" className="text-blue-500 underline">FAQ</a> or contact us directly.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: <a href="mailto:support@glohsen.com" className="text-blue-500 underline">support@glohsen.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="text-blue-500 underline">+1 (234) 567-890</a></li>
            <li>Live Chat: <span className="text-gray-500">Coming soon</span></li>
          </ul>
        </div>
      </main>
      <Footer isActive={false} />
    </div>
  );
};

export default Support;
