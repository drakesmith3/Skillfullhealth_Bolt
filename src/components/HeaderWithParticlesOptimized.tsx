import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
// import { gsap } from "gsap"; // GSAP might be less critical for SVG manual animation
import { Link } from "react-router-dom";
import Logo3DHyperRealistic from "./Logo3DHyperRealistic";
import ThemeToggle from "./ThemeToggle";
import { useSound } from "../contexts/SoundContext";
import { useTheme } from "../contexts/ThemeContext";

// Interface for HeaderWithParticlesOptimized props (remains the same)
interface HeaderProps {
  isActive?: boolean;
  sectionName?: string;
  scrollToSection?: (sectionIndex: number) => void;
  playClickSound?: () => void;
}

// --- START OF MERGED ETHEREAL BUTTERFLY SECTION ---

// Error Boundary Component (from original HeaderWithParticles.tsx)
class ButterflyErrorBoundary extends React.Component<{ children: React.ReactNode, fallbackMessage?: string }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ButterflyErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', color: 'white', padding: '20px', zIndex: 200
        }}>
          <h2>Animation Error</h2>
          <p>{this.props.fallbackMessage || "Something went wrong with the butterfly animation."}</p>
          {this.state.error && <pre style={{ whiteSpace: 'pre-wrap', color: '#ffaaaa', fontSize: '0.8em' }}>{this.state.error.message}</pre>}
          <button onClick={() => this.setState({ hasError: false, error: null })} style={{ padding: '8px 16px', marginTop: '10px', background: 'rgba(255,255,255,0.2)', border: '1px solid white', borderRadius: '4px', cursor: 'pointer' }}>
            Try to Reload Animation
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}


// Particle interface for SVG elements
interface SvgParticle {
  id: string; // Unique ID for the SVG element
  element: SVGCircleElement | null;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  targetX: number | null;
  targetY: number | null;
  originalX: number; // For playground return or complex movements
  originalY: number;
  wing: 'left' | 'right' | 'body' | 'playground'; // Type of wing or if it's a playground particle
  distanceToCenter: number; // For effects based on distance
  isEdge: boolean; // If it's an edge particle
  formed: boolean; // If it has reached its target in the butterfly
  progress: number; // Animation progress for formation
}

// ButterflyPoint interface (data from worker - kept from Optimized version)
interface ButterflyPoint {
  x: number; // Normalized (-1 to 1)
  y: number; // Normalized (-1 to 1)
  wing: 'left' | 'right' | 'body';
  distanceToCenter: number;
  isEdge: boolean;
}

// Stats interface (from original HeaderWithParticles.tsx)
interface Stats {
  particleCount: number;
  formationProgress: number;
  fps: number;
}

// Floating Element interface (from original HeaderWithParticles.tsx)
interface FloatingElement {
  id: number;
  x: number; // percentage
  y: number; // percentage
  offsetX: number; // percentage
  offsetY: number; // percentage
  opacity: number;
  duration: number;
  size: number; // px
}

