import React from "react";

const GlohsenScoreResultMockup = () => (
  <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30 bg-white/90 backdrop-blur-lg flex flex-col items-center justify-center p-6">
    <h3 className="text-2xl font-bold text-[#D4AF37] mb-2 font-serif">Your GLOHSEN Score</h3>
    <div className="flex items-center justify-center mb-4">
      <span className="text-5xl font-extrabold text-[#D4AF37] mr-2">97</span>
      <span className="text-lg text-gray-500">/200</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
      <div className="bg-[#D4AF37] h-3 rounded-full" style={{ width: '48%' }}></div>
    </div>
    <div className="text-sm text-gray-700 mb-2">Congratulations! You are in the top 10% of healthcare professionals.</div>
    <div className="grid grid-cols-2 gap-2 w-full mt-4">
      {['Experience','Skills','Activity','Location','Availability'].map((item) => (
        <div key={item} className="bg-white/60 border border-[#D4AF37]/20 rounded-lg p-2 text-center text-xs font-semibold text-[#D4AF37] shadow-sm">
          {item}
        </div>
      ))}
    </div>
    <button className="mt-6 button-3d bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-bold shadow-lg">View Full Report</button>
  </div>
);

export default GlohsenScoreResultMockup;
