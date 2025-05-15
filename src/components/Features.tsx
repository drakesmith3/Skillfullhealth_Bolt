
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Register & Connect",
      description: "Create your profile and connect with healthcare professionals, employers, or mentors.",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Share & Learn",
      description: "Share experiences through feedback or learn through interactive games and quizzes.",
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Grow & Advance",
      description: "Improve your GLOHSEN score, find new opportunities, and advance your healthcare career.",
      color: "from-gray-700 to-gray-800",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 text-center">
        How GLOHSEN Works
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {steps.map((step, index) => (
          <Card key={index} className="border-0 shadow-lg overflow-hidden h-full">
            <div className={`h-2 bg-gradient-to-r ${step.color}`}></div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex items-center mt-10 text-gray-700">
        <div className="w-20 h-0.5 bg-gray-200"></div>
        <ArrowRight className="mx-4 text-red-600" />
        <div className="w-20 h-0.5 bg-gray-200"></div>
      </div>
      
      <div className="mt-10 max-w-2xl text-center">
        <p className="text-lg text-gray-600">
          GLOHSEN connects healthcare stakeholders, provides valuable feedback channels, and helps professionals advance their careers through education and networking.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
