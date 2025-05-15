import React, { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

interface FooterProps {
  isActive?: boolean;
  sectionName?: string;
}

const FooterLinkComponent: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      aria-label={`Navigate to ${children}`}
    >
      {children}
    </a>
  </li>
);

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 hover:-translate-y-1 duration-300"
    aria-label={label}
  >
    {icon}
  </a>
);

const Footer: React.FC<FooterProps> = ({ isActive }) => {
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    if (!leftCurtainRef.current || !rightCurtainRef.current || !contentRef.current) return;

    // Create a GSAP context for the animations
    const ctx = gsap.context(() => {
      gsap.set(leftCurtainRef.current, { xPercent: -100 });
      gsap.set(rightCurtainRef.current, { xPercent: 100 });
      gsap.set(contentRef.current, { opacity: 1 });      animationRef.current = gsap.timeline({ paused: true });

      animationRef.current.to([leftCurtainRef.current, rightCurtainRef.current], {
        xPercent: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }).to(contentRef.current, {
        opacity: 0.9,
        duration: 0.5,
        ease: "power1.in",
      }, 0);
    });

    return () => {
      ctx.revert(); // Clean up all GSAP animations
    };
  }, []);
  useEffect(() => {
    if (!animationRef.current) return;

    if (isActive) {
      // Play animation when footer becomes active (visible in viewport)
      animationRef.current.play();
    } else {
      // Reverse animation when footer is no longer active
      animationRef.current.reverse();
    }
  }, [isActive]);
  return (
    <section
      className="relative h-screen w-full flex flex-col justify-center items-center bg-black text-white dark:bg-black dark:text-gray-100 overflow-hidden"
      style={{ minHeight: '100vh' }}
    >      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-red-800 dark:bg-red-900 z-10"
        style={{ 
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 10px, rgba(0,0,0,0) 10px, rgba(0,0,0,0) 20px)',
          transformOrigin: 'left center',
          transform: 'translateX(-100%)'
        }}
      ></div>
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-red-800 dark:bg-red-900 z-10"
        style={{ 
          backgroundImage: 'repeating-linear-gradient(-45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 10px, rgba(0,0,0,0) 10px, rgba(0,0,0,0) 20px)',
          transformOrigin: 'right center',
          transform: 'translateX(100%)'
        }}
      ></div>

      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-between w-full h-full py-12 px-4 md:px-8"
        style={{ willChange: "opacity" }}
      >        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 text-transparent bg-clip-text bg-size-200 animate-gradient dark:from-red-400 dark:via-amber-300 dark:to-red-400">
            The Story Does Not End Here
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-8">
            Your Gloshen Experience Just Began.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-left">
          {/* CONTACT US Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400 dark:text-amber-300 uppercase">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">📍</span>
                <span className="text-gray-300">123 Innovation Square, Tech City, TC 98765</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">📞</span>
                <a href="tel:+11234567890" className="text-gray-300 hover:text-white">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">✉️</span>
                <a href="mailto:info@gloshen.com" className="text-gray-300 hover:text-white">info@gloshen.com</a>
              </li>
              <li className="flex items-start">
                <span className="text-amber-400 mr-2">⏰</span>
                <span className="text-gray-300">Mon-Fri: 9AM-5PM EST</span>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400 dark:text-amber-300 uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLinkComponent href="/#hero">Home</FooterLinkComponent>
              <FooterLinkComponent href="/#how-it-works">How It Works</FooterLinkComponent>
              <FooterLinkComponent href="/#features">Features</FooterLinkComponent>
              <FooterLinkComponent href="/about">About Us</FooterLinkComponent>
              <FooterLinkComponent href="/blog">Blog</FooterLinkComponent>
              <FooterLinkComponent href="/contact">Contact</FooterLinkComponent>
              <FooterLinkComponent href="/login">Login</FooterLinkComponent>
              <FooterLinkComponent href="/signup">Sign Up</FooterLinkComponent>
            </ul>
          </div>

          {/* FEEDBACK Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400 dark:text-amber-300 uppercase">Feedback</h3>
            <p className="text-gray-300 mb-4">We value your feedback! Help us improve our services.</p>
            <Link 
              to="/feedback" 
              className="inline-block px-6 py-2 bg-amber-500 text-black rounded-full hover:bg-amber-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-black"
            >
              Leave Feedback
            </Link>
          </div>

          {/* POLICIES Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400 dark:text-amber-300 uppercase">Policies</h3>
            <ul className="space-y-2">
              <FooterLinkComponent href="/terms-of-service">Terms of Service</FooterLinkComponent>              <FooterLinkComponent href="/privacy-policy">Privacy Policy</FooterLinkComponent>
              <FooterLinkComponent href="/cookies-policy">Cookies Policy</FooterLinkComponent>
              <FooterLinkComponent href="/refund-policy">Refund Policy</FooterLinkComponent>
              <FooterLinkComponent href="/accessibility">Accessibility Statement</FooterLinkComponent>
            </ul>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-400 dark:text-gray-500">
                &copy; {new Date().getFullYear()} GLOHSEN. All rights reserved. Your Journey, Elevated.
              </p>
            </div>
            <div className="flex space-x-6">
              <SocialIcon href="https://facebook.com" icon={<FaFacebook size={24} />} label="Follow us on Facebook" />
              <SocialIcon href="https://twitter.com" icon={<FaTwitter size={24} />} label="Follow us on Twitter" />
              <SocialIcon href="https://instagram.com" icon={<FaInstagram size={24} />} label="Follow us on Instagram" />
              <SocialIcon href="https://linkedin.com" icon={<FaLinkedin size={24} />} label="Follow us on LinkedIn" />
              <SocialIcon href="https://youtube.com" icon={<FaYoutube size={24} />} label="Subscribe to our YouTube channel" />
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-amber-500 text-black rounded-full shadow-lg hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-black transition-colors transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300"
          aria-label="Back to Top"
          title="Back to Top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default memo(Footer);
