
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text">
            GLOHSEN
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/blog" className="text-black hover:text-red-600 transition-colors">Blog</Link>
          <Link to="/#about" className="text-black hover:text-red-600 transition-colors">About</Link>
          <Link to="/#how-it-works" className="text-black hover:text-red-600 transition-colors">How It Works</Link>
          <Link to="/#employers" className="text-black hover:text-red-600 transition-colors">Employers</Link>
          <Link to="/#professionals" className="text-black hover:text-red-600 transition-colors">Professionals</Link>
          <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col h-full p-8 pt-20">
          <Link to="/blog" className="py-3 text-xl border-b" onClick={toggleMenu}>Blog</Link>
          <Link to="/#about" className="py-3 text-xl border-b" onClick={toggleMenu}>About</Link>
          <Link to="/#how-it-works" className="py-3 text-xl border-b" onClick={toggleMenu}>How It Works</Link>
          <Link to="/#employers" className="py-3 text-xl border-b" onClick={toggleMenu}>Employers</Link>
          <Link to="/#professionals" className="py-3 text-xl border-b" onClick={toggleMenu}>Professionals</Link>
          <Link to="/signup" onClick={toggleMenu}>
            <Button className="mt-8 bg-red-600 hover:bg-red-700 text-white w-full">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
