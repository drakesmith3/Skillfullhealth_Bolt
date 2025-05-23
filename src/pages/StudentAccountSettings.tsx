import { useState } from "react"; // Removed useEffect and useRef
// import Footer from "@/components/Footer"; // Footer will be rendered by DashboardLayout
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Bell, Shield, GraduationCap } from "lucide-react"; // Removed BookOpen, Award as they were not used after sidebar removal

const StudentAccountSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your student account settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    // The main content div is now the top-level returned element.
    // The surrounding <div className="min-h-screen flex bg-gray-50"> and the explicit sidebar are removed.
    <div className="p-6">
      <Card className="p-6 shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-2 border-red-500 dark:border-red-600">
          Student Account Settings
        </h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <TabsTrigger value="profile" className="flex gap-2 items-center data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger value="academic" className="flex gap-2 items-center data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">
              <GraduationCap size={16} /> Academic
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2 items-center data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">
              <Lock size={16} /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">
              <Bell size={16} /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex gap-2 items-center data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:text-gray-300">
              <Shield size={16} /> Privacy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="dark:text-gray-300">Full Name</Label>
                <Input id="fullName" defaultValue="ADEBAYO SARAH" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="email" className="dark:text-gray-300">Email Address</Label>
                <Input id="email" type="email" defaultValue="sarah@student.com" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="phone" className="dark:text-gray-300">Phone Number</Label>
                <Input id="phone" defaultValue="+234 801 123 4567" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="studentId" className="dark:text-gray-300">Student ID</Label>
                <Input id="studentId" defaultValue="STU-2024-001" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="institution" className="dark:text-gray-300">Institution</Label>
                <Input id="institution" defaultValue="University of Lagos" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="program" className="dark:text-gray-300">Program of Study</Label>
                <Input id="program" defaultValue="Medicine & Surgery" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="year" className="dark:text-gray-300">Year of Study</Label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>5th Year</option>
                  <option>6th Year</option>
                </select>
              </div>
              <div>
                <Label htmlFor="graduationYear" className="dark:text-gray-300">Expected Graduation</Label>
                <Input id="graduationYear" type="number" defaultValue="2028" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
            </div>
            
            <div>
              <Label className="dark:text-gray-300">Learning Goals</Label>
              <textarea 
                className="w-full rounded-md border border-gray-300 bg-white p-3 mt-1 h-24 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                defaultValue="Focused on excelling in clinical medicine and developing strong patient care skills."
              />
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <h3 className="font-semibold dark:text-white">Student Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                <div>
                  <p className="font-medium dark:text-gray-200">Course Updates</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">New courses and learning materials</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                <div>
                  <p className="font-medium dark:text-gray-200">Assignment Reminders</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming deadlines and submissions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                <div>
                  <p className="font-medium dark:text-gray-200">Progress Reports</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Weekly learning progress updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                <div>
                  <p className="font-medium dark:text-gray-200">Study Group Invites</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Invitations to join study groups</p>
                </div>
                <Switch />
              </div>
                <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                <div>
                  <p className="font-medium dark:text-gray-200">Community Updates</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">News from forums and discussions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
              <h3 className="font-semibold dark:text-white">Security Settings</h3>
              <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                      <div>
                          <p className="font-medium dark:text-gray-200">Two-Factor Authentication (2FA)</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Enhance account security with 2FA.</p>
                      </div>
                      <Button variant="outline" className="dark:text-white dark:border-gray-600 hover:dark:bg-gray-700">Enable 2FA</Button>
                  </div>
                  <div>
                      <Label htmlFor="currentPassword" className="dark:text-gray-300">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter current password" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                  </div>
                  <div>
                      <Label htmlFor="newPassword" className="dark:text-gray-300">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                  </div>
                  <div>
                      <Label htmlFor="confirmNewPassword" className="dark:text-gray-300">Confirm New Password</Label>
                      <Input id="confirmNewPassword" type="password" placeholder="Confirm new password" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                  </div>
              </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
              <h3 className="font-semibold dark:text-white">Privacy Settings</h3>
              <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                      <div>
                          <p className="font-medium dark:text-gray-200">Profile Visibility</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Control who can see your profile details.</p>
                      </div>
                      <select className="border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600">
                          <option>Public</option>
                          <option>Connections Only</option>
                          <option>Private</option>
                      </select>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                      <div>
                          <p className="font-medium dark:text-gray-200">Data Sharing</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Allow GLOHSEN to share anonymized data for research.</p>
                      </div>
                      <Switch />
                  </div>
                    <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                      <div>
                          <p className="font-medium dark:text-gray-200">Download Your Data</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Request a copy of your personal data.</p>
                      </div>
                      <Button variant="outline" className="dark:text-white dark:border-gray-600 hover:dark:bg-gray-700">Request Data</Button>
                  </div>
              </div>
          </TabsContent>

          <Separator className="my-8 dark:bg-gray-700" />
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading} className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default StudentAccountSettings;