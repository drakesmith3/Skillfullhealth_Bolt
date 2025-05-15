import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define brand colors for easy use
const BRAND_COLORS = {
  red: "#FF0000", // Example: Replace with actual brand red
  gold: "#FFD700", // Standard Gold
  black: "#000000",
  offWhite: "#F8F8F8", // Example: Replace with actual brand off-white
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const createDustParticles = (container: HTMLElement | null, count: number) => {
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const dust = document.createElement("div");
      dust.className = "dust-particle";
      const goldShades = ["#FFD700", "#FFC400", "#FFB300", "#FFA000", "#F9A602"]; // Added more gold variety
      dust.style.backgroundColor = goldShades[Math.floor(Math.random() * goldShades.length)];
      dust.style.position = "absolute";
      dust.style.width = `${Math.random() * 2.5 + 1}px`; // Size 1px to 3.5px
      dust.style.height = dust.style.width;
      dust.style.borderRadius = "50%";
      dust.style.opacity = `${Math.random() * 0.4 + 0.2}`; // Opacity 0.2 to 0.6 for subtlety
      dust.style.left = `${Math.random() * containerRect.width}px`;
      dust.style.top = `${Math.random() * containerRect.height}px`;
      dust.style.willChange = "transform, opacity"; // Performance boost
      container.appendChild(dust);

      gsap.to(dust, {
        x: (Math.random() - 0.5) * (containerRect.width / 5), // Movement relative to container size
        y: (Math.random() - 0.5) * (containerRect.height / 5),
        opacity: 0,
        duration: Math.random() * 4 + 3, // Duration 3s to 7s for slower, more elegant movement
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 3, // Stagger start times
        onRepeat: () => {
          gsap.set(dust, {
            x: (Math.random() - 0.5) * (containerRect.width / 10),
            y: (Math.random() - 0.5) * (containerRect.height / 10),
            opacity: Math.random() * 0.4 + 0.2,
          });
        },
      });
    }
  };

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      createDustParticles(heroRef.current, 75); // Increased particle count slightly

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.6,
          scale: 1.6,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          onStart: () => gsap.set(glowRef.current, { willChange: "opacity, transform" }),
          onComplete: () => gsap.set(glowRef.current, { clearProps: "willChange" }),
        });
      }

      gsap.fromTo(
        ".hero-headline",
        { opacity: 0, y: 60 }, // Slightly increased initial y offset
        {
          opacity: 1,
          y: 0,
          duration: 1.2, // Slightly longer duration
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onStart: () => gsap.set(".hero-headline", { willChange: "opacity, transform" }),
          onComplete: () => gsap.set(".hero-headline", { clearProps: "willChange" }),
        }
      );

      gsap.fromTo(
        ".hero-subheadline",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
          onStart: () => gsap.set(".hero-subheadline", { willChange: "opacity, transform" }),
          onComplete: () => gsap.set(".hero-subheadline", { clearProps: "willChange" }),
        }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 55%", // Adjusted start trigger
            toggleActions: "play none none none",
          },
          onStart: () => gsap.set(".hero-cta", { willChange: "opacity, transform" }),
          onComplete: () => gsap.set(".hero-cta", { clearProps: "willChange" }),
        }
      );
    }, heroRef); // Scoping GSAP context to heroRef

    return () => ctx.revert();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col justify-center items-center text-center p-6 md:p-8 bg-black text-off-white overflow-hidden antialiased"
      // Added antialiased for potentially smoother text rendering
    >
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-red-600 via-gold-500 to-red-700 rounded-full filter blur-3xl opacity-0"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      <div className="relative z-10 flex flex-col items-center space-y-6 md:space-y-8">
        {/* <img src="/logo-gold.png" alt="GLOHSEN Logo" className="h-14 md:h-16 mb-4 md:mb-6 hero-logo" /> */}
        
        <h1 className="hero-headline text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500">
            Welcome to GLOHSEN
          </span>
        </h1>
        <p className="hero-subheadline text-lg sm:text-xl md:text-2xl text-gray-300 max-w-xl md:max-w-2xl leading-relaxed md:leading-loose">
          Discover a new era of personalized well-being and professional growth.
          Our innovative platform guides you on a transformative journey.
        </p>
        <button className="hero-cta bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold py-3 px-10 md:py-4 md:px-12 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-gold-500 focus:ring-opacity-50">
          Begin Your Story
        </button>
      </div>
    </section>
  );
};

export default Hero;
