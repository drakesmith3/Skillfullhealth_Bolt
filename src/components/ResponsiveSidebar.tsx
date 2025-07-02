import * as React from "react";
import { Menu, X } from "lucide-react";
import { createDustParticles } from "../utils/dustParticles";

interface ResponsiveSidebarProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({ 
  children, 
  className = "" 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [sidebarRef, setSidebarRef] = React.useState<HTMLDivElement | null>(null);

  // Detect mobile screen size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      // Auto close mobile menu when switching to desktop
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle dust particles effect
  React.useEffect(() => {
    if (sidebarRef) {
      const { cleanup } = createDustParticles(sidebarRef, 15, "#FFD700");
      return cleanup;
    }
  }, [sidebarRef]);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && sidebarRef && !sidebarRef.contains(event.target as Node)) {
        const target = event.target as Element;
        // Don't close if clicking the hamburger button
        if (!target.closest('[data-mobile-menu-trigger]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, sidebarRef]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isMobile]);

  return (
    <>
      {/* Mobile Menu Button - Fixed position */}
      {isMobile && (
        <button
          data-mobile-menu-trigger
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-20 left-4 z-50 p-2 bg-black text-white rounded-lg shadow-lg lg:hidden hover:bg-gray-800 transition-colors"
          aria-label="Toggle sidebar menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={setSidebarRef}
        className={`
          ${isMobile 
            ? `fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out
               ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
            : 'relative'
          }
          w-64 bg-black text-white overflow-hidden flex-shrink-0
          ${className}
        `}
      >
        {/* Mobile Header with Close Button */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-[#D4AF37]">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Sidebar Content */}
        <div className={`${isMobile ? 'pt-0' : 'pt-4'} h-full overflow-y-auto`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ResponsiveSidebar;