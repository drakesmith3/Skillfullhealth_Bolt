import React from 'react'; // Added React import
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from "@/components/ui/toaster";
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider

// Create the root and render the app
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode> { /* Added StrictMode */}
    <ThemeProvider> { /* Wrap App with ThemeProvider */}
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
