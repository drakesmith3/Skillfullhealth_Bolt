
import React from 'react';
import PreHeader from '../components/PreHeader';
import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="privacy policy" />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                <p>At GLOHSEN Health Portal ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
                <p className="mb-2">2.1. <strong>Personal Information:</strong> We collect personal information that you voluntarily provide when registering or using our services, including:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Name, email address, and phone number</li>
                  <li>Professional qualifications and certifications</li>
                  <li>Employment history and skills</li>
                  <li>Educational background</li>
                  <li>Profile information and preferences</li>
                </ul>
                
                <p className="mb-2 mt-3">2.2. <strong>Usage Information:</strong> We automatically collect certain information about your device and how you interact with our platform, including:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>IP address and device identifiers</li>
                  <li>Browser type and operating system</li>
                  <li>Pages viewed and features used</li>
                  <li>Time spent on the platform and interaction patterns</li>
                </ul>
                
                <p className="mb-2 mt-3">2.3. <strong>Financial Information:</strong> For payment processing, we collect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Payment method details</li>
                  <li>Transaction history</li>
                  <li>Billing information</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>To provide and maintain our platform services</li>
                  <li>To process transactions and manage your account</li>
                  <li>To calculate your GLOHSEN Score based on provided parameters</li>
                  <li>To match professionals with job opportunities</li>
                  <li>To enable communication between users</li>
                  <li>To improve our platform and user experience</li>
                  <li>To send notifications, updates, and support messages</li>
                  <li>To enforce our terms, conditions, and policies</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Data Sharing and Disclosure</h2>
                <p className="mb-2">We may share your information with:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Other Users:</strong> Information shared with employers, professionals, or tutors as necessary for platform functionality.</li>
                  <li><strong>Service Providers:</strong> Third parties that help us operate our platform and provide services.</li>
                  <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                  <li><strong>With Consent:</strong> When you have given permission for specific data sharing.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information, including encryption, secure socket layer technology, and regular security assessments. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
                <p>We retain your information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Users may request deletion of their account and associated data, subject to legal retention requirements.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Your Privacy Rights</h2>
                <p className="mb-2">Depending on your location, you may have rights to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access the personal data we hold about you</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Restrict or object to certain processing of your data</li>
                  <li>Data portability (receiving your data in a structured, machine-readable format)</li>
                  <li>Withdraw consent for processing based on consent</li>
                </ul>
                <p className="mt-2">To exercise these rights, please contact us through the methods provided in the "Contact Us" section.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Cookies and Similar Technologies</h2>
                <p>We use cookies and similar tracking technologies to enhance your experience, analyze usage, and improve functionality. You can control cookie settings through your browser preferences, but disabling certain cookies may limit your ability to use some features.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Children's Privacy</h2>
                <p>Our platform is not intended for children under 16. We do not knowingly collect personal information from children. If we learn we have collected information from a child under 16, we will delete that information and take appropriate steps to comply with applicable laws.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">10. International Data Transfers</h2>
                <p>Your information may be transferred and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer your information, we take appropriate safeguards to ensure its protection.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">11. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of significant changes by posting the updated policy on our platform or by sending you a notification.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">12. Contact Us</h2>
                <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                <p className="mt-2">
                  Email: privacy@glohsen.com<br />
                  Address: 123 Innovation Square, Tech City, TC 98765
                </p>
              </section>
            </div>
          </ScrollArea>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Last Updated: May 17, 2025</p>
          <p className="mt-2">
            <a href="/" className="text-amber-500 hover:text-amber-600">Return to Home</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
