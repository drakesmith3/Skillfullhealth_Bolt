import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderWithParticles from '../components/HeaderWithParticles';
import HeaderWithParticlesOptimized from '../components/HeaderWithParticlesOptimized';
import ParticleButterflyAdvanced from '../components/ParticleButterflyAdvanced';

const ParticlePerformanceTest: React.FC = () => {
  const [activeVersion, setActiveVersion] = useState<'original' | 'optimized' | 'butterfly'>('original');

  return (
    <div className="relative">
      {/* Version Selector */}
      <div className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg p-4">
        <h3 className="text-white font-bold mb-3">Performance Comparison</h3>        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveVersion('original')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeVersion === 'original'
                ? 'bg-blue-600 text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            Original SVG Version
          </button>
          <button
            onClick={() => setActiveVersion('optimized')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeVersion === 'optimized'
                ? 'bg-green-600 text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            Three.js Optimized
          </button>
          <button
            onClick={() => setActiveVersion('butterfly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeVersion === 'butterfly'
                ? 'bg-purple-600 text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            3D Butterfly Experience
          </button>
        </div>        <div className="mt-4 pt-3 border-t border-white/20">
          <Link 
            to="/" 
            className="text-yellow-400 hover:text-yellow-300 text-sm underline block mb-2"
          >
            ← Back to Home
          </Link>
          <Link 
            to="/butterfly-experience" 
            className="text-purple-400 hover:text-purple-300 text-sm underline"
          >
            🦋 Full Butterfly Experience
          </Link>
        </div>
      </div>

      {/* Performance Info Panel */}      <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg p-4 min-w-[300px]">
        <h3 className="text-white font-bold mb-3">
          {activeVersion === 'original' 
            ? 'SVG Particle System' 
            : activeVersion === 'optimized' 
            ? 'Three.js GPU Accelerated'
            : '3D Butterfly Experience'}
        </h3>
        
        {activeVersion === 'original' ? (
          <div className="text-sm text-white/80 space-y-2">
            <div>• <span className="text-blue-400">SVG-based rendering</span></div>
            <div>• <span className="text-blue-400">CPU particle physics</span></div>
            <div>• <span className="text-blue-400">GSAP batch animations</span></div>
            <div>• <span className="text-blue-400">1500 particles</span></div>
            <div>• <span className="text-blue-400">60-particle batches</span></div>
            <div>• <span className="text-blue-400">Advanced spring physics</span></div>
          </div>
        ) : activeVersion === 'optimized' ? (
          <div className="text-sm text-white/80 space-y-2">
            <div>• <span className="text-green-400">WebGL rendering</span></div>
            <div>• <span className="text-green-400">GPU-accelerated physics</span></div>
            <div>• <span className="text-green-400">Three.js optimization</span></div>
            <div>• <span className="text-green-400">1500 particles</span></div>
            <div>• <span className="text-green-400">Hardware acceleration</span></div>
            <div>• <span className="text-green-400">Buffer geometry</span></div>
          </div>
        ) : (
          <div className="text-sm text-white/80 space-y-2">
            <div>• <span className="text-purple-400">3D Butterfly formation</span></div>
            <div>• <span className="text-purple-400">2000 dynamic particles</span></div>
            <div>• <span className="text-purple-400">Advanced morphing</span></div>
            <div>• <span className="text-purple-400">Real-time interaction</span></div>
            <div>• <span className="text-purple-400">Mathematical patterns</span></div>
            <div>• <span className="text-purple-400">Immersive experience</span></div>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-white/20">
          <div className="text-xs text-white/60">
            Compare FPS, responsiveness, and visual quality between implementations
          </div>
        </div>
      </div>      {/* Render Active Version */}
      {activeVersion === 'original' ? (
        <HeaderWithParticles isActive={true} />
      ) : activeVersion === 'optimized' ? (
        <HeaderWithParticlesOptimized isActive={true} />
      ) : (
        <div className="w-full h-screen">
          <ParticleButterflyAdvanced className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default ParticlePerformanceTest;
