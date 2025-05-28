
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlohsenScoreCalculator from "@/components/GlohsenScoreCalculator";
import GlohsenScoreResults from "@/components/GlohsenScoreResults";
import EQAssessment from "@/components/EQAssessment";

const GlohsenScore = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">GLOHSEN Score</h1>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="calculator">Score Calculator</TabsTrigger>
            <TabsTrigger value="results">Results & History</TabsTrigger>
            <TabsTrigger value="eq">EQ Assessment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="mt-0">
            <GlohsenScoreCalculator />
          </TabsContent>
          
          <TabsContent value="results" className="mt-0">
            <GlohsenScoreResults />
          </TabsContent>
          
          <TabsContent value="eq" className="mt-0">
            <EQAssessment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GlohsenScore;
