import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll(".parallax-section");

    sections.forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            markers: false, // Disable markers
            onEnter: () => console.log(`Entering section ${i}`),
            onLeave: () => console.log(`Leaving section ${i}`),
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="parallax-container">
      {children}
    </div>
  );
};

export default ParallaxContainer;
