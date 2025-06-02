
import { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import PreHeader from "@/components/PreHeader";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Star, Quote, Upload, Camera } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Pediatrician",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    content: "GLOHSEN has revolutionized my career trajectory. Through their platform, I've secured three high-paying locum positions that perfectly align with my pediatric expertise. The automated payment system ensures I'm compensated promptly, and the GLOHSEN Score provides validation of my clinical skills. This platform is truly a game-changer for healthcare professionals seeking flexible work arrangements.",
    rating: 5,
    date: "April 27, 2025"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Emergency Medicine Specialist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    content: "As an emergency medicine specialist, I value flexibility in my schedule. GLOHSEN has connected me with multiple hospitals that needed my services during peak periods. The credentialing process was seamless, and my GLOHSEN Score helped me stand out from other applicants. I've doubled my income while maintaining control over my work schedule. The professionalism of the entire team is commendable.",
    rating: 5,
    date: "April 20, 2025"
  },
  {
    id: 3,
    name: "Nurse Jessica Williams",
    role: "Registered Nurse",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    content: "Transitioning between nursing roles used to be challenging until I discovered GLOHSEN. Their platform streamlined the entire process, from finding suitable positions to handling payment logistics. I particularly appreciate the educational resources that help me continuously improve my skills. The GLOHSEN Score has become a valuable credential that demonstrates my nursing capabilities to potential employers.",
    rating: 4,
    date: "April 15, 2025"
  },
  {
    id: 4,
    name: "Dr. Oluwaseun Adeleke",
    role: "OB/GYN",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    content: "GLOHSEN's platform has been instrumental in maintaining my work-life balance. As an OB/GYN with over 15 years of experience, finding locum positions that respect my expertise was always difficult. GLOHSEN's matching algorithm paired me with facilities that value my experience, and the transparent review system ensures both sides meet their expectations. I've recommended GLOHSEN to all my colleagues.",
    rating: 5,
    date: "April 10, 2025"
  },
  {
    id: 5,
    name: "Dr. Aminat Yusuf",
    role: "Anesthesiologist",
    image: "https://images.unsplash.com/photo-1614608524875-846976bad5ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    content: "After relocating to a new city, I struggled to find consistent work until I joined GLOHSEN. Within weeks, I secured multiple locum anesthesiology positions that accommodated my schedule preferences. The platform's focus on security and verification ensures that both healthcare providers and facilities can trust each other. My GLOHSEN Score continues to open doors to premium opportunities.",
    rating: 5,
    date: "April 5, 2025"
  },
  {
    id: 6,
    name: "Physiotherapist David Okonkwo",
    role: "Physiotherapist",
    image: "https://images.unsplash.com/photo-1578496480157-697fc14d2e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    content: "GLOHSEN filled a crucial gap in the healthcare staffing industry, especially for allied health professionals like myself. The platform's intuitive interface makes finding specialized physiotherapy positions straightforward. I've consistently found work that aligns with my expertise in sports medicine rehabilitation. The escrow payment system eliminates concerns about compensation, allowing me to focus on patient care.",
    rating: 4,
    date: "March 28, 2025"
  }
];

