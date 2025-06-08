
import { gsap } from "gsap";

export const createDustParticles = (container: HTMLElement | null, count: number = 15, particleColor: string = "#FFD700") => {
  if (!container) return { cleanup: () => {} };

  // For document.body, create a fixed overlay container for particles
  let particleContainer: HTMLElement;
  let isBodyContainer = false;
  
  if (container === document.body) {
    isBodyContainer = true;
    particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100vw';
    particleContainer.style.height = '100vh';
    particleContainer.style.pointerEvents = 'none'; // Allow clicks through
    particleContainer.style.zIndex = '1'; // Behind most content but above background
    particleContainer.style.overflow = 'hidden';
    document.body.appendChild(particleContainer);
  } else {
    particleContainer = container;
    // Ensure the container has relative or absolute positioning for particles to be positioned correctly.
    const computedStyle = window.getComputedStyle(container);
    if (computedStyle.position === 'static') {
      container.style.position = 'relative';
    }
    // Ensure container has overflow hidden to contain particles
    container.style.overflow = 'hidden';
  }

  const containerRect = isBodyContainer ? 
    { width: window.innerWidth, height: window.innerHeight } : 
    particleContainer.getBoundingClientRect();
    
  // Ensure container has dimensions before creating particles
  if (containerRect.width === 0 || containerRect.height === 0) {
    // console.warn("Dust particle container has no dimensions. Skipping particle creation.");
    return {
      cleanup: () => {} // Return a no-op cleanup function
    };
  }
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < count; i++) {
    const dust = document.createElement("div");
    dust.className = "dust-particle"; // Add a class for easier cleanup
    const color = particleColor || "#FFD700"; // Default to gold
    dust.style.backgroundColor = color;
    dust.style.position = "absolute";
    const size = Math.random() * 2.5 + 1;
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    dust.style.borderRadius = "50%";
    dust.style.opacity = `${Math.random() * 0.4 + 0.2}`;
    dust.style.pointerEvents = 'none'; // Ensure particles don't interfere with interactions
    
    // Position particles within the visible bounds of the container
    const containerWidth = isBodyContainer ? window.innerWidth : particleContainer.clientWidth;
    const containerHeight = isBodyContainer ? window.innerHeight : particleContainer.clientHeight;
    
    dust.style.left = `${Math.random() * containerWidth}px`;
    dust.style.top = `${Math.random() * containerHeight}px`;
    
    dust.style.willChange = "transform, opacity";
    particleContainer.appendChild(dust);
    particles.push(dust);

    gsap.to(dust, {
      x: () => (Math.random() - 0.5) * (containerWidth / 5),
      y: () => (Math.random() - 0.5) * (containerHeight / 5),
      opacity: 0,
      duration: Math.random() * 4 + 3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 3,
      onRepeat: () => {
        gsap.set(dust, {
          x: (Math.random() - 0.5) * (containerWidth / 10),
          y: (Math.random() - 0.5) * (containerHeight / 10),
          opacity: Math.random() * 0.4 + 0.2,
          left: `${Math.random() * containerWidth}px`,
          top: `${Math.random() * containerHeight}px`,
        });
      },
    });
  }

  // Cleanup function to remove particles and GSAP animations
  const cleanup = () => {
    particles.forEach(particle => {
      gsap.killTweensOf(particle); // Kill GSAP animations
      if (particle.parentNode === particleContainer) {
        particleContainer.removeChild(particle);
      }
    });
    
    // Remove the particle container if it was created for document.body
    if (isBodyContainer && particleContainer.parentNode === document.body) {
      document.body.removeChild(particleContainer);
    }
  };

  return { cleanup };
};
