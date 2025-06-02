import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Target, Award, Globe, Heart, Shield, 
  Lightbulb, TrendingUp, BookOpen, Briefcase, Clock
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
    name: "Dr. Olusiji Olawumi",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80 ",
    bio: "Visionary leader, medical doctor, and digital transformation advocate. Passionate about empowering African professionals through technology and education."
  },
  {
    name: "C Wizard",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    bio: "Full-stack engineer and AI enthusiast, driving the technical vision and product innovation for the GLOHSEN platform."
  },
  {
    name: "Olufemi Agbaje",
    role: "Head of Product & Partnerships",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    bio: "Product strategist and partnership builder, connecting GLOHSEN with key stakeholders across Africa."
  },
  // Add more team members as needed
];

const timeline = [
  {
    year: "2020",
    title: "Foundation",
    desc: "Platform launch with core matching algorithms and initial user acquisition.",
    icon: BookOpen
  },
  {
    year: "2021",
    title: "Growth & Community Building",
    desc: "Expanded user base, introduced community forums, and hosted first webinar series.",
    icon: Users
  },
  {
    year: "2022",
    title: "Series A Funding & Feature Expansion",
    desc: "Secured funding, launched mobile app, and integrated advanced CME course modules.",
    icon: TrendingUp
  },
  {
    year: "2023",
    title: "AI Integration & Partnership Development",
    desc: "Implemented AI-powered job matching and GLOHSEN score; forged key industry partnerships.",
    icon: Lightbulb
  },
  {
    year: "2024",
    title: "Global Reach & Impact Focus",
    desc: "Expanded services to new regions, focusing on underserved areas and impact metrics.",
    icon: Globe
  },
  {
    year: "2025",
    title: "Healthcare Innovation Award",
    desc: "Recognized for contributions to healthcare technology and professional development.",
    icon: Award
  }
  // Add more timeline events as the company grows
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
              Transforming healthcare delivery through Clinet-driven Feedback, innovative technology, 
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
            
           <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary-dark text-center">Our Journey: 5-Year Timeline</h2>
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-3xl flex flex-col items-center">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] to-[#F5F5F5] z-0" style={{transform:'translateX(-50%)'}}></div>
            {timeline.map((item, idx) => (
              <div key={item.year} className="relative z-10 flex items-center w-full mb-8">
                <div className={`w-1/2 ${idx%2===0 ? 'pr-8 justify-end flex' : 'pl-8 justify-start flex'}`}> 
                  <div className="bg-white rounded-xl shadow-xl border-2 border-[#D4AF37]/30 px-6 py-4 max-w-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-d4af37" />
                      <span className="font-bold text-d4af37">{item.year}</span>
                    </div>
                    <div className="font-semibold text-primary-dark">{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.desc}</div>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-primary-dark text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <div key={member.name} className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
              <img src={member.image} alt={member.name} className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-[#D4AF37]/40 shadow-lg" />
              <h3 className="font-bold text-lg text-d4af37 mb-1">{member.name}</h3>
              <p className="text-sm font-semibold text-gray-700 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    
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
