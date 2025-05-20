
import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Info, ArrowDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EmployerCriteriaPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [totalWeight, setTotalWeight] = useState(132); // Initial total weight is 132%

  const [criteriaWeights, setCriteriaWeights] = useState({
    yearsExperience: 10,
    basicSkills: 10, 
    advancedSkills: 10,
    previousLocums: 10,
    volunteerWillingness: 10,
    location: 10
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSliderChange = (name: string, value: number[]) => {
    const newWeights = { ...criteriaWeights, [name]: value[0] };
    setCriteriaWeights(newWeights);
    
    // Calculate new total weight
    const newTotalWeight = Object.values(newWeights).reduce((total, weight) => total + weight, 0);
    setTotalWeight(newTotalWeight);
  };

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="employer criteria" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Employer's Candidate Criteria</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Our comprehensive scoring system helps employers find the most qualified healthcare professionals based on multiple factors.
          </p>
          
          <div className="bg-[#D4AF37] text-black text-center py-4 rounded-lg mb-8">
            <p className="text-xl font-bold">MAX score possible = 1,000,000,000!</p>
          </div>
          
          <Tabs defaultValue="weights" className="mb-10">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="weights">Criteria Weights</TabsTrigger>
              <TabsTrigger value="selection">Interactive Selection</TabsTrigger>
              <TabsTrigger value="guide">Reference Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weights">
              <Card>
                <CardHeader>
                  <CardTitle>Set Criteria Importance</CardTitle>
                  <CardDescription>
                    Adjust the weight of each criterion to find the perfect match for your needs. Total weight must equal 100%.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div>Total Weight: {totalWeight}%</div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Job Types</SelectItem>
                          <SelectItem value="emergency">Emergency Medicine</SelectItem>
                          <SelectItem value="primary">Primary Care</SelectItem>
                          <SelectItem value="specialist">Specialist</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">Normalize Weights</Button>
                    </div>
                    
                    <div className="relative w-full mt-2">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div 
                          className={`h-full ${totalWeight > 100 ? 'bg-red-500' : 'bg-[#D4AF37]'} rounded-full`}
                          style={{ width: `${Math.min(totalWeight, 100)}%` }}
                        ></div>
                      </div>
                      {totalWeight > 100 && (
                        <Badge className="absolute top-4 right-0 bg-red-500">
                          Over-weighted ({totalWeight - 100}% excess)
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CriterionCard 
                      title="Years of Experience"
                      description="Professional experience in healthcare"
                      value={criteriaWeights.yearsExperience}
                      onChange={(value) => handleSliderChange('yearsExperience', value)}
                    />
                    
                    <CriterionCard 
                      title="Basic Skills"
                      description="Required medical certifications"
                      value={criteriaWeights.basicSkills}
                      onChange={(value) => handleSliderChange('basicSkills', value)}
                    />
                    
                    <CriterionCard 
                      title="Advanced Skills"
                      description="Specialized certifications"
                      value={criteriaWeights.advancedSkills}
                      onChange={(value) => handleSliderChange('advancedSkills', value)}
                    />
                    
                    <CriterionCard 
                      title="Previous Locums"
                      description="Number of successfully completed locums"
                      value={criteriaWeights.previousLocums}
                      onChange={(value) => handleSliderChange('previousLocums', value)}
                    />
                    
                    <CriterionCard 
                      title="Volunteer Willingness"
                      description="Willingness to volunteer or accept challenges"
                      value={criteriaWeights.volunteerWillingness}
                      onChange={(value) => handleSliderChange('volunteerWillingness', value)}
                    />
                    
                    <CriterionCard 
                      title="Location"
                      description="Proximity to workplace"
                      value={criteriaWeights.location}
                      onChange={(value) => handleSliderChange('location', value)}
                    />
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
                      Apply Criteria
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="selection">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-xl mb-6">
                    Interactive candidate selection coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="guide">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-xl mb-6">
                    Reference guide for criteria definitions coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

// Component for individual criterion card
const CriterionCard = ({ 
  title, 
  description, 
  value, 
  onChange 
}: { 
  title: string; 
  description: string; 
  value: number; 
  onChange: (value: number[]) => void;
}) => {
  return (
    <div className="p-6 border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium flex items-center">
          {title} <Info className="h-4 w-4 text-gray-400 ml-1" />
        </h3>
        <span className="font-semibold">{value}%</span>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      
      <div className="w-full">
        <Slider 
          defaultValue={[value]} 
          max={100} 
          step={1} 
          className="w-full"
          onValueChange={onChange}
        />
        
        <div className="w-full flex justify-between mt-2">
          <div className="h-1 w-1 bg-red-500 rounded-full"></div>
          <div className="h-1 w-1 bg-amber-500 rounded-full"></div>
          <div className="h-1 w-1 bg-[#D4AF37] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default EmployerCriteriaPage;
