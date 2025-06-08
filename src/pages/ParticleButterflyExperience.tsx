import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ArrowLeft, Info, Settings, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ParticleButterflyExperience: React.FC = () => {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  
  const [isVisible, setIsVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [performanceStats, setPerformanceStats] = useState({
    fps: 60,
    particleCount: 3000,
    renderTime: 0,
    isFormingButterfly: false,
    animationProgress: 0
  });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with enhanced environment
    const scene = new THREE.Scene();
    const gradient = new THREE.Color(0x000511);
    scene.background = gradient;
    scene.fog = new THREE.Fog(0x000511, 50, 200);
    sceneRef.current = scene;

    // Camera setup with better positioning
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 60);
    cameraRef.current = camera;

    // Enhanced renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Point light for depth
    const pointLight = new THREE.PointLight(0x9966ff, 1, 100);
    pointLight.position.set(0, 0, 50);
    scene.add(pointLight);

    // Enhanced particle system
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Generate enhanced butterfly wing pattern using Lorenz equations
    const butterflyPoints: THREE.Vector3[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 6;
      const r = Math.sin(t) * Math.cos(t) * Math.log(Math.abs(t) + 1);
      
      let x, y, z;
      
      if (i < particleCount / 2) {
        // Right wing with enhanced mathematical curves
        x = Math.abs(r) * 20 * Math.sin(t * 0.5);
        y = r * 15 * Math.cos(t * 0.3);
      } else {
        // Left wing (mirrored)
        x = -Math.abs(r) * 20 * Math.sin(t * 0.5);
        y = r * 15 * Math.cos(t * 0.3);
      }
      
      z = Math.sin(t * 2) * 8;
      
      butterflyPoints.push(new THREE.Vector3(x, y, z));
      
      // Set original butterfly positions
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      // Set initial scattered positions in a sphere
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 60 + Math.random() * 40;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Set velocities for organic movement
      velocities[i * 3] = (Math.random() - 0.5) * 0.8;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      
      // Enhanced color system with iridescent effect
      const wingPos = i < particleCount / 2 ? 1 : -1;
      const distanceFromCenter = Math.sqrt(x * x + y * y) / 20;
      const hue = 0.7 + Math.sin(t + distanceFromCenter) * 0.3;
      const saturation = 0.8 + Math.sin(t * 2) * 0.2;
      const lightness = 0.5 + Math.sin(distanceFromCenter * 4) * 0.3;
      
      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Variable particle sizes
      sizes[i] = 1 + Math.random() * 3;
    }

    // Create enhanced geometry and material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Enhanced particle material with custom shader-like properties
    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      alphaTest: 0.1
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // Animation state
    let formingButterfly = false;
    let dispersing = false;
    let animationProgress = 0;
    let autoFormTimer = 0;
    let lastFormTime = 0;

    // Enhanced mouse interaction
    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseClick = () => {
      if (!formingButterfly && !dispersing) {
        formingButterfly = true;
        animationProgress = 0;
        setPerformanceStats(prev => ({ ...prev, isFormingButterfly: true }));
      } else if (formingButterfly && animationProgress > 0.7) {
        dispersing = true;
        formingButterfly = false;
        animationProgress = 0;
        setPerformanceStats(prev => ({ ...prev, isFormingButterfly: false }));
      }
    };

    // Keyboard controls
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space':
          onMouseClick();
          break;
        case 'KeyI':
          setShowInfo(prev => !prev);
          break;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
    window.addEventListener('keydown', onKeyDown);

    // Enhanced animation loop
    let lastTime = 0;
    let frameCount = 0;
    let lastFpsUpdate = 0;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // FPS calculation
      frameCount++;
      if (currentTime - lastFpsUpdate >= 1000) {
        setPerformanceStats(prev => ({
          ...prev,
          fps: Math.round(frameCount * 1000 / (currentTime - lastFpsUpdate)),
          renderTime: deltaTime,
          animationProgress: Math.round(animationProgress * 100)
        }));
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      const time = clockRef.current.getElapsedTime();
      const positions = geometry.attributes.position.array as Float32Array;
      const colors = geometry.attributes.color.array as Float32Array;

      // Auto-formation every 15 seconds
      autoFormTimer += deltaTime;
      if (autoFormTimer > 15000 && !formingButterfly && !dispersing && currentTime - lastFormTime > 5000) {
        formingButterfly = true;
        animationProgress = 0;
        autoFormTimer = 0;
        lastFormTime = currentTime;
        setPerformanceStats(prev => ({ ...prev, isFormingButterfly: true }));
      }

      // Update particles with enhanced physics
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        if (formingButterfly) {
          // Enhanced formation animation with spring physics
          animationProgress = Math.min(animationProgress + 0.015, 1);
          const easing = 1 - Math.pow(1 - animationProgress, 4); // Stronger ease-out
          
          const targetX = originalPositions[i3];
          const targetY = originalPositions[i3 + 1];
          const targetZ = originalPositions[i3 + 2];
          
          // Spring-like movement towards target
          const springForce = 0.15;
          const damping = 0.95;
          
          velocities[i3] = (velocities[i3] + (targetX - positions[i3]) * springForce) * damping;
          velocities[i3 + 1] = (velocities[i3 + 1] + (targetY - positions[i3 + 1]) * springForce) * damping;
          velocities[i3 + 2] = (velocities[i3 + 2] + (targetZ - positions[i3 + 2]) * springForce) * damping;
          
          positions[i3] += velocities[i3] * easing;
          positions[i3 + 1] += velocities[i3 + 1] * easing;
          positions[i3 + 2] += velocities[i3 + 2] * easing;

          if (animationProgress >= 0.95) {
            setTimeout(() => {
              if (formingButterfly) {
                dispersing = true;
                formingButterfly = false;
                animationProgress = 0;
                setPerformanceStats(prev => ({ ...prev, isFormingButterfly: false }));
              }
            }, 3000); // Hold butterfly form for 3 seconds
          }

        } else if (dispersing) {
          // Enhanced dispersion with explosion-like effect
          animationProgress = Math.min(animationProgress + 0.02, 1);
          const explosionForce = 2 + animationProgress * 3;
          
          positions[i3] += velocities[i3] * explosionForce;
          positions[i3 + 1] += velocities[i3 + 1] * explosionForce;
          positions[i3 + 2] += velocities[i3 + 2] * explosionForce;

          if (animationProgress >= 1) {
            dispersing = false;
            // Reset to new random positions
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            const radius = 60 + Math.random() * 40;
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);
            
            velocities[i3] = (Math.random() - 0.5) * 0.8;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.8;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.4;
          }

        } else {
          // Enhanced free floating with organic movement
          const noiseScale = 0.01;
          const timeOffset = time + i * 0.01;
          
          positions[i3] += Math.sin(timeOffset) * 0.2 + velocities[i3] * 0.5;
          positions[i3 + 1] += Math.cos(timeOffset * 0.7) * 0.15 + velocities[i3 + 1] * 0.5;
          positions[i3 + 2] += Math.sin(timeOffset * 0.5) * 0.1 + velocities[i3 + 2] * 0.3;
          
          // Enhanced mouse interaction with attractive/repulsive forces
          const mouseInfluence = 15;
          const mouseX = mouseRef.current.x * 60;
          const mouseY = mouseRef.current.y * 60;
          
          const dx = mouseX - positions[i3];
          const dy = mouseY - positions[i3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseInfluence) {
            const force = (mouseInfluence - distance) / mouseInfluence;
            const attraction = Math.sin(time + i * 0.1) > 0 ? 1 : -1; // Alternating attraction/repulsion
            
            positions[i3] += dx * force * 0.02 * attraction;
            positions[i3 + 1] += dy * force * 0.02 * attraction;
          }
          
          // Color animation for floating particles
          const colorShift = Math.sin(time * 0.5 + i * 0.02) * 0.1;
          const originalHue = 0.7 + Math.sin(i * 0.1) * 0.3;
          const newColor = new THREE.Color().setHSL(originalHue + colorShift, 0.8, 0.6);
          
          colors[i3] = newColor.r;
          colors[i3 + 1] = newColor.g;
          colors[i3 + 2] = newColor.b;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Enhanced camera movement
      if (particleSystem) {
        particleSystem.rotation.z += 0.002;
        
        // Subtle camera oscillation
        camera.position.x = Math.sin(time * 0.1) * 5;
        camera.position.y = Math.cos(time * 0.15) * 3;
        camera.lookAt(0, 0, 0);
      }

      // Render
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationIdRef.current = requestAnimationFrame(animate);
    setIsVisible(true);

    // Handle resize
    const handleResize = () => {
      if (renderer && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-indigo-950 to-black">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Navigation */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Info Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex items-center gap-2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          <Info size={20} />
          <span>{showInfo ? 'Hide' : 'Show'} Info</span>
        </button>
      </div>

      {/* Performance Stats */}
      {isVisible && showInfo && (
        <div className="absolute top-20 left-4 bg-black/20 backdrop-blur-sm text-white p-4 rounded-lg font-mono text-sm max-w-xs">
          <div className="space-y-2">
            <div className="text-purple-300 font-bold text-base">Performance Monitor</div>
            <div>FPS: <span className={`${performanceStats.fps >= 50 ? 'text-green-400' : performanceStats.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>{performanceStats.fps}</span></div>
            <div>Particles: <span className="text-blue-400">{performanceStats.particleCount.toLocaleString()}</span></div>
            <div>Render: <span className="text-yellow-400">{performanceStats.renderTime.toFixed(1)}ms</span></div>
            <div>Progress: <span className="text-purple-400">{performanceStats.animationProgress}%</span></div>
            <div className="text-xs text-gray-300 mt-2 pt-2 border-t border-white/20">
              Status: {performanceStats.isFormingButterfly ? 
                <span className="text-green-400">Forming Butterfly</span> : 
                <span className="text-blue-400">Free Floating</span>}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {showInfo && (
        <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white p-4 rounded-lg text-sm max-w-sm">
          <div className="space-y-2">
            <div className="font-semibold text-purple-300 text-lg">3D Particle Butterfly Experience</div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>🖱️ <strong>Mouse:</strong> Move to interact with particles</div>
              <div>🖱️ <strong>Click:</strong> Form/disperse butterfly shape</div>
              <div>⌨️ <strong>Space:</strong> Toggle butterfly formation</div>
              <div>⌨️ <strong>I:</strong> Toggle info panels</div>
              <div className="pt-2 border-t border-white/20">
                <div>✨ Auto-formation every 15 seconds</div>
                <div>🎨 {performanceStats.particleCount.toLocaleString()} particles with WebGL acceleration</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Title Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Particle Butterfly
          </h1>
          <p className="text-xl text-white/70">Advanced 3D Interactive Experience</p>
        </div>
      </div>
    </div>
  );
};

export default ParticleButterflyExperience;
