
import React from 'react';
import PreHeader from '../components/PreHeader';
import { ScrollArea } from "@/components/ui/scroll-area";

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="refund policy" />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Refund Policy</h1>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Overview</h2>
                <p>This Refund Policy outlines the terms and conditions for refunds on the GLOHSEN Health Portal. We are committed to fair and transparent refund practices while maintaining the integrity of our platform.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Course Purchases</h2>
                <h3 className="text-xl font-medium mb-2">2.1. Eligible Refunds</h3>
                <p className="mb-3">You may request a refund for course purchases under the following conditions:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Within 7 days of purchase if you have not accessed more than 20% of the course content</li>
                  <li>If the course content significantly differs from the description</li>
                  <li>If technical issues prevent you from accessing the course and our support team cannot resolve them within 72 hours</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2 mt-4">2.2. Ineligible for Refund</h3>
                <p className="mb-3">Refunds will not be issued in the following circumstances:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>After accessing more than 20% of the course content</li>
                  <li>After the 7-day refund period has expired</li>
                  <li>For courses marked as "non-refundable" at the time of purchase</li>
                  <li>For courses purchased as part of a bundle or special promotion, unless the entire bundle is eligible</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">3. Membership and Subscription Fees</h2>
                <h3 className="text-xl font-medium mb-2">3.1. Prorated Refunds</h3>
                <p className="mb-3">If you cancel a subscription or membership plan:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Annual subscriptions may be eligible for a prorated refund for the unused portion</li>
                  <li>Monthly subscriptions will not be refunded for the current billing period but will not renew for the next period</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2 mt-4">3.2. Free Trial Conversion</h3>
                <p>No refunds will be issued for subscription fees charged after a free trial period if you fail to cancel before the trial expires.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Employer Services</h2>
                <h3 className="text-xl font-medium mb-2">4.1. Job Posting Fees</h3>
                <p className="mb-3">Job posting fees may be refunded under these conditions:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Within 24 hours of posting if the job has not received any applications</li>
                  <li>If technical issues prevent the job posting from being visible to potential candidates</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2 mt-4">4.2. Professional Hiring</h3>
                <p className="mb-3">For professional hiring services:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Escrow payments will be returned if a professional cancels a confirmed assignment before it begins</li>
                  <li>Partial refunds may be issued if a professional leaves an assignment early, calculated based on hours completed</li>
                  <li>No refunds will be issued after successful completion of the assignment</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Wallet Transactions</h2>
                <h3 className="text-xl font-medium mb-2">5.1. Platform Fees</h3>
                <p className="mb-3">Platform fees associated with transactions are generally non-refundable once a service has been initiated.</p>
                
                <h3 className="text-xl font-medium mb-2 mt-4">5.2. Wallet Deposits</h3>
                <p className="mb-3">Funds deposited into your GLOHSEN wallet:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>May be withdrawn to your original payment method within 30 days if unused</li>
                  <li>Are non-refundable after 30 days but remain available for platform use</li>
                  <li>Subject to a 2% processing fee for withdrawal</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Certification Fees</h2>
                <p className="mb-3">Refunds for certification and verification fees:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Full refund if the verification process has not yet begun</li>
                  <li>No refund once the verification process has been initiated, regardless of the outcome</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Refund Process</h2>
                <h3 className="text-xl font-medium mb-2">7.1. How to Request a Refund</h3>
                <p className="mb-3">To request a refund:</p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Log into your GLOHSEN account</li>
                  <li>Navigate to Transaction History in your dashboard</li>
                  <li>Find the transaction and click "Request Refund"</li>
                  <li>Complete the refund request form with required information</li>
                  <li>Submit your request for review</li>
                </ol>
                
                <h3 className="text-xl font-medium mb-2 mt-4">7.2. Processing Time</h3>
                <p className="mb-3">Refund processing times:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Requests are reviewed within 3-5 business days</li>
                  <li>Approved refunds are processed within 7-10 business days</li>
                  <li>Credit card refunds may take an additional 3-5 business days to appear on your statement</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Exceptions</h2>
                <p className="mb-3">GLOHSEN reserves the right to make exceptions to this policy at our discretion for the following reasons:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Extenuating circumstances with valid documentation</li>
                  <li>Technical issues conclusively determined to be the result of platform errors</li>
                  <li>Regional consumer protection laws that may override specific aspects of this policy</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Changes to Refund Policy</h2>
                <p>We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of the platform after changes indicates your acceptance of the updated policy.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
                <p>If you have any questions about our Refund Policy, please contact our support team at:</p>
                <p className="mt-2">
                  Email: support@glohsen.com<br />
                  Phone: +1 (123) 456-7890
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

export default RefundPolicy;
