import React, { useEffect, useState } from "react";

const EARTH_SIZE = 18; // Even smaller for favicon
const SUN_SIZE = 32;   // Sun is bigger than earth
const ORBIT_RADIUS = 10; // Small orbit for favicon
const FAST_SPIN_DEG = 24; // Very fast spin per frame
const FAST_ORBIT_DEG = 6; // Fast orbit per frame

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

  // Calculate earth's orbital position
  const sunCenter = SUN_SIZE / 2;
  const earthCenter = EARTH_SIZE / 2;
  const earthX =
    sunCenter +
    ORBIT_RADIUS * Math.cos((orbitAngle * Math.PI) / 180) -
    earthCenter;
  const earthY =
    sunCenter +
    ORBIT_RADIUS * Math.sin((orbitAngle * Math.PI) / 180) -
    earthCenter;

  return (
    <span
      style={{
        display: "inline-block",
        width: SUN_SIZE + ORBIT_RADIUS * 2,
        height: SUN_SIZE + ORBIT_RADIUS * 2,
        verticalAlign: "middle",
        position: "relative"
      }}
      aria-label="Spinning Earth Orbiting Sun Logo"
      role="img"
    >
      {/* Sun */}
      <svg
        width={SUN_SIZE}
        height={SUN_SIZE}
        style={{
          position: "absolute",
          left: ORBIT_RADIUS,
          top: ORBIT_RADIUS,
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
          stroke="#fff8"
          strokeWidth="1"
        />
      </svg>
      {/* Earth */}
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
        viewBox="0 0 96 96"
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
        <circle cx="48" cy="48" r="44" fill="url(#earthBlue)" stroke="#fff" strokeWidth="2" />
        <ellipse cx="38" cy="56" rx="16" ry="8" fill="url(#earthLand)" opacity="0.8" />
        <ellipse cx="60" cy="38" rx="10" ry="5" fill="url(#earthLand)" opacity="0.7" />
        <ellipse cx="60" cy="60" rx="6" ry="3" fill="url(#earthLand)" opacity="0.6" />
        <ellipse cx="48" cy="40" rx="20" ry="4" fill="#fff" opacity="0.18" />
        <ellipse cx="60" cy="54" rx="10" ry="2" fill="#fff" opacity="0.12" />
      </svg>
    </span>
  );
};

export default LogoFavicon;

// In your header component:
// <LogoFavicon />
