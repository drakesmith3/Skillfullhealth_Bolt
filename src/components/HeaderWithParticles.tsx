import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Logo3DHyperRealistic from "./Logo3DHyperRealistic";
import ThemeToggle from "./ThemeToggle";
import { useSound } from "../contexts/SoundContext";
import { useTheme } from "../contexts/ThemeContext";
import { createDustParticles } from "../utils/dustParticles";

interface HeaderWithParticlesProps {
  isActive?: boolean;
  sectionName?: string;
  scrollToSection?: (sectionIndex: number) => void;
  playClickSound?: () => void;
}

// Enhanced Particle Physics Engine with Advanced Integration
interface Particle {
  element: SVGCircleElement;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  originalTargetX: number;
  originalTargetY: number;
  progress: number;
  speed: number;
  type: 'body' | 'forewing' | 'hindwing' | 'antenna';
  formed: boolean;
  radius: number;
  originalColor: string;
  floatPhase: number;
  floatSpeed: number;
  floatAmplitude: number;
  mouseOffsetX: number;
  mouseOffsetY: number;
  velocityX: number;
  velocityY: number;
  mass: number;
  springForce: number;
  dampening: number;
}

interface ButterflyPoint {
  x: number;
  y: number;
  color: string;
  type: 'body' | 'forewing' | 'hindwing' | 'antenna';
  density: number;
}

class OptimizedParticleSystem {
  svg: SVGSVGElement;
  particles: Particle[];
  butterflyPoints: ButterflyPoint[];
  isFormed: boolean;
  formationProgress: number;
  frameCount: number;
  lastTime: number;
  fps: number;
  animationFrame: number | null;
  mouseX: number;
  mouseY: number;
  isMouseMoving: boolean;
  isResetting: boolean;
  isPlaygroundMode: boolean;
  butterflyCenterX: number;
  butterflyCenterY: number;
  resetButton: HTMLElement | null;
  particleCountEl: HTMLElement | null;
  formationProgressEl: HTMLElement | null;
  animationSpeedEl: HTMLElement | null;
  progressFillEl: HTMLElement | null;
  constructor(svgElement: SVGSVGElement, uiElements: {
    resetButton: HTMLElement | null;
    particleCount: HTMLElement | null;
    formationProgress: HTMLElement | null;
    animationSpeed: HTMLElement | null;
    progressFill: HTMLElement | null;
  }) {
    this.svg = svgElement;
    this.particles = [];
    this.butterflyPoints = [];
    this.isFormed = false;
    this.formationProgress = 0;
    this.frameCount = 0;
    this.lastTime = 0;
    this.fps = 60;
    this.animationFrame = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMouseMoving = false;
    this.isResetting = false;
    this.isPlaygroundMode = true; // Start in playground mode
    this.butterflyCenterX = 0;
    this.butterflyCenterY = 0;
    this.resetButton = uiElements.resetButton;
    this.particleCountEl = uiElements.particleCount;
    this.formationProgressEl = uiElements.formationProgress;
    this.animationSpeedEl = uiElements.animationSpeed;
    this.progressFillEl = uiElements.progressFill;
    
    this.init();
  }
  init() {
    this.setupCanvas();
    this.generateButterflyShape();
    this.createEnhancedParticleSystem();
    this.startEnhancedAnimation();
    this.setupEnhancedEventListeners();
  }

  setupCanvas() {
    this.svg.setAttribute('width', window.innerWidth.toString());
    this.svg.setAttribute('height', window.innerHeight.toString());
    this.svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
  }  generateButterflyShape() {
    // Enhanced butterfly positioning with responsive design
    const isMobile = window.innerWidth < 768;
    const centerX = isMobile ? window.innerWidth * 0.15 : window.innerWidth * 0.25;
    const centerY = window.innerHeight / 2 - 50;
    const scale = Math.min(window.innerWidth, window.innerHeight) / (isMobile ? 1200 : 1000);
    
    // Store butterfly center for physics calculations
    this.butterflyCenterX = centerX;
    this.butterflyCenterY = centerY;
    
    this.butterflyPoints = [];

    // Enhanced butterfly body with varying thickness
    const bodySegments = 25;
    for (let i = 0; i < bodySegments; i++) {
      const t = i / (bodySegments - 1);
      const y = centerY - 60 + t * 120;
      const thickness = Math.sin(t * Math.PI) * 3 + 2; // Varying thickness
      
      for (let j = 0; j < Math.ceil(thickness); j++) {
        const offsetX = (j - thickness/2) * 2;
        this.butterflyPoints.push({
          x: centerX + offsetX,
          y: y,
          color: '#000000', // Black body
          type: 'body' as const,
          density: 1.0
        });
      }
    }

    // Enhanced wing generation with better curves
    this.generateEnhancedWing(centerX, centerY, scale, true);  // Left wing
    this.generateEnhancedWing(centerX, centerY, scale, false); // Right wing

    // Enhanced antennae with proper curves
    for (let side = -1; side <= 1; side += 2) {
      const antennaPoints = 15;
      for (let i = 0; i < antennaPoints; i++) {
        const t = i / (antennaPoints - 1);
        const curve = Math.sin(t * Math.PI * 0.8) * 15;
        this.butterflyPoints.push({
          x: centerX + side * (5 + curve) * scale,
          y: centerY - 65 + t * 25,
          color: '#000000',
          type: 'antenna' as const,
          density: 0.8
        });
      }
    }
  }

