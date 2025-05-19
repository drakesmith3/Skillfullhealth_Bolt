
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationSetting = ({ title, description, defaultChecked = true }) => {
  const [enabled, setEnabled] = useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-none">
      <div className="space-y-0.5">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
};

const Notifications = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Notifications settings saved",
        description: "Your notification preferences have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-f5f5f5">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <Sidebar />
          </div>
          <div className="col-span-12 md:col-span-9">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#000000e6] border-b pb-2 border-[#D4AF37]">Notification Preferences</h1>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2" 
                  onClick={() => {
                    toast({
                      title: "All notifications cleared",
                    });
                  }}
                >
                  <BellOff size={16} /> 
                  Clear All
                </Button>
              </div>
              
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="push">Push Notifications</TabsTrigger>
                  <TabsTrigger value="sms">SMS</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
                    <p className="text-sm text-blue-700">
                      Email notifications will be sent to <strong>oredola@example.com</strong>
                    </p>
                  </div>
                  
                  <h3 className="font-semibold text-lg">Account</h3>
                  <div className="space-y-1 bg-white p-4 rounded-md shadow-sm">
                    <NotificationSetting
                      title="Security Alerts"
                      description="Get notified about security issues like password changes"
                    />
                    <NotificationSetting
                      title="Account Updates"
                      description="Changes to your account details or settings"
                    />
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-6">Job Opportunities</h3>
                  <div className="space-y-1 bg-white p-4 rounded-md shadow-sm">
                    <NotificationSetting
                      title="New Job Matches"
                      description="Receive notifications when new jobs match your criteria"
                    />
                    <NotificationSetting
                      title="Application Updates"
                      description="Status changes to your job applications"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Employer Interest"
                      description="When employers express interest in your profile"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Job Recommendations"
                      description="Weekly personalized job recommendations"
                      defaultChecked={false}
                    />
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-6">Professional Development</h3>
                  <div className="space-y-1 bg-white p-4 rounded-md shadow-sm">
                    <NotificationSetting
                      title="CME Course Updates"
                      description="Notifications about relevant continuing education courses"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="GLOHSEN Score Changes"
                      description="Updates when your professional score changes"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Certification Reminders"
                      description="Reminders about upcoming certification deadlines"
                      defaultChecked={true}
                    />
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-6">Community</h3>
                  <div className="space-y-1 bg-white p-4 rounded-md shadow-sm">
                    <NotificationSetting
                      title="Messages"
                      description="Receive notifications about new messages"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Forum Activity"
                      description="Updates about discussions you're participating in"
                      defaultChecked={false}
                    />
                    <NotificationSetting
                      title="Network Updates"
                      description="Updates from your professional network"
                      defaultChecked={false}
                    />
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-6">Marketing</h3>
                  <div className="space-y-1 bg-white p-4 rounded-md shadow-sm">
                    <NotificationSetting
                      title="Newsletter"
                      description="Weekly newsletter with industry news and updates"
                      defaultChecked={false}
                    />
                    <NotificationSetting
                      title="Special Offers"
                      description="Promotional offers and discounts from partners"
                      defaultChecked={false}
                    />
                    <NotificationSetting
                      title="Events"
                      description="Invitations to industry events and webinars"
                      defaultChecked={true}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="push" className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-md mb-6 border border-green-100">
                    <p className="text-sm text-green-700">
                      Push notifications will appear on your device. Make sure notifications are enabled on your device settings.
                    </p>
                  </div>
                  
                  <h3 className="font-semibold text-lg">Mobile Push Notifications</h3>
                  <div className="space-y-1 bg-white p-4 rounded-md shadow-sm">
                    <NotificationSetting
                      title="Job Alerts"
                      description="Get notified instantly about new job opportunities"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Messages"
                      description="Real-time notifications for new messages"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Application Updates"
                      description="Updates about your job applications"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="GLOHSEN Score Updates"
                      description="Get notified when your score changes"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Reminders"
                      description="Task and deadline reminders"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="System Updates"
                      description="Important updates about the GLOHSEN platform"
                      defaultChecked={true}
                    />
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-6">Desktop Push Notifications</h3>
                  <div className="space-y-1 bg-white p-4 rounded-md shadow-sm">
                    <NotificationSetting
                      title="Browser Notifications"
                      description="Allow desktop notifications while browsing"
                      defaultChecked={false}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="sms" className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-md mb-6 border border-yellow-100">
                    <p className="text-sm text-yellow-700">
                      SMS notifications will be sent to <strong>+234 800 123 4567</strong>. Standard message rates may apply.
                    </p>
                  </div>
                  
                  <h3 className="font-semibold text-lg">SMS Notifications</h3>
                  <div className="space-y-1 bg-white p-4 rounded-md shadow-sm">
                    <NotificationSetting
                      title="Security Alerts"
                      description="High-priority security notifications"
                      defaultChecked={true}
                    />
                    <NotificationSetting
                      title="Job Application Updates"
                      description="Important updates about your job applications"
                      defaultChecked={false}
                    />
                    <NotificationSetting
                      title="Urgent Messages"
                      description="Receive SMS for urgent messages"
                      defaultChecked={false}
                    />
                    <NotificationSetting
                      title="Interview Reminders"
                      description="Reminders about scheduled interviews"
                      defaultChecked={true}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-6" />
              
              <h3 className="font-semibold text-lg mb-3">Notification Schedule</h3>
              <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                <p className="mb-3 text-sm">Choose when you want to receive notifications:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Time of Day</p>
                    <select className="w-full p-2 border rounded-md">
                      <option>Anytime</option>
                      <option>Morning (8am - 12pm)</option>
                      <option>Afternoon (12pm - 5pm)</option>
                      <option>Evening (5pm - 10pm)</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Days of Week</p>
                    <select className="w-full p-2 border rounded-md">
                      <option>Every day</option>
                      <option>Weekdays only</option>
                      <option>Weekends only</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button 
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
