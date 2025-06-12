import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
// import { gsap } from "gsap"; // GSAP might be less critical for SVG manual animation
import { Link } from "react-router-dom";
import { ChevronRight, PlayCircle, Info, Eye, EyeOff, Palette } from "lucide-react"; // Added Palette for example
import Logo3DHyperRealistic from "./Logo3DHyperRealistic";
import ThemeToggle from "./ThemeToggle";
import { useSound } from "../contexts/SoundContext";
import { useTheme } from "../contexts/ThemeContext";

// --- STYLES ---
// It's generally better to move these to a separate CSS file for larger applications
// but keeping it here as per current structure.
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
      @keyframes shine-metallic {
        0% { background-position: -300% center; }
        100% { background-position: 300% center; }
      }
      .shine-text {
        background: linear-gradient(to right, 
          #B38728 0%, /* Darker Gold */
          #FBF5B7 20%, /* Pale Gold Highlight */
          #BF953F 40%, /* Medium Gold */
          #FCF6BA 50%, /* Brightest Highlight (simulating sheen) */
          #BF953F 60%, /* Medium Gold */
          #AA771C 80%, /* Dark Gold */
          #B38728 100% /* Darker Gold */
        );
        background-size: 300% auto; /* Make gradient wider for smoother animation */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine-metallic 15s infinite linear; /* Slower: Was 10s */
        position: relative;
      }

      .shine-text-light {
        background: linear-gradient(to right,
          #1A1A1A 0%, /* Dark base for black text */
          #DCDCDC 30%, /* Sheen highlight (lighter gray - was #CCCCCC) */
          #2C2C2C 45%,
          #F0F0F0 50%, /* Brightest sheen (very light gray - was #E0E0E0) */
          #2C2C2C 55%,
          #DCDCDC 70%, /* Sheen highlight (lighter gray - was #CCCCCC) */
          #1A1A1A 100% /* Dark base for black text */
        );
        background-size: 300% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine-metallic 30s infinite linear; /* Slower: Was 20s */
        position: relative;
      }

      .nav-button {
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        position: relative;
        overflow: hidden; 
        cursor: pointer;
        font-weight: 500;
        border: none; /* Remove default border, will be part of specific style */
      }

      .nav-button-gold {
        background: linear-gradient(145deg, #d4af37, #c09526); /* Brighter, more metallic gold */
        border: 1px solid #b8860b; /* Darker gold border */
        box-shadow: 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,223,135,0.5); /* 3D feel */
      }

      .nav-button-gold::before { /* Continuous sheen */
        content: "";
        position: absolute;
        top: 0;
        left: -150%; 
        width: 100%; 
        height: 100%;
        background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
        transform: skewX(-25deg);
        animation: continuous-sheen-nav 7s infinite linear; /* Slower, wider animation */
      }

      @keyframes continuous-sheen-nav {
        0% { left: -150%; }
        40% { left: 150%; } 
        100% { left: 150%; }
      }      .nav-button:hover {
        background: linear-gradient(145deg, #D32F2F, #B71C1C) !important; /* Red gradient on hover */
        color: #FFFFFF;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* Enhanced shadow on hover */
        border-color: #B71C1C; /* Darker red border on hover */
      }

      .nav-button-gold:hover {
        background: linear-gradient(145deg, #D32F2F, #B71C1C) !important; /* Red gradient on hover */
        color: #FFFFFF;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3); /* Enhanced shadow on hover */
        border-color: #B71C1C; /* Darker red border on hover */
      }

      /* Remove old .nav-button:hover::after if it exists */
      .nav-button:hover::after {
        display: none; 
      }
      
      .bouncing-arrow {
        display: inline-block;
        animation: bounce 2s infinite;
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .glassmorphic-gold-button {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 10px 20px;
        /* color: #FFD700; // Keep gold for dark mode */
        font-weight: 500;
        backdrop-filter: blur(10px) saturate(150%);
        transition: background 0.3s ease, transform 0.2s ease, color 0.3s ease;
      }
      .glassmorphic-gold-button:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
  ` }} />
);

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

interface EtherealButterflyProps {
  butterflyTargetPosition?: { x: number; y: number; width: number; height: number } | null;
}

const EtherealButterfly: React.FC<EtherealButterflyProps> = ({ butterflyTargetPosition }) => {
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
  const statsRef = useRef(stats); // Added: Initialize statsRef
  const [showStats, setShowStats] = useState<boolean>(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  
  const frameCountRef = useRef<number>(0);
  const lastFPSTimeRef = useRef<number>(0);

  const { isDark } = useTheme(); // Added for button accessibility

  // Added: useEffect to keep statsRef.current in sync with stats state
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  const BUTTERFLY_COLORS_THEME = useMemo(() => ({
    // Monarch Colors
    monarchOrange: ['#FCA500', '#FFB52B', '#E59400', '#FD8C00', '#FF7400'], // Added more vibrant orange
    monarchBlack: ['#1A1A1A', '#0D0D0D', '#262626', '#000000'],
    monarchWhite: ['#FFFFFF', '#FDFDFD', '#F5F5F5', '#FEFEFE'], // Brighter whites
    
    // Existing colors for playground mode or other effects
    gold: ['rgba(255,215,0,0.7)', 'rgba(200,160,0,0.7)', 'rgba(255,223,50,0.7)'],
    red: ['rgba(139,0,0,0.7)', 'rgba(255,69,0,0.7)'],
    black: ['rgba(20,20,20,0.6)', 'rgba(50,50,50,0.6)'], // General black, distinct from monarchBlack
    offWhite: 'rgba(240,240,240,0.5)',
    ripple: 'rgba(255,215,0,0.6)', // Slightly more transparent ripple
  }), []);

  const getParticleColor = useCallback((
    type: 'left' | 'right' | 'body' | 'playground',
    isEdge?: boolean,
    currentAnimationState?: 'playground' | 'forming' | 'formed',
    distanceToCenter?: number // Retained for potential future use
  ): string => {
    const state = currentAnimationState || animationStateRef.current;

    if (state === 'formed' || (state === 'forming' && type !== 'playground')) {
      if (type === 'body') {
        return BUTTERFLY_COLORS_THEME.monarchBlack[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchBlack.length)];
      }
      // Wings:
      if (isEdge && Math.random() < 0.85) { // Higher chance for edges to be black
        return BUTTERFLY_COLORS_THEME.monarchBlack[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchBlack.length)];
      }
      // Simulate some white spots, make them sparse
      if (Math.random() < 0.08) { // 8% chance for a white spot particle
          return BUTTERFLY_COLORS_THEME.monarchWhite[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchWhite.length)];
      }
      // Small chance for black accents within the orange parts of wings
      if (Math.random() < 0.15) {
        return BUTTERFLY_COLORS_THEME.monarchBlack[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchBlack.length)];
      }
      // Predominantly orange for wings
      return BUTTERFLY_COLORS_THEME.monarchOrange[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchOrange.length)];
    }

    // Playground or other states (original logic)
    const rand = Math.random();
    // For playground, use a mix of gold, red, black, offWhite
    if (rand < 0.35) return BUTTERFLY_COLORS_THEME.gold[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.gold.length)];
    if (rand < 0.6) return BUTTERFLY_COLORS_THEME.red[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.red.length)];
    if (rand < 0.8) return BUTTERFLY_COLORS_THEME.black[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.black.length)];
    return BUTTERFLY_COLORS_THEME.offWhite;
  }, [BUTTERFLY_COLORS_THEME, animationStateRef]);


  const createSvgParticleElement = useCallback((particle: SvgParticle): SVGCircleElement => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('id', particle.id);
    circle.setAttribute('cx', particle.x.toString());
    circle.setAttribute('cy', particle.y.toString());
    circle.setAttribute('r', particle.radius.toString());
    circle.setAttribute('fill', particle.color);
    circle.setAttribute('opacity', particle.opacity.toString());
    
    // Apply 3D filter if it's a butterfly particle (not playground) and in a relevant state
    if (particle.wing !== 'playground' && (animationStateRef.current === 'forming' || animationStateRef.current === 'formed')) {
      circle.style.filter = 'url(#monarchParticle3D)';
    }
    
    svgRef.current?.appendChild(circle);
    return circle;
  }, [animationStateRef, svgRef]); // svgRef and animationStateRef are stable refs
  const initializePlaygroundParticles = useCallback((numParticles: number, width: number, height: number) => {
    console.log('[EtherealButterflySVG] Initializing playground particles');
    const newParticles: SvgParticle[] = [];
    if (svgRef.current) {
        particlesRef.current.forEach(p => p.element?.remove());
    }

    for (let i = 0; i < numParticles; i++) {
      const isEdge = Math.random() > 0.9;
      const distanceToCenter = Math.random();
      const particle: SvgParticle = {
        id: `p_playground_${i}_${Date.now()}`,
        element: null,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,  // Increased initial velocity
        vy: (Math.random() - 0.5) * 1.5,  // Increased initial velocity
        radius: Math.random() * 2.5 + 1, // Slightly larger particles
        color: getParticleColor('playground', isEdge, 'playground', distanceToCenter),
        opacity: Math.random() * 0.6 + 0.4, // Better visibility
        targetX: null,
        targetY: null,
        originalX: Math.random() * width,
        originalY: Math.random() * height,
        wing: 'playground',
        distanceToCenter: distanceToCenter,
        isEdge: isEdge,
        formed: false,
        progress: 0,
      };
      particle.element = createSvgParticleElement(particle);
      newParticles.push(particle);
    }
    particlesRef.current = newParticles;
    setStats(prev => ({ ...prev, particleCount: newParticles.length, formationProgress: 0 }));
    console.log('[EtherealButterflySVG] Playground particles initialized:', newParticles.length);
  }, [getParticleColor, createSvgParticleElement]);

  const initializeFormationParticlesSVG = useCallback((points: ButterflyPoint[], width: number, height: number) => {
    console.log('[EtherealButterflySVG] Initializing formation particles');
    if (points.length === 0) {
      console.warn("[EtherealButterflySVG] No butterfly points from worker. Falling back to playground.");
      initializePlaygroundParticles(300, width, height); 
      setAnimationState('playground');
      animationStateRef.current = 'playground';
      return;
    }

    const desiredParticleCount = Math.min(1200, Math.max(600, points.length * 3)); // Up to 1200 particles
    const newParticles: SvgParticle[] = [];
    
    if (svgRef.current) {
        particlesRef.current.forEach(p => p.element?.remove());
    }

    // Determine formation origin and scale
    const defaultOrigin = { x: width / 2, y: height / 2 - height * 0.05 };
    let formationOrigin = defaultOrigin;
    let scaleMultiplier = 0.30; // Default scale for center screen

    if (butterflyTargetPosition && width > 0 && height > 0) {
      // Target the center of the "WELCOME" text passed via prop
      formationOrigin = { x: butterflyTargetPosition.x, y: butterflyTargetPosition.y };
      // Smaller scale for perching
      scaleMultiplier = 0.10; // Significantly smaller for perching
      console.log('[EtherealButterflySVG] Using target position for butterfly formation:', formationOrigin, "scaleMultiplier:", scaleMultiplier);
    } else {
      console.log('[EtherealButterflySVG] Using default center screen for butterfly formation.');
    }
    
    const scale = Math.min(width, height) * scaleMultiplier;

    for (let i = 0; i < desiredParticleCount; i++) {
      const pointIndex = i % points.length;
      const bPoint = points[pointIndex];
      
      const yFormationOffset = butterflyTargetPosition ? - (scale * 0.3) : 0; 

      const targetX = formationOrigin.x + bPoint.x * scale;
      const targetY = formationOrigin.y + yFormationOffset + bPoint.y * scale;

      const particle: SvgParticle = {
        id: `p_form_${i}_${Date.now()}`, // More unique ID
        element: null,
        x: Math.random() * width, 
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 1.5 + 0.8, 
        color: getParticleColor(bPoint.wing, bPoint.isEdge, 'forming', bPoint.distanceToCenter),
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
  }, [getParticleColor, initializePlaygroundParticles, butterflyTargetPosition]); // Added butterflyTargetPosition

  const updateAndDrawSvgParticles = useCallback((width: number, height: number) => {
    const particles = particlesRef.current;
    const state = animationStateRef.current;
    const mousePos = mousePositionRef.current;
    const currentTime = Date.now();
    let formedCount = 0;

    particles.forEach(p => {
      if (!p.element) return;      if (state === 'playground') {
        // Add constant gentle motion for playground particles
        const timeBasedX = Math.sin(currentTime * 0.0008 + p.originalX * 0.01) * 0.3;
        const timeBasedY = Math.cos(currentTime * 0.0006 + p.originalY * 0.01) * 0.2;
        p.vx += timeBasedX * 0.02;
        p.vy += timeBasedY * 0.02;

        // Enhanced mouse interaction with attraction/repulsion zones
        if (mousePos) {
          const dx = p.x - mousePos.x;
          const dy = p.y - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = width * 0.12; // Larger interaction radius
          const attractionRadius = width * 0.25; // Attraction zone outside repulsion
          
          if (dist < repulsionRadius && dist > 0) {
            // Repulsion force (stronger)
            const angle = Math.atan2(dy, dx);
            const force = (repulsionRadius - dist) / repulsionRadius * 0.8; 
            p.vx += Math.cos(angle) * force * 2.5; 
            p.vy += Math.sin(angle) * force * 2.5;
          } else if (dist < attractionRadius && dist > repulsionRadius) {
            // Gentle attraction force
            const angle = Math.atan2(-dy, -dx);
            const force = 0.1 * ((attractionRadius - dist) / attractionRadius);
            p.vx += Math.cos(angle) * force * 0.5;
            p.vy += Math.sin(angle) * force * 0.5;
          }
        }

        // Apply drag but maintain some motion
        p.vx *= 0.85; // Reduced drag for more fluid motion
        p.vy *= 0.85;      } else if (state === 'forming' && p.targetX !== null && p.targetY !== null) {
        const formationStartTime = lastInteractionTimeRef.current; 
        const staggerFactor = (p.originalX * p.originalY) % 500; // Stagger based on original random position
        const formationDuration = 2500; // Increased duration for better visualization
        
        if (p.progress < 1) {
          const timeSinceFormationStart = currentTime - (formationStartTime + staggerFactor);
          if (timeSinceFormationStart > 0) {
               p.progress = Math.min(1, timeSinceFormationStart / (formationDuration - staggerFactor > 0 ? formationDuration - staggerFactor : formationDuration));
          }
        }
        
        // Continue playground motion while forming for visual transition
        if (p.progress < 0.3) {
          const timeBasedX = Math.sin(currentTime * 0.0008 + p.originalX * 0.01) * 0.2;
          const timeBasedY = Math.cos(currentTime * 0.0006 + p.originalY * 0.01) * 0.15;
          p.vx += timeBasedX * 0.015 * (1 - p.progress * 3); // Reduce as formation progresses
          p.vy += timeBasedY * 0.015 * (1 - p.progress * 3);
          
          // Maintain some playground drag
          p.vx *= 0.88;
          p.vy *= 0.88;
        }
        
        const easeProgress = 1 - Math.pow(1 - p.progress, 3); // Easier curve for smoother transition
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        
        // Progressive formation force - starts gentle, becomes stronger
        const formationForce = 0.02 + (p.progress * 0.15); // Increases as progress increases
        p.vx += dx * formationForce;
        p.vy += dy * formationForce;
        
        // Apply formation velocity
        p.x += p.vx;
        p.y += p.vy;
        
        // Gradually fade in opacity during formation
        p.opacity = 0.1 + p.progress * 0.7; // More gradual fade-in

        if (p.progress >= 1 && !p.formed) {
          p.x = p.targetX;
          p.y = p.targetY;
          p.vx = 0; p.vy = 0;
          p.formed = true;
          p.opacity = 0.8 + (p.isEdge ? -0.2 : 0); 
        }      } else if (state === 'formed' && p.targetX !== null && p.targetY !== null) {
         if (!p.formed) { 
            p.x = p.targetX; p.y = p.targetY;
            p.vx = 0; p.vy = 0; p.formed = true;
         }
        
        const springK = 0.08; // Increased spring constant for more responsiveness
        const damping = 0.85; // Reduced damping for more fluid motion

        // Enhanced mouse following behavior
        if (mousePos) {
          const followStrength = 0.025; // Increased follow strength
          const maxFollowDistance = Math.min(width, height) * 0.4; // Larger follow radius

          const dxToParticleTarget = mousePos.x - p.targetX;
          const dyToParticleTarget = mousePos.y - p.targetY;
          const distToParticleTarget = Math.sqrt(dxToParticleTarget * dxToParticleTarget + dyToParticleTarget * dyToParticleTarget);

          if (distToParticleTarget < maxFollowDistance * 1.5) { 
             p.targetX += dxToParticleTarget * followStrength;
             p.targetY += dyToParticleTarget * followStrength;
          }
          p.targetX = Math.max(p.radius, Math.min(p.targetX, width - p.radius));
          p.targetY = Math.max(p.radius, Math.min(p.targetY, height - p.radius));
        }

        // Enhanced floating animation with more variation
        const floatRadius = 1.2 + p.radius * 0.5 + (p.isEdge ? 0.8 : 0); // Increased float radius
        const floatSpeed = 0.0003 + ((p.originalX % 100)/150000); // Slightly faster
        const offsetX = Math.cos(currentTime * floatSpeed + p.originalX * 0.01) * floatRadius * (1 + p.distanceToCenter * 0.7);
        const offsetY = Math.sin(currentTime * floatSpeed + p.originalY * 0.01) * floatRadius * (1 + p.distanceToCenter * 0.7) * 0.6;
        
        const springTargetX = p.targetX + offsetX;
        const springTargetY = p.targetY + offsetY;

        const forceX = (springTargetX - p.x) * springK;
        const forceY = (springTargetY - p.y) * springK;
        
        p.vx += forceX;
        p.vy += forceY;
        
        p.vx *= damping;
        p.vy *= damping;

        // Enhanced mouse repulsion with dynamic effects
        if (mousePos) {
          const dxParticleMouse = p.x - mousePos.x;
          const dyParticleMouse = p.y - mousePos.y;
          const distParticleMouse = Math.sqrt(dxParticleMouse * dxParticleMouse + dyParticleMouse * dyParticleMouse);
          const repulsionRadiusParticle = width * 0.08; // Increased repulsion radius

          if (distParticleMouse < repulsionRadiusParticle && distParticleMouse > 0) {
            const angle = Math.atan2(dyParticleMouse, dxParticleMouse);
            const pushForceStrength = (repulsionRadiusParticle - distParticleMouse) / repulsionRadiusParticle;
            p.vx += Math.cos(angle) * pushForceStrength * 2.5; // Increased push force
            p.vy += Math.sin(angle) * pushForceStrength * 2.5;
            lastInteractionTimeRef.current = Date.now();
          }
        }
        
        // Enhanced visual effects
        const baseOpacity = p.wing === 'body' ? 0.9 : (p.isEdge ? 0.6 : 0.8);
        const flickerEffect = Math.sin(currentTime * 0.0006 + p.originalX * 0.02) * 0.15; // More pronounced flicker
        p.opacity = Math.max(0.3, baseOpacity + flickerEffect); // Ensure minimum opacity
      }

      if (p.formed) formedCount++;      // Apply velocity to position for all states
      p.x += p.vx;
      p.y += p.vy;      // Enhanced boundary conditions with better physics
      if (state === 'playground') {
        if (p.x > width - p.radius || p.x < p.radius) {
          p.vx *= -0.7; // More realistic bounce
          p.x = Math.max(p.radius, Math.min(p.x, width - p.radius));
        }
        if (p.y > height - p.radius || p.y < p.radius) {
          p.vy *= -0.7;
          p.y = Math.max(p.radius, Math.min(p.y, height - p.radius));
        }
      } else if (state === 'forming') {
        // Gentle boundary constraints during formation
        p.x = Math.max(p.radius * 0.5, Math.min(p.x, width - p.radius * 0.5));
        p.y = Math.max(p.radius * 0.5, Math.min(p.y, height - p.radius * 0.5));
      } else if (state === 'formed') {
        // Soft boundary constraints for formed butterfly
        p.x = Math.max(p.radius, Math.min(p.x, width - p.radius));
        p.y = Math.max(p.radius, Math.min(p.y, height - p.radius));
      }      // Update SVG element attributes with enhanced rendering
      p.element.setAttribute('cx', p.x.toString());
      p.element.setAttribute('cy', p.y.toString());
      p.element.setAttribute('fill-opacity', Math.max(0.1, p.opacity).toString()); // Ensure minimum visibility
      
      // Dynamic radius scaling based on state and interaction
      let currentRadius = p.radius;
      if (state === 'forming' && p.progress < 1) {
        currentRadius = p.radius * (0.5 + p.progress * 0.5); // Grow during formation
      } else if (state === 'formed' && mousePos) {
        const distToMouse = Math.sqrt((p.x - mousePos.x) ** 2 + (p.y - mousePos.y) ** 2);
        const interactionRadius = width * 0.1;
        if (distToMouse < interactionRadius) {
          const proximityFactor = 1 - (distToMouse / interactionRadius);
          currentRadius = p.radius * (1 + proximityFactor * 0.5); // Grow when mouse is near
        }
      }
      
      p.element.setAttribute('r', currentRadius.toString());
      
      // Enhanced color updates based on interaction
      if (state === 'formed' && mousePos) {
        const distToMouse = Math.sqrt((p.x - mousePos.x) ** 2 + (p.y - mousePos.y) ** 2);
        const interactionRadius = width * 0.08;
        if (distToMouse < interactionRadius) {
          // Add energy effect when mouse is near
          const energyColor = p.wing === 'body' ? '#FFD700' : '#FF6B35';
          p.element.setAttribute('fill', energyColor);
        } else {
          p.element.setAttribute('fill', p.color);
        }
      } else {
        p.element.setAttribute('fill', p.color);
      }

      // Apply 3D filter effect
      if (state === 'formed' || (state === 'forming' && p.progress > 0.5)) {
        p.element.setAttribute('filter', 'url(#monarchParticle3D)');
      } else {
        p.element.removeAttribute('filter');
      }
    }); // End of particles.forEach

    if (state === 'forming') {
      // Smoothly update the formation progress based on the number of formed particles
      const newProgress = (formedCount / particles.length) * 100;
      setStats(prev => ({ ...prev, formationProgress: newProgress }));

      // If nearly all particles are formed, snap to 100% to avoid stuck progress
      if (newProgress >= 99 && stats.formationProgress < 99) {
        setStats(prev => ({ ...prev, formationProgress: 100 }));
      }
    } else if (state === 'formed') {
        // Ensure progress is 100 if in formed state
        if (statsRef.current.formationProgress < 100 && particles.length > 0) { // check statsRef.current
             setStats(prev => ({ ...prev, formationProgress: 100 }));
        }
    }
  // Ensure the dependency array for this useCallback is correct.
  // It should include [getParticleColor, setStats, setAnimationState, statsRef, /* any other necessary stable dependencies */]
  // For example: }, [getParticleColor, setStats, setAnimationState, statsRef]);
  }, [getParticleColor, setStats, setAnimationState, statsRef]); // Please verify/adjust this dependency array as needed

  // Worker Initialization Effect
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
      // Note: No direct call to initializeFormationParticlesSVG here.
      // The main animation effect will react to butterflyPoints state change.
    };
    newWorker.postMessage({ type: 'GET_BUTTERFLY_POINTS' }); // Initial fetch

    return () => {
      console.log('[EtherealButterflySVG] Terminating worker.');
      newWorker.terminate();
      workerRef.current = null;
    };
  }, []); // Empty dependency array: Run once on mount, cleanup on unmount.


  // Main Animation and Resize Effect
  useEffect(() => {
    console.log('[EtherealButterflySVG] Animation/resize effect setup.');
    const svg = svgRef.current;
    const container = svg?.parentElement;

    if (!svg || !container) {
      console.log('[EtherealButterflySVG] SVG or container not available for animation setup.');
      return;
    }

    const resizeAndInitialize = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;

      if (newWidth === 0 || newHeight === 0) {
        console.log('[EtherealButterflySVG] Resize skipped: zero dimensions');
        return; 
      }

      svg.setAttribute('width', newWidth.toString());
      svg.setAttribute('height', newHeight.toString());
      svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`);
      
      svgSizeRef.current = { width: newWidth, height: newHeight };
      setSvgSize({ width: newWidth, height: newHeight }); 
      console.log('[EtherealButterflySVG] SVG resized to:', newWidth, newHeight);

      if (animationStateRef.current === 'playground') {
        console.log('[EtherealButterflySVG] (Re)initializing playground particles due to resize/effect update.');
        initializePlaygroundParticles(300, newWidth, newHeight);
      } else if (animationStateRef.current === 'forming' || animationStateRef.current === 'formed') {
        if (butterflyPoints.length > 0) {
          console.log('[EtherealButterflySVG] (Re)initializing formation particles due to resize/effect update with points.');
          initializeFormationParticlesSVG(butterflyPoints, newWidth, newHeight);
          if(animationStateRef.current === 'forming') lastInteractionTimeRef.current = Date.now();
        } else {
          console.log('[EtherealButterflySVG] (Re)initializing formation (or fallback) due to resize/effect update without points (worker might not have responded yet or no points defined).');
          initializeFormationParticlesSVG([], newWidth, newHeight); // Will fallback to playground if points are empty
        }
      }
    };

    resizeAndInitialize();

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
    window.addEventListener('resize', resizeAndInitialize);

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
      window.removeEventListener('resize', resizeAndInitialize);
      particlesRef.current.forEach(p => p.element?.remove());
      particlesRef.current = [];
      setFloatingElements([]);
    };
  }, [initializePlaygroundParticles, initializeFormationParticlesSVG, updateAndDrawSvgParticles, butterflyPoints]);

  useEffect(() => {
    // This effect logs changes to animationState, can be useful for debugging
    // console.log('[EtherealButterflySVG] Animation state changed to:', animationState);
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


  const handleSvgClick = useCallback(() => {
    console.log('SVG canvas clicked. Current animation state:', animationStateRef.current);
    // Currently, no specific action is tied to a generic SVG click to avoid conflict with dedicated buttons.
    // This can be expanded later if specific interactions are needed for direct SVG clicks.
  }, [animationStateRef]); // animationStateRef is a ref, its identity is stable

  const handleFormButterflyClick = useCallback(() => {
    console.log('Form Butterfly button onClick triggered');
    const currentState = animationStateRef.current;
    const newWidth = svgSizeRef.current.width;
    const newHeight = svgSizeRef.current.height;

    if (!svgRef.current || newWidth === 0 || newHeight === 0) {
      console.warn('[EtherealButterflySVG] Cannot change state: SVG not ready or size is zero.');
      return;
    }

    if (currentState === 'playground') {
      setAnimationState('forming');
      animationStateRef.current = 'forming';
      lastInteractionTimeRef.current = Date.now();
      // Initialize with current butterflyPoints; if empty, worker might still be fetching
      // or initializeFormationParticlesSVG will handle the fallback to playground if points are truly unavailable.
      initializeFormationParticlesSVG(butterflyPoints, newWidth, newHeight);
    } else if (currentState === 'formed' || currentState === 'forming') {
      // Allow interrupting 'forming' state and returning to 'playground'
      setAnimationState('playground');
      animationStateRef.current = 'playground';
      lastInteractionTimeRef.current = Date.now();
      initializePlaygroundParticles(300, newWidth, newHeight);
    }
  }, [
    butterflyPoints, 
    initializeFormationParticlesSVG, 
    initializePlaygroundParticles, 
    setAnimationState,
    // svgSizeRef, animationStateRef, lastInteractionTimeRef are refs and don't need to be in deps
  ]);

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
            <defs>
                <filter id="monarchParticle3D" x="-50%" y="-50%" width="200%" height="200%">
                    {/* Adjusted stdDeviation for a more subtle 3D effect, less blurry */}
                    <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="blur"/>
                    {/* Offset to create a slight shadow/depth */}
                    <feOffset in="blur" dx="0.7" dy="0.7" result="offsetBlur"/>
                    
                    {/* Specular lighting for a hint of shine on particles */}
                    <feSpecularLighting in="blur" surfaceScale="3" specularConstant=".75" specularExponent="20" lightingColor="#fed850" result="specOut">
                        <fePointLight x="-5000" y="-10000" z="20000"/>
                    </feSpecularLighting>
                    <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
                    <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/>

                    {/* Combine the offset blur (shadow) and the lit paint (main particle color with highlight) */}
                    <feMerge>
                        <feMergeNode in="offsetBlur"/> 
                        <feMergeNode in="litPaint"/> 
                    </feMerge>
                </filter>
            </defs>
        </svg>
          <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 150, display: 'flex', gap: '10px', pointerEvents: 'auto' }}>
          <button 
            onClick={handleFormButterflyClick}
            onMouseEnter={() => console.log('Form Butterfly button mouse enter')}
            onMouseLeave={() => console.log('Form Butterfly button mouse leave')}
            onMouseDown={() => console.log('Form Butterfly button mouse down')}
            title={animationState === 'playground' || animationState === 'forming' ? 'Assemble the butterfly' : 'Disperse particles into playground mode'}
            style={{ 
              padding: '10px 15px', 
              background: 'rgba(255,255,255,0.15)', 
              border: '1px solid rgba(255,255,255,0.4)', 
              borderRadius: '8px', 
              color: isDark ? 'white' : '#1f2937', // Adjusted for light mode
              cursor: 'pointer', 
              backdropFilter: 'blur(5px) saturate(150%)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'auto' // Explicitly ensure pointer events work
            }}
          >
            {animationState === 'playground' || animationState === 'forming' ? <PlayCircle size={18} /> : <Palette size={18} />}
            {animationState === 'playground' || animationState === 'forming' ? 'Form Butterfly' : 'Playground Mode'}
          </button>
        </div>

        <div style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 150, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', pointerEvents: 'auto' }}>
          {showStats && (
            <div style={{
              background: 'rgba(10, 10, 20, 0.85)', // Dark, slightly blueish, more opaque
              color: '#E0E0E0', // Softer white
              padding: '15px',
              borderRadius: '10px',
              width: '200px', // Slightly wider
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px) saturate(120%)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'Arial, Helvetica, sans-serif', // Clear, readable font
              fontSize: '0.9em',
              lineHeight: '1.7',
              textAlign: 'left'
            }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1em', color: '#FFFFFF', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px' }}>Performance Stats</h4>
              <p style={{margin: '3px 0'}}>Particles: <span style={{float: 'right', fontWeight: 'bold'}}>{stats.particleCount}</span></p>
              <p style={{margin: '3px 0'}}>FPS: <span style={{float: 'right', fontWeight: 'bold'}}>{stats.fps}</span></p>
              { (animationState === 'forming' || animationState === 'formed') &&
                <p style={{margin: '3px 0'}}>Formation: <span style={{float: 'right', fontWeight: 'bold'}}>{stats.formationProgress}%</span></p>
              }
              <p style={{margin: '3px 0'}}>Mode: <span style={{float: 'right', fontWeight: 'bold', textTransform: 'capitalize'}}>{animationState}</span></p>
            </div>
          )}
          <button 
            onClick={() => {
              // Add console.log here
              console.log('Show/Hide Stats button onClick triggered');
              setShowStats(s => !s);
            }} 
            title={showStats ? "Hide performance statistics" : "Show performance statistics"}
            style={{ 
              padding: '10px 15px', 
              background: 'rgba(255,255,255,0.15)', 
              border: '1px solid rgba(255,255,255,0.4)', 
              borderRadius: '8px', 
              color: isDark ? 'white' : '#1f2937', // Adjusted for light mode
              cursor: 'pointer', 
              backdropFilter: 'blur(5px) saturate(150%)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {showStats ? <EyeOff size={18} /> : <Eye size={18} />}
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>
      </div>
    </ButterflyErrorBoundary>
  );
};

