import * as THREE from 'three';

// Generate Caduceus shape coordinates (Staff of Hermes with two snakes)
export const asclepiusRodShape: THREE.Vector3[] = [];

const generateCaduceusShape = () => {
  const points: THREE.Vector3[] = [];
  
  // Central Staff/Rod (15% of particles - about 225 particles)
  // Make it shorter and more proportionate
  for (let i = 0; i < 225; i++) {
    const t = (i / 225) * 2 - 1; // -1 to 1
    const x = 0;
    const y = t * 2.8; // Shorter staff length
    const z = Math.sin(t * Math.PI * 4) * 0.02; // Subtle texture
    points.push(new THREE.Vector3(x, y, z));
  }
  
  // First Snake - spiraling clockwise (35% of particles - about 525 particles)
  for (let i = 0; i < 525; i++) {
    const t = (i / 525) * 4.5 * Math.PI; // More realistic wrap count
    const height = ((i / 525) * 2 - 1) * 2.5; // Follow shorter rod
    
    // Snake 1 spiral parameters - more organic shape
    const baseRadius = 0.25;
    const radiusVariation = Math.sin(t * 0.8) * 0.08;
    const radius = baseRadius + radiusVariation;
    const x = radius * Math.cos(t);
    const z = radius * Math.sin(t);
    
    // Add subtle body thickness variation
    const bodyThickness = Math.sin(t * 2) * 0.02;
    
    points.push(new THREE.Vector3(x + bodyThickness, height, z));
  }
  
  // Second Snake - spiraling counter-clockwise (35% of particles - about 525 particles)
  for (let i = 0; i < 525; i++) {
    const t = (i / 525) * 4.5 * Math.PI; // More realistic wrap count
    const height = ((i / 525) * 2 - 1) * 2.5; // Follow shorter rod
    
    // Snake 2 spiral parameters (offset by PI for counter-spiral)
    const baseRadius = 0.25;
    const radiusVariation = Math.sin((t + Math.PI) * 0.8) * 0.08;
    const radius = baseRadius + radiusVariation;
    const x = radius * Math.cos(-t + Math.PI * 0.5); // Counter-clockwise with offset
    const z = radius * Math.sin(-t + Math.PI * 0.5);
    
    // Add subtle body thickness variation
    const bodyThickness = Math.sin(-t * 2) * 0.02;
    
    points.push(new THREE.Vector3(x + bodyThickness, height, z));
  }
    // Enhanced Snake Heads - Two heads at meeting point (8% of particles - about 120 particles)
  for (let i = 0; i < 120; i++) {
    const snakeIndex = i < 60 ? 0 : 1; // First or second snake
    const headIndex = i % 60;
    const progress = headIndex / 60;
    
    // Position heads where snakes meet at top, facing each other like in real caduceus
    const angle = snakeIndex === 0 ? Math.PI * 0.2 : Math.PI * 1.8;
    const headRadius = 0.18 + progress * 0.12; // Slightly larger heads
    const headHeight = 2.3 + progress * 0.25; // Position near top
    
    // Create more detailed snake heads with mouth and eye details
    const headAngle = (progress * Math.PI * 1.5) + angle; // More head detail
    const eyeDetail = progress < 0.3 ? Math.sin(progress * Math.PI * 10) * 0.02 : 0;
    
    const x = headRadius * Math.cos(headAngle) + eyeDetail;
    const y = headHeight;
    const z = headRadius * Math.sin(headAngle) + eyeDetail;
    
    points.push(new THREE.Vector3(x, y, z));
  }
    // Enhanced Wings at the top (7% of particles - about 105 particles)
  for (let i = 0; i < 105; i++) {
    const side = i < 52 ? -1 : 1; // Left or right wing
    const wingIndex = i % 52;
    const progress = wingIndex / 52;
    
    // Create more detailed wing structure resembling actual caduceus wings
    const wingSpan = 1.0; // Even larger wingspan for authenticity
    const wingHeight = 0.6; // More pronounced wing height
    const topPosition = 2.7; // Position slightly higher at top of staff
    
    // Wing shape with feather-like structure
    const wingCurve = Math.sin(progress * Math.PI);
    const featherDetail = Math.sin(progress * Math.PI * 8) * 0.05; // Add feather texture
    
    const x = side * progress * wingSpan * wingCurve;
    const y = topPosition + wingCurve * wingHeight - (progress * 0.15) + featherDetail;
    const z = Math.cos(progress * Math.PI * 2) * 0.2 * wingCurve + featherDetail;
    
    points.push(new THREE.Vector3(x, y, z));
  }
  
  return points;
};

// Generate the Caduceus shape
asclepiusRodShape.push(...generateCaduceusShape());

export default asclepiusRodShape;
