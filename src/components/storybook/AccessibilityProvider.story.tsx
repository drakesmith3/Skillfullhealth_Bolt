
import React from "react";
import { AccessibilityProvider, useAccessibility } from "../accessibility/AccessibilityProvider";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Accessibility/AccessibilityProvider",
  component: AccessibilityProvider,
};

export default meta;

const TestComponent = () => {
  const { settings, updateSettings, announceToScreenReader } = useAccessibility();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Accessibility Settings Test</h2>
      
      <div className="space-y-2">
        <Button 
          onClick={() => updateSettings({ highContrast: !settings.highContrast })}
          variant={settings.highContrast ? "default" : "outline"}
        >
          {settings.highContrast ? "Disable" : "Enable"} High Contrast
        </Button>
        
        <Button 
          onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
          variant={settings.reducedMotion ? "default" : "outline"}
        >
          {settings.reducedMotion ? "Enable" : "Disable"} Motion
        </Button>
        
        <Button 
          onClick={() => announceToScreenReader("Test announcement for screen readers")}
        >
          Test Screen Reader Announcement
        </Button>
      </div>

      <div className="mt-4 p-4 border rounded">
        <h3 className="font-semibold">Current Settings:</h3>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  );
};

export function Default() {
  return (
    <AccessibilityProvider>
      <TestComponent />
    </AccessibilityProvider>
  );
}
