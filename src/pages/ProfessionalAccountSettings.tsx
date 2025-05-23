
import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Bell, Shield, Briefcase, Award, BookOpen, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { createDustParticles } from "@/utils/dustParticles";

const ProfessionalAccountSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      const { cleanup } = createDustParticles(sidebarRef.current);
      return cleanup;
    }
  }, []);

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
      {/* Professional Sidebar - Consistent GLOHSEN Theme */}
      <div ref={sidebarRef} className="w-64 bg-black text-white relative overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">Quick Links</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <User size={20} />
              <span>MY PROFILE</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Briefcase size={20} />
              <span>MY JOB APPLICATIONS</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Award size={20} />
              <span>MY TRANSACTIONS</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <MessageSquare size={20} />
              <span>INBOX/MESSAGES</span>
            </div>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">CME Courses</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <BookOpen size={20} />
              <span>ENROLL IN NEW COURSE</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <MessageSquare size={20} />
              <span>PLAY QUIZ/GAMES</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Award size={20} />
              <span>MY CERTIFICATIONS</span>
            </div>
          </nav>
        </div>

        <div className="p-4">
          <h3 className="text-red-500 font-semibold mb-4">SETTINGS</h3>
          <nav className="space-y-2">
            <Link
              to="/professional-dashboard"
              state={{ activeTab: 'profile' }}
              className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
            >
              <User size={20} />
              <span>MY PROFILE</span>
            </Link>
            <div className="flex items-center space-x-3 p-2 bg-gray-800 text-red-500 rounded cursor-pointer">
              <User size={20} />
              <span>ACCOUNT SETTINGS</span>
            </div>
            <Link
              to="/notifications/professional"
              className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
            >
              <Bell size={20} />
              <span>NOTIFICATIONS</span>
            </Link>
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
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="profile" className="flex gap-2 items-center">
                <User size={16} /> Profile
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
                  <Input id="fullName" defaultValue="Dr. Adunni Olatunji" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="adunni.olatunji@example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 800 123 4567" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="specialty">Medical Specialty</Label>
                  <Input id="specialty" defaultValue="Emergency Medicine" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="license">Medical License Number</Label>
                  <Input id="license" defaultValue="MDC/2019/12345" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="hospital">Current Hospital/Clinic</Label>
                  <Input id="hospital" defaultValue="Lagos University Teaching Hospital" className="mt-1" />
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
                <div>
                  <h3 className="font-semibold mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <h3 className="font-semibold">Professional Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Job Opportunities</p>
                    <p className="text-xs text-gray-500">New job postings matching your profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Course Recommendations</p>
                    <p className="text-xs text-gray-500">CME courses and certifications</p>
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
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Peer Messages</p>
                    <p className="text-xs text-gray-500">Messages from other professionals</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Profile Visibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Show Profile to Employers</p>
                        <p className="text-xs text-gray-500">Allow employers to view your profile</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Show GLOHSEN Score</p>
                        <p className="text-xs text-gray-500">Display your score on your profile</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <p className="font-medium">Allow Direct Contact</p>
                        <p className="text-xs text-gray-500">Let employers contact you directly</p>
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
