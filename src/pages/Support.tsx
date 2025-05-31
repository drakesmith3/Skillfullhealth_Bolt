import React from 'react';

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Support</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Need help? We're here to support you every step of the way.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
              <p className="mb-4">Get in touch with our support team for assistance.</p>
              <a 
                href="/contact-us" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <p className="mb-4">Find answers to common questions.</p>
              <a 
                href="/faq" 
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                View FAQ
              </a>
            </div>
          </div>
          
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Emergency Support</h2>
            <p>For urgent technical issues or emergencies, please contact our 24/7 support line.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;