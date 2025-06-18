// Butterfly Worker for generating butterfly shape points
// This worker generates the coordinate points for a butterfly shape

interface ButterflyPoint {
  x: number; // Normalized (-1 to 1)
  y: number; // Normalized (-1 to 1)
  wing: 'left' | 'right' | 'body';
  distanceToCenter: number;
  isEdge: boolean;
}

// Generate butterfly shape points
function generateButterflyPoints(particleCount: number = 1500): ButterflyPoint[] {
  const points: ButterflyPoint[] = [];
  
  // Body particles (15% of total)
  const bodyCount = Math.floor(particleCount * 0.15);
  for (let i = 0; i < bodyCount; i++) {
    const t = (i / bodyCount) * 2 - 1; // -1 to 1
    const x = 0;
    const y = t * 0.8; // Body length
    const distanceToCenter = Math.abs(y);
    
    points.push({
      x,
      y,
      wing: 'body',
      distanceToCenter,
      isEdge: false
    });
  }
  
  // Wing particles (85% of total, split between left and right)
  const wingCount = particleCount - bodyCount;
  const leftWingCount = Math.floor(wingCount / 2);
  const rightWingCount = wingCount - leftWingCount;
  
  // Left wing (42.5% of particles)
  for (let i = 0; i < leftWingCount; i++) {
    const u = Math.random();
    const v = Math.random();
    
    // Butterfly wing shape using parametric equations
    let x: number, y: number;
    
    if (v > 0.5) {
      // Upper wing
      const t = u * Math.PI;
      const r = 0.6 + Math.sin(t * 2) * 0.2;
      x = -r * Math.sin(t);
      y = r * Math.cos(t) * 0.7 + 0.2;
    } else {
      // Lower wing
      const t = u * Math.PI * 0.7;
      const r = 0.4 + Math.sin(t * 3) * 0.15;
      x = -r * Math.sin(t);
      y = -r * Math.cos(t) * 0.5 - 0.1;
    }
    
    const distanceToCenter = Math.sqrt(x * x + y * y);
    const isEdge = Math.random() < 0.1; // 10% edge particles
    
    points.push({
      x,
      y,
      wing: 'left',
      distanceToCenter,
      isEdge
    });
  }
  
  // Right wing (42.5% of particles)
  for (let i = 0; i < rightWingCount; i++) {
    const u = Math.random();
    const v = Math.random();
    
    // Butterfly wing shape using parametric equations
    let x: number, y: number;
    
    if (v > 0.5) {
      // Upper wing
      const t = u * Math.PI;
      const r = 0.6 + Math.sin(t * 2) * 0.2;
      x = r * Math.sin(t);
      y = r * Math.cos(t) * 0.7 + 0.2;
    } else {
      // Lower wing
      const t = u * Math.PI * 0.7;
      const r = 0.4 + Math.sin(t * 3) * 0.15;
      x = r * Math.sin(t);
      y = -r * Math.cos(t) * 0.5 - 0.1;
    }
    
    const distanceToCenter = Math.sqrt(x * x + y * y);
    const isEdge = Math.random() < 0.1; // 10% edge particles
    
    points.push({
      x,
      y,
      wing: 'right',
      distanceToCenter,
      isEdge
    });
  }
  
  return points;
}

// Worker message handling
self.onmessage = function(e) {
  const { type, particleCount } = e.data;
  
  switch (type) {
    case 'GENERATE_BUTTERFLY':
      const points = generateButterflyPoints(particleCount);
      self.postMessage({
        type: 'BUTTERFLY_POINTS',
        points
      });
      break;
      
    default:
      console.warn('Unknown message type:', type);
  }
};

// Export for TypeScript
export {};
