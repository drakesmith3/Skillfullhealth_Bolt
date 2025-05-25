
import React, { Suspense, lazy } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface LazyLoaderProps {
  importFunc: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
  props?: any;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({ 
  importFunc, 
  fallback = <Skeleton className="w-full h-64" />, 
  props = {} 
}) => {
  const LazyComponent = lazy(importFunc);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LazyLoader;
