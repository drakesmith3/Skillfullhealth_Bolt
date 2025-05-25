
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  fps: number;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 0
  });

  useEffect(() => {
    // Measure load time
    const loadTime = performance.now();
    
    // Measure memory usage if available
    const memoryInfo = (performance as any).memory;
    const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0;

    // Simple FPS counter
    let frames = 0;
    let lastTime = performance.now();
    
    const countFPS = () => {
      frames++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        frames = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(countFPS);
    };

    requestAnimationFrame(countFPS);

    setMetrics(prev => ({
      ...prev,
      loadTime,
      memoryUsage
    }));
  }, []);

  const measureRenderTime = (componentName: string) => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`${componentName} render time: ${end - start}ms`);
    };
  };

  return { metrics, measureRenderTime };
};