  generateWing(centerX: number, centerY: number, scale: number, isLeft: boolean) {
    const side = isLeft ? -1 : 1;
    const wingPoints: any[] = [];

    // Upper wing
    for (let angle = 0; angle < Math.PI; angle += 0.08) {
      for (let radius = 20; radius <= 70; radius += 8) {
        const wingRadius = radius + 15 * Math.sin(angle * 3);
        const x = centerX + side * wingRadius * Math.cos(angle) * scale;
        const y = centerY - 40 * scale + wingRadius * Math.sin(angle) * 0.7 * scale;
        
        wingPoints.push({
          x: x,
          y: y,
          type: 'upperWing',
          color: this.getWingColor(x, y, centerX, centerY)
        });
      }
    }

    // Lower wing
    for (let angle = 0; angle < Math.PI * 0.7; angle += 0.1) {
      for (let radius = 15; radius <= 45; radius += 8) {
        const wingRadius = radius + 8 * Math.sin(angle * 2);
        const x = centerX + side * wingRadius * Math.cos(angle) * scale;
        const y = centerY + 15 * scale + wingRadius * Math.sin(angle) * 0.9 * scale;
        
        wingPoints.push({
          x: x,
          y: y,
          type: 'lowerWing',
          color: this.getWingColor(x, y, centerX, centerY)
        });
      }
    }    this.butterflyPoints.push(...wingPoints);
  }
  // Enhanced wing generation with forewing/hindwing distinction
  generateEnhancedWing(centerX: number, centerY: number, scale: number, isLeft: boolean) {
    const side = isLeft ? -1 : 1;
    
    // Forewing (upper wing) - higher density particles
    for (let angle = 0; angle < Math.PI * 0.8; angle += 0.06) {
      for (let radius = 25; radius <= 85; radius += 6) {
        const wingRadius = radius + 20 * Math.sin(angle * 2.5) * Math.cos(angle * 1.5);
        const x = centerX + side * wingRadius * Math.cos(angle) * scale;
        const y = centerY - 45 * scale + wingRadius * Math.sin(angle) * 0.65 * scale;
        
        this.butterflyPoints.push({
          x: x,
          y: y,
          type: 'forewing' as const,
          color: this.getEnhancedWingColor(x, y, centerX, centerY),
          density: 1.2 // Higher density for forewinggs
        });
      }
    }

    // Hindwing (lower wing) - medium density particles  
    for (let angle = 0; angle < Math.PI * 0.6; angle += 0.08) {
      for (let radius = 18; radius <= 55; radius += 7) {
        const wingRadius = radius + 12 * Math.sin(angle * 1.8);
        const x = centerX + side * wingRadius * Math.cos(angle) * scale;
        const y = centerY + 20 * scale + wingRadius * Math.sin(angle) * 0.8 * scale;
        
        this.butterflyPoints.push({
          x: x,
          y: y,
          type: 'hindwing' as const,
          color: this.getEnhancedWingColor(x, y, centerX, centerY),
          density: 0.9
        });
      }
    }
  }

