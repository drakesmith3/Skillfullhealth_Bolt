import { useState, useEffect } from "react";
import PreHeader from "@/components/PreHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Bell, Globe, Shield } from "lucide-react";

const AccountSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your account settings have been saved successfully.",
      });
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <PreHeader currentPage="Account Settings" userName="Dr. Olusiji" />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                  <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700 flex items-center">
                    <User className="h-6 w-6 mr-3 text-[#ea384c]" />
                    Account Settings
                  </h1>
                  
                  <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid grid-cols-4 mb-8 bg-gray-100 dark:bg-gray-700">
                      <TabsTrigger value="profile" className="flex gap-2 items-center data-[state=active]:bg-[#ea384c] data-[state=active]:text-white">
                        <User className="w-4 h-4" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger value="security" className="flex gap-2 items-center data-[state=active]:bg-[#ea384c] data-[state=active]:text-white">
                        <Lock className="w-4 h-4" />
                        Security
                      </TabsTrigger>
                      <TabsTrigger value="notifications" className="flex gap-2 items-center data-[state=active]:bg-[#ea384c] data-[state=active]:text-white">
                        <Bell className="w-4 h-4" />
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger value="privacy" className="flex gap-2 items-center data-[state=active]:bg-[#ea384c] data-[state=active]:text-white">
                        <Shield className="w-4 h-4" />
                        Privacy
                      </TabsTrigger>
                    </TabsList>
                
                    <TabsContent value="profile" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" defaultValue="OREDOLA ADEOLA" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="oredola@example.com" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="+234 800 123 4567" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="mdcn">MDCN Number</Label>
                          <Input id="mdcn" defaultValue="MD12345" className="mt-1" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Professional Bio</Label>
                        <textarea 
                          id="bio" 
                          className="w-full rounded-md border border-input bg-background p-2 mt-1 h-24"
                          defaultValue="Experienced midwife and registered nurse with over 10 years of experience in obstetrics."
                        />
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-semibold mb-3">Profile Photo</h3>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-black rounded-full"></div>
                          <Button>Change Photo</Button>
                          <Button variant="outline">Remove</Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="security" className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-3">Change Password</h3>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="currentPassword">Current Password</Label>
                              <Input id="currentPassword" type="password" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="newPassword">New Password</Label>
                              <Input id="newPassword" type="password" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="confirmPassword">Confirm New Password</Label>
                              <Input id="confirmPassword" type="password" className="mt-1" />
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div>
                          <h3 className="font-semibold mb-3">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Enhance your account security</p>
                              <p className="text-sm text-gray-500">We'll send a verification code to your phone when you sign in.</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div>
                          <h3 className="font-semibold mb-3">Login Sessions</h3>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-xs text-gray-500">Lagos, Nigeria • Chrome • May 4, 2025</p>
                              </div>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                            </div>
                          </div>
                          <Button variant="ghost" className="text-[#ea384c] hover:text-[#ea384c]/90 mt-2">
                            Sign out of all devices
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notifications">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500 mb-4">
                          Control what notifications you receive from GLOHSEN Health Portal.
                        </p>
                        
                        <h3 className="font-semibold">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">Job Alerts</p>
                              <p className="text-xs text-gray-500">Receive notifications about new job postings</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">CME Course Reminders</p>
                              <p className="text-xs text-gray-500">Receive reminders about pending courses</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">GLOHSEN Score Updates</p>
                              <p className="text-xs text-gray-500">Get notified when your score changes</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between pb-2">
                            <div>
                              <p className="font-medium">Marketing Communications</p>
                              <p className="text-xs text-gray-500">Receive news and promotional materials</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                        
                        <h3 className="font-semibold mt-6">Push Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">Job Application Updates</p>
                              <p className="text-xs text-gray-500">Status changes to your applications</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">Messages</p>
                              <p className="text-xs text-gray-500">When you receive new messages</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between pb-2">
                            <div>
                              <p className="font-medium">Profile Views</p>
                              <p className="text-xs text-gray-500">When employers view your profile</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button variant="outline" className="mr-2">Cancel</Button>
                          <Button onClick={() => {
                            toast({
                              title: "Notification preferences saved",
                              description: "Your notification settings have been updated.",
                            });
                          }}>Save Preferences</Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="privacy" className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-3">Privacy Controls</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div>
                                <p className="font-medium">Profile Visibility</p>
                                <p className="text-xs text-gray-500">Control who can see your profile</p>
                              </div>
                              <select className="rounded-md border border-gray-300 px-2 py-1 text-sm">
                                <option>Everyone</option>
                                <option>Only employers</option>
                                <option>Private</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                              <div>
                                <p className="font-medium">Show GLOHSEN Score</p>
                                <p className="text-xs text-gray-500">Display your score on your public profile</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between pb-2">
                              <div>
                                <p className="font-medium">Contact Information</p>
                                <p className="text-xs text-gray-500">Allow employers to contact you directly</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div>
                          <h3 className="font-semibold mb-3">Data Management</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b pb-2">
                              <div>
                                <p className="font-medium">Data Usage</p>
                                <p className="text-xs text-gray-500">Allow us to use your data to improve our services</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between pb-2">
                              <div>
                                <p className="font-medium">Account Activity</p>
                                <p className="text-xs text-gray-500">Track your login activity and device usage</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button variant="outline" className="text-[#ea384c]">Download My Data</Button>
                            <Button variant="outline" className="text-[#ea384c] ml-2">Delete Account</Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="mt-8 flex justify-end">
                    <Button variant="outline" className="mr-4">Cancel</Button>
                    <Button 
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div> {/* End of max-w-4xl mx-auto */}
          </div> {/* End of container mx-auto px-4 */}
        </div> {/* End of pt-20 pb-8 */}
      
      <Footer 
        isActive={false}
        sectionName="Account Settings"
        scrollToSection={() => {}}
        isHomePage={false}
      />
    </div> /* End of min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 */
  );
};

export default AccountSettings;
