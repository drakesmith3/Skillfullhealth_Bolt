
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from "@/components/ui/toaster";
import './index.css';

// Create the root and render the app
const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <App />
    <Toaster />
  </>
);
