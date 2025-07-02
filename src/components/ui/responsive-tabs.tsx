import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

interface ResponsiveTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Array<{ value: string; label: string; }>;
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({
  value,
  onValueChange,
  tabs,
  children,
  className = ""
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile && tabs.length > 4) {
    // For mobile with many tabs, use a select dropdown
    return (
      <Tabs value={value} onValueChange={onValueChange} className={`w-full ${className}`}>
        <div className="mb-6">
          <select
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {tabs.map((tab) => (
              <option key={tab.value} value={tab.value}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>
        {children}
      </Tabs>
    );
  }

  // Default tabs layout for desktop and mobile with few tabs
  const gridCols = tabs.length <= 3 ? 
    `grid-cols-${tabs.length}` : 
    tabs.length <= 4 ? 
    'grid-cols-2 md:grid-cols-4' : 
    'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';

  return (
    <Tabs value={value} onValueChange={onValueChange} className={`w-full ${className}`}>
      <TabsList className={`grid w-full ${gridCols} mb-6 bg-white dark:bg-gray-800 shadow-sm`}>
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value} 
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black text-xs sm:text-sm px-2 py-2"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};