  // Enhanced wing coloring with better polka dot distribution
  getEnhancedWingColor(x: number, y: number, centerX: number, centerY: number): string {
    const dotSize = 28;
    const gridX = Math.floor((x - centerX + 250) / dotSize);
    const gridY = Math.floor((y - centerY + 250) / dotSize);
    const dotCenterX = centerX - 250 + gridX * dotSize + dotSize / 2;
    const dotCenterY = centerY - 250 + gridY * dotSize + dotSize / 2;
    const distToDot = Math.sqrt((x - dotCenterX) ** 2 + (y - dotCenterY) ** 2);
    
    if (distToDot < 8) {
      // 80% gold base, 20% red/black dots
      const randomValue = (gridX * 31 + gridY * 17) % 100;
      if (randomValue < 15) return '#DC143C'; // 15% red dots
      if (randomValue < 20) return '#000000'; // 5% black dots
    }
    
    return '#FFD700'; // 80% gold base
  }

  // Legacy method for backward compatibility
  getWingColor(x: number, y: number, centerX: number, centerY: number): string {
    return this.getEnhancedWingColor(x, y, centerX, centerY);
  }

  // Enhanced particle system with advanced physics
  createEnhancedParticleSystem() {
    // Target 1500 particles for optimal performance
    const targetParticleCount = 1500;
    
    // Create enhanced particles based on butterfly points
    const enhancedPoints = [...this.butterflyPoints];
    while (enhancedPoints.length < targetParticleCount) {
      const basePoint = this.butterflyPoints[Math.floor(Math.random() * this.butterflyPoints.length)];
      const variation = basePoint.density * 2;
      enhancedPoints.push({
        ...basePoint,
        x: basePoint.x + (Math.random() - 0.5) * variation,
        y: basePoint.y + (Math.random() - 0.5) * variation
      });
    }

    // Limit to target count
    const finalPoints = enhancedPoints.slice(0, targetParticleCount);
    
    finalPoints.forEach((point, index) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const radius = (0.8 + Math.random() * 0.7) * point.density;
      
      circle.setAttribute('r', radius.toString());
      circle.setAttribute('fill', point.color);
      circle.setAttribute('opacity', '0.3');
      
      // Add SVG glow effect
      const filterId = `glow-${index}`;
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', filterId);
      const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
      feGaussianBlur.setAttribute('stdDeviation', '2');
      feGaussianBlur.setAttribute('result', 'coloredBlur');
      filter.appendChild(feGaussianBlur);
      
      const defs = this.svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      if (!this.svg.querySelector('defs')) this.svg.appendChild(defs);
      defs.appendChild(filter);
      
      circle.setAttribute('filter', `url(#${filterId})`);
      this.svg.appendChild(circle);

      const startPos = this.getRandomStartPosition();
      
      const particle: Particle = {
        element: circle,
        startX: startPos.x,
        startY: startPos.y,
        targetX: point.x,
        targetY: point.y,
        originalTargetX: point.x,
        originalTargetY: point.y,
        progress: 0,
        speed: 0.025 + Math.random() * 0.035, // Optimized speed
        type: point.type,
        formed: false,
        radius: radius,
        originalColor: point.color,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.4 + Math.random() * 0.6,
        floatAmplitude: this.getFloatAmplitude(point.type),
        mouseOffsetX: 0,
        mouseOffsetY: 0,
        velocityX: 0,
        velocityY: 0,
        mass: point.density,
        springForce: 0.15,
        dampening: 0.85
      };

      gsap.set(circle, {
        attr: { cx: particle.startX, cy: particle.startY },
        scale: 0.4,
        opacity: 0.1
      });

      this.particles.push(particle);
    });

