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


// Enhanced Particle interface for SVG elements with advanced physics
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
  
  // Enhanced physics properties
  springForce: number; // Individual spring constant
  dampening: number; // Individual dampening factor
  mass: number; // Particle mass for physics calculations
  formationDelay: number; // Sequential formation timing
  curveAmplitude: number; // For curved path animations
  energyLevel: number; // For sparkle and glow effects
  interactionRadius: number; // Individual interaction zone
  
  // Advanced animation properties
  convergencePathX: number[]; // Spline points for curved convergence
  convergencePathY: number[]; // Spline points for curved convergence
  pathProgress: number; // Progress along convergence path (0-1)
  isConverging: boolean; // Flag for convergence animation
  groupIndex: number; // For sequential group animations
  wavePhase: number; // For sine wave convergence
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
    // Enhanced Monarch Colors with Red, Gold and Black Polkadots
    monarchOrange: ['#FCA500', '#FFB52B', '#E59400', '#FD8C00', '#FF7400', '#FF8C00'], // Rich orange spectrum
    monarchBlack: ['#1A1A1A', '#0D0D0D', '#262626', '#000000', '#1C1C1C'], // Deep black variations
    monarchWhite: ['#FFFFFF', '#FDFDFD', '#F5F5F5', '#FEFEFE', '#F8F8FF'], // Pure whites
    monarchRed: ['#DC143C', '#B22222', '#8B0000', '#CD5C5C', '#F08080'], // Red polkadot spectrum
    monarchGold: ['#FFD700', '#DAA520', '#B8860B', '#F4C430', '#BF953F'], // Gold polkadot spectrum
    
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
    distanceToCenter?: number // Used for polkadot pattern
  ): string => {
    const state = currentAnimationState || animationStateRef.current;

    if (state === 'formed' || (state === 'forming' && type !== 'playground')) {
      if (type === 'body') {
        return BUTTERFLY_COLORS_THEME.monarchBlack[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchBlack.length)];
      }
      
      // Enhanced wing coloring with red, gold, and black polkadots
      if (isEdge && Math.random() < 0.9) { // Higher chance for edges to be black
        return BUTTERFLY_COLORS_THEME.monarchBlack[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchBlack.length)];
      }
      
      // Create polkadot pattern based on distance to center
      const polkadotChance = distanceToCenter ? Math.sin(distanceToCenter * 0.3) * 0.5 + 0.5 : Math.random();
      
      // Red polkadots (15% chance)
      if (polkadotChance < 0.15) {
        return BUTTERFLY_COLORS_THEME.monarchRed[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchRed.length)];
      }
      
      // Gold polkadots (12% chance) 
      if (polkadotChance < 0.27) {
        return BUTTERFLY_COLORS_THEME.monarchGold[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchGold.length)];
      }
      
      // Black polkadots for contrast (8% chance)
      if (polkadotChance < 0.35) {
        return BUTTERFLY_COLORS_THEME.monarchBlack[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchBlack.length)];
      }
      
      // Small chance for white highlights (5%)
      if (polkadotChance < 0.40) { 
          return BUTTERFLY_COLORS_THEME.monarchWhite[Math.floor(Math.random() * BUTTERFLY_COLORS_THEME.monarchWhite.length)];
      }
      
      // Predominantly rich orange for wings (60%)
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
    console.log('[EtherealButterflySVG] Initializing enhanced playground particles');
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
        
        // Enhanced physics properties
        springForce: 0.05 + Math.random() * 0.1, // Variable spring constants
        dampening: 0.8 + Math.random() * 0.15, // Variable dampening
        mass: 0.5 + Math.random() * 1.5, // Variable particle masses
        formationDelay: 0, // No delay for playground particles
        curveAmplitude: Math.random() * 20 + 10, // For organic movement
        energyLevel: Math.random(), // For visual effects
        interactionRadius: 50 + Math.random() * 100, // Individual interaction zones
        
        // Advanced animation properties
        convergencePathX: [], // Will be populated during formation
        convergencePathY: [], // Will be populated during formation
        pathProgress: 0, // Not used in playground mode
        isConverging: false, // Not converging in playground
        groupIndex: 0, // No groups in playground
        wavePhase: Math.random() * Math.PI * 2, // Random phase for wave motion
      };
      particle.element = createSvgParticleElement(particle);
      newParticles.push(particle);
    }
    particlesRef.current = newParticles;
    setStats(prev => ({ ...prev, particleCount: newParticles.length, formationProgress: 0 }));
    console.log('[EtherealButterflySVG] Enhanced playground particles initialized:', newParticles.length);
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
    const desiredParticleCount = Math.min(1800, Math.max(800, points.length * 4));
    const newParticles: SvgParticle[] = [];
    
    if (svgRef.current) {
        particlesRef.current.forEach(p => p.element?.remove());
    }
    const defaultOrigin = { x: width * 0.2, y: height * 0.45 };
    let formationOrigin = defaultOrigin;
    let scaleMultiplier = 0.4;

    if (butterflyTargetPosition && width > 0 && height > 0) {
      formationOrigin = { x: width * 0.18, y: height * 0.4 };
      scaleMultiplier = 0.35;
      console.log('[EtherealButterflySVG] Using left-side positioning for butterfly formation:', formationOrigin, "scaleMultiplier:", scaleMultiplier);
    } else {
      console.log('[EtherealButterflySVG] Using default left-side positioning for butterfly formation.');
    }
    
    const scale = Math.min(width, height) * scaleMultiplier;
    const groupCount = 12; // Moved groupCount declaration here, before the loop

    for (let i = 0; i < desiredParticleCount; i++) {
      const pointIndex = i % points.length;
      const bPoint = points[pointIndex];
      const groupIndex = Math.floor((i / desiredParticleCount) * groupCount); // Now groupCount is defined before use
      const yFormationOffset = 0;

      const targetX = formationOrigin.x + bPoint.x * scale;
      const targetY = formationOrigin.y + yFormationOffset + bPoint.y * scale;

      const startX = Math.random() * width;
      const startY = Math.random() * height;
      
      const edgeBias = Math.random();
      let finalStartX = startX;
      let finalStartY = startY;
      
      if (edgeBias < 0.3) {
        const edge = Math.floor(Math.random() * 4);
        switch(edge) {
          case 0: finalStartX = 0; finalStartY = Math.random() * height; break;
          case 1: finalStartX = width; finalStartY = Math.random() * height; break;
          case 2: finalStartX = Math.random() * width; finalStartY = 0; break;
          case 3: finalStartX = Math.random() * width; finalStartY = height; break;
        }
      }
      const generateCurvePath = (startX: number, startY: number, endX: number, endY: number) => {
        const pathPoints = 8; // Number of spline points
        const pathX: number[] = [];
        const pathY: number[] = [];
        
        // Create curved path with sine wave influence
        for (let j = 0; j <= pathPoints; j++) {
          const t = j / pathPoints;
          const curveInfluence = Math.sin(t * Math.PI) * (30 + Math.random() * 40);
          
          // Bezier-like curve with random control points
          const controlX = (startX + endX) / 2 + (Math.random() - 0.5) * width * 0.3;
          const controlY = (startY + endY) / 2 + curveInfluence;
          
          // Quadratic interpolation
          const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
          const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
          
          pathX.push(x);
          pathY.push(y);
        }
        
        return { pathX, pathY };
      };
      
      const groupDelay = groupIndex * 50;
      
      const { pathX, pathY } = generateCurvePath(finalStartX, finalStartY, targetX, targetY);

      const particle: SvgParticle = {
        id: `p_form_${i}_${Date.now()}`,
        element: null,
        x: finalStartX, 
        y: finalStartY,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 1.5 + 0.8, 
        color: getParticleColor(bPoint.wing, bPoint.isEdge, 'forming', bPoint.distanceToCenter),
        opacity: 0.1, 
        targetX: targetX,
        targetY: targetY,
        originalX: finalStartX,
        originalY: finalStartY,
        wing: bPoint.wing,
        distanceToCenter: bPoint.distanceToCenter,
        isEdge: bPoint.isEdge,
        formed: false,
        progress: 0,
        springForce: 0.08 + Math.random() * 0.12,
        dampening: 0.82 + Math.random() * 0.15,
        mass: 0.8 + Math.random() * 1.2 + (bPoint.isEdge ? 0.3 : 0),
        formationDelay: groupDelay + Math.random() * 200,
        curveAmplitude: 25 + Math.random() * 35,
        energyLevel: bPoint.isEdge ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.5,
        interactionRadius: 60 + Math.random() * 80 + (bPoint.isEdge ? 20 : 0),
        convergencePathX: pathX,
        convergencePathY: pathY,
        pathProgress: 0,
        isConverging: false,
        groupIndex: groupIndex,
        wavePhase: Math.random() * Math.PI * 2 + (groupIndex * 0.5),
      };
      particle.element = createSvgParticleElement(particle);
      newParticles.push(particle);
    }
    particlesRef.current = newParticles;
    setStats(prev => ({ ...prev, particleCount: newParticles.length, formationProgress: 0 }));
    console.log('[EtherealButterflySVG] Formation particles initialized:', newParticles.length);
  }, [getParticleColor, initializePlaygroundParticles, butterflyTargetPosition, createSvgParticleElement]); // Added createSvgParticleElement to dependencies

  const updateAndDrawSvgParticles = useCallback((width: number, height: number) => {
    const particles = particlesRef.current;
    const state = animationStateRef.current;
    const mousePos = mousePositionRef.current;
    const currentTime = Date.now(); // Ensure currentTime is defined
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
        // Advanced sequential formation with curved paths and spring physics
        const formationStartTime = lastInteractionTimeRef.current; 
        const timeSinceFormationStart = currentTime - (formationStartTime + p.formationDelay);
        
        if (timeSinceFormationStart > 0 && p.progress < 1) {
          // Professional easing with sequential timing
          const timeProgress = Math.min(1, timeSinceFormationStart / 800); // Was 8000, changed to 800 for ~0.8s formation
          p.progress = 1 - Math.pow(1 - timeProgress, 4); // Professional ease-out curve
          
          // Start convergence animation
          if (!p.isConverging && p.progress > 0.1) {
            p.isConverging = true;
            console.log(`[Particle ${p.id}] Starting convergence animation for group ${p.groupIndex}`);
          }
        }
        
        if (p.isConverging && p.convergencePathX.length > 0) {
          // Follow curved convergence path with spring physics
          const pathIndex = Math.min(
            Math.floor(p.progress * (p.convergencePathX.length - 1)), 
            p.convergencePathX.length - 1
          );
          
          const nextIndex = Math.min(pathIndex + 1, p.convergencePathX.length - 1);
          const localProgress = (p.progress * (p.convergencePathX.length - 1)) - pathIndex;
          
          // Interpolate between path points with sine wave influence
          const waveInfluence = Math.sin(p.wavePhase + p.progress * Math.PI * 2) * p.curveAmplitude * (1 - p.progress);
          
          const targetPathX = p.convergencePathX[pathIndex] + 
            (p.convergencePathX[nextIndex] - p.convergencePathX[pathIndex]) * localProgress;
          const targetPathY = p.convergencePathY[pathIndex] + 
            (p.convergencePathY[nextIndex] - p.convergencePathY[pathIndex]) * localProgress + waveInfluence;
          
          // Advanced spring physics with variable constants
          const dx = targetPathX - p.x;
          const dy = targetPathY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Adaptive spring force based on distance and progress
          const adaptiveSpringForce = p.springForce * (1 + p.progress * 2) * Math.min(distance / 100, 2);
          
          // Apply spring forces with mass consideration
          const forceX = (dx * adaptiveSpringForce) / p.mass;
          const forceY = (dy * adaptiveSpringForce) / p.mass;
          
          p.vx += forceX;
          p.vy += forceY;
          
          // Professional dampening with energy conservation
          p.vx *= p.dampening;
          p.vy *= p.dampening;
          
          // Add energy-based sparkle effect during convergence
          if (distance < 50 && p.energyLevel > 0.6) {
            p.energyLevel = Math.min(1, p.energyLevel + 0.02);
          }
        } else {
          // Fallback to simple convergence if path not available
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const formationForce = 0.003 + (p.progress * 0.05);
          
          p.vx += dx * formationForce / p.mass;
          p.vy += dy * formationForce / p.mass;
          p.vx *= p.dampening;
          p.vy *= p.dampening;
        }
        
        // Apply velocity with enhanced physics
        p.x += p.vx;
        p.y += p.vy;
        
        // Professional opacity transition with energy effects
        const baseOpacity = 0.05 + p.progress * 0.75;
        const energyGlow = p.energyLevel > 0.7 ? Math.sin(currentTime * 0.01) * 0.2 : 0;
        p.opacity = Math.min(0.9, baseOpacity + energyGlow);

        // Snap to final position with spring settle
        if (p.progress >= 0.98 && !p.formed) {
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 3) {
            p.x = p.targetX;
            p.y = p.targetY;
            p.vx = 0; 
            p.vy = 0;
            p.formed = true;
            p.isConverging = false;
            p.opacity = 0.8 + (p.isEdge ? 0.1 : 0);
            console.log(`[Particle ${p.id}] Formation complete for group ${p.groupIndex}`);
          }
        }      } else if (state === 'formed' && p.targetX !== null && p.targetY !== null) {
        // Professional formed state with advanced spring physics
        if (!p.formed) { 
          p.x = p.targetX; 
          p.y = p.targetY;
          p.vx = 0; 
          p.vy = 0; 
          p.formed = true;
        }
        
        // Advanced spring system with individual particle physics
        const springK = p.springForce * (1.2 + p.energyLevel * 0.5); // Energy-enhanced spring response
        const damping = p.dampening;

        // Professional mouse interaction with butterfly shape preservation
        if (mousePos) {
          const followStrength = 0.03 + p.energyLevel * 0.02; // Energy-based responsiveness
          const maxFollowDistance = Math.min(width, height) * 0.35;
          const personalSpace = p.interactionRadius * 0.8; // Individual interaction zones

          const dxToParticleTarget = mousePos.x - p.targetX;
          const dyToParticleTarget = mousePos.y - p.targetY;
          const distToParticleTarget = Math.sqrt(dxToParticleTarget * dxToParticleTarget + dyToParticleTarget * dyToParticleTarget);

          // Adaptive following based on particle importance and energy
          if (distToParticleTarget < maxFollowDistance) { 
            const followInfluence = followStrength * (1 - distToParticleTarget / maxFollowDistance);
            const massCompensation = 1 / p.mass; // Lighter particles respond more
            
            p.targetX += dxToParticleTarget * followInfluence * massCompensation;
            p.targetY += dyToParticleTarget * followInfluence * massCompensation;
          }
          
          // Ensure butterfly stays within bounds with soft constraints
          p.targetX = Math.max(p.radius * 2, Math.min(p.targetX, width - p.radius * 2));
          p.targetY = Math.max(p.radius * 2, Math.min(p.targetY, height - p.radius * 2));
        }

        // Professional floating animation with individual characteristics
        const floatRadius = (0.8 + p.radius * 0.3) * (1 + p.energyLevel * 0.4);
        const floatSpeed = 0.0002 + (p.wavePhase * 0.00005) + (p.energyLevel * 0.0001);
        
        // Complex harmonic motion with energy influence
        const offsetX = Math.cos(currentTime * floatSpeed + p.wavePhase) * floatRadius * 
          (1 + p.distanceToCenter * 0.6) * (1 + Math.sin(currentTime * floatSpeed * 0.3) * 0.2);
        const offsetY = Math.sin(currentTime * floatSpeed + p.wavePhase * 1.3) * floatRadius * 
          (1 + p.distanceToCenter * 0.6) * 0.7 * (1 + Math.cos(currentTime * floatSpeed * 0.5) * 0.15);
        
        const springTargetX = p.targetX + offsetX;
        const springTargetY = p.targetY + offsetY;

        // Advanced spring forces with non-linear response
        const dx = springTargetX - p.x;
        const dy = springTargetY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Non-linear spring for more organic movement
        const nonLinearSpring = springK * (1 + Math.sin(distance * 0.1) * 0.2);
        const forceX = dx * nonLinearSpring / p.mass;
        const forceY = dy * nonLinearSpring / p.mass;
        
        p.vx += forceX;
        p.vy += forceY;
        
        // Professional dampening with energy conservation
        p.vx *= damping;
        p.vy *= damping;

        // Enhanced mouse repulsion with energy dynamics
        if (mousePos) {
          const dxParticleMouse = p.x - mousePos.x;
          const dyParticleMouse = p.y - mousePos.y;
          const distParticleMouse = Math.sqrt(dxParticleMouse * dxParticleMouse + dyParticleMouse * dyParticleMouse);
          const personalRepulsionRadius = p.interactionRadius;

          if (distParticleMouse < personalRepulsionRadius && distParticleMouse > 0) {
            const angle = Math.atan2(dyParticleMouse, dxParticleMouse);
            const repulsionStrength = (personalRepulsionRadius - distParticleMouse) / personalRepulsionRadius;
            const energyBoost = 1 + p.energyLevel * 0.5;
            const massCompensation = 2 / p.mass;
            
            const repulsionForce = repulsionStrength * energyBoost * massCompensation * 2.8;
            p.vx += Math.cos(angle) * repulsionForce;
            p.vy += Math.sin(angle) * repulsionForce;
            
            // Increase energy level on interaction
            p.energyLevel = Math.min(1, p.energyLevel + 0.05);
            lastInteractionTimeRef.current = Date.now();
          }
        }
        
        // Professional visual effects with energy-based enhancements
        const baseOpacity = p.wing === 'body' ? 0.92 : (p.isEdge ? 0.75 : 0.85);
        const energyFlicker = p.energyLevel > 0.5 ? 
          Math.sin(currentTime * 0.008 + p.wavePhase) * 0.12 * p.energyLevel : 0;
        const harmonicFlicker = Math.sin(currentTime * 0.003 + p.originalX * 0.02) * 0.08;
        
        p.opacity = Math.max(0.4, Math.min(0.95, baseOpacity + energyFlicker + harmonicFlicker));
        
        // Gradually decay energy over time for natural settling
        p.energyLevel = Math.max(0.1, p.energyLevel * 0.998);
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
      }      // Professional visual effects system with advanced filter application
      if (state === 'formed' || (state === 'forming' && p.progress > 0.5)) {
        // High-energy particles get sparkle effects
        if (p.energyLevel > 0.8) {
          p.element.setAttribute('filter', 'url(#sparkleEffect)');
        }
        // Body particles get enhanced 3D treatment
        else if (p.wing === 'body') {
          p.element.setAttribute('filter', 'url(#monarchParticle3D)');
        }
        // Edge particles and polkadots get wing shimmer
        else if (p.isEdge || (p.color.includes('#DC143C') || p.color.includes('#FFD700'))) {
          p.element.setAttribute('filter', 'url(#wingShimmer)');
        }
        // Regular wing particles get atmospheric glow during interactions
        else if (mousePos) {
          const distToMouse = Math.sqrt((p.x - mousePos.x) ** 2 + (p.y - mousePos.y) ** 2);
          const glowRadius = p.interactionRadius * 0.8;
          if (distToMouse < glowRadius) {
            p.element.setAttribute('filter', 'url(#atmosphericGlow)');
          } else {
            p.element.setAttribute('filter', 'url(#monarchParticle3D)');
          }
        }
        // Default enhanced 3D for regular particles
        else {
          p.element.setAttribute('filter', 'url(#monarchParticle3D)');
        }
      } 
      // Playground mode gets subtle atmospheric glow
      else if (state === 'playground' && p.energyLevel > 0.6) {
        p.element.setAttribute('filter', 'url(#atmosphericGlow)');
      } 
      // Remove filters for low-energy or forming particles
      else {
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

    resizeAndInitialize();    const handleMouseMove = (event: MouseEvent) => {
      const r = svg.getBoundingClientRect();
      mousePositionRef.current = { x: event.clientX - r.left, y: event.clientY - r.top };
      if(animationStateRef.current === 'formed' || animationStateRef.current === 'playground') { // Update for playground too
        lastInteractionTimeRef.current = Date.now();
      }
    };
    
    // Enhanced keyboard shortcuts for professional UX
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
          event.preventDefault();
          handleFormButterflyClick();
          break;
        case 'KeyR':
          event.preventDefault();
          // Reset to playground mode
          setAnimationState('playground');
          animationStateRef.current = 'playground';
          lastInteractionTimeRef.current = Date.now();
          initializePlaygroundParticles(300, svgSizeRef.current.width, svgSizeRef.current.height);
          console.log('[EtherealButterflySVG] Reset to playground via keyboard shortcut');
          break;
        case 'KeyS':
          event.preventDefault();
          setShowStats(prev => !prev);
          break;
        case 'Escape':
          // Gentle dispersion effect
          if (animationStateRef.current === 'formed') {
            setAnimationState('playground');
            animationStateRef.current = 'playground';
            lastInteractionTimeRef.current = Date.now();
            initializePlaygroundParticles(300, svgSizeRef.current.width, svgSizeRef.current.height);
          }
          break;
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
    };    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', resizeAndInitialize);
    window.addEventListener('keydown', handleKeyDown);

    const animate = (time: number) => { // 'time' here is the timestamp from requestAnimationFrame
      if (svgSizeRef.current.width === 0 || svgSizeRef.current.height === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      updateAndDrawSvgParticles(svgSizeRef.current.width, svgSizeRef.current.height);
      
      frameCountRef.current++;
      if (!lastFPSTimeRef.current) lastFPSTimeRef.current = time; // Initialize with the first timestamp
      const deltaTime = time - lastFPSTimeRef.current; // Corrected: use time from animate and lastFPSTimeRef.current
      if (deltaTime >= 1000) {
          const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
          setStats(prev => ({ ...prev, fps }));
          lastFPSTimeRef.current = time; // Update with current timestamp
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
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resizeAndInitialize);
      window.removeEventListener('keydown', handleKeyDown);
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
        >            <defs>                {/* Enhanced 3D Monarch Butterfly Particle Filter with realistic depth and wing shimmer */}
                <filter id="monarchParticle3D" x="-100%" y="-100%" width="300%" height="300%">
                    {/* Enhanced shadow for better depth perception */}
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur"/>
                    <feOffset in="blur" dx="1.5" dy="1.5" result="offsetBlur"/>
                    <feComponentTransfer result="darkShadow">
                        <feFuncA type="linear" slope="0.6"/>
                    </feComponentTransfer>
                    
                    {/* Multiple lighting effects for realistic 3D appearance */}
                    <feSpecularLighting in="blur" surfaceScale="4" specularConstant="1.8" 
                                      specularExponent="25" lightingColor="#FFD700" result="goldShine">
                        <fePointLight x="-8000" y="-12000" z="25000"/>
                    </feSpecularLighting>
                    
                    {/* Secondary red shimmer for polkadot effect */}
                    <feSpecularLighting in="blur" surfaceScale="2" specularConstant="1.2" 
                                      specularExponent="15" lightingColor="#DC143C" result="redShimmer">
                        <fePointLight x="5000" y="8000" z="18000"/>
                    </feSpecularLighting>
                    
                    {/* Combine lighting effects */}
                    <feComposite in="goldShine" in2="SourceAlpha" operator="in" result="goldShine2"/>
                    <feComposite in="redShimmer" in2="SourceAlpha" operator="in" result="redShimmer2"/>
                    
                    {/* Blend lighting with original graphic */}
                    <feComposite in="SourceGraphic" in2="goldShine2" operator="screen" result="litPaint1"/>
                    <feComposite in="litPaint1" in2="redShimmer2" operator="screen" result="finalLitPaint"/>
                    
                    {/* Final composition with enhanced shadow */}
                    <feMerge>
                        <feMergeNode in="darkShadow"/> 
                        <feMergeNode in="finalLitPaint"/> 
                    </feMerge>
                </filter>
                
                {/* Professional wing shimmer animation with sparkle effects */}
                <filter id="wingShimmer" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.8" result="blur"/>
                    <feSpecularLighting surfaceScale="2" specularConstant="2.5" 
                                      specularExponent="20" lightingColor="#FFA500" result="shimmer">
                        <fePointLight x="8" y="8" z="20"/>
                    </feSpecularLighting>
                    <feComposite in="shimmer" in2="SourceAlpha" operator="in" result="shimmer2"/>
                    <feComposite in="SourceGraphic" in2="shimmer2" operator="screen"/>
                </filter>
                
                {/* Advanced sparkle effect for energy particles */}
                <filter id="sparkleEffect" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="0.5" result="sparkleBlur"/>
                    <feSpecularLighting surfaceScale="3" specularConstant="3" 
                                      specularExponent="30" lightingColor="#FFFFFF" result="sparkle">
                        <fePointLight x="0" y="0" z="15"/>
                    </feSpecularLighting>
                    <feComposite in="sparkle" in2="SourceAlpha" operator="in" result="sparkle2"/>
                    <feComposite in="SourceGraphic" in2="sparkle2" operator="screen" result="sparkled"/>
                    
                    {/* Add pulsing glow */}
                    <feGaussianBlur in="sparkled" stdDeviation="2" result="glow"/>
                    <feComponentTransfer result="coloredGlow">
                        <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode in="coloredGlow"/>
                        <feMergeNode in="sparkled"/>
                    </feMerge>
                </filter>
                
                {/* Atmospheric lighting effect for ambient particles */}
                <filter id="atmosphericGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" result="softGlow"/>
                    <feComponentTransfer result="atmosphereGlow">
                        <feFuncA type="linear" slope="0.4"/>
                    </feComponentTransfer>
                    <feComposite in="SourceGraphic" in2="atmosphereGlow" operator="screen"/>
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
        </div>        <div style={{ position: 'absolute', bottom: '30px', left: '30px', zIndex: 150, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', pointerEvents: 'auto' }}>
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
              
              {/* Professional keyboard shortcuts help */}
              <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                <h5 style={{ margin: '0 0 8px 0', fontSize: '0.95em', color: '#FFD700' }}>Keyboard Shortcuts</h5>
                <div style={{ fontSize: '0.8em', lineHeight: '1.4' }}>
                  <p style={{ margin: '2px 0' }}><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '3px', fontSize: '0.75em' }}>Space</kbd> Toggle Formation</p>
                  <p style={{ margin: '2px 0' }}><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '3px', fontSize: '0.75em' }}>R</kbd> Reset to Playground</p>
                  <p style={{ margin: '2px 0' }}><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '3px', fontSize: '0.75em' }}>S</kbd> Show/Hide Stats</p>
                  <p style={{ margin: '2px 0' }}><kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '3px', fontSize: '0.75em' }}>Esc</kbd> Disperse Butterfly</p>
                </div>
              </div>
            </div>
          )}
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
        const targetY = (titleRect.top - headerRect.top) + titleRect.height / 2; // Corrected this line
        
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
        <EtherealButterfly butterflyTargetPosition={butterflyTargetPos} />        {showHint && (
          <div
            style={{
              position: 'absolute',
              top: '15px', // Slightly lower
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '8px 16px',
              background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '400',
              zIndex: 100,
              cursor: 'pointer',
              transition: 'opacity 0.3s ease, background 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              maxWidth: '90vw',
              textAlign: 'center',
              lineHeight: '1.4',
            }}
            onClick={() => setShowHint(false)}
            title="Click to dismiss. Professional particle butterfly system with advanced physics and visual effects."
          >
            🦋 <strong>PROFESSIONAL PARTICLE BUTTERFLY</strong> • Mouse: Interact • Space: Transform • R: Reset • S: Stats • Esc: Disperse
          </div>
        )}<div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex items-center space-x-2 md:space-x-3 z-20">
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
        </div>        {/* Main Content Area - Moved up for better centering */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-8 sm:pt-12">          <div className="mb-4 md:mb-6">
            {/* Removed isDarkTheme prop as it's not accepted by Logo3DHyperRealistic */}
            <Logo3DHyperRealistic size={isDark ? 120 : 110} />
          </div>

          <h1 
            ref={welcomeTitleRef}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight leading-tight ${isDark ? 'shine-text' : 'shine-text-light'}`}
          >
            WELCOME TO GLOHSEN: <br className="hidden sm:block" /> EMPOWERING YOUR HEALTHCARE STORY
          </h1>          <p className={`text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl mb-6 md:mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Your Fun, Transformative Journey Begins Here. <br className="hidden sm:block" /> Revolutionizing career development and community health engagement through innovative technology.
          </p>

          {/* EXPLORE Button - Positioned after descriptive text */}
          {scrollToSection && (
            <button
              onClick={() => {
                if (playClickSoundProp && isSoundEnabled) playClickSoundProp();
                scrollToSection(1); // Assuming section 1 is the next section after header
              }}
              className="glassmorphic-gold-button mb-4 md:mb-6 px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out group flex items-center justify-center"
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
