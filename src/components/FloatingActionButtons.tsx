
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronsUp, MessageSquare, X, Send } from 'lucide-react';
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

  return (
    <>
      <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-50">
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Chat with us button */}
        <button
          onClick={toggleChat}
          className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 bg-amber-500 text-black dark:bg-amber-400 dark:text-black"
          aria-label="Chat with us"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        {/* Back to top button - only visible when scrolled down */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 bg-red-800 text-white"
            aria-label="Back to top"
          >
            <ChevronsUp className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 flex flex-col h-96 border border-gray-200 dark:border-gray-700">
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">GLOHSEN Assistant</h3>
            <button 
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-amber-500 text-black' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {chat.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            />
            <Button type="submit" size="icon" variant="outline">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingActionButtons;
