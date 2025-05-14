
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play } from "lucide-react";

const GamesQuizzes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
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
      className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center p-4 md:p-8"
    >
      <h2 
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
      >
        Games & Quizzes
      </h2>
      
      <Carousel className="w-full max-w-5xl">
        <CarouselContent>
          {games.map((game, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="border-0 overflow-hidden bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer h-full">
                  <div className="relative h-48">
                    <div className={`absolute inset-0 bg-gradient-to-b ${game.color} opacity-60`}></div>
                    <img 
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        className="rounded-full w-12 h-12 p-0 bg-white text-gray-800 hover:bg-gray-100"
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{game.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">4.8 ★★★★★</span>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded">Educational</span>
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
      
      <div className="mt-10 max-w-md text-center">
        <p className="text-gray-300 mb-6">
          Our gamified learning experiences make complex medical concepts easy to understand and remember.
        </p>
        <Button className="bg-white text-gray-800 hover:bg-gray-100">
          Explore All Games
        </Button>
      </div>
    </div>
  );
};

export default GamesQuizzes;
