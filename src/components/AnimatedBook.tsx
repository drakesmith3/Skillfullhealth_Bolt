
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, User, Briefcase, BookOpen, UserPlus, Building } from 'lucide-react';

// Define page types
type StakeholderType = 'glohsen' | 'clients' | 'students' | 'tutors' | 'professionals' | 'employers';

// Define interface for book page content
interface BookPageContent {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  features: string[];
  color: string;
}

const AnimatedBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<StakeholderType>('glohsen');
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const { isDark } = useContext(ThemeContext);
  
  // Page content for each stakeholder
  const pageContent: Record<StakeholderType, BookPageContent> = {
    glohsen: {
      title: 'THE GLOHSEN STANDARD',
      description: 'Empowering healthcare professionals through standardized evaluation and continuous improvement.',
      icon: <BookOpen className="h-12 w-12 text-[#D4AF37]" />,
      benefits: [
        'Standardized healthcare professional evaluation',
        'Transparent scoring system',
        'Continuous professional development',
        'Global recognition'
      ],
      features: [
        'Comprehensive scoring algorithm',
        'Real-time performance tracking',
        'Credential verification',
        'Skills assessment and improvement'
      ],
      color: 'from-[#D4AF37] to-red-600'
    },
    clients: {
      title: 'FOR CLIENTS',
      description: 'Access verified healthcare professionals with confidence and assurance of quality service.',
      icon: <User className="h-12 w-12 text-blue-500" />,
      benefits: [
        'Access to verified professionals',
        'Quality assurance',
        'Transparent pricing',
        'Personalized healthcare'
      ],
      features: [
        'Professional directory search',
        'Verified credentials checking',
        'Appointment scheduling',
        'Feedback and rating system'
      ],
      color: 'from-blue-600 to-blue-400'
    },
    students: {
      title: 'FOR STUDENTS',
      description: 'Start your healthcare career journey with structured guidance and industry-recognized training.',
      icon: <UserPlus className="h-12 w-12 text-green-500" />,
      benefits: [
        'Early career guidance',
        'Skill development',
        'Networking opportunities',
        'Industry exposure'
      ],
      features: [
        'Interactive learning modules',
        'Practical skill workshops',
        'Mentorship connections',
        'Career pathway planning'
      ],
      color: 'from-green-600 to-green-400'
    },
    tutors: {
      title: 'FOR TUTORS',
      description: 'Share your expertise and shape the next generation of healthcare professionals.',
      icon: <BookOpen className="h-12 w-12 text-purple-500" />,
      benefits: [
        'Platform for knowledge sharing',
        'Passive income opportunities',
        'Professional recognition',
        'Community impact'
      ],
      features: [
        'Course creation tools',
        'Student progress tracking',
        'Monetization options',
        'Performance analytics'
      ],
      color: 'from-purple-600 to-purple-400'
    },
    professionals: {
      title: 'FOR PROFESSIONALS',
      description: 'Elevate your healthcare career with verified credentials, continuous learning, and new opportunities.',
      icon: <User className="h-12 w-12 text-[#EA384C]" />,
      benefits: [
        'Career advancement',
        'Continuous education',
        'Network expansion',
        'Enhanced visibility to employers'
      ],
      features: [
        'GLOHSEN Score profile',
        'Job matching algorithm',
        'CME course access',
        'Skill verification'
      ],
      color: 'from-[#EA384C] to-red-400'
    },
    employers: {
      title: 'FOR EMPLOYERS',
      description: 'Find the right healthcare talent with verified skills and standardized evaluation metrics.',
      icon: <Building className="h-12 w-12 text-amber-500" />,
      benefits: [
        'Quality talent acquisition',
        'Standardized evaluation',
        'Reduced hiring risks',
        'Streamlined recruitment'
      ],
      features: [
        'Advanced candidate search',
        'Automated matching',
        'Credential verification',
        'Performance tracking'
      ],
      color: 'from-amber-600 to-amber-400'
    }
  };
  
  // Order of pages for navigation
  const pageOrder: StakeholderType[] = ['glohsen', 'clients', 'students', 'tutors', 'professionals', 'employers'];
  
  const goToNextPage = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    const nextIndex = (currentIndex + 1) % pageOrder.length;
    setDirection('right');
    setCurrentPage(pageOrder[nextIndex]);
  };
  
  const goToPrevPage = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    const prevIndex = (currentIndex - 1 + pageOrder.length) % pageOrder.length;
    setDirection('left');
    setCurrentPage(pageOrder[prevIndex]);
  };
  
  // Animation variants based on direction
  const pageVariants = {
    initial: (direction: string) => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className={`w-full max-w-xl ${isDark ? 'dark' : ''}`}>
        {/* Book Container */}
        <div className="perspective-1000 w-full">
          <div className="relative book-container w-full h-[500px] transition-transform duration-200">
            {/* Book Cover */}
            <div className={`absolute inset-0 rounded-lg shadow-2xl overflow-hidden ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Book Navigation */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
                <Button
                  onClick={goToPrevPage}
                  variant="ghost"
                  className={`rounded-full p-3 hover:bg-black/20 ${
                    isDark ? 'text-white bg-black/30' : 'text-black bg-white/30'
                  }`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
                <Button
                  onClick={goToNextPage}
                  variant="ghost"
                  className={`rounded-full p-3 hover:bg-black/20 ${
                    isDark ? 'text-white bg-black/30' : 'text-black bg-white/30'
                  }`}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Book Content - Animated Pages */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  className="absolute inset-0 p-6"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* Content Header - with gradient based on page */}
                  <div className={`bg-gradient-to-r ${pageContent[currentPage].color} p-6 rounded-t-lg`}>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-full">
                        {pageContent[currentPage].icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white">{pageContent[currentPage].title}</h2>
                    </div>
                    <p className="mt-2 text-white/90">{pageContent[currentPage].description}</p>
                  </div>
                  
                  {/* Content Body */}
                  <div className={`p-6 rounded-b-lg ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold mb-2 text-lg">Benefits</h3>
                        <ul className="space-y-2">
                          {pageContent[currentPage].benefits.map((benefit, index) => (
                            <li key={`benefit-${index}`} className="flex items-start">
                              <div className={`rounded-full w-1.5 h-1.5 mt-2 mr-2 bg-gradient-to-r ${pageContent[currentPage].color}`}></div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2 text-lg">Features</h3>
                        <ul className="space-y-2">
                          {pageContent[currentPage].features.map((feature, index) => (
                            <li key={`feature-${index}`} className="flex items-start">
                              <div className={`rounded-full w-1.5 h-1.5 mt-2 mr-2 bg-gradient-to-r ${pageContent[currentPage].color}`}></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Page indicator dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                      {pageOrder.map((page, index) => (
                        <button
                          key={page}
                          onClick={() => {
                            setDirection(pageOrder.indexOf(currentPage) < index ? 'right' : 'left');
                            setCurrentPage(page);
                          }}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            currentPage === page
                              ? `bg-gradient-to-r ${pageContent[page].color}`
                              : isDark ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                          aria-label={`Go to ${page} page`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Book binding effect */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Book shadow */}
      <div className="w-full max-w-xl h-4 bg-gradient-to-b from-black/20 to-transparent mt-2 blur-lg"></div>
    </div>
  );
};

export default AnimatedBook;
