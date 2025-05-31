import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

// Enhanced 3D Styles for Games & Quizzes
const GamesQuizzes3DStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      .games-floating-elements-container {
        perspective: 1200px;
        transform-style: preserve-3d;
      }
      
      .games-floating-element {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        opacity: 0.7;
        animation: gamesDustFloat 25s linear infinite; /* Assuming gamesDustFloat is defined elsewhere or will be */
      }
      
      /* Keyframes for gamesDustFloat - copied and adapted if not present */
      @keyframes gamesDustFloat {
        0%, 100% {
          transform: translateY(0px) rotateX(0deg) rotateY(0deg) scale(1);
          opacity: 0.7;
        }
        25% {
          transform: translateY(-30px) rotateX(15deg) rotateY(90deg) scale(1.2);
          opacity: 1;
        }
        50% {
          transform: translateY(-60px) rotateX(0deg) rotateY(180deg) scale(0.8);
          opacity: 0.5;
        }
        75% {
          transform: translateY(-30px) rotateX(-15deg) rotateY(270deg) scale(1.1);
          opacity: 0.8;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .games-floating-element {
          animation: none;
        }
      }
    `
  }} />
);

const GamesQuizzes = ({ isActive = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !cardsRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });
    
    timeline
      .fromTo(titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      )
      .fromTo(cardsRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.4"
      );
    
  }, []);

  // Enhanced floating background particles and 3D elements animation
  useEffect(() => {
    if (!isActive) return;

    const createFloatingDust = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-games-dust';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 7 + 5}px;
        height: ${Math.random() * 7 + 5}px;
        background: ${isDark 
          ? 'radial-gradient(circle, rgba(220,20,60,0.9) 0%, rgba(212,175,55,0.7) 30%, rgba(0,0,0,0.5) 100%)'
          : 'radial-gradient(circle, rgba(220,20,60,0.7) 0%, rgba(212,175,55,0.6) 30%, rgba(0,0,0,0.4) 100%)'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: gamesDustFloat ${Math.random() * 16 + 14}s linear infinite;
        box-shadow: 0 0 ${Math.random() * 15 + 10}px rgba(220,20,60,0.6);
      `;
      
      const container = document.querySelector('.games-dust-container');
      if (container) {
        container.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 30000);
      }
    };

    const createGameObject = () => {
      const objects = ['controller', 'dice', 'puzzle'];
      const colors = ['#DC143C', '#D4AF37', '#000000'];
      const object = objects[Math.floor(Math.random() * objects.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const element = document.createElement('div');
      element.className = `game-3d-object ${object}`;
      element.style.cssText = `
        position: absolute;
        width: ${Math.random() * 36 + 24}px;
        height: ${Math.random() * 36 + 24}px;
        background: ${color === '#DC143C' 
          ? 'linear-gradient(135deg, #DC143C, #B91C1C, #8B0000)'
          : color === '#D4AF37'
          ? 'linear-gradient(135deg, #D4AF37, #FFD700, #B8860B)'
          : 'linear-gradient(135deg, #000000, #2a2a2a, #1a1a1a)'};
        ${object === 'controller' ? 'border-radius: 12px;' : ''}
        ${object === 'dice' ? 'border-radius: 6px;' : ''}
        ${object === 'puzzle' ? 'clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);' : ''}
        pointer-events: none;
        z-index: 0;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: gameMove ${Math.random() * 22 + 16}s linear infinite;
        transform-style: preserve-3d;
        box-shadow: 0 0 35px ${color}90;
        opacity: 0.9;
      `;
      
      const container = document.querySelector('.game-3d-container');
      if (container) {
        container.appendChild(element);
        
        setTimeout(() => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }, 38000);
      }
    };

    const dustInterval = setInterval(createFloatingDust, 500);
    const objectInterval = setInterval(createGameObject, 2200);
    
    // Create initial batch
    for (let i = 0; i < 12; i++) {
      setTimeout(createFloatingDust, i * 150);
    }
    
    for (let i = 0; i < 6; i++) {
      setTimeout(createGameObject, i * 800);
    }

    return () => {
      clearInterval(dustInterval);
      clearInterval(objectInterval);
    };
  }, [isActive, isDark]);

  // Floating background elements from SuccessStories.tsx
  useEffect(() => {
    if (!isActive) return;

    const createFloatingElement = () => {
      const element = document.createElement('div');
      element.className = 'games-floating-element'; // Use the new class name
      
      // Symbols for GamesQuizzes - can be customized
      const symbols = ['🎮', '🎲', '🧩', '💡', '🏆', '✨']; 
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      
      element.innerHTML = symbol;
      element.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        font-size: ${Math.random() * 25 + 15}px; /* Match SuccessStories */
        animation-delay: ${Math.random() * 25}s; /* Match SuccessStories */
        animation-duration: ${Math.random() * 15 + 20}s; /* Match SuccessStories */
      `;
      
      // Ensure this container exists or adapt to an existing one
      const container = document.querySelector('.games-floating-elements-container'); 
      if (container) {
        container.appendChild(element);
        
        setTimeout(() => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }, 35000); // Match SuccessStories
      }
    };

    // Create initial elements
    const elementCount = window.innerWidth > 768 ? 10 : 5; // Match SuccessStories
    
    for (let i = 0; i < elementCount; i++) {
      setTimeout(() => createFloatingElement(), Math.random() * 5000); // Match SuccessStories
    }

    // Continue creating elements periodically
    const floatingInterval = setInterval(createFloatingElement, 4000); // Match SuccessStories

    return () => {
      clearInterval(floatingInterval);
      // Ensure all elements are removed on cleanup
      const elements = document.querySelectorAll('.games-floating-element');
      elements.forEach(el => el.remove());
    };
  }, [isActive, isDark]); // Added isDark dependency as it might be used in styles

  const games = [
    {
      title: "ClotQuest",
      description: "Master the human clotting cascade through an interactive adventure game.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=500&q=80",
      color: "from-red-500 to-red-600"
    },
    {
      title: "DiagnosisDetective",
      description: "Put your diagnostic skills to the test with real-world medical mysteries.",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=500&q=80",
      color: "from-amber-500 to-amber-600"
    },
    {
      title: "PharmFrenzy",
      description: "Race against time to match medications with the right conditions.",
      image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=500&q=80",
      color: "from-blue-500 to-blue-600"
    }
  ];
  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative flex flex-col justify-center items-center p-4 md:p-8 overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #1f1611 50%, #0a0a0a 75%, #1a0a0a 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fbeee8 25%, #f5efe8 50%, #f8f3ee 75%, #fef7f0 100%)',
        transition: 'background 0.5s ease-in-out'
      }}
    >
      {/* Professional 3D Styles for Games & Quizzes */}
      <GamesQuizzes3DStyles />

      {/* Container for new floating elements */}
      <div className="games-floating-elements-container absolute inset-0 pointer-events-none z-0"></div>

      {/* Background Elements - Keep existing ones if they serve a different purpose */}
      <div className="games-dust-container absolute inset-0 pointer-events-none z-0"></div>
      <div className="game-3d-container absolute inset-0 pointer-events-none z-0"></div>      {/* CSS Animations */}
      <style>{`
        @keyframes gamesDustFloat {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(40px) rotate(180deg) scale(1.3);
            opacity: 0.9;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-30vh) translateX(-30px) rotate(360deg) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes gameMove {
          0% {
            transform: translateY(100vh) translateX(0) rotateY(0deg) rotateX(0deg) scale(0.5);
            opacity: 0.5;
          }
          30% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(50px) rotateY(180deg) rotateX(90deg) scale(1.4);
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-40vh) translateX(-40px) rotateY(360deg) rotateX(180deg) scale(0.6);
            opacity: 0;
          }
        }

        .game-3d-object {
          filter: drop-shadow(0 12px 24px rgba(0,0,0,0.5));
          transform-style: preserve-3d;
        }

        .game-3d-object.controller {
          border-radius: 12px;
          background: linear-gradient(135deg, #DC143C 0%, #B91C1C 50%, #8B0000 100%);
          box-shadow: 
            inset 4px 4px 8px rgba(255,255,255,0.2),
            inset -4px -4px 8px rgba(0,0,0,0.3),
            0 0 35px rgba(220,20,60,0.9);
        }

        .game-3d-object.dice {
          border-radius: 6px;
          background: linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%);
          box-shadow: 
            inset 4px 4px 8px rgba(255,255,255,0.3),
            inset -4px -4px 8px rgba(0,0,0,0.2),
            0 0 35px rgba(212,175,55,0.9);
        }

        .game-3d-object.puzzle {
          clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
          background: linear-gradient(135deg, #000000 0%, #2a2a2a 50%, #1a1a1a 100%);
          box-shadow: 
            inset 2px 2px 4px rgba(255,255,255,0.1),
            inset -2px -2px 4px rgba(0,0,0,0.5),
            0 0 35px rgba(0,0,0,0.9);
        }

        .floating-games-dust {
          filter: blur(0.7px);
          animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>

      <h2 
        ref={titleRef}
        className={`text-3xl md:text-4xl font-bold mb-10 text-center z-10 relative ${isDark ? 'text-white' : 'text-gray-800'}`}
      >
        Games & Quizzes
      </h2>      
      <Carousel className="w-full max-w-5xl z-10 relative">
        <CarouselContent>
          {games.map((game, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className={`border-0 overflow-hidden transition-all duration-300 cursor-pointer h-full shadow-xl hover:shadow-2xl ${
                  isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                }`}>
                  <div className="relative h-48">
                    <div className={`absolute inset-0 bg-gradient-to-b ${game.color} opacity-60`}></div>
                    <img 
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        className="rounded-full w-12 h-12 p-0 bg-white text-gray-800 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{game.title}</h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{game.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>4.8 ★★★★★</span>
                      <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>Educational</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-6">
          <CarouselPrevious className="relative -left-0 mr-4" />
          <CarouselNext className="relative -right-0" />
        </div>
      </Carousel>
      
      <div className="mt-10 max-w-md text-center z-10 relative">
        <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Our gamified learning experiences make complex medical concepts easy to understand and remember.
        </p>
        <Button className={`transition-all duration-300 shadow-lg hover:shadow-xl ${
          isDark ? 'bg-white text-gray-800 hover:bg-gray-100' : 'bg-red-600 text-white hover:bg-red-700'
        }`}>
          Explore All Games
        </Button>
      </div>
    </div>
  );
};

export default GamesQuizzes;
