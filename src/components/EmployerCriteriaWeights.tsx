
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface CriteriaWeight {
  id: string;
  name: string;
  weight: number;
}

const initialCriteria: CriteriaWeight[] = [
  { id: 'experience', name: 'Years of Experience', weight: 20 },
  { id: 'education', name: 'Educational Qualifications', weight: 15 },
  { id: 'cme', name: 'Continuing Medical Education', weight: 10 },
  { id: 'reviews', name: 'Professional Reviews & Feedback', weight: 10 },
  { id: 'personality', name: 'Personality Assessment', weight: 5 },
  { id: 'specialties', name: 'Specialties & Certifications', weight: 10 },
  { id: 'location', name: 'Location Flexibility', weight: 5 },
  { id: 'availability', name: 'Availability', weight: 10 },
  { id: 'pricing', name: 'Pricing Expectations', weight: 10 },
  { id: 'cultural', name: 'Cultural Fit', weight: 5 },
];

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
  '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'
];

const EmployerCriteriaWeights = () => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<CriteriaWeight[]>(initialCriteria);
  const [totalWeight, setTotalWeight] = useState<number>(100);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const sum = criteria.reduce((acc, curr) => acc + curr.weight, 0);
    setTotalWeight(sum);
  }, [criteria]);

  const handleWeightChange = (id: string, value: number) => {
    setCriteria(prev => 
      prev.map(criterion => 
        criterion.id === id ? { ...criterion, weight: value } : criterion
      )
    );
  };

  const handleSave = () => {
    if (totalWeight !== 100) {
      toast({
        title: "Invalid Weights",
        description: `Total weight must be 100%. Current total is ${totalWeight}%`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Criteria Weights Saved",
      description: "Your preference settings have been updated successfully."
    });
    
    setIsEditing(false);
  };

  const handleReset = () => {
    setCriteria(initialCriteria);
    setIsEditing(false);
  };

  return (
    <Card className="shadow-lg border border-gray-200">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="flex justify-between items-center">
          <span>Criteria Weightage</span>
          <div className="text-sm font-normal flex items-center gap-2">
            Total: <span className={totalWeight === 100 ? "text-green-600" : "text-red-600"}>
              {totalWeight}%
            </span>
            {!isEditing ? (
              <Button size="sm" onClick={() => setIsEditing(true)}>Edit Weights</Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleReset}>Reset</Button>
                <Button size="sm" onClick={handleSave}>Save</Button>
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor={criterion.id} className="flex-grow">
                    {criterion.name}
                  </Label>
                  <div className="flex items-center gap-2 w-24">
                    {isEditing ? (
                      <Input
                        id={`${criterion.id}-input`}
                        type="number"
                        min="0"
                        max="100"
                        value={criterion.weight}
                        onChange={(e) => handleWeightChange(criterion.id, Number(e.target.value))}
                        className="w-16 h-8 text-center"
                      />
                    ) : (
                      <span className="font-medium">{criterion.weight}%</span>
                    )}
                  </div>
                </div>
                
                {isEditing && (
                  <Slider
                    id={criterion.id}
                    value={[criterion.weight]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleWeightChange(criterion.id, value[0])}
                    className="py-2"
                  />
                )}
              </div>
            ))}
          </div>
          
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center">
              <p>Weight Distribution</p>
              <p className="text-xs text-gray-500">These weights determine how candidates are matched to your requirements</p>
            </div>
            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={criteria}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="weight"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {criteria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployerCriteriaWeights;
