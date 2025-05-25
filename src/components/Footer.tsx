import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Info } from 'lucide-react'; // Adjusted imports
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import ReturnToTopButton from './ReturnToTopButton';

// Import the dust particle creator from Header
const createDustParticles = (container: HTMLElement | null, count: number, particleColor: string) => {
  if (!container) return;
  const containerRect = container.getBoundingClientRect();
  // Ensure container has dimensions before creating particles
  if (containerRect.width === 0 || containerRect.height === 0) {
    return;
  }
  for (let i = 0; i < count; i++) {
    const dust = document.createElement("div");
    dust.className = "dust-particle";
    const color = particleColor || "#FFD700";
    dust.style.backgroundColor = color;
    dust.style.position = "absolute";
    dust.style.width = `${Math.random() * 2.5 + 1}px`;
    dust.style.height = dust.style.width;
    dust.style.borderRadius = "50%";
    dust.style.opacity = `${Math.random() * 0.4 + 0.2}`;
    // Ensure particles are within the bounds of the container
    dust.style.left = `${Math.random() * containerRect.width}px`;
    dust.style.top = `${Math.random() * containerRect.height}px`;
    dust.style.willChange = "transform, opacity";
    container.appendChild(dust);

    gsap.to(dust, {
      x: (Math.random() - 0.5) * (containerRect.width / 5),
      y: (Math.random() - 0.5) * (containerRect.height / 5),
      opacity: 0,
      duration: Math.random() * 4 + 3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 3,
      onRepeat: () => {
        gsap.set(dust, {
          x: (Math.random() - 0.5) * (containerRect.width / 10),
          y: (Math.random() - 0.5) * (containerRect.height / 10),
          opacity: Math.random() * 0.4 + 0.2,
          // Update position on repeat to ensure they stay within potentially resized bounds
          left: `${Math.random() * containerRect.width}px`,
          top: `${Math.random() * containerRect.height}px`,
        });
      },
    });
  }
};

interface FooterProps {
  isActive: boolean;
  sectionName?: string;
  scrollToSection?: (sectionIndex: number) => void;
}