const EtherealButterfly = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const [animationState, setAnimationState] = useState<'playground' | 'forming' | 'formed'>('playground');
  const animationStateRef = useRef(animationState);
  const particlesRef = useRef<SvgParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const lastInteractionTimeRef = useRef<number>(0);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const svgSizeRef = useRef(svgSize);

  const [butterflyPoints, setButterflyPoints] = useState<ButterflyPoint[]>([]);
  const [stats, setStats] = useState<Stats>({ particleCount: 0, formationProgress: 0, fps: 0 });
  const [showStats, setShowStats] = useState<boolean>(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  
  const frameCountRef = useRef<number>(0);
  const lastFPSTimeRef = useRef<number>(0);

  const BUTTERFLY_COLORS_THEME = useMemo(() => ({
    gold: ['rgba(255,215,0,0.7)', 'rgba(200,160,0,0.7)', 'rgba(255,223,50,0.7)'], // Gold shades
    red: ['rgba(139,0,0,0.7)', 'rgba(255,69,0,0.7)'], // Red shades
    black: ['rgba(20,20,20,0.6)', 'rgba(50,50,50,0.6)'], // Black/Dark Gray shades
    offWhite: 'rgba(240,240,240,0.5)', // Off-white for highlights or playground
    ripple: 'rgba(255,215,0,0.5)', // Gold for ripple
  }), []);

  const getParticleColor = useCallback((
    type: 'left' | 'right' | 'body' | 'playground',
    isEdge?: boolean
  ): string => {
    if (isEdge) return BUTTERFLY_COLORS_THEME.black[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.black.length)];

    const rand = Math.random();
    if (type === 'body') {
      return BUTTERFLY_COLORS_THEME.black[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.black.length)];
    }
    if (type === 'playground') {
      if (rand < 0.4) return BUTTERFLY_COLORS_THEME.gold[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.gold.length)];
      if (rand < 0.7) return BUTTERFLY_COLORS_THEME.red[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.red.length)];
      if (rand < 0.9) return BUTTERFLY_COLORS_THEME.black[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.black.length)];
      return BUTTERFLY_COLORS_THEME.offWhite;
    }
    // For wings (left/right)
    if (rand < 0.65) return BUTTERFLY_COLORS_THEME.gold[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.gold.length)];
    if (rand < 0.9) return BUTTERFLY_COLORS_THEME.red[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.red.length)];
    return BUTTERFLY_COLORS_THEME.black[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.black.length)];
  }, [BUTTERFLY_COLORS_THEME]);


  const createSvgParticleElement = (particle: SvgParticle): SVGCircleElement => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('id', particle.id);
    circle.setAttribute('cx', particle.x.toString());
    circle.setAttribute('cy', particle.y.toString());
    circle.setAttribute('r', particle.radius.toString());
    circle.setAttribute('fill', particle.color);
    circle.setAttribute('opacity', particle.opacity.toString());
    // For "3D" effect attempt through SVG filters (can be defined in <defs>)
    // circle.style.filter = \`url(#glow-filter-${particle.color.replace(/[^a-zA-Z0-9]/g, '')})\`;
    // Example of a more generic shadow:
    // circle.style.filter = \`drop-shadow(0 0 ${particle.radius * 0.5}px ${particle.color.replace(/,0\.\d+\)/, ',0.3)')})\`;
    svgRef.current?.appendChild(circle);
    return circle;
  };

  const initializePlaygroundParticles = useCallback((numParticles: number, width: number, height: number) => {
    console.log('[EtherealButterflySVG] Initializing playground particles');
    const newParticles: SvgParticle[] = [];
    if (svgRef.current) {
        particlesRef.current.forEach(p => p.element?.remove());
    }

    for (let i = 0; i < numParticles; i++) {
      const particle: SvgParticle = {
        id: `p_playground_${i}_${Date.now()}`, // More unique ID
        element: null,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5, 
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        color: getParticleColor('playground'),
        opacity: Math.random() * 0.5 + 0.3,
        targetX: null,
        targetY: null,
        originalX: Math.random() * width,
        originalY: Math.random() * height,
        wing: 'playground',
        distanceToCenter: Math.random(),
        isEdge: Math.random() > 0.9,
        formed: false,
        progress: 0,
      };
      particle.element = createSvgParticleElement(particle);
      newParticles.push(particle);
    }
    particlesRef.current = newParticles;
    setStats(prev => ({ ...prev, particleCount: newParticles.length, formationProgress: 0 }));
    console.log('[EtherealButterflySVG] Playground particles initialized:', newParticles.length);
  }, [getParticleColor]);

  const initializeFormationParticlesSVG = useCallback((points: ButterflyPoint[], width: number, height: number) => {
    console.log('[EtherealButterflySVG] Initializing formation particles');
    if (points.length === 0) {
      console.warn("[EtherealButterflySVG] No butterfly points from worker. Falling back to playground.");
      initializePlaygroundParticles(300, width, height); 
      setAnimationState('playground');
      animationStateRef.current = 'playground';
      return;
    }

    const desiredParticleCount = Math.min(800, Math.max(400, points.length * 2)); // Max 800 particles
    const newParticles: SvgParticle[] = [];
    
    if (svgRef.current) {
        particlesRef.current.forEach(p => p.element?.remove());
    }

    for (let i = 0; i < desiredParticleCount; i++) {
      const pointIndex = i % points.length;
      const bPoint = points[pointIndex];
      
      const scale = Math.min(width, height) * 0.30; // Slightly smaller butterfly
      const targetX = bPoint.x * scale + width / 2;
      const targetY = bPoint.y * scale + height / 2 - height * 0.05; // Centered more

      const particle: SvgParticle = {
        id: `p_form_${i}_${Date.now()}`, // More unique ID
        element: null,
        x: Math.random() * width, 
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 1.5 + 0.8, 
        color: getParticleColor(bPoint.wing, bPoint.isEdge),
        opacity: 0.1, 
        targetX: targetX,
        targetY: targetY,
        originalX: Math.random() * width, // Store initial random for potential effects
        originalY: Math.random() * height,
        wing: bPoint.wing,
        distanceToCenter: bPoint.distanceToCenter,
        isEdge: bPoint.isEdge,
        formed: false,
        progress: 0,
      };
      particle.element = createSvgParticleElement(particle);
      newParticles.push(particle);
    }
    particlesRef.current = newParticles;
    setStats(prev => ({ ...prev, particleCount: newParticles.length, formationProgress: 0 }));
    console.log('[EtherealButterflySVG] Formation particles initialized:', newParticles.length);
  }, [getParticleColor, initializePlaygroundParticles]);

  const updateAndDrawSvgParticles = useCallback((width: number, height: number) => {
    const particles = particlesRef.current;
    const state = animationStateRef.current;
    const mousePos = mousePositionRef.current;
    const currentTime = Date.now();
    let formedCount = 0;

    particles.forEach(p => {
      if (!p.element) return;

      if (state === 'playground') {
        if (mousePos) {
          const dx = p.x - mousePos.x;
          const dy = p.y - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = width * 0.08; // Relative repulsion radius
          if (dist < repulsionRadius && dist > 0) { // dist > 0 to avoid issues if mouse is exactly on particle
            const angle = Math.atan2(dy, dx);
            const force = (repulsionRadius - dist) / repulsionRadius * 0.5; 
            p.vx += Math.cos(angle) * force * 1.5; // Stronger push
            p.vy += Math.sin(angle) * force * 1.5;
          }
        }
        p.vx *= 0.95; 
        p.vy *= 0.95;
      } else if (state === 'forming' && p.targetX !== null && p.targetY !== null) {
        const formationStartTime = lastInteractionTimeRef.current; // Set when 'Form Butterfly' is clicked
        const staggerFactor = (p.originalX * p.originalY) % 500; // Stagger based on original random position
        const formationDuration = 1800; // ms
        
        if (p.progress < 1) {
          const timeSinceFormationStart = currentTime - (formationStartTime + staggerFactor);
          if (timeSinceFormationStart > 0) {
               p.progress = Math.min(1, timeSinceFormationStart / (formationDuration - staggerFactor > 0 ? formationDuration - staggerFactor : formationDuration));
          }
        }
        
        const easeProgress = 1 - Math.pow(1 - p.progress, 4); // Ease out quart
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        
        // Move towards target
        p.x += dx * easeProgress * 0.1; // Adjusted factor
        p.y += dy * easeProgress * 0.1;
        p.opacity = 0.2 + p.progress * 0.6; // Fade in

        if (p.progress >= 1 && !p.formed) {
          p.x = p.targetX;
          p.y = p.targetY;
          p.vx = 0; p.vy = 0;
          p.formed = true;
          p.opacity = 0.8 + (p.isEdge ? -0.2 : 0); // Edges slightly less opaque
        }      } else if (state === 'formed' && p.targetX !== null && p.targetY !== null) {
         if (!p.formed) { 
            p.x = p.targetX; p.y = p.targetY;
            p.vx = 0; p.vy = 0; p.formed = true;
         }
        
        // Enhanced physics for formed butterfly
        if (mousePos) {
          // Calculate distance to mouse
          const dxMouse = mousePos.x - p.targetX;
          const dyMouse = mousePos.y - p.targetY;
          const distToMouseFromTarget = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          // Butterfly follows mouse with some lag and maintains formation
          const followStrength = 0.02; // How strongly the butterfly follows the mouse
          const maxFollowDistance = Math.min(width, height) * 0.3; // Maximum distance butterfly will move from center
          
          if (distToMouseFromTarget < maxFollowDistance) {
            // Move the target position towards mouse
            p.targetX += dxMouse * followStrength;
            p.targetY += dyMouse * followStrength;
            
            // Keep butterfly within bounds
            p.targetX = Math.max(p.radius, Math.min(p.targetX, width - p.radius));
            p.targetY = Math.max(p.radius, Math.min(p.targetY, height - p.radius));
          }
          
          // Repulsion effect when mouse is very close to individual particles
          const dxParticle = p.x - mousePos.x;
          const dyParticle = p.y - mousePos.y;
          const distToParticle = Math.sqrt(dxParticle * dxParticle + dyParticle * dyParticle);
          const repulsionRadius = width * 0.04; // Smaller repulsion radius for formed state
          
          if (distToParticle < repulsionRadius && distToParticle > 0) {
            const angle = Math.atan2(dyParticle, dxParticle);
            const pushForce = (repulsionRadius - distToParticle) / repulsionRadius * 0.8;
            p.x += Math.cos(angle) * pushForce * 12; 
            p.y += Math.sin(angle) * pushForce * 12;
            
            // Update interaction time for ripple effects
            lastInteractionTimeRef.current = Date.now();
          } else {
            // Gentle return to formation position with floating motion
            const floatRadius = 0.5 + p.radius * 0.3 + (p.isEdge ? 0.5 : 0);
            const floatSpeed = 0.0002 + ((p.originalX % 100)/200000); // Unique speed per particle
            const offsetX = Math.cos(currentTime * floatSpeed + p.originalX * 0.01) * floatRadius * (1 + p.distanceToCenter * 0.5);
            const offsetY = Math.sin(currentTime * floatSpeed + p.originalY * 0.01) * floatRadius * (1 + p.distanceToCenter * 0.5) * 0.6;
            
            const targetWithFloat = {
              x: p.targetX + offsetX,
              y: p.targetY + offsetY
            };
            
            // Smooth return to target position
            const returnStrength = 0.05;
            p.x += (targetWithFloat.x - p.x) * returnStrength;
            p.y += (targetWithFloat.y - p.y) * returnStrength;
          }
        } else {
          // No mouse interaction - gentle floating motion
          const floatRadius = 0.5 + p.radius * 0.3 + (p.isEdge ? 0.5 : 0);
          const floatSpeed = 0.0002 + ((p.originalX % 100)/200000); // Unique speed per particle
          const offsetX = Math.cos(currentTime * floatSpeed + p.originalX * 0.01) * floatRadius * (1 + p.distanceToCenter * 0.5);
          const offsetY = Math.sin(currentTime * floatSpeed + p.originalY * 0.01) * floatRadius * (1 + p.distanceToCenter * 0.5) * 0.6;
          p.x = p.targetX + offsetX;
          p.y = p.targetY + offsetY;
        }
        
        // Dynamic opacity based on wing type and interaction
        const baseOpacity = p.wing === 'body' ? 0.9 : (p.isEdge ? 0.6 : 0.8);
        const flickerEffect = Math.sin(currentTime * 0.0004 + p.originalX * 0.02) * 0.1;
        p.opacity = baseOpacity + flickerEffect;
      }

      if (p.formed) formedCount++;

      // Apply velocity if not formed or in specific states
      if (!p.formed || state === 'playground') {
        p.x += p.vx;
        p.y += p.vy;
      }
      
      if (state === 'playground') {
        if (p.x < p.radius || p.x > width - p.radius) { p.vx *= -0.6; p.x = Math.max(p.radius, Math.min(p.x, width - p.radius)); }
        if (p.y < p.radius || p.y > height - p.radius) { p.vy *= -0.6; p.y = Math.max(p.radius, Math.min(p.y, height - p.radius)); }
      }
      
      p.element.setAttribute('cx', p.x.toString());
      p.element.setAttribute('cy', p.y.toString());
      p.element.setAttribute('opacity', p.opacity.toString());
      p.element.setAttribute('r', p.radius.toString());
    });

    if (state === 'forming') {
      const progressSum = particles.reduce((acc, curr) => acc + curr.progress, 0);
      const overallProgress = particles.length > 0 ? progressSum / particles.length : 0;
      setStats(prev => ({ ...prev, formationProgress: Math.round(overallProgress * 100), particleCount: particles.length }));
      
      if (overallProgress >= 0.99 && particles.every(p => p.formed || p.progress >= 0.99)) {
        console.log('[EtherealButterflySVG] All particles appear formed.');
        setAnimationState('formed');
        animationStateRef.current = 'formed';
        setStats(prev => ({ ...prev, formationProgress: 100 }));
      }
    } else if (state === 'formed') {
        setStats(prev => ({ ...prev, particleCount: formedCount }));
    }
  }, []);


  const createRippleEffect = useCallback((x: number, y: number) => {
    if (!svgRef.current || animationStateRef.current !== 'formed') return;
    
    const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ripple.setAttribute('cx', x.toString());
    ripple.setAttribute('cy', y.toString());
    ripple.setAttribute('r', '0');
    ripple.setAttribute('fill', 'none');
    ripple.setAttribute('stroke', BUTTERFLY_COLORS_THEME.ripple);
    ripple.setAttribute('stroke-width', '1.5'); // Thinner ripple
    ripple.setAttribute('opacity', '0.7');
    
    svgRef.current.appendChild(ripple);
    
    let startTime: number | null = null;
    const animateRipple = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 500, 1); 
      const easeProgress = 1 - Math.pow(1 - progress, 2); 
      
      ripple.setAttribute('r', ( (svgSizeRef.current.width * 0.05) * easeProgress).toString()); // Relative size
      ripple.setAttribute('opacity', (0.7 * (1 - progress)).toString());
      
      if (progress < 1) {
        requestAnimationFrame(animateRipple);
      } else {
        ripple.remove();
      }
    };
    requestAnimationFrame(animateRipple);
  }, [BUTTERFLY_COLORS_THEME.ripple]);

  const handleSvgClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (animationStateRef.current === 'formed') {
        const rect = svgRef.current?.getBoundingClientRect();
        if (rect) {
            createRippleEffect(event.clientX - rect.left, event.clientY - rect.top);
        }
    }
  };

  const resetAnimation = useCallback(() => {
    console.log('[EtherealButterflySVG] Resetting animation to playground.');
    setAnimationState('playground');
    animationStateRef.current = 'playground';
    if (svgSizeRef.current.width > 0 && svgSizeRef.current.height > 0) {
       initializePlaygroundParticles(300, svgSizeRef.current.width, svgSizeRef.current.height);
    }
    setStats(prev => ({ ...prev, formationProgress: 0 }));
  }, [initializePlaygroundParticles]);

  const handleFormButterflyClick = useCallback(() => {
    console.log('[EtherealButterflySVG] Form Butterfly button clicked. Current state:', animationStateRef.current);
    if (animationStateRef.current === 'formed') {
      resetAnimation();
    } else if (animationStateRef.current === 'playground') {
      if (butterflyPoints.length > 0) {
        console.log('[EtherealButterflySVG] Using existing points for formation.');
        setAnimationState('forming'); 
        animationStateRef.current = 'forming';
        lastInteractionTimeRef.current = Date.now(); 
        initializeFormationParticlesSVG(butterflyPoints, svgSizeRef.current.width, svgSizeRef.current.height);
      } else {
        console.log('[EtherealButterflySVG] Requesting butterfly points from worker (no preloaded points).');
        workerRef.current?.postMessage({ type: 'GET_BUTTERFLY_POINTS' });
        // Set to forming, and initialization will happen on worker message
        setAnimationState('forming'); 
        animationStateRef.current = 'forming';
        lastInteractionTimeRef.current = Date.now();
      }
    }
  }, [resetAnimation, butterflyPoints, initializeFormationParticlesSVG]);

  useEffect(() => {
    svgSizeRef.current = svgSize;
  }, [svgSize]);

  useEffect(() => {
    console.log('[EtherealButterflySVG] Initializing worker.');
    const newWorker = new Worker(new URL('./butterflyWorker.ts', import.meta.url), { type: 'module' });
    workerRef.current = newWorker;

    newWorker.onerror = (error) => {
      console.error('[EtherealButterflySVG] Worker error:', error);
    };
      newWorker.onmessage = (event: MessageEvent<ButterflyPoint[]>) => {
      console.log('[EtherealButterflySVG] Message from worker:', event.data.length, 'points.');
      setButterflyPoints(event.data);
      // If we are already in 'forming' state (e.g., button clicked before worker responded fully)
      // and have a valid SVG size, initialize formation particles now.
      if (animationStateRef.current === 'forming' && svgSizeRef.current.width > 0 && svgSizeRef.current.height > 0) {
        console.log('[EtherealButterflySVG] Worker responded while in forming state, initializing formation particles.');
        initializeFormationParticlesSVG(event.data, svgSizeRef.current.width, svgSizeRef.current.height);
      }
    };
    newWorker.postMessage({ type: 'GET_BUTTERFLY_POINTS' }); // Initial fetch

    return () => {
      console.log('[EtherealButterflySVG] Terminating worker.');
      newWorker.terminate();
      workerRef.current = null;
    };
  }, [initializeFormationParticlesSVG]); // Added initializeFormationParticlesSVG dependency


  useEffect(() => {
    console.log('[EtherealButterflySVG] Animation/resize effect setup.');
    const svg = svgRef.current;
    const container = svg?.parentElement;

    if (!svg || !container) {
      console.log('[EtherealButterflySVG] SVG or container not available.');
      return;
    }
    
    const resizeSvg = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;

      svg.setAttribute('width', newWidth.toString());
      svg.setAttribute('height', newHeight.toString()); // Corrected typo
      svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`);
      
      setSvgSize({ width: newWidth, height: newHeight }); 
      console.log('[EtherealButterflySVG] SVG resized to:', newWidth, newHeight);
      
      if (animationStateRef.current === 'playground') {
        initializePlaygroundParticles(300, newWidth, newHeight);
      } else if (animationStateRef.current === 'formed' || animationStateRef.current === 'forming') {
        if (butterflyPoints.length > 0) { // Use existing points if available
            console.log('[EtherealButterflySVG] Resizing, re-initializing formation with existing points.');
            initializeFormationParticlesSVG(butterflyPoints, newWidth, newHeight);
            if(animationStateRef.current === 'forming') lastInteractionTimeRef.current = Date.now();
        } else { // Otherwise, re-fetch from worker
            console.log('[EtherealButterflySVG] Resizing, no points, re-fetching from worker.');
            workerRef.current?.postMessage({ type: 'GET_BUTTERFLY_POINTS' }); 
        }
      }
    };

    resizeSvg(); 
    if (animationStateRef.current === 'playground' && svgSizeRef.current.width > 0 && svgSizeRef.current.height > 0) {
        // Ensure playground particles are there if starting in that state with size
        initializePlaygroundParticles(300, svgSizeRef.current.width, svgSizeRef.current.height);
    }

    const handleMouseMove = (event: MouseEvent) => {
      const r = svg.getBoundingClientRect();
      mousePositionRef.current = { x: event.clientX - r.left, y: event.clientY - r.top };
      if(animationStateRef.current === 'formed' || animationStateRef.current === 'playground') { // Update for playground too
        lastInteractionTimeRef.current = Date.now();
      }
    };
    const handleTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 0) {
            const r = svg.getBoundingClientRect();
            mousePositionRef.current = { x: event.touches[0].clientX - r.left, y: event.touches[0].clientY - r.top };
            if(animationStateRef.current === 'formed' || animationStateRef.current === 'playground') {
                lastInteractionTimeRef.current = Date.now();
            }
        }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', resizeSvg);

    const animate = (time: number) => {
      if (svgSizeRef.current.width === 0 || svgSizeRef.current.height === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      updateAndDrawSvgParticles(svgSizeRef.current.width, svgSizeRef.current.height);
      
      frameCountRef.current++;
      if (!lastFPSTimeRef.current) lastFPSTimeRef.current = time;
      const deltaTime = time - lastFPSTimeRef.current;
      if (deltaTime >= 1000) {
          const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
          setStats(prev => ({ ...prev, fps }));
          lastFPSTimeRef.current = time;
          frameCountRef.current = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    console.log('[EtherealButterflySVG] Animation loop started.');

    const bgElements: FloatingElement[] = [];
    for (let i = 0; i < 20; i++) { 
      bgElements.push({
        id: i,
        x: Math.random() * 100, 
        y: Math.random() * 100, 
        offsetX: (Math.random() - 0.5) * 10, // Reduced range for subtlety
        offsetY: (Math.random() - 0.5) * 10,
        opacity: Math.random() * 0.15 + 0.05, // More subtle
        duration: 12000 + Math.random() * 10000, // Slower
        size: Math.random() * 2.5 + 1.5, 
      });
    }
    setFloatingElements(bgElements);

    return () => {
      console.log('[EtherealButterflySVG] Cleaning up animation effect.');
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resizeSvg);
      particlesRef.current.forEach(p => p.element?.remove());
      particlesRef.current = [];
      setFloatingElements([]); // Clear floating elements
    };
  }, [initializePlaygroundParticles, initializeFormationParticlesSVG, updateAndDrawSvgParticles, butterflyPoints]);

  useEffect(() => {
    animationStateRef.current = animationState;
  }, [animationState]);

  const floatingElementsStyle = useMemo(() => {
    return floatingElements.map(el => `
      @keyframes float-${el.id} {
        0% { transform: translate(0, 0) scale(0.8); opacity: ${el.opacity * 0.5}; }
        50% { transform: translate(${el.offsetX / 2}vw, ${el.offsetY / 2}vh) scale(1); opacity: ${el.opacity}; }
        100% { transform: translate(${el.offsetX}vw, ${el.offsetY}vh) scale(0.8); opacity: ${el.opacity * 0.5}; }
      }
      .float-el-${el.id} {
        position: absolute;
        left: ${el.x}%;
        top: ${el.y}%;
        width: ${el.size}px;
        height: ${el.size}px;
        background-color: ${BUTTERFLY_COLORS_THEME.gold[0].replace(/,0\.\d+\)/, ',0.15)')}; // Corrected regex
        border-radius: 50%;
        animation: float-${el.id} ${el.duration}ms ease-in-out infinite alternate;
        pointer-events: none;
      }
    `).join('');
  }, [floatingElements, BUTTERFLY_COLORS_THEME.gold]);


  return (
    <ButterflyErrorBoundary fallbackMessage="The Ethereal Butterfly animation encountered an issue.">
      <style>{floatingElementsStyle}</style>
      <div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 1, pointerEvents: 'none', 
        }}
      >
        {floatingElements.map(el => <div key={el.id} className={`float-el-${el.id}`} />)}

        <svg
          ref={svgRef}
          onClick={handleSvgClick}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            pointerEvents: 'auto', 
          }}
        >
            {/* Optional: Define SVG filters here if needed for 3D effect */}
            {/* 
            <defs>
                <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            */}
        </svg>
        
        {animationStateRef.current === 'playground' && (
          <div style={{
            position: 'absolute', top: 'calc(10% + 40px)', left: '50%',
            transform: 'translateX(-50%)', color: 'rgba(240, 240, 240, 0.8)', // Off-white
            fontSize: '1.2rem', textAlign: 'center', pointerEvents: 'none', zIndex: 5,
            textShadow: '0 0 8px rgba(0,0,0,0.6)'
          }}>
            Playground Mode: Particles react to mouse
          </div>
        )}

        <button
          onClick={handleFormButterflyClick}
          style={{
            position: 'absolute', bottom: '30px', left: '50%',
            transform: 'translateX(-50%)', padding: '12px 28px', fontSize: '1rem',
            fontWeight: '600', color: '#FFD700', background: 'rgba(40, 40, 70, 0.35)',
            backdropFilter: 'blur(12px) saturate(150%)', WebkitBackdropFilter: 'blur(12px) saturate(150%)',
            border: '1px solid rgba(255, 215, 0, 0.5)', borderRadius: '12px',
            cursor: 'pointer', zIndex: 100, pointerEvents: 'auto',
            boxShadow: '0 8px 24px 0 rgba(255, 215, 0, 0.2)',
            transition: 'all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            target.style.background = 'rgba(50, 50, 80, 0.5)';
            target.style.boxShadow = '0 10px 30px 0 rgba(255, 215, 0, 0.3)';
            target.style.transform = 'translateX(-50%) scale(1.03)';
            target.style.color = '#FFFFA0';
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.background = 'rgba(40, 40, 70, 0.35)';
            target.style.boxShadow = '0 8px 24px 0 rgba(255, 215, 0, 0.2)';
            target.style.transform = 'translateX(-50%) scale(1)';
            target.style.color = '#FFD700';
          }}
        >
          {animationStateRef.current === 'formed' ? 'Replay Animation' : 'Form Butterfly'}
        </button>

        <button
            onClick={() => setShowStats(s => !s)}
            style={{
                position: 'absolute', bottom: '30px', right: '30px',
                padding: '10px 20px', fontSize: '0.9rem', fontWeight: '500',
                color: 'rgba(240,240,240,0.9)', background: 'rgba(70, 70, 100, 0.3)', // Off-white text
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '8px',
                cursor: 'pointer', zIndex: 100, pointerEvents: 'auto',
                transition: 'all 0.2s ease',
            }}
             onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(80, 80, 110, 0.4)';}}
             onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(70, 70, 100, 0.3)';}}
        >
            {showStats ? 'Hide Stats' : 'Show Stats'}
        </button>

        {showStats && (
            <div style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'rgba(20, 20, 40, 0.75)', backdropFilter: 'blur(10px) saturate(120%)',
                border: '1px solid rgba(255, 215, 0, 0.4)', borderRadius: '12px',
                padding: '15px 20px', color: '#FFD700', 
                zIndex: 90, pointerEvents: 'none', minWidth: '180px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.35)', fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{ marginBottom: '12px', textAlign: 'left', borderBottom: '1px solid rgba(255,215,0,0.2)', paddingBottom:'8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(240,240,240,0.8)' }}>Particles: </span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{stats.particleCount}</span>
                </div>
                <div style={{ marginBottom: '12px', textAlign: 'left', borderBottom: '1px solid rgba(255,215,0,0.2)', paddingBottom:'8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(240,240,240,0.8)' }}>Formation: </span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{stats.formationProgress}%</span>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(240,240,240,0.8)' }}>FPS: </span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{stats.fps}</span>
                </div>
            </div>
        )}
      </div>
    </ButterflyErrorBoundary>
  );
};

// --- END OF MERGED ETHEREAL BUTTERFLY SECTION ---


const HeaderWithParticlesOptimized: React.FC<HeaderProps> = ({ isActive, scrollToSection, playClickSound }) => {
  const { isDark } = useTheme();
  const sectionNames = useMemo(() => ['Features', 'How It Works', 'Feedback', 'Join'], []);

  return (
    <header 
      className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0a0f1a 0%, #1a2238 100%)' 
          : 'linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%)', // Example light theme for non-dark mode
      }}
    >
      <div className="relative z-20 flex flex-col items-center px-4">
        <div className="mb-8">
          <Logo3DHyperRealistic />
        </div>
        <h1 className="text-5xl md:text-4xl font-bold mb-4 animate-fade-in-down" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
          WELCOME TO GLOHSEN: YOUR STORY STARTS HERE
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up max-w-xl" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>
          Navigate your journey through the healthcare story with interactive visuals and engaging content. Have Fun. Feel the Magical Transformation.
        </p>
        <div className="flex space-x-4 animate-fade-in-up animation-delay-500">
          <Link 
            to="/features"
            onClick={playClickSound} 
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Discover Features
          </Link>
          <Link 
            to="/join"
            onClick={playClickSound} 
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Join Community
          </Link>
        </div>
      </div>

      <div className="absolute top-8 right-8 flex items-center space-x-6 z-50">
        <nav className="hidden md:flex space-x-6">
          {sectionNames.map((item, index) => (
            <button
              key={item}
              onClick={() => {
                if (playClickSound) playClickSound();
                if (scrollToSection) {
                  const sectionIndexMap: { [key: string]: number } = {
                    'Features': 1, 
                    'How It Works': 2,
                    'Feedback': 3,
                    'Join': 4, 
                  };
                  const targetIndex = sectionIndexMap[item];
                  if (targetIndex !== undefined) {
                    scrollToSection(targetIndex);
                  } else {
                    console.warn(`Scroll target for "${item}" not found.`); // Corrected template literal
                  }
                }
              }}
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-lg"
            >
              {item}
            </button>
          ))}
        </nav>
        <ThemeToggle />
      </div>
      
      {isActive && <EtherealButterfly />}

    </header>
  );
};

export default HeaderWithParticlesOptimized;
