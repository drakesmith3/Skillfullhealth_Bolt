import React, { useState } from 'react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCookie, FaShieldAlt, FaChartBar, FaBullhorn, FaInfoCircle, FaCheck } from 'react-icons/fa';

const CookieSettings: React.FC = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always enabled
    functional: true,
    analytics: true,
    marketing: false,
    socialMedia: false,
    thirdParty: false
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleToggle = (key: keyof typeof cookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    setSaved(false);
  };
  
  const handleAcceptAll = () => {
    setCookiePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      socialMedia: true,
      thirdParty: true
    });
    
    setSaved(false);
  };
  
  const handleRejectAll = () => {
    setCookiePreferences({
      necessary: true, // Always enabled
      functional: false,
      analytics: false,
      marketing: false,
      socialMedia: false,
      thirdParty: false
    });
    
    setSaved(false);
  };
  
  const handleSave = () => {
    // In a real application, this would save to browser storage and update cookies
    console.log('Saving cookie preferences:', cookiePreferences);
    setSaved(true);
    
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <PreHeader currentPage="cookie settings" />
      
      <main className="container mx-auto px-4 py-8 mt-16 mb-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Cookie Settings</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Manage how GLOHSEN uses cookies to improve your experience
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FaInfoCircle className="text-blue-600 text-xl" />
                <CardTitle>About Cookies on GLOHSEN</CardTitle>
              </div>
              <CardDescription>
                Cookies help us deliver our services and improve your experience. By using our website, you agree to our use of cookies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We use different types of cookies for various purposes, including essential website functionality, 
                analytics to improve our services, and personalization to enhance your experience. Some cookies 
                are necessary for the website to function properly, while others are optional.
              </p>
              
              <p>
                You can customize your cookie preferences below. Your choices will be saved for future visits 
                to our website from this device and browser.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleRejectAll}>Reject All Optional</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAcceptAll}>Accept All</Button>
            </CardFooter>
          </Card>
          
          <Tabs defaultValue="preferences" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
              <TabsTrigger value="preferences">Cookie Preferences</TabsTrigger>
              <TabsTrigger value="details">Detailed Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Cookie Preferences</CardTitle>
                  <CardDescription>
                    Configure which types of cookies you allow us to use
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <FaCookie className="text-gray-500" />
                        <h3 className="text-lg font-medium">Necessary Cookies</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                        These cookies are essential for the website to function properly and cannot be disabled.
                        They enable basic functions like page navigation, secure areas, and shopping cart functionality.
                      </p>
                    </div>
                    <Switch 
                      checked={cookiePreferences.necessary} 
                      disabled={true}
                      className="mt-1"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-blue-500" />
                        <h3 className="text-lg font-medium">Functional Cookies</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                        These cookies enable enhanced functionality and personalization. They may be set by us or 
                        third-party providers whose services we've added to our pages, such as chat services or video players.
                      </p>
                    </div>
                    <Switch 
                      checked={cookiePreferences.functional} 
                      onCheckedChange={() => handleToggle('functional')}
                      className="mt-1"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <FaChartBar className="text-green-500" />
                        <h3 className="text-lg font-medium">Analytics Cookies</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                        These cookies collect information about how you use our website, helping us improve the 
                        performance and user experience. They track which pages you visit, how long you spend on the site,
                        and any errors you encounter.
                      </p>
                    </div>
                    <Switch 
                      checked={cookiePreferences.analytics} 
                      onCheckedChange={() => handleToggle('analytics')}
                      className="mt-1"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <FaBullhorn className="text-yellow-500" />
                        <h3 className="text-lg font-medium">Marketing Cookies</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                        These cookies track your online activity to help advertisers deliver more relevant ads
                        or to limit how many times you see an ad. They can share this information with other 
                        organizations or advertisers.
                      </p>
                    </div>
                    <Switch 
                      checked={cookiePreferences.marketing} 
                      onCheckedChange={() => handleToggle('marketing')}
                      className="mt-1"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-purple-500" />
                        <h3 className="text-lg font-medium">Social Media Cookies</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                        These cookies enable social media functionality, such as sharing content on platforms 
                        like Facebook, Twitter, or LinkedIn. They may track your browser across other sites and 
                        build a profile of your interests.
                      </p>
                    </div>
                    <Switch 
                      checked={cookiePreferences.socialMedia} 
                      onCheckedChange={() => handleToggle('socialMedia')}
                      className="mt-1"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-red-500" />
                        <h3 className="text-lg font-medium">Third-Party Cookies</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                        These cookies are placed by third-party services such as analytics services or embedded content 
                        from external domains. They can track you across websites to provide personalized content or advertisements.
                      </p>
                    </div>
                    <Switch 
                      checked={cookiePreferences.thirdParty} 
                      onCheckedChange={() => handleToggle('thirdParty')}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="flex items-center">
                    {saved && (
                      <div className="flex items-center text-green-500 mr-4">
                        <FaCheck className="mr-1" />
                        <span>Preferences saved</span>
                      </div>
                    )}
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Cookie Information</CardTitle>
                  <CardDescription>
                    Complete list of cookies used on our platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Necessary Cookies</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b dark:border-gray-700">
                            <th className="text-left py-2 px-4">Name</th>
                            <th className="text-left py-2 px-4">Domain</th>
                            <th className="text-left py-2 px-4">Purpose</th>
                            <th className="text-left py-2 px-4">Expiry</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">session_id</td>
                            <td className="py-2 px-4">glohsen.com</td>
                            <td className="py-2 px-4">Maintains your login session</td>
                            <td className="py-2 px-4">Session</td>
                          </tr>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">csrf_token</td>
                            <td className="py-2 px-4">glohsen.com</td>
                            <td className="py-2 px-4">Prevents cross-site request forgery attacks</td>
                            <td className="py-2 px-4">Session</td>
                          </tr>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">cookie_consent</td>
                            <td className="py-2 px-4">glohsen.com</td>
                            <td className="py-2 px-4">Stores your cookie preferences</td>
                            <td className="py-2 px-4">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Functional Cookies</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b dark:border-gray-700">
                            <th className="text-left py-2 px-4">Name</th>
                            <th className="text-left py-2 px-4">Domain</th>
                            <th className="text-left py-2 px-4">Purpose</th>
                            <th className="text-left py-2 px-4">Expiry</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">user_preferences</td>
                            <td className="py-2 px-4">glohsen.com</td>
                            <td className="py-2 px-4">Remembers your site preferences</td>
                            <td className="py-2 px-4">1 year</td>
                          </tr>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">recently_viewed</td>
                            <td className="py-2 px-4">glohsen.com</td>
                            <td className="py-2 px-4">Tracks recently viewed content</td>
                            <td className="py-2 px-4">30 days</td>
                          </tr>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">language</td>
                            <td className="py-2 px-4">glohsen.com</td>
                            <td className="py-2 px-4">Stores your preferred language</td>
                            <td className="py-2 px-4">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Analytics Cookies</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b dark:border-gray-700">
                            <th className="text-left py-2 px-4">Name</th>
                            <th className="text-left py-2 px-4">Domain</th>
                            <th className="text-left py-2 px-4">Purpose</th>
                            <th className="text-left py-2 px-4">Expiry</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">_ga</td>
                            <td className="py-2 px-4">google-analytics.com</td>
                            <td className="py-2 px-4">Distinguishes users for Google Analytics</td>
                            <td className="py-2 px-4">2 years</td>
                          </tr>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">_gid</td>
                            <td className="py-2 px-4">google-analytics.com</td>
                            <td className="py-2 px-4">Identifies users for Google Analytics</td>
                            <td className="py-2 px-4">24 hours</td>
                          </tr>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">_hjid</td>
                            <td className="py-2 px-4">hotjar.com</td>
                            <td className="py-2 px-4">Sets a unique ID for the Hotjar session</td>
                            <td className="py-2 px-4">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Marketing & Third-Party Cookies</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b dark:border-gray-700">
                            <th className="text-left py-2 px-4">Name</th>
                            <th className="text-left py-2 px-4">Domain</th>
                            <th className="text-left py-2 px-4">Purpose</th>
                            <th className="text-left py-2 px-4">Expiry</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">_fbp</td>
                            <td className="py-2 px-4">facebook.com</td>
                            <td className="py-2 px-4">Used by Facebook to deliver advertisements</td>
                            <td className="py-2 px-4">3 months</td>
                          </tr>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">ads/ga-audiences</td>
                            <td className="py-2 px-4">google.com</td>
                            <td className="py-2 px-4">Used by Google AdWords for remarketing</td>
                            <td className="py-2 px-4">Session</td>
                          </tr>
                          <tr className="border-b dark:border-gray-700">
                            <td className="py-2 px-4">IDE</td>
                            <td className="py-2 px-4">doubleclick.net</td>
                            <td className="py-2 px-4">Used by Google DoubleClick for ad targeting</td>
                            <td className="py-2 px-4">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This list may be updated as we improve our services or integrate new features.
                    Please check back periodically for the most current information.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              For more information about how we use cookies and your personal data, please review our:
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Button variant="link" className="text-blue-600 dark:text-blue-400" asChild>
                <a href="/privacy-policy">Privacy Policy</a>
              </Button>
              <Button variant="link" className="text-blue-600 dark:text-blue-400" asChild>
                <a href="/cookies-policy">Cookies Policy</a>
              </Button>
              <Button variant="link" className="text-blue-600 dark:text-blue-400" asChild>
                <a href="/terms-of-service">Terms of Service</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer isActive={false} />
    </div>
  );
};

export default CookieSettings;
