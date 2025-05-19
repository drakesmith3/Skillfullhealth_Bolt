import React, { useEffect, useState, useRef } from 'react';
import PreHeader from '../components/PreHeader';
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from '../components/Footer'; // Ensure correct import path
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Olusiji Olawumi",
    role: "Founder & CEO",
    image: "/lovable-uploads/efbf957b-a127-4121-86b8-51528f7983af.png",
    bio: "Visionary leader, medical doctor, and digital transformation advocate. Passionate about empowering African professionals through technology and education."
  },
  {
    name: "Opadeyi Adebayo",
    role: "Chief Technology Officer",
    image: "/lovable-uploads/c96b664a-9865-407e-b314-656ff3ecc937.png",
    bio: "Full-stack engineer and AI enthusiast, driving the technical vision and product innovation for the GLOHSEN platform."
  },
  {
    name: "Olufemi Agbaje",
    role: "Head of Product & Partnerships",
    image: "/lovable-uploads/592ef409-e389-494f-a557-6179279a4414.png",
    bio: "Product strategist and partnership builder, connecting GLOHSEN with key stakeholders across Africa."
  },
   {
    name: "Kadiri Adaba",
    role: "Strategic Advisor",
    image: "/lovable-uploads/592ef409-e389-494f-a557-6179279a4414.png",
    bio: "Product strategist and partnership builder, connecting GLOHSEN with key stakeholders across Africa."
  },  // Add more team members as needed
];
const AboutUs: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const cleanupRef = useRef(true); // Initialize to true

  // Delay showing the footer to ensure proper rendering and track component mounting status
  useEffect(() => {
    cleanupRef.current = true; // Set to true on mount
    // Wait for component to mount, then activate footer with animation
    const timer = setTimeout(() => {
      if (cleanupRef.current) {
        setShowFooter(true);
      }
    }, 1000); // Shorter delay for testing, adjust as needed

    return () => {
      clearTimeout(timer);
      cleanupRef.current = false; // Set to false on unmount
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <PreHeader currentPage="about us" />
      
      <main className="container mx-auto px-4 py-8 mt-16 flex-grow"> {/* Added flex-grow */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center gradient-text">About GLOHSEN</h1>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                <p className="mb-4">
                  At GLOHSEN, we're on a mission to transform healthcare education and professional development. 
                  We believe in creating accessible pathways to healthcare excellence through innovative 
                  technology, comprehensive assessment, and personalized guidance.
                </p>
                <p>
                  Our goal is to bridge the gap between education and employment in the healthcare sector, 
                  ensuring that professionals can find the right opportunities and employers can 
                  identify the most qualified candidates.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
                <p className="mb-4">
                  GLOHSEN was founded by a team of healthcare professionals and educators who recognized 
                  the challenges facing both healthcare students and industry employers. We observed that 
                  traditional methods of assessment and job placement were not adequately serving either 
                  group, leading to mismatches and inefficiencies.
                </p>
                <p className="mb-4">
                  In response, we developed the proprietary GLOHSEN Score—a comprehensive evaluation system 
                  that accounts for both technical knowledge and essential soft skills. This holistic approach 
                  provides a more accurate representation of a candidate's abilities and potential.
                </p>
                <p>
                  Since our inception, we've grown from a small startup to a comprehensive platform 
                  serving thousands of healthcare professionals, students, educators, and employers 
                  around the world.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">For Professionals</h3>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>Comprehensive skill assessment</li>
                      <li>Personalized development plans</li>
                      <li>Career advancement opportunities</li>
                      <li>Access to job listings</li>
                      <li>Community networking</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">For Employers</h3>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>Qualified candidate matching</li>
                      <li>Efficient recruitment processes</li>
                      <li>Detailed candidate profiles</li>
                      <li>Customized hiring criteria</li>
                      <li>Post-hiring performance tracking</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">For Educators</h3>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>Teaching resources and tools</li>
                      <li>Student progress monitoring</li>
                      <li>Industry alignment insights</li>
                      <li>Curriculum development support</li>
                      <li>Professional development opportunities</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">For Students</h3>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>Skill gap identification</li>
                      <li>Educational resources</li>
                      <li>Career path guidance</li>
                      <li>Interactive learning tools</li>
                      <li>Networking opportunities</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-medium">Excellence</h3>
                    <p>We strive for excellence in everything we do, from the accuracy of our assessments to the quality of our platform.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium">Innovation</h3>
                    <p>We continuously explore new technologies and methodologies to improve healthcare education and employment.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium">Integrity</h3>
                    <p>We maintain the highest standards of honesty and ethics in our operations and relationships.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium">Inclusivity</h3>
                    <p>We are committed to creating a platform that serves diverse populations and promotes equity in healthcare education and employment.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium">Impact</h3>
                    <p>We measure our success by the positive difference we make in the lives of healthcare professionals and the quality of care they provide.</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
                <p className="mb-4">
                  GLOHSEN is powered by a diverse team of healthcare professionals, educators, technologists, 
                  and industry experts. Our team combines decades of experience in healthcare practice, 
                  education, and technology development.
                </p>
                <p>
                  We are united by our passion for improving healthcare education and connecting talented 
                  professionals with opportunities where they can make the greatest impact.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">Join Us</h2>
                <p className="mb-4">
                  Whether you're a healthcare professional looking to advance your career, an employer seeking 
                  qualified candidates, an educator wanting to enhance your teaching, or a student planning your 
                  future in healthcare, we invite you to join the GLOHSEN community.
                </p>
                <p>
                  Together, we can build a stronger, more connected healthcare ecosystem that benefits 
                  professionals and patients alike.
                </p>
                <div className="mt-4">
                  <a href="/signup" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300">
                    Join GLOHSEN Today
                  </a>          </div>
              </section>
            </div>
          </ScrollArea>
        </div>
      </main>
      
      {showFooter && <Footer isActive={false} />} {/* Ensure isActive={false} is passed */}
    </div>
  );
};

export default AboutUs;
