import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const GlohsenScoreSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] relative overflow-hidden">
      {/* 3D Elements Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-24 h-24 rounded-lg bg-[#D4AF37]/10 transform rotate-12 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-lg bg-[#D4AF37]/10 transform -rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-lg bg-[#D4AF37]/10 transform rotate-45 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 right-1/4 w-32 h-32 rounded-lg bg-[#D4AF37]/10 transform -rotate-20 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 font-playfair text-[#000000e6]">
            WHAT IS YOUR GLOHSEN SCORE?
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            The GLOHSEN Score is our proprietary metric that evaluates healthcare professionals across multiple dimensions. 
            It helps you showcase your expertise and gives employers confidence in your abilities.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="glassmorphism rounded-2xl shadow-2xl overflow-hidden transform perspective-1000">
            <div className="bg-gradient-to-r from-[#D4AF37]/20 to-transparent p-10 border-b border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
                {/* Performance Box */}
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] p-4 rounded-lg shadow-lg relative overflow-hidden h-56 flex flex-col justify-center">
                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-2 bg-white/20 rounded-full flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Performance</h3>
                    <p className="text-white/80 mb-3 text-sm">
                      Evaluates your technical skills, knowledge, and procedural competence based on assessments and employer feedback.
                    </p>
                    <div className="text-3xl font-bold text-white mb-2">86<span className="text-base">/100</span></div>
                    <span className="inline-block bg-white/20 text-white text-xs px-2 py-0.5 rounded">Above Average</span>
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                </div>
                {/* Earnings Box */}
                <div className="bg-gradient-to-br from-[#1E2738] to-[#111827] p-4 rounded-lg shadow-lg relative overflow-hidden h-56 flex flex-col justify-center">
                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-2 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Earnings</h3>
                    <p className="text-white/80 mb-3 text-sm">
                      Increase your earning potential with a higher GLOHSEN score. Top-rated professionals earn up to 40% more.
                    </p>
                    <div className="text-3xl font-bold text-white mb-2">₦10,000,000</div>
                    <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black text-xs px-3 py-1 h-auto">
                      Withdraw
                    </Button>
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-full"></div>
                </div>
                {/* Experience Box */}
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] p-4 rounded-lg shadow-lg relative overflow-hidden h-56 flex flex-col justify-center">
                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-2 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Experience</h3>
                    <p className="text-white/80 mb-3 text-sm">
                      Reflects your years of practice, diversity of clinical settings, and leadership roles in healthcare.
                    </p>
                    <div className="text-3xl font-bold text-white mb-2">92<span className="text-base">/100</span></div>
                    <span className="inline-block bg-white/20 text-white text-xs px-2 py-0.5 rounded">Excellent</span>
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                </div>
              </div>

              {/* 3 Buttons Row */}
              <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center">
                <Button className="bg-[#D4AF37] hover:bg-[#B22222] text-white text-base px-8 py-3 rounded-lg shadow font-semibold transition-all">
                  Share Score
                </Button>
                <Button className="bg-[#1E2738] hover:bg-[#B22222] text-white text-base px-8 py-3 rounded-lg shadow font-semibold transition-all">
                  Download Report
                </Button>
                <Button className="bg-[#D4AF37] hover:bg-[#B22222] text-white text-base px-8 py-3 rounded-lg shadow font-semibold transition-all">
                  Print Certificate
                </Button>
              </div>

              {/* Sign Up/Sign In Button */}
              <div className="mt-8 flex justify-center">
                <Link to="/signup">
                  <Button className="button-3d bg-[#D4AF37] text-white border-none px-8 py-6 text-lg">
                    SIGN IN/SIGN UP TO KNOW YOURS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlohsenScoreSection;