const TestimonialCard = ({ name, role, image, content, rating, date }) => {
  const { isDark } = useTheme();
  
  return (
    <Card 
      className="p-6 mb-6 shadow-md hover:shadow-lg transition-shadow border-0"
      style={{
        background: isDark
          ? 'rgba(45, 21, 21, 0.3)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="flex items-start mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>        <div className="flex-grow">
          <h3 className={`text-lg font-bold ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}>{name}</h3>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>{role}</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                size={16}
                className={i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
        <div className={`text-xs ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>{date}</div>
      </div>      
      <div className={`relative pl-8 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <Quote className="absolute left-0 top-0 h-6 w-6 text-amber-400 opacity-40" />
        <p className="italic">{content}</p>
      </div>
    </Card>
  );
};

const Testimonials = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [rating, setRating] = useState('5');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);  const [hasMore, setHasMore] = useState<boolean>(true);
  const { isDark } = useTheme();
  
  useEffect(() => {
    // Initialize testimonials list
    setTestimonialsList(testimonials);
  }, []);
  
  const fetchMoreTestimonials = () => {
    // Simulate API call to fetch more testimonials
    setTimeout(() => {
      const newTestimonials = [
        {
          id: 7,
          name: "Dr. Benjamin Roberts",
          role: "Orthopedic Surgeon",
          image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          content: "The specialized matching system connected me with facilities that specifically needed orthopedic expertise. My surgical schedule is now optimized, and I'm earning significantly more while working fewer hours. The GLOHSEN Score validates my surgical success rates and attracts premium opportunities.",
          rating: 5,
          date: "March 25, 2025"
        },
        {
          id: 8,
          name: "Dr. Rachel Martinez",
          role: "Radiologist",
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          content: "Remote radiology work through GLOHSEN has revolutionized my career. I can now provide expert imaging interpretations from anywhere while maintaining the highest quality standards. The platform's technology integration makes collaboration seamless.",
          rating: 4,
          date: "March 22, 2025"
        },
        {
          id: 9,
          name: "Pharmacist Lisa Thompson",
          role: "Clinical Pharmacist",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          content: "GLOHSEN opened doors to clinical pharmacy roles I never thought possible. The continuing education resources and peer network have elevated my practice to new heights. My GLOHSEN Score reflects my pharmaceutical care excellence.",
          rating: 5,
          date: "March 20, 2025"
        },
        {
          id: 10,
          name: "Dr. Ahmed Hassan",
          role: "Emergency Medicine",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          content: "The emergency medicine positions I've secured through GLOHSEN have been exactly what I was looking for. High-acuity cases, excellent teams, and competitive compensation. The platform understands the unique demands of emergency medicine.",
          rating: 5,
          date: "March 18, 2025"
        },
        {
          id: 11,
          name: "Nurse Patricia Williams",
          role: "ICU Nurse",
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          content: "Critical care nursing opportunities through GLOHSEN have challenged and rewarded me beyond expectations. The advanced training modules prepared me for complex cases, and my expertise is now recognized industry-wide.",
          rating: 4,
          date: "March 15, 2025"
        }
      ];
      
      setTestimonialsList((prev) => [...prev, ...newTestimonials]);
      
      if (testimonialsList.length + newTestimonials.length >= 30) {
        setHasMore(false);
      }
    }, 1000);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setName('');
        setRole('');
        setTestimonial('');
        setRating('5');
        setSuccess(false);
      }, 3000);
    }, 1500);
  };
    return (
    <div 
      className="min-h-screen"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 25%, #1f1611 50%, #0a0a0a 75%, #1a0a0a 100%)'
          : 'linear-gradient(135deg, #fef7f0 0%, #fbeee8 25%, #f5efe8 50%, #f8f3ee 75%, #fef7f0 100%)',
        transition: 'background 0.5s ease-in-out',
      }}
    >
      <PreHeader currentPage="testimonials" />
        <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-5xl mx-auto">          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-center px-2 sm:px-4">
              <span className="bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text">
                TESTIMONIALS
              </span>
            </h1>
            <p className={`max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Read about the experiences of healthcare professionals who have transformed their careers with GLOHSEN.
              Their stories inspire us to continue improving our platform.
            </p>
          </div>
            <InfiniteScroll
            dataLength={testimonialsList.length}
            next={fetchMoreTestimonials}
            hasMore={hasMore}
            loader={<p className="text-center py-4">Loading more testimonials...</p>}
            endMessage={<p className="text-center py-4 text-gray-500">All testimonials loaded</p>}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          >
            {testimonialsList.map(testimonialItem => (
              <TestimonialCard key={testimonialItem.id} {...testimonialItem} />
            ))}
          </InfiniteScroll>
            {/* Testimonial Submission Form */}
          <Card 
            className="p-8 shadow-lg border-0 mb-12 max-w-2xl mx-auto"
            style={{
              background: isDark
                ? 'rgba(45, 21, 21, 0.3)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>Share Your GLOHSEN Journey</h2>
            <p className={`text-center mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Your story can inspire other healthcare professionals. Let us know how GLOHSEN has impacted your career.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Dr. Jane Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Professional Role</Label>
                  <Input 
                    id="role" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    placeholder="e.g., Cardiologist, RN, Physiotherapist"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="testimonial">Your Testimonial</Label>
                <Textarea 
                  id="testimonial" 
                  value={testimonial} 
                  onChange={(e) => setTestimonial(e.target.value)} 
                  placeholder="Share your experience with GLOHSEN..."
                  className="h-32"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rating">Your Rating</Label>
                  <Select 
                    value={rating} 
                    onValueChange={setRating}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars - Excellent</SelectItem>
                      <SelectItem value="4">4 Stars - Very Good</SelectItem>
                      <SelectItem value="3">3 Stars - Good</SelectItem>
                      <SelectItem value="2">2 Stars - Fair</SelectItem>
                      <SelectItem value="1">1 Star - Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Your Photo (Optional)</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Camera className="h-6 w-6 text-gray-500" />
                    </div>
                    <Button type="button" variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </div>
                <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 text-white px-8 py-2 font-semibold transition-all duration-300 transform hover:scale-105"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Your Story"}
                </Button>
              </div>
              
              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center text-green-700">
                  Thank you for sharing your story! Your testimonial has been submitted for review.
                </div>
              )}
            </form>
          </Card>          {/* Call to Action */}          <div 
            className="text-center rounded-lg p-8 border"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(248, 113, 113, 0.2) 0%, rgba(251, 191, 36, 0.3) 50%, rgba(248, 113, 113, 0.2) 100%)'
                : 'linear-gradient(135deg, rgba(252, 165, 165, 0.3) 0%, rgba(253, 230, 138, 0.4) 50%, rgba(252, 165, 165, 0.3) 100%)',
              border: isDark 
                ? '1px solid rgba(248, 113, 113, 0.2)'
                : '1px solid rgba(252, 165, 165, 0.2)'
            }}
          >
            <h2 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>Ready to Write Your Own Success Story?</h2>
            <p className={`mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Join thousands of healthcare professionals who are advancing their careers with GLOHSEN.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 text-white px-8 py-2 font-semibold transition-all duration-300 transform hover:scale-105">
                Sign Up Today
              </Button>
              <Button 
                variant="outline" 
                className={`px-8 py-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isDark 
                    ? 'text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-black' 
                    : 'text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white'
                }`}
              >
                Learn More
              </Button>
            </div>
          </div>        </div>
      </div>
      
      <Footer isActive={true} />
    </div>
  );
};

export default Testimonials;