const Footer: React.FC<FooterProps> = ({ isActive, sectionName, scrollToSection }) => {  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    setIsInitialized(true);
    
    // Add dust particles to the footer when initialized
    if (footerRef.current) {
      const footerElement = footerRef.current;
      const particleColor = "#FFD700"; // Gold
      
      // Create a GSAP context for all animations
      const ctx = gsap.context(() => {
        // Delay particle creation slightly to ensure container dimensions are available
        const timer = setTimeout(() => {
          if (footerElement) {
            createDustParticles(footerElement, 150, particleColor);
          }
        }, 100);
        
        return () => {
          clearTimeout(timer);
        };
      }, footerElement);
      
      return () => {
        // Revert the GSAP context to clean up all animations
        ctx.revert();
        
        // Safely remove dust particles
        if (footerElement) {
          try {
            // Get all dust particles
            const dustParticles = footerElement.querySelectorAll('.dust-particle');
            // Remove them one by one with additional safety checks
            dustParticles.forEach(particle => {
              try {
                if (particle.parentNode && particle.parentNode === footerElement && footerElement.contains(particle)) {
                  footerElement.removeChild(particle);
                }
              } catch (err) {
                console.debug('Skipping dust particle cleanup for detached node');
              }
            });
          } catch (error) {
            console.log('Safe cleanup of dust particles - error handled:', error);
          }
        }
      };
    }
  }, [isInitialized]);

  const scrollToTop = () => {
    if (scrollToSection) {
      scrollToSection(0); // Scroll to the first section (Header)
    }
  };

  const baseClasses = "flex flex-col justify-center items-center bg-black text-white dark:bg-black dark:text-gray-100 overflow-hidden transition-opacity duration-500";
  const initializedClass = isInitialized ? 'opacity-100' : 'opacity-0';
  const activeStateClasses = isActive 
    ? "fixed inset-0 z-[60]" 
    : "relative w-full h-auto py-16";  return (
    <section
      ref={footerRef}
      className="relative w-full min-h-[60vh] flex flex-col justify-center items-center text-center p-0 overflow-hidden antialiased bg-black text-white"
      style={{
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        letterSpacing: '0.01em',
        fontWeight: 400,
        position: 'relative' // Ensure for absolute positioning of elements
      }}
    >
      {/* Return to Top Button */}
      {scrollToSection && <ReturnToTopButton scrollToSection={scrollToSection} />}
      
      {/* Footer Header Message */}
      <div className="w-full py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center animated-shine-text metallic-gold-text">
            THE HEALTHCARE STORY DOES NOT END HERE...
          </h2>
          <p className="text-xl md:text-2xl font-medium text-center mt-3 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text">
            Your GLOHSEN story just began.          </p>
        </div>
      </div>      <div className="w-full max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 text-left">
        {/* Column 1: Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link to="/" aria-label="GLOHSEN Home" className="mb-2">
            <div className="w-16 h-16 rounded-full bg-black shadow-lg flex items-center justify-center border-2 border-[#F9D75D]">
              <span className="text-2xl font-bold text-[#F9D75D] tracking-widest">G</span>
            </div>
          </Link>
          <span className="text-xl font-semibold text-[#F9D75D] tracking-wide">GLOHSEN</span>
          <span className="text-base text-gray-300 font-normal">Empowering Healthcare Stories</span>          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com/glohsen" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors">
              <Facebook size={18} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
            <a href="https://twitter.com/glohsen" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition-colors">
              <Twitter size={18} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
            <a href="https://linkedin.com/company/glohsen" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors">
              <Linkedin size={18} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
            <a href="https://instagram.com/glohsen" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors">
              <Instagram size={18} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
            <a href="https://youtube.com/c/glohsen" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-colors">
              <Youtube size={18} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
          </div>
        </div>
        
        {/* Column 2: Quick Links */}
        <div className="flex flex-col space-y-5">          <h5 className="text-lg font-semibold text-[#F9D75D] tracking-wide border-b border-[#333] pb-2">Quick Links</h5>
          <ul className="space-y-3 text-gray-300 text-base">
            <li><Link to="/" className="hover:text-[#ea384c] transition-colors font-medium">Home</Link></li>
            <li><Link to="/blog" className="hover:text-[#ea384c] transition-colors font-medium">Blog</Link></li>
            <li><Link to="/community" className="hover:text-[#ea384c] transition-colors font-medium">Community Forum</Link></li>
            <li><Link to="/job-board" className="hover:text-[#ea384c] transition-colors font-medium">Job Board</Link></li>
            <li><Link to="/games-quizzes" className="hover:text-[#ea384c] transition-colors font-medium">Games & Quizzes</Link></li>
            <li><Link to="/courses" className="hover:text-[#ea384c] transition-colors font-medium">Courses</Link></li>
          </ul>
        </div>
          {/* Column 3: Contact */}
        <div className="flex flex-col space-y-5">          <h5 className="text-lg font-semibold text-[#F9D75D] tracking-wide border-b border-[#333] pb-2">Contact</h5>
          <ul className="space-y-3 text-gray-300 text-base">
            <li><Link to="/contact" className="hover:text-[#ea384c] transition-colors font-medium">Contact Us</Link></li>
            <li><Link to="/about-us" className="hover:text-[#ea384c] transition-colors font-medium">About Us</Link></li>
            <li><Link to="/help" className="hover:text-[#ea384c] transition-colors font-medium">Support</Link></li>
            <li><Link to="/help" className="hover:text-[#ea384c] transition-colors font-medium">Help Center</Link></li>
            <li><Link to="/faq" className="hover:text-[#ea384c] transition-colors font-medium">FAQ</Link></li>
          </ul>
        </div>
        
        {/* Column 4: Legal */}
        <div className="flex flex-col space-y-5">
          <h5 className="text-lg font-semibold text-[#F9D75D] tracking-wide border-b border-[#333] pb-2">Legal</h5>
          <ul className="space-y-3 text-gray-300 text-base">
            <li><Link to="/privacy-policy" className="hover:text-[#ea384c] transition-colors font-medium">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-[#ea384c] transition-colors font-medium">Terms of Service</Link></li>
            <li><Link to="/cookie-settings" className="hover:text-[#ea384c] transition-colors font-medium">Cookies Settings</Link></li>
            <li><Link to="/refund-policy" className="hover:text-[#ea384c] transition-colors font-medium">Refund Policy</Link></li>
            <li><Link to="/accessibility" className="hover:text-[#ea384c] transition-colors font-medium">Accessibility</Link></li>
          </ul>
        </div>
        
        {/* Column 5: Subscribe for Updates */}
        <div className="flex flex-col space-y-5">
          <h5 className="text-lg font-semibold text-[#F9D75D] tracking-wide border-b border-[#333] pb-2">Subscribe for Updates</h5>
          <div className="text-gray-300 text-base mb-2">
            <p>Stay updated with the latest healthcare trends, stories and opportunities.</p>
          </div>          <div className="flex flex-col gap-3 w-full">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-md border border-[#444] bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-[#F9D75D] w-full placeholder-gray-500"
            />
            <Button className="bg-[#ea384c] hover:bg-[#c4293b] text-white px-6 py-3 w-full font-semibold tracking-wide text-base rounded-md">              SUBSCRIBE
            </Button>
          </div>
        </div>
        
        {/* Column 6: Feedback */}
        <div className="flex flex-col space-y-5">
          <h5 className="text-lg font-semibold text-[#F9D75D] tracking-wide border-b border-[#333] pb-2">Feedback</h5>
          <div className="text-gray-300 text-base mb-2">
            <p>Because Your Opinions and Feelings Count...</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Link to="/general-feedback" className="w-full flex justify-center">
              <Button className="bg-[#F9D75D] hover:bg-[#ea384c] text-black hover:text-white px-8 py-4 w-full min-w-[180px] max-w-[240px] font-semibold tracking-wide text-base rounded-md transition-colors whitespace-nowrap">
                LEAVE A FEEDBACK
              </Button>
            </Link>
          </div>
        </div>
      </div>
        {/* Bottom: Copyright & Socials */}      <div className="w-full border-t border-[#333] mt-6">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} GLOHSEN. All rights reserved.</span>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/sitemap" className="hover:text-[#F9D75D] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
