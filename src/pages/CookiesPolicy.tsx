
import React from 'react';
import PreHeader from '../components/PreHeader';
import { ScrollArea } from "@/components/ui/scroll-area";

const CookiesPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="cookies policy" />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Cookies Policy</h1>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. What Are Cookies</h2>
                <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies help us analyze how users interact with our site and allow us to enhance your experience.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">2. How We Use Cookies</h2>
                <p className="mb-3">The GLOHSEN Health Portal uses cookies for various purposes, including:</p>
                
                <h3 className="text-xl font-medium mb-2">2.1. Essential Cookies</h3>
                <p className="mb-3">These cookies are necessary for the website to function properly. They enable core functionality such as security, account management, and network management. You cannot opt out of these cookies.</p>
                
                <h3 className="text-xl font-medium mb-2">2.2. Performance Cookies</h3>
                <p className="mb-3">These cookies collect information about how you use our website, such as which pages you visit most frequently. This data helps us improve our website's performance and user experience. All information collected is anonymous.</p>
                
                <h3 className="text-xl font-medium mb-2">2.3. Functionality Cookies</h3>
                <p className="mb-3">These cookies allow the website to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, personalized features.</p>
                
                <h3 className="text-xl font-medium mb-2">2.4. Analytics Cookies</h3>
                <p className="mb-3">We use analytics cookies to understand how visitors interact with our website. This helps us improve our services and provide better content.</p>
                
                <h3 className="text-xl font-medium mb-2">2.5. Targeting/Advertising Cookies</h3>
                <p>These cookies record your visit to our website, the pages you have visited, and the links you have followed. We use this information to make our website and the advertising displayed on it more relevant to your interests.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">3. Specific Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 p-2">Cookie Name</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2">Purpose</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2">Duration</th>
                        <th className="border border-gray-300 dark:border-gray-600 p-2">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">session_id</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Maintains user session state</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Session</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Essential</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">_glohsen_auth</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Authentication token</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">1 year</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Essential</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">_glohsen_theme</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Stores user preference for light/dark mode</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">1 year</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Functionality</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">_ga</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Google Analytics cookie used to distinguish users</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">2 years</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Analytics</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">_gid</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Google Analytics cookie used to distinguish users</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">24 hours</td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">Analytics</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Managing Cookies</h2>
                <p className="mb-3">Most web browsers allow you to control cookies through their settings preferences. However, restricting cookies may impact your experience using our website and services.</p>
                
                <p className="mb-3">You can manage cookies in your browser through the following methods:</p>
                
                <h3 className="text-xl font-medium mb-2">4.1. Browser Settings</h3>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2 mt-3">4.2. Cookie Banner</h3>
                <p>We provide a cookie consent banner when you first visit our site. You can use this to customize your cookie preferences.</p>
                
                <h3 className="text-xl font-medium mb-2 mt-3">4.3. Third-Party Tools</h3>
                <p>You can opt out of Google Analytics tracking by using the Google Analytics Opt-out Browser Add-on available at https://tools.google.com/dlpage/gaoptout</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Changes to Our Cookies Policy</h2>
                <p>We may update our Cookies Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we are using cookies.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>
                <p>If you have any questions about our use of cookies, please contact us at:</p>
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

export default CookiesPolicy;
