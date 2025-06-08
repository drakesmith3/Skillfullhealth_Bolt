// butterflyWorker.ts

interface Point {
  x: number;
  y: number;
}

interface ButterflyPoint {
  x: number; // Normalized (-1 to 1)
  y: number; // Normalized (-1 to 1)
  wing: 'left' | 'right' | 'body';
  distanceToCenter: number;
  isEdge: boolean;
}

// Adapted from ThreeJSParticleSystem's createWing, simplified for 2D and worker context
function createWingPoints(
  isLeft: boolean,
  numPointsPerWingHalf: number,
  baseScale: number
): Point[] {
  const points: Point[] = [];
  const side = isLeft ? -1 : 1;
  const wingScale = baseScale; // Overall scale of the wing

  // Forewing (upper wing) - simplified parametric equation
  const numForewingPoints = Math.floor(numPointsPerWingHalf * 0.6);
  for (let i = 0; i < numForewingPoints; i++) {
    const t = (i / Math.max(1, numForewingPoints - 1)) * Math.PI * 0.8; // Angle parameter, ensure divisor is not zero
    const r = (Math.sin(t) + Math.sin(3 * t) / 3) * wingScale * 0.8; // Radius from center
    points.push({
      x: side * r * Math.cos(t - Math.PI / 2) * 1.2, // Adjusted for shape
      y: -r * Math.sin(t - Math.PI / 2) - wingScale * 0.2, // Shifted upwards
    });
  }

  // Hindwing (lower wing) - simplified parametric equation
  const numHindwingPoints = numPointsPerWingHalf - numForewingPoints;
  for (let i = 0; i < numHindwingPoints; i++) {
    const t = (i / Math.max(1, numHindwingPoints - 1)) * Math.PI * 0.7; // Angle parameter, ensure divisor is not zero
    const r = (Math.sin(t) * 0.8 + Math.sin(2 * t) / 4) * wingScale * 0.6; // Radius from center
    points.push({
      x: side * r * Math.cos(t - Math.PI / 2 + Math.PI * 0.1) * 1.5, // Adjusted for shape
      y: r * Math.sin(t - Math.PI / 2 + Math.PI * 0.1) + wingScale * 0.5, // Shifted downwards
    });
  }
  return points;
}

function generateButterflyPoints(numTotalPoints: number, baseScale: number = 50): ButterflyPoint[] {
  const points: ButterflyPoint[] = [];
  // Ensure at least a few points per side for wing generation to avoid division by zero or empty loops
  const minPointsPerSide = 10; // Minimum points for one side of the butterfly (half forewing, half hindwing)
  const actualNumTotalPoints = Math.max(numTotalPoints, minPointsPerSide * 2); // Ensure enough points for two sides

  const numPointsPerSide = Math.floor(actualNumTotalPoints / 2);

  // Left wing
  const leftWingPoints = createWingPoints(true, numPointsPerSide, baseScale);
  leftWingPoints.forEach((point, index) => {
    const normalizedX = point.x / baseScale; // Normalize to -1 to 1 range
    const normalizedY = point.y / baseScale;
    const distanceToCenter = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
    const isEdge = index === 0 || index === leftWingPoints.length - 1 || Math.random() > 0.8;
    
    points.push({
      x: normalizedX,
      y: normalizedY,
      wing: 'left',
      distanceToCenter,
      isEdge
    });
  });
  
  // Right wing
  const rightWingPoints = createWingPoints(false, numPointsPerSide, baseScale);
  rightWingPoints.forEach((point, index) => {
    const normalizedX = point.x / baseScale; // Normalize to -1 to 1 range
    const normalizedY = point.y / baseScale;
    const distanceToCenter = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
    const isEdge = index === 0 || index === rightWingPoints.length - 1 || Math.random() > 0.8;
    
    points.push({
      x: normalizedX,
      y: normalizedY,
      wing: 'right',
      distanceToCenter,
      isEdge
    });
  });
  
  // Add a few points for the body if there's capacity from the original request, or adjust wing points
  // This part is simplified; a more complex body shape might be desired.
  const bodyPointCount = Math.max(0, numTotalPoints - points.length); // Use original numTotalPoints for this check
  const bodyVerticalScale = baseScale * 0.6;
  const bodyHorizontalSpread = baseScale * 0.05; // Slight width to the body

  for (let i = 0; i < bodyPointCount; i++) {
      const t = (i / Math.max(1, bodyPointCount - 1)) * 2 - 1; // from -1 to 1
      const bodyX = (Math.random() - 0.5) * bodyHorizontalSpread / baseScale; // Normalized
      const bodyY = (t * bodyVerticalScale) / baseScale; // Normalized
      const distanceToCenter = Math.sqrt(bodyX * bodyX + bodyY * bodyY);
      
      points.push({
          x: bodyX, // Centered with slight horizontal spread
          y: bodyY, // Elongated body
          wing: 'body',
          distanceToCenter,
          isEdge: i === 0 || i === bodyPointCount - 1
      });
  }

  return points;
}


self.onmessage = function(event: MessageEvent) {
  const { type, width, height, numPoints } = event.data;

  if (type === 'GET_BUTTERFLY_POINTS' || type === 'CALCULATE_PATHS') {
    try {
      // width and height from the message are not directly used for point generation here,
      // as the EtherealButterfly component scales the points to fit the SVG.
      // numPoints is used. A baseScale is used internally to define the canonical shape size.
      const points = generateButterflyPoints(numPoints || 150, 50); // Default 150 points, baseScale 50
      self.postMessage(points); // Send the butterfly points directly
    } catch (e: any) {
      console.error('Error in butterfly worker calculation:', e);
      self.postMessage({ type: 'ERROR', message: e.message || 'Error in worker calculation' });
    }
  }
};

// Adding 'export {}' to satisfy TypeScript's module requirement if this file is treated as a module.
// This is a common practice for web workers written in TypeScript.
export {};
