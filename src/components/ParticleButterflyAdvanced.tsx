import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ParticleButterflyAdvancedProps {
  className?: string;
}

const ParticleButterflyAdvanced: React.FC<ParticleButterflyAdvancedProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  
  const [isVisible, setIsVisible] = useState(false);
  const [performanceStats, setPerformanceStats] = useState({
    fps: 60,
    particleCount: 2000,
    renderTime: 0
  });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Particle system setup
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    // Initialize butterfly shape points
    const butterflyPoints: THREE.Vector3[] = [];
    
    // Generate butterfly wing pattern
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 4;
      const wing1 = Math.sin(t) * Math.cos(t) * Math.log(t);
      const wing2 = Math.sin(t) * Math.sin(t) * Math.log(t);
      
      let x, y, z;
      
      if (i < particleCount / 2) {
        // Right wing
        x = Math.abs(wing1) * 15;
        y = wing2 * 10;
      } else {
        // Left wing
        x = -Math.abs(wing1) * 15;
        y = wing2 * 10;
      }
      
      z = (Math.random() - 0.5) * 5;
      
      butterflyPoints.push(new THREE.Vector3(x, y, z));
      
      // Set original positions
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      // Set initial scattered positions
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Set velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      
      // Set colors with butterfly wing gradient
      const hue = 0.7 + Math.sin(t) * 0.2;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    // Create geometry and material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // Animation state
    let formingButterfly = false;
    let dispersing = false;
    let animationProgress = 0;

    // Mouse interaction
    const onMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const onMouseClick = () => {
      if (!formingButterfly && !dispersing) {
        formingButterfly = true;
        animationProgress = 0;
      } else if (formingButterfly && animationProgress > 0.8) {
        dispersing = true;
        formingButterfly = false;
        animationProgress = 0;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);

    // Animation loop
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
          renderTime: deltaTime
        }));
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      const time = clockRef.current.getElapsedTime();
      const positions = geometry.attributes.position.array as Float32Array;

      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        if (formingButterfly) {
          // Animate towards butterfly formation
          animationProgress = Math.min(animationProgress + 0.02, 1);
          const easing = 1 - Math.pow(1 - animationProgress, 3); // Ease out cubic

          positions[i3] = THREE.MathUtils.lerp(positions[i3], originalPositions[i3], easing * 0.1);
          positions[i3 + 1] = THREE.MathUtils.lerp(positions[i3 + 1], originalPositions[i3 + 1], easing * 0.1);
          positions[i3 + 2] = THREE.MathUtils.lerp(positions[i3 + 2], originalPositions[i3 + 2], easing * 0.1);

        } else if (dispersing) {
          // Animate away from butterfly formation
          animationProgress = Math.min(animationProgress + 0.03, 1);
          
          positions[i3] += velocities[i3] * (1 + animationProgress * 2);
          positions[i3 + 1] += velocities[i3 + 1] * (1 + animationProgress * 2);
          positions[i3 + 2] += velocities[i3 + 2] * (1 + animationProgress * 2);

          if (animationProgress >= 1) {
            dispersing = false;
            // Reset positions randomly
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 100;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;
          }

        } else {
          // Free floating animation
          positions[i3] += Math.sin(time + i * 0.01) * 0.1;
          positions[i3 + 1] += Math.cos(time + i * 0.01) * 0.1;
          positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.02) * 0.05;

          // Mouse interaction
          const mouseInfluence = 10;
          const mouseX = mouseRef.current.x * 50;
          const mouseY = mouseRef.current.y * 50;
          
          const dx = mouseX - positions[i3];
          const dy = mouseY - positions[i3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseInfluence) {
            const force = (mouseInfluence - distance) / mouseInfluence;
            positions[i3] += dx * force * 0.01;
            positions[i3 + 1] += dy * force * 0.01;
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Rotate the whole system slightly
      if (particleSystem) {
        particleSystem.rotation.z += 0.001;
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
      if (mountRef.current && renderer && camera) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
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
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Performance Stats Overlay */}
      {isVisible && (
        <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm text-white p-3 rounded-lg font-mono text-sm">
          <div className="space-y-1">
            <div>FPS: <span className="text-green-400">{performanceStats.fps}</span></div>
            <div>Particles: <span className="text-blue-400">{performanceStats.particleCount}</span></div>
            <div>Render: <span className="text-yellow-400">{performanceStats.renderTime.toFixed(1)}ms</span></div>
            <div className="text-xs text-gray-300 mt-2">Click to form butterfly</div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white p-3 rounded-lg text-sm max-w-xs">
        <div className="space-y-1">
          <div className="font-semibold text-purple-300">3D Particle Butterfly</div>
          <div className="text-xs text-gray-300">
            • Move mouse to interact with particles<br/>
            • Click to form/disperse butterfly shape<br/>
            • WebGL hardware acceleration active
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticleButterflyAdvanced;
