import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronsUp, MessageSquare, X, Send, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSound } from '../contexts/SoundContext';

const FloatingActionButtons: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Safely use the sound context - only if we're within a SoundProvider
  let playClickSound: (() => void) | null = null;
  let isSoundEnabled = false;
  
  try {
    const soundContext = useSound();
    playClickSound = soundContext.playClickSound;
    isSoundEnabled = soundContext.isSoundEnabled;
  } catch (error) {
    // Component is not within SoundProvider, which is fine
    console.log('FloatingActionButtons: Not within SoundProvider context');
  }
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [conversationError, setConversationError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);  const scrollToTop = () => {
    console.log('ScrollToTop clicked - Sound enabled:', isSoundEnabled, 'playClickSound available:', !!playClickSound);
    if (playClickSound) {
      try {
        playClickSound();
      } catch (error) {
        console.warn('Error playing click sound:', error);
      }
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };    const createConversation = async () => {
    setIsLoadingConversation(true);
    setConversationError(null);
    
    try {
      console.log('Attempting to create conversation...');
      const response = await fetch('/api/create-conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to create conversation: ${response.status} - ${errorText}`);
      }
      
      const conversation = await response.json();
      console.log('Conversation response:', conversation);
      
      if (conversation.conversation_url) {
        setConversationUrl(conversation.conversation_url);
      } else {
        throw new Error('No conversation URL received');
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      let errorMessage = 'Failed to create conversation';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Backend server is not running. Please start the API server on port 3001.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setConversationError(errorMessage);
      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoadingConversation(false);
    }
  };
  const toggleChat = async () => {
    console.log('ToggleChat clicked - Sound enabled:', isSoundEnabled, 'playClickSound available:', !!playClickSound);
    if (playClickSound) {
      try {
        playClickSound();
      } catch (error) {
        console.warn('Error playing click sound:', error);
      }
    }
    
    if (!isChatOpen) {
      // Opening chat - create conversation
      setIsChatOpen(true);
      if (!conversationUrl) {
        await createConversation();
      }
      
      if (conversationUrl || isLoadingConversation) {
        toast({
          title: "Live AI Agent Connected",
          description: "You're now connected to our conversational AI representative."
        });
      }
    } else {
      // Closing chat
      setIsChatOpen(false);
      // Optionally reset conversation URL to create fresh conversation next time
      setConversationUrl(null);
      setConversationError(null);
    }
  };const handleThemeToggle = () => {
    console.log('ThemeToggle clicked - Sound enabled:', isSoundEnabled, 'playClickSound available:', !!playClickSound);
    if (playClickSound) {
      try {
        playClickSound();
      } catch (error) {
        console.warn('Error playing click sound:', error);
      }
    }
    toggleTheme();
    toast({
      title: `Switched to ${theme === 'light' ? 'dark' : 'light'} mode`,
      description: "Theme preference has been saved."
    });
  };

  return (
    <>
      <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-[9999]">
        {/* Enhanced Theme toggle button with WCAG compliance */}
        <button
          onClick={handleThemeToggle}
          className="group relative w-10 h-10 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:scale-110 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-[#ea384c] dark:hover:border-[#ea384c] focus:outline-none focus:ring-4 focus:ring-[#ea384c]/20 focus:border-[#ea384c]"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode. Current mode: ${theme}`}
          aria-describedby="theme-toggle-description"
          role="switch"
          aria-checked={theme === 'dark'}
        >
          {/* Screen reader description */}
          <span id="theme-toggle-description" className="sr-only">
            Toggle between light and dark mode for better accessibility and user preference
          </span>
          
          {/* Icon with enhanced animations */}
          <div className="relative w-6 h-6">
            {theme === 'light' ? (
              <Moon className="w-6 h-6 transition-all duration-500 transform group-hover:rotate-12" />
            ) : (
              <Sun className="w-6 h-6 transition-all duration-500 transform group-hover:rotate-45" />
            )}
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
            Switch to {theme === 'light' ? 'dark' : 'light'} mode
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-white"></div>
          </div>
        </button>        {/* Chat with us button */}
        <button
          onClick={toggleChat}
          className="group relative w-10 h-10 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:scale-110 bg-[#ea384c] hover:bg-[#d12e42] text-white border-2 border-[#ea384c] hover:border-[#d12e42] focus:outline-none focus:ring-4 focus:ring-[#ea384c]/20"
          aria-label={isChatOpen ? "Close live AI agent" : "Connect to live AI agent"}
          aria-expanded={isChatOpen}
        >
          <MessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
            Live AI Agent
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </button>{/* Back to top button - only visible when scrolled down */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="group relative p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:scale-110 bg-[#D4AF37] hover:bg-[#B8941F] text-black border-2 border-[#D4AF37] hover:border-[#B8941F] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/20"
            aria-label="Back to top of page"
          >
            <ChevronsUp className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
              Back to top
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </button>
        )}
      </div>      {/* Enhanced Live AI Agent Modal with Tavus CVI */}
      {isChatOpen && (
        <div 
          className="fixed bottom-20 right-4 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-[9998] flex flex-col h-[600px] border-2 border-gray-200 dark:border-gray-600"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
          aria-describedby="chat-description"
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
            <div>
              <h3 id="chat-title" className="font-bold text-gray-800 dark:text-gray-200">Live AI Agent</h3>
              <p id="chat-description" className="text-xs text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Conversational AI Representative
                </span>
              </p>
            </div>
            <button 
              onClick={() => {
                console.log('ChatClose clicked - Sound enabled:', isSoundEnabled, 'playClickSound available:', !!playClickSound);
                if (playClickSound) {
                  try {
                    playClickSound();
                  } catch (error) {
                    console.warn('Error playing click sound:', error);
                  }
                }
                toggleChat();
              }}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ea384c] focus:ring-offset-2"
              aria-label="Close live AI agent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
            {/* Tavus CVI Integration */}
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-b-lg overflow-hidden">
            {isLoadingConversation ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ea384c] mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Connecting to AI Agent...</p>
                </div>
              </div>
            ) : conversationError ? (
              <div className="flex items-center justify-center h-full p-4">
                <div className="text-center">
                  <div className="text-red-500 mb-4">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {conversationError}
                  </p>
                  <button
                    onClick={createConversation}
                    className="bg-[#ea384c] hover:bg-[#d12e42] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : conversationUrl ? (
              <iframe 
                src={conversationUrl}
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 'none',
                  borderRadius: '0 0 0.5rem 0.5rem'
                }}
                title="GLOHSEN Live AI Agent - Conversational Video Interface"
                loading="lazy"
                aria-label="Live AI agent video conversation interface"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Click to start conversation with AI Agent
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActionButtons;
