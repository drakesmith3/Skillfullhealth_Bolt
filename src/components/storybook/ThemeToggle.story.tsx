
import React from "react";
import ThemeToggle from "../ThemeToggle";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta = {
  title: "Components/UI/ThemeToggle",
  component: ThemeToggle,
};

export default meta;

export function Default() {
  return (
    <ThemeProvider>
      <div className="p-6 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Theme Toggle Component</h2>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
