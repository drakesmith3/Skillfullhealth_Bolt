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
import { User, Lock, Bell, Shield, Heart, Trophy, MessageSquare, Calendar, LogOut as LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createDustParticles } from "@/utils/dustParticles"; // Import the utility

const ClientAccountSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null); // Create a ref for the sidebar

  useEffect(() => {
    if (sidebarRef.current) {
      const cleanup = createDustParticles(sidebarRef.current);
      return () => cleanup(); // Cleanup particles on component unmount
    }
  }, [sidebarRef]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your client account settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Client Sidebar - Consistent GLOHSEN Theme */}
      <div ref={sidebarRef} className="w-64 bg-black text-white relative overflow-hidden"> {/* Added ref, relative and overflow-hidden */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">Wellness Hub</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Trophy size={20} />
              <span>HEALTH CHALLENGES</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Heart size={20} />
              <span>HEALTH TRACKER</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Trophy size={20} />
              <span>ACHIEVEMENTS</span>
            </div>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">My Dashboard</h3>
          <nav className="space-y-2">
            <div 
              className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors"
              onClick={() => navigate('/client-dashboard', { state: { activeTab: 'profile' } })}
            >
              <User size={20} />
              <span>MY PROFILE</span>
            </div>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-700">
          <h3 className="text-red-500 font-semibold mb-4">Community</h3>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <MessageSquare size={20} />
              <span>DISCUSSIONS</span>
            </div>
            <div className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
              <Calendar size={20} />
              <span>EVENTS</span>
            </div>
          </nav>
        </div>

        <div className="p-4">
          <h3 className="text-red-500 font-semibold mb-4">SETTINGS</h3>
          <nav className="space-y-2">
            <Link to="/account-settings/client" className="flex items-center space-x-3 p-2 bg-gray-800 text-red-500 rounded cursor-pointer">
              <User size={20} />
              <span>ACCOUNT SETTINGS</span>
            </Link>
            <Link to="/notifications/client" className="flex items-center space-x-3 p-2 text-[#D4AF37] hover:text-red-500 hover:bg-gray-800 rounded cursor-pointer transition-colors">
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
            Client Account Settings
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
                  <Input id="fullName" defaultValue="Patient A" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="patient@example.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+234 800 123 4567" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue="35" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Lagos, Nigeria" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="interests">Health Interests</Label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
                    <option>General Health</option>
                    <option>Mental Health</option>
                    <option>Nutrition</option>
                    <option>Fitness</option>
                  </select>
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
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <h3 className="font-semibold">Client Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Community Updates</p>
                    <p className="text-xs text-gray-500">New discussions and community posts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Health Challenges</p>
                    <p className="text-xs text-gray-500">New health challenges and wellness content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Health Tips</p>
                    <p className="text-xs text-gray-500">Weekly health and wellness content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Client Profile Visibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Public Profile</p>
                        <p className="text-xs text-gray-500">Allow community members to see your profile</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <div>
                        <p className="font-medium">Health Statistics</p>
                        <p className="text-xs text-gray-500">Share your health journey with community</p>
                      </div>
                      <Switch />
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

export default ClientAccountSettings;