import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Bell, Globe, Shield, Award, Briefcase, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { createDustParticles } from "@/utils/dustParticles";

const ProfessionalAccountSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      const cleanup = createDustParticles(sidebarRef.current);
      return () => cleanup();
    }
  }, [sidebarRef]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your professional account settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Professional Sidebar */}
      <div ref={sidebarRef} className="w-64 bg-black text-white relative overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-400 font-semibold mb-4">Quick Links</h3>
          <nav className="space-y-2">
            <Link to="/dashboard/professional" state={{ activeTab: 'MY PROFILE' }} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <User size={20} />
              <span>MY PROFILE</span>
            </Link>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Briefcase size={20} />
              <span>MY JOBS HISTORY</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Award size={20} />
              <span>TRANSACTIONS HISTORY</span>
            </div>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-400 font-semibold mb-4">CME Courses</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Award size={20} />
              <span>YOUR COURSES</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Award size={20} />
              <span>MY CERTIFICATIONS</span>
            </div>
          </nav>
        </div>

        <div className="p-4">
          <h3 className="text-red-400 font-semibold mb-4">SETTINGS</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded cursor-pointer">
              <User size={20} />
              <span>ACCOUNT SETTINGS</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Bell size={20} />
              <span>NOTIFICATIONS</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Card className="p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 border-red-500">
            Professional Account Settings
          </h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="profile" className="flex gap-2 items-center">
                <User size={16} /> Profile
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex gap-2 items-center">
                <Award size={16} /> Professional
              </TabsTrigger>
              <TabsTrigger value="security" className="flex gap-2 items-center">
                <Lock size={16} /> Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex gap-2 items-center">
                <Bell size={16} /> Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex gap-2 items-center">
                <Shield size={16} /> Privacy
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
                  <Label htmlFor="title">Professional Title</Label>
                  <Input id="title" defaultValue="MIDWIFE | REGISTERED NURSE" className="mt-1" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="mdcn">MDCN Number</Label>
                  <Input id="mdcn" defaultValue="RN-2023-45789" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" defaultValue="8" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
                    <option>Midwifery</option>
                    <option>Emergency Medicine</option>
                    <option>Critical Care</option>
                    <option>Pediatrics</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="availability">Availability Status</Label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
                    <option>Available Immediately</option>
                    <option>Available in 1 week</option>
                    <option>Available in 1 month</option>
                    <option>Not Available</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Professional Bio</Label>
                <textarea 
                  id="bio" 
                  className="w-full rounded-md border border-gray-300 bg-white p-3 mt-1 h-32"
                  defaultValue="Dedicated registered nurse and midwife with 8 years of experience in critical care, emergency medicine, and maternal health."
                />
              </div>

              <div>
                <Label>Certifications & Licenses</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>BLS Certification</span>
                    <Button variant="outline" size="sm">Upload</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Annual Practicing License</span>
                    <Button variant="outline" size="sm">Upload</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security, Notifications, Privacy tabs similar to original but with professional-specific content */}
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
                  <h3 className="font-semibold mb-3">Professional Verification</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Required for all professional accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <h3 className="font-semibold">Professional Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Locum Job Alerts</p>
                    <p className="text-xs text-gray-500">New locum opportunities matching your profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">CME Course Reminders</p>
                    <p className="text-xs text-gray-500">Continuing education deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">License Expiry Alerts</p>
                    <p className="text-xs text-gray-500">Professional license renewal reminders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">GLOHSEN Score Updates</p>
                    <p className="text-xs text-gray-500">Changes to your professional score</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Professional Profile Visibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-xs text-gray-500">Control who can see your professional profile</p>
                      </div>
                      <select className="rounded-md border border-gray-300 px-2 py-1 text-sm">
                        <option>All Employers</option>
                        <option>Verified Employers Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Show GLOHSEN Score</p>
                        <p className="text-xs text-gray-500">Display your professional score publicly</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <p className="font-medium">Contact Information</p>
                        <p className="text-xs text-gray-500">Allow direct contact from employers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-end">
            <Button variant="outline" className="mr-4">Cancel</Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalAccountSettings;