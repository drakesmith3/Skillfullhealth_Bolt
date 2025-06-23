import React, { useEffect, useState } from "react";

// Standard favicon sizes: 16x16, 32x32, 48x48
const FAVICON_SIZE = 32; // Standard favicon size
const EARTH_SIZE = 10; // Smaller earth for better visibility
const SUN_SIZE = 20;   // Larger sun for better contrast
const ORBIT_RADIUS = 6; // Tighter orbit for favicon
const FAST_SPIN_DEG = 12; // Slower spin for better visibility
const FAST_ORBIT_DEG = 3; // Slower orbit for better visibility

const LogoFavicon = () => {
  const [earthAngle, setEarthAngle] = useState(0);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    let running = true;
    function spin() {
      setEarthAngle(a => (a + FAST_SPIN_DEG) % 360);
      setOrbitAngle(a => (a + FAST_ORBIT_DEG) % 360);
      if (running) requestAnimationFrame(spin);
    }
    requestAnimationFrame(spin);
    return () => { running = false; };
  }, []);
  // Calculate earth's orbital position within favicon bounds
  const centerX = FAVICON_SIZE / 2;
  const centerY = FAVICON_SIZE / 2;
  const sunRadius = SUN_SIZE / 2;
  const earthRadius = EARTH_SIZE / 2;
  
  const earthX = centerX + ORBIT_RADIUS * Math.cos((orbitAngle * Math.PI) / 180) - earthRadius;
  const earthY = centerY + ORBIT_RADIUS * Math.sin((orbitAngle * Math.PI) / 180) - earthRadius;
  return (
    <span
      style={{
        display: "inline-block",
        width: FAVICON_SIZE,
        height: FAVICON_SIZE,
        verticalAlign: "middle",
        position: "relative",
        minWidth: FAVICON_SIZE, // Ensure minimum size
        minHeight: FAVICON_SIZE
      }}
      aria-label="Spinning Earth Orbiting Sun Logo"
      role="img"
    >      {/* Sun - centered in favicon */}
      <svg
        width={SUN_SIZE}
        height={SUN_SIZE}
        style={{
          position: "absolute",
          left: centerX - sunRadius,
          top: centerY - sunRadius,
          zIndex: 2
        }}
        viewBox={`0 0 ${SUN_SIZE} ${SUN_SIZE}`}
      >
        <defs>
          <radialGradient id="sunGold" cx="50%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#fffbe6" />
            <stop offset="40%" stopColor="#ffe066" />
            <stop offset="80%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#a8891a" />
          </radialGradient>
        </defs>
        <circle
          cx={SUN_SIZE / 2}
          cy={SUN_SIZE / 2}
          r={SUN_SIZE / 2 - 1}
          fill="url(#sunGold)"
          stroke="#fff"
          strokeWidth="0.5"
        />
      </svg>      {/* Earth - orbiting around sun */}
      <svg
        width={EARTH_SIZE}
        height={EARTH_SIZE}
        style={{
          position: "absolute",
          left: earthX,
          top: earthY,
          zIndex: 3,
          transform: `rotate(${earthAngle}deg)`,
          transition: "transform 0.1s linear"
        }}
        viewBox="0 0 32 32"
      >
        <defs>
          <radialGradient id="earthBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b3e6ff" />
            <stop offset="80%" stopColor="#1e90ff" />
            <stop offset="100%" stopColor="#003366" />
          </radialGradient>
          <linearGradient id="earthLand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e6e6b3" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#earthBlue)" stroke="#fff" strokeWidth="1" />
        <ellipse cx="13" cy="18" rx="5" ry="3" fill="url(#earthLand)" opacity="0.8" />
        <ellipse cx="20" cy="13" rx="3" ry="2" fill="url(#earthLand)" opacity="0.7" />
        <ellipse cx="20" cy="20" rx="2" ry="1" fill="url(#earthLand)" opacity="0.6" />
        <ellipse cx="16" cy="14" rx="6" ry="1.5" fill="#fff" opacity="0.15" />
      </svg>
    </span>
  );
};

export default LogoFavicon;

// Usage in header component or favicon generation:
// <LogoFavicon />
// For actual favicon, render to canvas and convert to .ico/.png format