    // Start in playground mode
    this.startPlaygroundMode();
  }

  getFloatAmplitude(type: string): number {
    switch(type) {
      case 'body': return 1.2;
      case 'antenna': return 2.5;
      case 'forewing': return 3.5;
      case 'hindwing': return 2.8;
      default: return 2.0;
    }
  }

  getRandomStartPosition() {
    const side = Math.floor(Math.random() * 4);
    const padding = 150;
    
    switch(side) {
      case 0: return { x: Math.random() * window.innerWidth, y: -padding };
      case 1: return { x: window.innerWidth + padding, y: Math.random() * window.innerHeight };
      case 2: return { x: Math.random() * window.innerWidth, y: window.innerHeight + padding };
      case 3: return { x: -padding, y: Math.random() * window.innerHeight };
      default: return { x: 0, y: 0 };
    }
  }
  // Playground mode - magnetic attraction to mouse
  startPlaygroundMode() {
    this.isPlaygroundMode = true;
    this.particles.forEach(particle => {
      const currentX = parseFloat(particle.element.getAttribute('cx') || '0');
      const currentY = parseFloat(particle.element.getAttribute('cy') || '0');
      
      gsap.to(particle.element, {
        attr: { cx: currentX, cy: currentY },
        scale: 1,
        opacity: 0.6,
        duration: 2,
        ease: "power2.out"
      });
    });
  }

  // Enhanced mouse interaction with advanced physics
  updateAdvancedPhysics() {
    if (this.isPlaygroundMode && !this.isFormed) {
      this.updatePlaygroundPhysics();
    } else if (this.isFormed) {
      this.updateFormedPhysics();
    }
  }

  updatePlaygroundPhysics() {
    this.particles.forEach(particle => {
      const currentX = parseFloat(particle.element.getAttribute('cx') || '0');
      const currentY = parseFloat(particle.element.getAttribute('cy') || '0');
      
      if (this.isMouseMoving) {
        const dx = this.mouseX - currentX;
        const dy = this.mouseY - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxAttraction = 200;
        
        if (distance < maxAttraction && distance > 0) {
          const force = Math.pow((maxAttraction - distance) / maxAttraction, 2) * 0.8;
          const attractionX = (dx / distance) * force * particle.mass;
          const attractionY = (dy / distance) * force * particle.mass;
          
          particle.velocityX = (particle.velocityX + attractionX) * particle.dampening;
          particle.velocityY = (particle.velocityY + attractionY) * particle.dampening;
        }
      }
      
      // Apply velocity with spring-back behavior
      const newX = currentX + particle.velocityX;
      const newY = currentY + particle.velocityY;
      
      // Boundary constraints
      const constrainedX = Math.max(10, Math.min(window.innerWidth - 10, newX));
      const constrainedY = Math.max(10, Math.min(window.innerHeight - 10, newY));
      
      particle.element.setAttribute('cx', constrainedX.toString());
      particle.element.setAttribute('cy', constrainedY.toString());
      
      // Velocity decay
      particle.velocityX *= 0.98;
      particle.velocityY *= 0.98;
    });
  }

  updateFormedPhysics() {
    const time = Date.now() / 1000;
    
    this.particles.forEach(particle => {
      if (!particle.formed) return;
      
      // Gentle floating animation
      const offsetX = Math.sin(time * particle.floatSpeed + particle.floatPhase) * particle.floatAmplitude;
      const offsetY = Math.cos(time * particle.floatSpeed + particle.floatPhase) * particle.floatAmplitude * 0.6;
      
      // Shape-preserving mouse repulsion
      if (this.isMouseMoving) {
        const dx = this.mouseX - particle.originalTargetX;
        const dy = this.mouseY - particle.originalTargetY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150;
        
        if (distance < repulsionRadius && distance > 0) {
          const force = Math.pow((repulsionRadius - distance) / repulsionRadius, 2) * 25;
          const repulsionX = -(dx / distance) * force;
          const repulsionY = -(dy / distance) * force;
          
          // Maintain connection to butterfly center
          const toCenterX = this.butterflyCenterX - particle.originalTargetX;
          const toCenterY = this.butterflyCenterY - particle.originalTargetY;
          const centerDist = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY);
          
          if (centerDist > 0) {
            const centerForce = force * 0.3;
            const centerDirX = toCenterX / centerDist;
            const centerDirY = toCenterY / centerDist;
            
            particle.mouseOffsetX = repulsionX + (centerDirX * centerForce);
            particle.mouseOffsetY = repulsionY + (centerDirY * centerForce);
          } else {
            particle.mouseOffsetX = repulsionX;
            particle.mouseOffsetY = repulsionY;
          }
          
          // Enhanced sparkle effect
          gsap.to(particle.element, {
            attr: { opacity: 1 },
            scale: 1.2 + force * 0.02,
            duration: 0.4,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          });
        }
      }
      
      // Apply final position with spring-back
      const finalX = particle.targetX + offsetX + particle.mouseOffsetX;
      const finalY = particle.targetY + offsetY + particle.mouseOffsetY;
      
      particle.element.setAttribute('cx', finalX.toString());
      particle.element.setAttribute('cy', finalY.toString());
      
      // Spring-back decay
      particle.mouseOffsetX *= 0.92;
      particle.mouseOffsetY *= 0.92;
    });
  }

  // Enhanced formation animation with 60+ FPS targeting
  animateEnhancedFormation() {
    this.isPlaygroundMode = false;
    this.isFormed = false;
    this.formationProgress = 0;
    
    const tl = gsap.timeline({ 
      onComplete: () => {
        this.isFormed = true;
        if (this.resetButton) {
          (this.resetButton as HTMLButtonElement).disabled = false;
          this.resetButton.textContent = "Transform Again";
        }
      }
    });

    // Batch animations for 60+ FPS performance
    const batchSize = 60;
    for (let i = 0; i < this.particles.length; i += batchSize) {
      const batch = this.particles.slice(i, i + batchSize);
      
      tl.to(batch, {
        progress: 1,
        duration: 0.8, // 60% faster convergence
        ease: "power3.out",
        stagger: {
          amount: 0.35,
          from: "random",
          ease: "power2.out"
        },
        onUpdate: () => {
          batch.forEach(particle => {
            if (particle.progress > 0) {
              this.updateEnhancedParticlePosition(particle);
            }
          });
        }
      }, i === 0 ? 0 : "-=0.5");
    }

    // Formation progress tracking
    tl.to(this, {
      formationProgress: 1,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        this.updateStats();
      }
    }, 0);
  }

  updateEnhancedParticlePosition(particle: Particle) {
    const easeProgress = this.advancedEaseOutExpo(particle.progress);
    
    const currentX = particle.startX + (particle.targetX - particle.startX) * easeProgress;
    const currentY = particle.startY + (particle.targetY - particle.startY) * easeProgress;
    
    // Enhanced path curves for natural movement
    const pathCurve = Math.sin(particle.progress * Math.PI) * 18;
    const curveX = currentX + pathCurve * Math.cos(particle.progress * Math.PI * 2.2);
    const curveY = currentY + pathCurve * 0.4 * Math.sin(particle.progress * Math.PI * 2.8);
    
    gsap.set(particle.element, {
      attr: { cx: curveX, cy: curveY },
      scale: 0.6 + (particle.progress * 0.5),
      opacity: 0.3 + (particle.progress * 0.6)
    });
    
    if (particle.progress > 0.96 && !particle.formed) {
      particle.formed = true;
    }
  }

  advancedEaseOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
  }

  // Enhanced ripple effects with better visuals
  createEnhancedRippleEffect(x: number, y: number) {
    const rippleCount = 3;
    
    for (let i = 0; i < rippleCount; i++) {
      setTimeout(() => {
        const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ripple.setAttribute('cx', x.toString());
        ripple.setAttribute('cy', y.toString());
        ripple.setAttribute('r', '0');
        ripple.setAttribute('fill', 'none');
        ripple.setAttribute('stroke', i === 0 ? '#FFD700' : i === 1 ? '#DC143C' : '#FFF');
        ripple.setAttribute('stroke-width', (3 - i).toString());
        ripple.setAttribute('opacity', '0.9');
        
        this.svg.appendChild(ripple);
        
        gsap.to(ripple, {
          attr: { r: 120 + i * 30 },
          opacity: 0,
          duration: 1.2 + i * 0.3,
          ease: "power3.out",
          onComplete: () => {
            if (ripple.parentNode) {
              this.svg.removeChild(ripple);
            }
          }
        });
      }, i * 100);
    }
    
    // Enhanced particle interaction
    this.particles.forEach(particle => {
      const dx = x - parseFloat(particle.element.getAttribute('cx') || '0');
      const dy = y - parseFloat(particle.element.getAttribute('cy') || '0');
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 120) {
        const force = (120 - distance) / 120;
        
        if (this.isFormed) {
          particle.mouseOffsetX = -dx * force * 25;
          particle.mouseOffsetY = -dy * force * 25;
        } else {
          // Playground mode - stronger push
          particle.velocityX += -dx * force * 0.5;
          particle.velocityY += -dy * force * 0.5;
        }
        
        gsap.to(particle.element, {
          attr: { opacity: 1 },
          scale: 1.3 + force * 0.7,
          duration: 0.9,
          ease: "elastic.out(1, 0.4)",
          yoyo: true,
          repeat: 1
        });
      }
    });
  }

  // Start enhanced animation loop with 60+ FPS targeting
  startEnhancedAnimation() {
    const animate = (currentTime: number) => {
      if (this.lastTime === 0) this.lastTime = currentTime;
      const deltaTime = currentTime - this.lastTime;
      
      // Calculate FPS
      this.frameCount++;
      if (deltaTime >= 1000) {
        this.fps = Math.round(this.frameCount * 1000 / deltaTime);
        this.frameCount = 0;
        this.lastTime = currentTime;
        this.updateStats();
      }
      
      // Update physics
      this.updateAdvancedPhysics();
      
      // Continue animation loop
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    this.animationFrame = requestAnimationFrame(animate);
  }

  // Enhanced event listeners with keyboard shortcuts
  setupEnhancedEventListeners() {
    // Mouse tracking for physics
    const handleMouseMove = (e: MouseEvent) => {
      const rect = this.svg.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.isMouseMoving = true;
      
      // Reset mouse moving flag after delay
      clearTimeout(this.mouseTimeout);
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false;
      }, 150);
    };

    // Click for ripple effects
    const handleClick = (e: MouseEvent) => {
      const rect = this.svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.createEnhancedRippleEffect(x, y);
    };

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          if (this.isFormed) {
            this.resetToPlayground();
          } else {
            this.animateEnhancedFormation();
          }
          break;
        case 'KeyR':
          e.preventDefault();
          this.resetToPlayground();
          break;
        case 'KeyS':
          e.preventDefault();
          this.toggleStats();
          break;
      }
    };

    // Mouse leave - automatic reconvergence
    const handleMouseLeave = () => {
      this.isMouseMoving = false;
      if (this.isFormed) {
        this.autoReconvergence();
      }
    };

    // Window resize handler
    const handleResize = () => {
      this.setupCanvas();
      this.generateButterflyShape();
      if (this.isFormed) {
        this.updateParticleTargets();
      }
    };

    // Add event listeners
    this.svg.addEventListener('mousemove', handleMouseMove);
    this.svg.addEventListener('click', handleClick);
    this.svg.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    
    // Reset button click handler
    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => {
        if (this.isFormed) {
          this.resetToPlayground();
        } else {
          this.animateEnhancedFormation();
        }
      });
    }

    // Store cleanup function
    this.cleanup = () => {
      this.svg.removeEventListener('mousemove', handleMouseMove);
      this.svg.removeEventListener('click', handleClick);
      this.svg.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (this.resetButton) {
        this.resetButton.removeEventListener('click', () => {});
      }
    };
  }

  // Update stats display
  updateStats() {
    if (this.particleCountEl) {
      this.particleCountEl.textContent = this.particles.length.toString();
    }
    if (this.formationProgressEl) {
      this.formationProgressEl.textContent = `${Math.round(this.formationProgress * 100)}%`;
    }
    if (this.animationSpeedEl) {
      this.animationSpeedEl.textContent = `${this.fps}`;
    }
    if (this.progressFillEl) {
      this.progressFillEl.style.width = `${this.formationProgress * 100}%`;
    }
  }

  // Reset to playground mode
  resetToPlayground() {
    this.isFormed = false;
    this.isResetting = true;
    this.formationProgress = 0;
    
    if (this.resetButton) {
      (this.resetButton as HTMLButtonElement).disabled = true;
      this.resetButton.textContent = "Resetting...";
    }

    // Animate particles back to random positions
    this.particles.forEach((particle, index) => {
      const newStart = this.getRandomStartPosition();
      particle.startX = newStart.x;
      particle.startY = newStart.y;
      particle.formed = false;
      particle.progress = 0;
      particle.velocityX = 0;
      particle.velocityY = 0;
      particle.mouseOffsetX = 0;
      particle.mouseOffsetY = 0;
      
      gsap.to(particle.element, {
        attr: { 
          cx: newStart.x, 
          cy: newStart.y 
        },
        scale: 1,
        opacity: 0.6,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.002, // Staggered animation
        onComplete: () => {
          if (index === this.particles.length - 1) {
            this.isResetting = false;
            this.startPlaygroundMode();
            if (this.resetButton) {
              (this.resetButton as HTMLButtonElement).disabled = false;
              this.resetButton.textContent = "Transform";
            }
          }
        }
      });
    });

    this.updateStats();
  }

  // Auto-reconvergence when mouse leaves
  autoReconvergence() {
    this.particles.forEach(particle => {
      if (particle.formed) {
        gsap.to(particle, {
          mouseOffsetX: 0,
          mouseOffsetY: 0,
          duration: 1.2,
          ease: "power2.out"
        });
      }
    });
  }

  // Update particle targets after resize
  updateParticleTargets() {
    this.particles.forEach((particle, index) => {
      if (index < this.butterflyPoints.length) {
        const point = this.butterflyPoints[index];
        particle.targetX = point.x;
        particle.targetY = point.y;
        particle.originalTargetX = point.x;
        particle.originalTargetY = point.y;
      }
    });
  }
  // Toggle stats display
  toggleStats() {
    // This will be handled by the React component
    const event = new CustomEvent('toggleStats');
    window.dispatchEvent(event);
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.cleanup) {
      this.cleanup();
    }
    this.particles.forEach(particle => {
      if (particle.element && particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element);
      }
    });
    this.particles = [];
  }

  // Properties for cleanup and mouse timeout
  private cleanup?: () => void;
  private mouseTimeout?: ReturnType<typeof setTimeout>;
}

