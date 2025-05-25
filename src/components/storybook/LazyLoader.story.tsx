
import React from "react";
import LazyLoader from "../performance/LazyLoader";
import { Skeleton } from "@/components/ui/skeleton";

const meta = {
  title: "Components/Performance/LazyLoader",
  component: LazyLoader,
};

export default meta;

// Mock heavy component to demonstrate lazy loading
const HeavyComponent = () => (
  <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Heavy Component Loaded!</h2>
    <p>This component was loaded lazily to improve performance.</p>
    <div className="mt-4 grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-16 bg-white/20 rounded flex items-center justify-center">
          Item {i + 1}
        </div>
      ))}
    </div>
  </div>
);

export function Default() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lazy Loading Demo</h2>
      <LazyLoader 
        importFunc={() => Promise.resolve({ default: HeavyComponent })}
        fallback={<Skeleton className="w-full h-64" />}
      />
    </div>
  );
}

export function WithCustomFallback() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Custom Fallback Demo</h2>
      <LazyLoader 
        importFunc={() => new Promise(resolve => 
          setTimeout(() => resolve({ default: HeavyComponent }), 2000)
        )}
        fallback={
          <div className="w-full h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p>Loading heavy component...</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
