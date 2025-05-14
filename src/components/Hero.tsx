
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !cardRef.current || !bookRef.current) return;

    // Animate hero elements in
    gsap.fromTo(textRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    gsap.fromTo(cardRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
    );

    // Animate the book opening
    gsap.fromTo(bookRef.current, 
      { rotationY: -70, opacity: 0 },
      { rotationY: 0, opacity: 1, duration: 1.5, delay: 1.2, ease: "back.out(1.5)" }
    );

  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-100 flex flex-col justify-center items-center overflow-hidden p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-red-600/10 blur-3xl"></div>
        <div className="absolute left-20 bottom-20 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl"></div>
      </div>

      <div ref={textRef} className="relative z-10 text-center max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
            THE GLOHSEN STANDARD
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Revolutionizing healthcare through connection, education, and excellence
        </p>
      </div>

      <div ref={cardRef} className="relative z-10 w-full max-w-md mt-6">
        <Card className="border-2 border-red-600/20 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-center mb-4">WHAT IS YOUR GLOHSEN SCORE?</h3>
            <p className="text-gray-600 mb-4 text-center">
              Discover how you measure against the global healthcare standard.
            </p>
            <div className="flex justify-center">
              <Button className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
                Calculate Your Score
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Book illustration */}
      <div ref={bookRef} className="relative z-10 mt-12 w-full max-w-3xl h-48 md:h-72 perspective-1000">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-full max-w-3xl h-full bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg shadow-xl flex items-center justify-center transform-style-3d">
            <h3 className="text-2xl md:text-3xl font-serif text-gray-800 text-center px-4">
              Your health journey begins here...
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