const HeaderWithParticles: React.FC<HeaderWithParticlesProps> = ({ 
  isActive = false, 
  scrollToSection,
  playClickSound 
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const particleSystemRef = useRef<OptimizedParticleSystem | null>(null);
  
  // UI element refs
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const particleCountRef = useRef<HTMLSpanElement>(null);
  const formationProgressRef = useRef<HTMLSpanElement>(null);
  const animationSpeedRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  
  const [showStats, setShowStats] = useState(false);
  const { isDark } = useTheme();
  const { playClickSound: contextPlayClickSound } = useSound();
  
  const handleClick = () => {
    if (playClickSound) {
      playClickSound();
    } else if (contextPlayClickSound) {
      contextPlayClickSound();
    }
  };
  // Initialize particle system
  useEffect(() => {
    if (svgRef.current && !particleSystemRef.current) {
      const uiElements = {
        resetButton: resetButtonRef.current,
        particleCount: particleCountRef.current,
        formationProgress: formationProgressRef.current,
        animationSpeed: animationSpeedRef.current,
        progressFill: progressFillRef.current
      };
      
      particleSystemRef.current = new OptimizedParticleSystem(svgRef.current, uiElements);
    }

    // Stats toggle event listener
    const handleToggleStats = () => {
      setShowStats(prev => !prev);
    };

    window.addEventListener('toggleStats', handleToggleStats);

    return () => {
      window.removeEventListener('toggleStats', handleToggleStats);
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
        particleSystemRef.current = null;
      }
    };
  }, []);

  // Handle section activation
  useEffect(() => {
    if (!contentRef.current || !topBarRef.current) return;
    
    const ctx = gsap.context(() => {
      if (isActive) {
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 });
        gsap.to(topBarRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
      } else {
        gsap.to(contentRef.current, { opacity: 0, y: 20, duration: 0.3 });
        gsap.to(topBarRef.current, { opacity: 0, y: -10, duration: 0.3 });
      }
    }, headerRef.current);
    
    return () => {
      ctx.revert();
    };  }, [isActive]);
  const goldButtonClasses = `shine-button px-6 py-3 rounded-md font-semibold transform hover:-translate-y-1 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-sm relative overflow-hidden ${
    isDark 
      ? 'bg-[#FFD700] text-black hover:bg-[#ea384c] hover:text-white' 
      : 'bg-[#F9D75D] text-black hover:bg-[#ea384c] hover:text-white'
  }`;return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Particle Canvas Background */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto"
        style={{ 
          background: '#000000' // Solid black background like footer
        }}
      />

      {/* Header Content */}
      <section
        ref={headerRef}
        className="relative h-screen w-full flex flex-col justify-center items-center text-center p-0 text-white overflow-hidden antialiased z-10"
      >        {/* Top Bar for Logo and Navigation */}
        <div 
          ref={topBarRef}
          className={`absolute top-0 left-0 right-0 z-20 p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center opacity-0 transform -translate-y-5 gap-3 sm:gap-0 transition-colors duration-300 ${
            isDark 
              ? 'bg-black/20 backdrop-blur-lg border-b border-white/10' 
              : 'bg-white/5 backdrop-blur-lg border-b border-gray-600/20'
          }`}
        >
          {/* Logo (3D Hyper-Realistic Rotating Earth) */}
          <Link to="/" aria-label="GLOHSEN Home" className="flex-shrink-0" onClick={handleClick}>
            <Logo3DHyperRealistic size={56} className="flex-shrink-0" />
          </Link>

          {/* Navigation Buttons */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 md:gap-4 max-w-full">
            <Link to="/about-us" className={`${goldButtonClasses} text-xs sm:text-sm px-3 py-2 sm:px-4 md:px-6 md:py-3`} onClick={handleClick}>ABOUT US</Link>
            <Link to="/signin" className={`${goldButtonClasses} text-xs sm:text-sm px-3 py-2 sm:px-4 md:px-6 md:py-3`} onClick={handleClick}>SIGN IN</Link>
            <Link to="/signup" className={`${goldButtonClasses} text-xs sm:text-sm px-3 py-2 sm:px-4 md:px-6 md:py-3`} onClick={handleClick}>SIGN UP</Link>
            <Link to="/feedback" className={`${goldButtonClasses} text-xs sm:text-sm px-3 py-2 sm:px-4 md:px-6 md:py-3`} onClick={handleClick}>LEAVE FEEDBACK</Link>
            <Link 
              to="/games-quizzes" 
              className={`shine-button rounded-md font-semibold transform hover:-translate-y-1 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-xs sm:text-sm relative overflow-hidden px-3 py-2 sm:px-4 md:px-5 md:py-2.5 ${
                isDark 
                  ? 'bg-[#FFD700] text-black hover:bg-[#ea384c] hover:text-white' 
                  : 'bg-[#FFD700] text-black hover:bg-[#ea384c] hover:text-white'
              }`}
              onClick={handleClick}
            >
              GAMES & QUIZZES
            </Link>
          </nav>
        </div>        {/* Main Content (Centered) */}
        <div ref={contentRef} className="relative z-10 flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 opacity-0 px-4 max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animated-shine-text metallic-gold-text text-center">
            <span className="micro-interact animated-shine-text metallic-gold-text block sm:inline">WELCOME TO GLOHSEN:</span>
            <br className="hidden sm:block"/> 
            <span className="micro-interact animated-shine-text metallic-gold-text block sm:inline">YOUR STORY BEGINS HERE</span>
          </h1>

          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-sm sm:max-w-xl md:max-w-2xl leading-relaxed md:leading-loose micro-interact text-center transition-colors duration-300 ${
            isDark ? 'text-gray-200' : 'text-gray-300'
          }`}>
            Dive into a Universe of Fun & Resourcefulness, for You by Us.
            Watch the magical transformation as chaos converges into beauty.
          </p>
            
            {/* Interactive Scroll Button */}
            <div 
              className="mt-8 cursor-pointer transform hover:scale-110 transition-transform duration-300" 
              onClick={() => {
                handleClick();
                if (scrollToSection) {
                  scrollToSection(1);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick();
                  if (scrollToSection) {
                    scrollToSection(1);
                  }
                }
              }}
              aria-label="Scroll to next section"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-10 h-10 animate-bounce transition-colors duration-300 ${
                isDark ? 'text-yellow-300' : 'text-yellow-400'
              }`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 19.5l7.5-7.5-7.5-7.5m6 15l7.5-7.5-7.5-7.5" />
              </svg>            </div>
          </div>

        {/* Particle System Stats Panel */}
        <div 
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 backdrop-blur-lg border rounded-2xl p-4 min-w-[200px] transition-all duration-300 ${
            showStats ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } ${
            isDark 
              ? 'bg-white/10 border-white/20' 
              : 'bg-white/5 border-white/10'
          }`}
        >
          <div className="text-center mb-3">
            <span ref={particleCountRef} className="block text-2xl font-bold text-[#FFD700] mb-1">0</span>
            <span className="text-sm text-white/70">Active Particles</span>
          </div>
          <div className="text-center mb-3">
            <span ref={formationProgressRef} className="block text-2xl font-bold text-[#FFD700] mb-1">0%</span>
            <span className="text-sm text-white/70">Formation</span>
          </div>
          <div className="text-center">
            <span ref={animationSpeedRef} className="block text-2xl font-bold text-[#FFD700] mb-1">60</span>
            <span className="text-sm text-white/70">FPS</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-sm transition-colors duration-300 ${
          isDark ? 'text-white/70' : 'text-white/60'
        }`}>
          <span>Formation Progress</span>
          <div className={`w-48 h-0.5 rounded overflow-hidden transition-colors duration-300 ${
            isDark ? 'bg-white/20' : 'bg-white/10'
          }`}>
            <div ref={progressFillRef} className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFED4E] w-0 transition-all duration-100"></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            ref={resetButtonRef}
            className={`border px-6 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-lg ${
              isDark 
                ? 'bg-white/15 border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/20' 
                : 'bg-white/10 border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/15'
            }`}
          >
            Transform Again
          </button>
          <button
            onClick={() => setShowStats(!showStats)}
            className={`border px-6 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-lg ${
              isDark 
                ? 'bg-white/15 border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/20' 
                : 'bg-white/10 border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/15'
            }`}
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>
      </section>
      
      {/* Theme Toggle Button */}
      <ThemeToggle />
    </div>
  );
};

export default HeaderWithParticles;
