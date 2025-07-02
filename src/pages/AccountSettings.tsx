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
import { User, Lock, Bell, Shield } from "lucide-react";
import { supabase } from "@/config/supabase";
import { Progress } from "@/components/ui/progress";

const AccountSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [preferences, setPreferences] = useState<any>({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            `
            *,
            user_preferences (*)
          `
          )
          .eq("id", user.id)
          .single();

        if (error) {
          toast({
            title: "Error fetching data",
            description: "Could not fetch your profile data.",
            variant: "destructive",
          });
        } else if (data) {
          setProfile(data);
          setPreferences(data.user_preferences || {});
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [toast]);

  useEffect(() => {
    const calculateCompleteness = () => {
      const fields = [
        profile.full_name,
        profile.email,
        profile.phone_number,
        profile.mdcn_number,
        profile.professional_bio,
        profile.avatar_url,
      ];
      const completedFields = fields.filter(Boolean).length;
      setProfileCompleteness((completedFields / fields.length) * 100);
    };
    calculateCompleteness();
  }, [profile]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };

  const handlePreferencesChange = (id: string, value: boolean) => {
    setPreferences({ ...preferences, [id]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone_number: profile.phone_number,
          professional_bio: profile.professional_bio,
          mdcn_number: profile.mdcn_number,
        })
        .eq("id", user.id);

      const { error: preferencesError } = await supabase
        .from("user_preferences")
        .update(preferences)
        .eq("user_id", user.id);

      if (profileError || preferencesError) {
        toast({
          title: "Error saving settings",
          description: "There was an issue saving your settings.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Settings saved",
          description: "Your account settings have been saved successfully.",
        });
      }
    }
    setLoading(false);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure the new passwords match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast({
        title: "Error changing password",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      });
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <PreHeader currentPage="Account Settings" userName={profile.full_name || "User"} />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700 flex items-center">
                  <User className="h-6 w-6 mr-3 text-[#ea384c]" />
                  Account Settings
                </h1>
                <div className="my-4">
                  <Label>Profile Completeness</Label>
                  <Progress value={profileCompleteness} className="w-full mt-1" />
                </div>

                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-gray-100 dark:bg-gray-700">
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
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input id="full_name" value={profile.full_name || ""} onChange={handleProfileChange} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={profile.email || ""} disabled className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input id="phone_number" value={profile.phone_number || ""} onChange={handleProfileChange} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="mdcn_number">MDCN Number</Label>
                        <Input id="mdcn_number" value={profile.mdcn_number || ""} onChange={handleProfileChange} className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="professional_bio">Professional Bio</Label>
                      <textarea
                        id="professional_bio"
                        className="w-full rounded-md border border-input bg-background p-2 mt-1 h-24"
                        value={profile.professional_bio || ""}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Profile Photo</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-black rounded-full" style={{ backgroundImage: `url(${profile.avatar_url})`, backgroundSize: 'cover' }}></div>
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
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1" />
                          </div>
                          <Button onClick={handlePasswordChange} disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                          </Button>
                        </div>
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
                          <Switch checked={preferences.email_job_alerts} onCheckedChange={(checked) => handlePreferencesChange('email_job_alerts', checked)} />
                        </div>
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
                            <select
                              className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                              value={preferences.profile_visibility}
                              onChange={(e) => setPreferences({ ...preferences, profile_visibility: e.target.value })}
                            >
                              <option value="everyone">Everyone</option>
                              <option value="employers_only">Only employers</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">Show GLOHSEN Score</p>
                              <p className="text-xs text-gray-500">Display your score on your public profile</p>
                            </div>
                            <Switch checked={preferences.show_glohsen_score} onCheckedChange={(checked) => handlePreferencesChange('show_glohsen_score', checked)} />
                          </div>
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
          </div>
        </div>
      </div>

      <Footer
        isActive={false}
        sectionName="Account Settings"
        scrollToSection={() => {}}
        isHomePage={false}
      />
    </div>
  );
};

export default AccountSettings;
