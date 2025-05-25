
import React from "react";
import { SecurityProvider, useSecurity } from "../security/SecurityProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Components/Security/SecurityProvider",
  component: SecurityProvider,
};

export default meta;

const TestComponent = () => {
  const { validateInput, sanitizeInput, checkPermissions, lastActivity } = useSecurity();
  const [testInput, setTestInput] = React.useState("");
  const [sanitizedOutput, setSanitizedOutput] = React.useState("");

  const handleTest = () => {
    const isValid = validateInput(testInput);
    const sanitized = sanitizeInput(testInput);
    setSanitizedOutput(`Valid: ${isValid}, Sanitized: ${sanitized}`);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Security Provider Test</h2>
      
      <div className="space-y-2">
        <label>Test Input:</label>
        <Input 
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          placeholder="Try entering some text with HTML tags..."
        />
        <Button onClick={handleTest}>Test Validation & Sanitization</Button>
        {sanitizedOutput && (
          <div className="p-2 bg-gray-100 rounded text-sm">{sanitizedOutput}</div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Permission Tests:</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant={checkPermissions('view_jobs') ? "default" : "outline"}
            size="sm"
          >
            View Jobs: {checkPermissions('view_jobs') ? "✓" : "✗"}
          </Button>
          <Button 
            variant={checkPermissions('admin_access') ? "default" : "outline"}
            size="sm"
          >
            Admin Access: {checkPermissions('admin_access') ? "✓" : "✗"}
          </Button>
        </div>
      </div>

      <div className="mt-4 p-4 border rounded">
        <h3 className="font-semibold">Security Status:</h3>
        <p className="text-sm">Last Activity: {lastActivity.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export function Default() {
  return (
    <SecurityProvider>
      <TestComponent />
    </SecurityProvider>
  );
}