// --- END OF MERGED ETHEREAL BUTTERFLY SECTION ---


const HeaderWithParticlesOptimized: React.FC<HeaderProps> = ({ isActive, sectionName, scrollToSection, playClickSound: playClickSoundProp }) => {
  const { isSoundEnabled } = useSound(); 
  const { isDark, toggleTheme } = useTheme();
  const [showHint, setShowHint] = useState(true);
  const welcomeTitleRef = useRef<HTMLHeadingElement>(null); 
  const [butterflyTargetPos, setButterflyTargetPos] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const calculateTargetPosition = () => {
      if (welcomeTitleRef.current) {
        const headerElement = document.getElementById('home-header');
        if (!headerElement) return;

        const headerRect = headerElement.getBoundingClientRect();
        const titleRect = welcomeTitleRef.current.getBoundingClientRect();

        const targetX = (titleRect.left - headerRect.left) + titleRect.width / 2;
        const targetY = (titleRect.top - headerRect.top) + titleRect.height / 2;
        
        setButterflyTargetPos({
          x: targetX,
          y: targetY,
          width: titleRect.width,
          height: titleRect.height,
        });
      }
    };

    calculateTargetPosition();
    window.addEventListener('resize', calculateTargetPosition);
    const timeoutId = setTimeout(calculateTargetPosition, 200);

    return () => {
      window.removeEventListener('resize', calculateTargetPosition);
      clearTimeout(timeoutId);
    };
  }, [isDark]); 

  useEffect(() => {
    // Log theme changes, can be useful for debugging
    console.log('[HeaderWithParticlesOptimized] Theme changed:', isDark ? 'Dark' : 'Light');
  }, [isDark]);

  // Base styles that are consistent
  const headerBaseStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '20px', // p-5 equivalent
    textAlign: 'center',
    zIndex: 1,
    color: isDark ? 'white' : '#1f2937', // Tailwind text-white or text-gray-800
    transition: 'background-color 0.5s ease-in-out, color 0.5s ease-in-out', // Added color transition
  };

  // Dynamic styles that change with the theme
  const headerDynamicStyle: React.CSSProperties = isDark
  ? { background: '#0a0a0a' } // Slightly off-black for dark mode
  : {
      // Glassmorphism for light mode
      background: 'linear-gradient(135deg, rgba(235, 245, 255, 0.7) 0%, rgba(210, 225, 245, 0.55) 100%)', // Adjusted alpha
      backdropFilter: 'blur(10px) saturate(150%)', // Adjusted blur/saturate
      WebkitBackdropFilter: 'blur(10px) saturate(150%)',
      borderBottom: `1px solid rgba(200, 210, 230, 0.35)`, // Slightly more visible border
      boxShadow: '0 6px 25px rgba(0,0,0,0.08)', // Adjusted shadow
    };
  
  const headerStyle = { ...headerBaseStyle, ...headerDynamicStyle };

  return (
    <>
      <GlobalStyles />
      <header
        id="home-header"
        className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden text-center p-5`}
        style={headerStyle} 
      >
        <EtherealButterfly butterflyTargetPosition={butterflyTargetPos} />

        {showHint && (
          <div
            style={{
              position: 'absolute',
              top: '15px', // Slightly lower
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '6px 12px',
              background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.65)',
              borderRadius: '6px',
              fontSize: '0.8rem', // Slightly larger
              fontWeight: '400',
              zIndex: 100,
              cursor: 'pointer',
              transition: 'opacity 0.3s ease, background 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
            onClick={() => setShowHint(false)}
            title="Press ESC to dismiss. Click butterfly icon to assemble/disperse particles."
          >
            PLAYGROUND MODE: PARTICLES INTERACT WITH MOUSE. USE BUTTERFLY ICON TO TOGGLE FORMATION.
          </div>
        )}        <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex items-center space-x-2 md:space-x-3 z-20">
          <ThemeToggle />
          <nav className="flex items-center space-x-2 md:space-x-3">
            <Link
              to="/about-us"
              className="nav-button nav-button-gold text-xs sm:text-sm"
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
              }}
            >
              ABOUT US
            </Link>
            <Link
              to="/signin"
              className="nav-button nav-button-gold text-xs sm:text-sm"
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
              }}
            >
              SIGN IN
            </Link>
            <Link
              to="/signup"
              className="nav-button nav-button-gold text-xs sm:text-sm"
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
              }}
            >
              SIGN UP
            </Link>
            <Link
              to="/feedback"
              className="nav-button nav-button-gold text-xs sm:text-sm"
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
              }}
            >
              LEAVE FEEDBACK
            </Link>
            <Link
              to="/games-quizzes"
              className="nav-button nav-button-gold text-xs sm:text-sm"
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
              }}
            >
              GAMES & QUIZZES
            </Link>
            <Link
              to="/community-forum"
              className="nav-button nav-button-gold text-xs sm:text-sm"
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
              }}
            >
              COMMUNITY
            </Link>
            <Link
              to="/blog"
              className="nav-button nav-button-gold text-xs sm:text-sm"
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
              }}
            >
              BLOG
            </Link>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-16 sm:pt-20">
          <div className="mb-6 md:mb-8">
            {/* Removed isDarkTheme prop as it's not accepted by Logo3DHyperRealistic */}
            <Logo3DHyperRealistic size={isDark ? 140 : 130} />
          </div>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight leading-tight ${isDark ? 'shine-text' : 'shine-text-light'}`}>
            WELCOME TO GLOHSEN: <br className="hidden sm:block" /> EMPOWERING YOUR HEALTHCARE STORY
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl mb-6 md:mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Revolutionizing career development and community health engagement through innovative technology.
          </p>
          
          {scrollToSection && (
            <button
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
                scrollToSection(1); // Assuming section 1 is the next section after header
              }}
              className="glassmorphic-gold-button mt-6 md:mt-8 px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out group flex items-center justify-center"
              style={{ color: isDark ? '#FFD700' : '#1f2937' }} // Dynamic color for Explore button
              aria-label="Scroll to next section"
            >
              <span className="mr-2">Explore</span>
              <span className="bouncing-arrow">&gt;&gt;</span>
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderWithParticlesOptimized;
