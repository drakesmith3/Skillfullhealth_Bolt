
import React from 'react';
import { Card } from "@/components/ui/card";

const ClotQuestGame = () => {
  return (
    <div className="relative">
      <Card className="overflow-hidden bg-[#1E293B] text-white border-none">
        <img 
          src="/lovable-uploads/6fc4c722-159d-415f-bd8a-8d655ae36955.png" 
          alt="ClotQuest: Coagulation Cascade Game" 
          className="w-full object-contain h-64"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#1E293B] to-transparent p-4">
          <div className="flex justify-between items-center">
            <div className="text-xs font-semibold">Level 1: Coagulation Cascade</div>
            <div className="text-xs font-mono">Score: <span className="text-d4af37">1000</span></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClotQuestGame;
