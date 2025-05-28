import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { testimonialCurationAgent } from '../../services/testimonialCurationAgent';
import { feedbackRoutingAgent } from '../../services/feedbackRoutingAgent';
import { recommendationAgent } from '../../services/recommendationAgent';

const AdminDashboard: React.FC = () => {
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    profession: '',
    content: '',
    rating: 5,
    location: ''
  });

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.content) {
      testimonialCurationAgent.addManualTestimonial({
        ...newTestimonial,
        date: new Date().toISOString().split('T')[0],
        verified: true
      });
      
      setNewTestimonial({
        name: '',
        profession: '',
        content: '',
        rating: 5,
        location: ''
      });
      
      alert('Testimonial added successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Agents Admin Dashboard</h1>
        
        <Tabs defaultValue="testimonials" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="testimonials">Testimonial Agent</TabsTrigger>
            <TabsTrigger value="feedback">Feedback Routing</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>          {/* Testimonial Curation Agent */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card size="lg" variant="default">
              <CardHeader>
                <CardTitle>Testimonial Curation Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card size="md" variant="stats">
                    <CardContent compact className="p-4">
                      <div className="text-2xl font-bold text-[#D4AF37]">
                        {testimonialCurationAgent.getAllTestimonials().length}
                      </div>
                      <div className="text-sm text-gray-600">Total Testimonials</div>
                    </CardContent>
                  </Card>
                  <Card size="md" variant="stats">
                    <CardContent compact className="p-4">
                      <div className="text-2xl font-bold text-[#EA384C]">
                        {testimonialCurationAgent.getManualTestimonials().length}
                      </div>
                      <div className="text-sm text-gray-600">Manual Entries</div>
                    </CardContent>
                  </Card>
                  <Card size="md" variant="stats">
                    <CardContent compact className="p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {testimonialCurationAgent.getCuratedTestimonials().length}
                      </div>
                      <div className="text-sm text-gray-600">Curated for Display</div>
                    </CardContent>
                  </Card>
                </div>

                <Card size="lg" variant="default">
                  <CardHeader>
                    <CardTitle>Add Manual Testimonial</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                          placeholder="Dr. John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="profession">Profession</Label>
                        <Input
                          id="profession"
                          value={newTestimonial.profession}
                          onChange={(e) => setNewTestimonial({...newTestimonial, profession: e.target.value})}
                          placeholder="Cardiologist"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newTestimonial.location}
                          onChange={(e) => setNewTestimonial({...newTestimonial, location: e.target.value})}
                          placeholder="Lagos, Nigeria"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rating">Rating</Label>
                        <Select 
                          value={newTestimonial.rating.toString()} 
                          onValueChange={(value) => setNewTestimonial({...newTestimonial, rating: parseInt(value)})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="content">Testimonial Content</Label>
                      <Textarea
                        id="content"
                        value={newTestimonial.content}
                        onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
                        placeholder="Enter testimonial content..."
                        rows={4}
                      />
                    </div>
                    <Button onClick={handleAddTestimonial} className="bg-[#D4AF37] text-black hover:bg-[#B8941F]">
                      Add Testimonial
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Routing Agent */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Routing Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-gray-600">Total Processed</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-gray-600">Successful Matches</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-yellow-600">0</div>
                      <div className="text-sm text-gray-600">Manual Reviews</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-[#EA384C]">0</div>
                      <div className="text-sm text-gray-600">Unregistered</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Routing Activity</h3>
                  <div className="text-gray-500">No recent activity to display</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendation Agent */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-[#D4AF37]">Active</div>
                      <div className="text-sm text-gray-600">Agent Status</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-gray-600">Recommendations Generated</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">95%</div>
                      <div className="text-sm text-gray-600">Accuracy Rate</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Recommendation Limit</Label>
                      <Input type="number" defaultValue="5" />
                    </div>
                    <div>
                      <Label>Confidence Threshold</Label>
                      <Input type="number" defaultValue="0.7" step="0.1" min="0" max="1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Access Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Admin Dashboard Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-semibold">How to Access This Dashboard:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Navigate to <code className="bg-gray-100 px-2 py-1 rounded">/admin/dashboard</code></li>
                <li>This dashboard is protected and requires admin authentication</li>
                <li>All AI agents can be monitored and configured from here</li>
              </ol>
              
              <h3 className="font-semibold mt-6">AI Agent Management:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Testimonial Agent:</strong> Add/remove manual testimonials, view curation statistics</li>
                <li><strong>Feedback Routing:</strong> Monitor routing accuracy, review unmatched feedback</li>
                <li><strong>Recommendation Agent:</strong> Configure recommendation parameters, view performance metrics</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
