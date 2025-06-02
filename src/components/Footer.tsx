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
  isHomePage?: boolean; // Add prop to determine if this is the home page
}

const Footer: React.FC<FooterProps> = ({ isActive, sectionName, scrollToSection, isHomePage = false }) => {  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Dynamic font sizing based on isHomePage (50% increase for home page)
  const fontSizes = isHomePage ? {
    headerTitle: "text-3xl md:text-4xl", // 50% increase from text-lg md:text-xl
    headerSubtitle: "text-xl md:text-2xl", // 50% increase from text-base md:text-lg
    sectionHeading: "text-xl", // 50% increase from text-base
    bodyText: "text-lg", // 50% increase from text-sm
    logoText: "text-2xl", // 50% increase from text-lg
    brandName: "text-xl", // 50% increase from text-base
    tagline: "text-base", // 50% increase from text-sm
    socialIconSize: 24, // 50% increase from 16
    buttonText: "text-lg", // 50% increase from text-sm
    copyrightText: "text-base" // 50% increase from text-xs
  } : {
    headerTitle: "text-lg md:text-xl",
    headerSubtitle: "text-base md:text-lg",
    sectionHeading: "text-base",
    bodyText: "text-sm",
    logoText: "text-lg",
    brandName: "text-base",
    tagline: "text-sm",
    socialIconSize: 16,
    buttonText: "text-sm",
    copyrightText: "text-xs"
  };
  
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
  // Determine container classes based on whether this is the home page
  const containerClasses = isHomePage && isActive 
    ? "fixed inset-0 w-screen h-screen flex flex-col justify-start items-center text-center p-4 overflow-y-auto antialiased bg-black text-white z-[60]"
    : "relative w-full min-h-[36vh] flex flex-col justify-center items-center text-center p-4 overflow-hidden antialiased bg-black text-white";

  const baseClasses = "flex flex-col justify-center items-center bg-black text-white dark:bg-black dark:text-gray-100 overflow-hidden transition-opacity duration-500";
  const initializedClass = isInitialized ? 'opacity-100' : 'opacity-0';  return (
    <section
      ref={footerRef}
      className={containerClasses}
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
      <div className="w-full py-4 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`font-bold text-center animated-shine-text metallic-gold-text ${fontSizes.headerTitle}`}>
            THE HEALTHCARE STORY DOES NOT END HERE...
          </h2>
          <p className={`mt-2 text-center bg-gradient-to-r from-red-600 via-amber-400 to-red-600 text-transparent bg-clip-text ${fontSizes.headerSubtitle}`}>
            Your GLOHSEN story just began.          </p>
        </div>
      </div>      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 text-left">{/* Each column below gets extra spacing and separation for a professional look */}
        <div className="flex flex-col items-center sm:items-start space-y-3 col-span-1">
          <Link to="/" aria-label="GLOHSEN Home" className="mb-1">
            <div className="w-12 h-12 rounded-full bg-black shadow-lg flex items-center justify-center border-2 border-[#F9D75D]">
              <span className={`font-bold text-[#F9D75D] tracking-widest ${fontSizes.logoText}`}>G</span>
            </div>
          </Link>
          <span className={`font-semibold text-[#F9D75D] tracking-wide ${fontSizes.brandName}`}>GLOHSEN</span>
          <span className={`text-gray-300 font-normal ${fontSizes.tagline}`}>Empowering Healthcare Stories</span>
          <div className="flex gap-3 mt-2">
            <a href="https://facebook.com/glohsen" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors">
              <Facebook size={fontSizes.socialIconSize} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
            <a href="https://twitter.com/glohsen" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition-colors">
              <Twitter size={fontSizes.socialIconSize} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
            <a href="https://linkedin.com/company/glohsen" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors">
              <Linkedin size={fontSizes.socialIconSize} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
            <a href="https://instagram.com/glohsen" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors">
              <Instagram size={fontSizes.socialIconSize} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
            <a href="https://youtube.com/c/glohsen" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-colors">
              <Youtube size={fontSizes.socialIconSize} className="text-[#F9D75D] hover:text-[#ea384c] transition-colors" />
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-4 col-span-1">
          <h5 className={`font-semibold tracking-wide border-b border-[#333] pb-1 ${fontSizes.sectionHeading}`}>Quick Links</h5>          <ul className={`space-y-2 text-gray-300 ${fontSizes.bodyText}`}>
            <li><Link to="/" className="hover:text-[#ea384c] transition-colors font-medium">Home</Link></li>
            <li><Link to="/blog" className="hover:text-[#ea384c] transition-colors font-medium">Blog</Link></li>
            <li><Link to="/community" className="hover:text-[#ea384c] transition-colors font-medium">Community Forum</Link></li>
            <li><Link to="/job-board" className="hover:text-[#ea384c] transition-colors font-medium">Job Board</Link></li>
            <li><Link to="/games-quizzes" className="hover:text-[#ea384c] transition-colors font-medium">Games & Quizzes</Link></li>
            <li><Link to="/courses" className="hover:text-[#ea384c] transition-colors font-medium">Courses</Link></li>
            <li><Link to="/testimonials" className="hover:text-[#ea384c] transition-colors font-medium">Testimonials</Link></li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4 col-span-1">
          <h5 className={`font-semibold tracking-wide border-b border-[#333] pb-1 ${fontSizes.sectionHeading}`}>Contact</h5>          <ul className={`space-y-2 text-gray-300 ${fontSizes.bodyText}`}>
            <li><Link to="/contact-us" className="hover:text-[#ea384c] transition-colors font-medium">Contact Us</Link></li>
            <li><Link to="/about-us" className="hover:text-[#ea384c] transition-colors font-medium">About Us</Link></li>
            <li><Link to="/support" className="hover:text-[#ea384c] transition-colors font-medium">Support</Link></li>
            <li><Link to="/faq" className="hover:text-[#ea384c] transition-colors font-medium">FAQ</Link></li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4 col-span-1">
          <h5 className={`font-semibold tracking-wide border-b border-[#333] pb-1 ${fontSizes.sectionHeading}`}>Legal</h5>          <ul className={`space-y-2 text-gray-300 ${fontSizes.bodyText}`}>
            <li><Link to="/privacy-policy" className="hover:text-[#ea384c] transition-colors font-medium">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-[#ea384c] transition-colors font-medium">Terms of Service</Link></li>
            <li><Link to="/cookie-settings" className="hover:text-[#ea384c] transition-colors font-medium">Cookies Settings</Link></li>
            <li><Link to="/refund-policy" className="hover:text-[#ea384c] transition-colors font-medium">Refund Policy</Link></li>
            <li><Link to="/accessibility" className="hover:text-[#ea384c] transition-colors font-medium">Accessibility</Link></li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4 col-span-1">
          <h5 className={`font-semibold tracking-wide border-b border-[#333] pb-1 ${fontSizes.sectionHeading}`}>Handbooks</h5>
          <ul className={`space-y-2 text-gray-300 ${fontSizes.bodyText}`}>
            <li><Link to="/ProfessionalsHandbook" className="hover:text-[#ea384c] transition-colors font-medium">Professional Handbook</Link></li>
            <li><Link to="/EmployersHandbook" className="hover:text-[#ea384c] transition-colors font-medium">Employer Handbook</Link></li>
            <li><Link to="/TutorsHandbook" className="hover:text-[#ea384c] transition-colors font-medium">Tutor Handbook</Link></li>
            <li><Link to="/StudentsHandbook" className="hover:text-[#ea384c] transition-colors font-medium">Student Handbook</Link></li>
          </ul>
        </div>        <div className="flex flex-col space-y-4 col-span-1">
          <h5 className={`font-semibold tracking-wide border-b border-[#333] pb-1 ${fontSizes.sectionHeading}`}>Subscribe for Updates</h5>
          <div className={`text-gray-300 ${fontSizes.bodyText} mb-2`}>
            <p>Stay updated with the latest healthcare trends, stories and opportunities.</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <input
              type="email"
              placeholder="Your email address"
              className={`px-3 py-2 rounded-md border border-[#444] bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-[#F9D75D] w-full placeholder-gray-500 ${fontSizes.bodyText}`}
            />
            <Button className={`bg-[#ea384c] hover:bg-[#c4293b] text-white px-4 py-2 w-full font-semibold tracking-wide ${fontSizes.buttonText} rounded-md`}>
              SUBSCRIBE
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-4 col-span-1">
          <h5 className={`font-semibold tracking-wide border-b border-[#333] pb-1 ${fontSizes.sectionHeading}`}>Feedback</h5>
          <div className={`text-gray-300 ${fontSizes.bodyText} mb-2`}>
            <p>Because Your Opinions and Feelings Count...</p>
          </div>          <div className="flex flex-col gap-2 w-full">
            <Link to="/general-feedback" className="w-full block">
              <Button 
                className="bg-[#F9D75D] hover:bg-[#ea384c] text-black hover:text-white w-full font-semibold tracking-wide rounded-md transition-colors"
                style={{ 
                  padding: '12px 8px', 
                  fontSize: isHomePage ? '0.9rem' : '0.8rem',
                  minWidth: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                LEAVE A FEEDBACK
              </Button>
            </Link>
          </div>
        </div>
      </div>        {/* Bottom: Copyright & Socials */}
      <div className="w-full border-t border-[#333] mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className={`text-gray-500 ${fontSizes.copyrightText}`}>&copy; {new Date().getFullYear()} GLOHSEN. All rights reserved.</span>
            <div className={`flex items-center gap-4 ${fontSizes.bodyText} text-gray-500`}>
            <Link to="/sitemap" className="hover:text-[#F9D75D] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
