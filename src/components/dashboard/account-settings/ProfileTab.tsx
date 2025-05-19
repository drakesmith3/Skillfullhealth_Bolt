import { Card } from "@/components/ui/card";

/**
 * ProfileTab Component
 * Displays and allows editing of user's profile information.
 * Extend this component as needed for your application's requirements.
 */
const ProfileTab = () => (
  <Card className="p-6">
    <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
    <div>
      {/* Replace the following with your actual profile form/fields */}
      <div className="mb-2">
        <label className="block font-semibold mb-1">Name</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Enter your name"
          disabled
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2 w-full"
          placeholder="Enter your email"
          disabled
        />
      </div>
      {/* Add more profile fields and editing logic as needed */}
      <div className="text-gray-500 text-xs mt-4">
        To update your profile, please contact support or use the dedicated profile update section.
      </div>
    </div>
  </Card>
);

export default ProfileTab;
