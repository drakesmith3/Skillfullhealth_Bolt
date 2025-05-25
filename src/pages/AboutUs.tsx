
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Target, Award, Globe, Heart, Shield, 
  Lightbulb, TrendingUp, BookOpen, Briefcase 
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';

const AboutUs: React.FC = () => {
  const { theme } = useTheme();

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Founder",
      image: "/api/placeholder/300/400",
      bio: "Leading healthcare innovation with 15+ years experience"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/api/placeholder/300/400", 
      bio: "Technology visionary specializing in AI and healthcare systems"
    },
    {
      name: "Dr. Amara Okafor",
      role: "Chief Medical Officer",
      image: "/api/placeholder/300/400",
      bio: "Ensuring clinical excellence and professional standards"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "Every decision we make prioritizes patient outcomes and safety"
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "Building lasting relationships through transparency and reliability"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously pushing boundaries to improve healthcare delivery"
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "Striving for the highest standards in everything we do"
    }
  ];

  const achievements = [
    { number: "50,000+", label: "Healthcare Professionals" },
    { number: "1,200+", label: "Healthcare Facilities" },
    { number: "500,000+", label: "Successful Placements" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <PreHeader currentPage="About Us" />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-[#ea384c] to-[#D4AF37] text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About GLOHSEN</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Transforming healthcare delivery through innovative technology, 
              connecting qualified professionals with opportunities worldwide.
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className={`p-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Target className="h-8 w-8 text-[#ea384c] mr-3" />
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-lg leading-relaxed">
                    To revolutionize healthcare staffing by creating a comprehensive platform 
                    that connects skilled healthcare professionals with opportunities while 
                    ensuring the highest standards of patient care and professional development.
                  </p>
                </CardContent>
              </Card>

              <Card className={`p-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Globe className="h-8 w-8 text-[#D4AF37] mr-3" />
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg leading-relaxed">
                    To become the global leader in healthcare workforce solutions, 
                    empowering professionals and institutions to deliver exceptional 
                    patient care through innovative technology and continuous learning.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-xl max-w-4xl mx-auto leading-relaxed">
                Founded in 2020 by a team of healthcare professionals and technology experts, 
                GLOHSEN emerged from the recognition that healthcare staffing needed a revolutionary approach.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ea384c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2020 - Foundation</h3>
                <p>Platform launch with core matching algorithms</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2022 - Expansion</h3>
                <p>Reached 10,000+ healthcare professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ea384c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2024 - Innovation</h3>
                <p>AI-powered scoring and recommendation system</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className={`p-6 text-center hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <CardContent className="p-0">
                      <IconComponent className="h-12 w-12 text-[#ea384c] mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Numbers that reflect our commitment to excellence
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-[#ea384c] mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-lg font-medium">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Leadership Team</h2>
              <p className="text-xl max-w-3xl mx-auto">
                Meet the visionaries driving healthcare innovation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className={`overflow-hidden hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="h-64 bg-gradient-to-br from-[#ea384c] to-[#D4AF37]"></div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-[#ea384c] font-medium mb-3">{member.role}</p>
                    <p className="leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#ea384c] to-[#D4AF37] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of the healthcare revolution. Whether you're a professional looking for opportunities 
              or an organization seeking talent, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-white text-[#ea384c] hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#ea384c] px-8 py-3 text-lg font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer isActive={false} />
    </div>
  );
};

export default AboutUs;
