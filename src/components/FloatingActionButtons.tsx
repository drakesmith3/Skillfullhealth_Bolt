
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronsUp, MessageSquare, X, Send, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const FloatingActionButtons: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'system', text: string}[]>([
    {type: 'system', text: 'Hello! How can I help you today?'}
  ]);

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
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      toast({
        title: "Chat opened",
        description: "You can now chat with our assistant."
      });
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, {type: 'user', text: message}]);
    
    // Simple AI responses based on keywords
    setTimeout(() => {
      let response = "I'm not sure how to help with that. Could you try asking something about our services or how GLOHSEN works?";
      
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        response = "Hello! How can I assist you with GLOHSEN today?";
      } else if (lowerMsg.includes('glohsen score')) {
        response = "The GLOHSEN Score is calculated based on 10 parameters including experience, skills, certifications, and more. It helps match healthcare professionals with opportunities.";
      } else if (lowerMsg.includes('register') || lowerMsg.includes('sign up')) {
        response = "You can register as a healthcare professional, employer, student or tutor. Each role has specific features tailored to their needs.";
      } else if (lowerMsg.includes('feedback')) {
        response = "You can submit feedback about professionals, healthcare facilities, or tutors through our feedback system. Your input helps improve services.";
      }
      
      setChatHistory(prev => [...prev, {type: 'system', text: response}]);
    }, 600);
    
    // Clear input
    setMessage('');
  };

  const handleThemeToggle = () => {
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
          className="group relative p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:scale-110 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-[#ea384c] dark:hover:border-[#ea384c] focus:outline-none focus:ring-4 focus:ring-[#ea384c]/20 focus:border-[#ea384c]"
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
        </button>

        {/* Chat with us button */}
        <button
          onClick={toggleChat}
          className="group relative p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:scale-110 bg-[#ea384c] hover:bg-[#d12e42] text-white border-2 border-[#ea384c] hover:border-[#d12e42] focus:outline-none focus:ring-4 focus:ring-[#ea384c]/20"
          aria-label={isChatOpen ? "Close chat assistant" : "Open chat assistant"}
          aria-expanded={isChatOpen}
        >
          <MessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
            Chat with us
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </button>

        {/* Back to top button - only visible when scrolled down */}
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
      </div>

      {/* Enhanced Chat Modal with improved accessibility */}
      {isChatOpen && (
        <div 
          className="fixed bottom-20 right-4 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-[9998] flex flex-col h-96 border-2 border-gray-200 dark:border-gray-600"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
          aria-describedby="chat-description"
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
            <div>
              <h3 id="chat-title" className="font-bold text-gray-800 dark:text-gray-200">GLOHSEN Assistant</h3>
              <p id="chat-description" className="text-xs text-gray-600 dark:text-gray-400">AI-powered support chat</p>
            </div>
            <button 
              onClick={toggleChat}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ea384c] focus:ring-offset-2"
              aria-label="Close chat assistant"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900"
            role="log"
            aria-label="Chat conversation"
            aria-live="polite"
          >
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 p-3 rounded-lg shadow-sm ${
                    chat.type === 'user' 
                      ? 'bg-[#ea384c] text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
                  }`}
                  role={chat.type === 'system' ? 'status' : undefined}
                >
                  {chat.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <form 
            onSubmit={sendMessage} 
            className="p-4 border-t-2 border-gray-200 dark:border-gray-600 flex gap-2 bg-white dark:bg-gray-800 rounded-b-lg"
            aria-label="Send message form"
          >
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              id="chat-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-3 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ea384c] focus:border-[#ea384c] dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              aria-describedby="chat-input-help"
            />
            <p id="chat-input-help" className="sr-only">
              Type your question or message and press enter or click send
            </p>
            <Button 
              type="submit" 
              className="bg-[#ea384c] hover:bg-[#d12e42] text-white px-4 py-3 focus:ring-2 focus:ring-[#ea384c] focus:ring-offset-2"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>        </div>
      )}
    </>
  );
};

export default FloatingActionButtons;
