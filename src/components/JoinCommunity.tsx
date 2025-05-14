
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Briefcase, GraduationCap, MessageCircle } from "lucide-react";

const JoinCommunity = () => {
  const roles = [
    {
      icon: <User className="h-8 w-8 text-red-600" />,
      title: "Clients/Patients",
      description: "Share your healthcare experiences and help improve services."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-red-600" />,
      title: "Students",
      description: "Access interactive learning resources and connect with mentors."
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Healthcare Professionals",
      description: "Calculate your GLOHSEN score and advance your career."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-red-600" />,
      title: "Tutors/Advisers",
      description: "Share your knowledge and mentor the next generation."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-red-600" />,
      title: "Employers",
      description: "Find qualified professionals and improve your facility."
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white py-16 px-4 flex flex-col items-center justify-center">
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="text-[25rem] font-bold text-red-600">G</div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
          Join The GLOHSEN Community
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto relative z-10">
          There's a place for you here, no matter your role in healthcare.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-red-50 rounded-full">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                <p className="text-gray-600">{role.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-red-600 hover:bg-red-700 px-8 py-6 text-lg">
            Sign Up Now
          </Button>
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-6 text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
