import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, UserCheck, UserX, RefreshCw, TrendingUp, MessageSquare, Star, XCircle, Brain } from 'lucide-react';
import AIActivityAgentSingleton from '@/services/aiActivityAgent';
import FeedbackRoutingAgentSingleton from '@/services/feedbackRoutingAgent';
import RecommendationAgentSingleton from '@/services/recommendationAgent';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  testimonial: string;
  rating: number;
  source: string;
  dateAdded: string;
  featured?: boolean;
  isManuallyFeatured?: boolean;
}

interface TestimonialStatus {
  active: boolean;
  lastAutomatedUpdate: string | null;
  lastManualUpdate: string | null;
  featuredCount: number;
  featuredTestimonials: Testimonial[];
  allTestimonials: Testimonial[];
}

const AIAgentDashboard: React.FC = () => {
  const [testimonialStatus, setTestimonialStatus] = useState<TestimonialStatus>(AIActivityAgentSingleton.getStatus());
  const [routingStats, setRoutingStats] = useState(FeedbackRoutingAgentSingleton.getRoutingStats());
  const [recommendationStats, setRecommendationStats] = useState(RecommendationAgentSingleton.getStats());
  const [manualReviewQueue, setManualReviewQueue] = useState(FeedbackRoutingAgentSingleton.getManualReviewQueue()); 

  const updateStatuses = () => {
    setTestimonialStatus(AIActivityAgentSingleton.getStatus());
    setRoutingStats(FeedbackRoutingAgentSingleton.getRoutingStats());
    setRecommendationStats(RecommendationAgentSingleton.getStats());
    setManualReviewQueue(FeedbackRoutingAgentSingleton.getManualReviewQueue());
  };

  useEffect(() => {
    updateStatuses();
    const interval = setInterval(updateStatuses, 30000); 
    return () => clearInterval(interval);
  }, []);

  const handleManualFeatureToggle = (testimonialId: number, isManuallySet?: boolean) => {
    AIActivityAgentSingleton.manuallyUpdateFeaturedStatus(testimonialId, !isManuallySet);
    updateStatuses(); 
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Bot className="h-8 w-8 text-[#D4AF37]" />
        <h1 className="text-3xl font-bold">AI Activity Agent Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="testimonial-management">Manage</TabsTrigger>
          <TabsTrigger value="routing">Routing</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-[#D4AF37]" />
                <h3 className="text-xl font-semibold">Testimonial Curation</h3>
                <Badge variant={testimonialStatus.active ? 'default' : 'secondary'}>
                  {testimonialStatus.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Featured Stories:</span>
                  <span className="font-semibold">{testimonialStatus.featuredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Update:</span>
                  <span className="text-sm text-gray-600">
                    {testimonialStatus.lastAutomatedUpdate 
                      ? new Date(testimonialStatus.lastAutomatedUpdate).toLocaleString()
                      : 'Never'}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-semibold">Feedback Routing</h3>
                <Badge variant="default">Active</Badge> 
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    Matched:
                  </span>
                  <span className="font-semibold text-green-600">{routingStats.matched}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <UserX className="h-4 w-4 text-orange-500" />
                    Unmatched:
                  </span>
                  <span className="font-semibold text-orange-600">{routingStats.unmatched}</span>
                </div>
                <div className="flex justify-between">
                  <span>Manual Review:</span>
                  <span className="font-semibold">{manualReviewQueue.length}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold">AI Recommendations</h3>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Users:</span>
                  <span className="font-semibold">{recommendationStats.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Recommendations:</span>
                  <span className="font-semibold">{recommendationStats.averageRecommendations}</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-semibold text-green-600">
                    {Math.round(recommendationStats.successRate * 100)}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">AI Recommendation Engine</h3>
            <p className="text-gray-600 mb-6">
              This agent analyzes user behavior, preferences, and platform activity to provide 
              personalized course, job, and skill recommendations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{recommendationStats.totalUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{recommendationStats.averageRecommendations}</div>
                <div className="text-sm text-gray-600">Avg Recommendations</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Math.round(recommendationStats.successRate * 100)}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Top Recommendation Categories</h4>
              <div className="space-y-2">
                {recommendationStats.topCategories.map((category: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="font-medium">{category}</span>
                    <Badge variant="outline">{Math.round(Math.random() * 50 + 10)} recommendations</Badge>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => {
                console.log("Refreshing recommendation engine...");
                updateStatuses();
              }}
              className="w-full mt-6"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Recommendation Engine
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Testimonial Curation Agent</h3>
            <p className="text-gray-600 mb-6">
              This agent automatically selects and rotates the best testimonials for display 
              on the home page Success Stories section based on quality, recency, and diversity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#D4AF37]">{testimonialStatus.featuredCount}</div>
                <div className="text-sm text-gray-600">Currently Featured</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">30min</div>
                <div className="text-sm text-gray-600">Update Frequency</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">AI</div>
                <div className="text-sm text-gray-600">Selection Method</div>
              </div>
            </div>
            <Button 
              onClick={() => {
                const agent = AIActivityAgentSingleton.getInstance();
                agent.forceUpdate();
                updateStatuses();
              }}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Force Update Testimonials
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Currently Featured Testimonials</h3>
            {testimonialStatus.featuredTestimonials && testimonialStatus.featuredTestimonials.length > 0 ? (
              <ul className="space-y-3">
                {testimonialStatus.featuredTestimonials.map((ft) => (
                  <li key={ft.id} className="p-3 bg-gray-50 rounded-md border">
                    <p className="font-semibold">{ft.name} <span className="text-sm text-gray-500">({ft.role})</span></p>
                    <p className="text-xs text-gray-500">{ft.location} - Rating: {ft.rating}/5</p>
                    <p className="text-sm italic mt-1">"{ft.testimonial.substring(0,100)}..."</p>
                    {ft.isManuallyFeatured && <Badge variant="outline" className="mt-1 bg-yellow-100 text-yellow-700 border-yellow-300">Manually Pinned</Badge>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No testimonials are currently featured.</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="testimonial-management" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">All Testimonials</h3>
            <p className="text-gray-600 mb-6">
              Manage all submitted testimonials. You can manually feature or unfeature items. Manually featured items will remain featured unless unpinned.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testimonialStatus.allTestimonials && testimonialStatus.allTestimonials.map((t) => (
                    <tr key={t.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.location}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{t.role}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{t.rating}/5</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(t.dateAdded).toLocaleDateString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {t.featured ? (
                          <Badge variant={t.isManuallyFeatured ? 'default' : 'secondary'} className={`${t.isManuallyFeatured ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-100 text-green-700'} cursor-default`}>
                            {t.isManuallyFeatured ? 'Manually Pinned' : 'AI Selected'}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="cursor-default">Not Featured</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleManualFeatureToggle(t.id, t.isManuallyFeatured)}
                          title={t.isManuallyFeatured ? 'Unpin Testimonial (AI can select/deselect)' : (t.featured ? 'Convert to Pinned (Stays Featured)' : 'Pin Testimonial (Stays Featured)')}
                        >
                          {t.isManuallyFeatured ? <XCircle className="h-4 w-4 mr-1" /> : <Star className="h-4 w-4 mr-1" />}
                          {t.isManuallyFeatured ? 'Unpin' : 'Pin'}
                        </Button>
                        {/* Future buttons for Edit/Delete
                        <Button variant="ghost" size="icon" title="Edit Testimonial" onClick={() => alert('Edit not implemented')}><Edit3 className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" title="Delete Testimonial" onClick={() => handleDeleteTestimonial(t.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                        */}
                      </td>
                    </tr>
                  ))}
                  {(!testimonialStatus.allTestimonials || testimonialStatus.allTestimonials.length === 0) && (
                    <tr><td colSpan={6} className="text-center py-4 text-gray-500">No testimonials found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="routing" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Feedback Routing Agent</h3>
            <p className="text-gray-600 mb-6">
              This agent processes feedback from the General Feedback Form and intelligently 
              routes it to registered users' dashboards or creates entries for unregistered entities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{routingStats.matched}</div>
                <div className="text-sm text-gray-600">Successfully Matched</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <UserX className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{routingStats.unmatched}</div>
                <div className="text-sm text-gray-600">Unmatched Feedback</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Bot className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">5min</div> 
                <div className="text-sm text-gray-600">Processing Interval</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{manualReviewQueue.length}</div>
                <div className="text-sm text-gray-600">Manual Review Queue</div>
              </div>
            </div>

            {Object.keys(routingStats.categories).length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Routing by Category</h4>
                <div className="space-y-2">
                  {Object.entries(routingStats.categories).map(([category, stats]: [string, any]) => (
                    <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="capitalize font-medium">{category}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600">✓ {stats.matched || 0}</span>
                        <span className="text-orange-600">⚠ {stats.unmatched || 0}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={() => {
                const agent = FeedbackRoutingAgentSingleton.getInstance();
                // agent.processManualReviewQueue(); // Ensure this method exists and works as expected
                alert("Processing manual review queue - functionality to be fully implemented in FeedbackRoutingAgent.");
                updateStatuses();
              }}
              className="w-full"
              disabled={manualReviewQueue.length === 0} 
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Process {manualReviewQueue.length} Pending Feedback Item(s)
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAgentDashboard;
