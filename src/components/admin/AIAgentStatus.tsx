import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, RefreshCw, CheckCircle, Clock, MessageSquare, Router, BarChart, UserCheck, AlertCircle, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AIActivityAgentSingleton from '@/services/aiActivityAgent';
import FeedbackRoutingAgentSingleton from '@/services/feedbackRoutingAgent';

const AIAgentStatus: React.FC = () => {
  // Testimonial Curation Agent state
  const [testimonialStatus, setTestimonialStatus] = useState({ 
    active: false, 
    lastUpdate: null, 
    featuredCount: 0 
  });
  const [isUpdatingTestimonials, setIsUpdatingTestimonials] = useState(false);

  // Feedback Routing Agent state
  const [feedbackStatus, setFeedbackStatus] = useState({
    active: false,
    stats: { matched: 0, unmatched: 0, categories: {} },
    unmatchedCount: 0,
    pendingReviewCount: 0,
    unregisteredEntities: 0
  });
  const [isUpdatingFeedback, setIsUpdatingFeedback] = useState(false);
  
  const updateTestimonialStatus = () => {
    const aiAgent = AIActivityAgentSingleton.getInstance();
    const status = AIActivityAgentSingleton.getStatus();
    setTestimonialStatus({
      active: status.active,
      lastUpdate: status.lastAutomatedUpdate || status.lastManualUpdate,
      featuredCount: status.featuredCount
    });
  };
  
  const updateFeedbackStatus = () => {
    const feedbackAgent = FeedbackRoutingAgentSingleton.getInstance();
    const stats = FeedbackRoutingAgentSingleton.getRoutingStats();
    const unmatched = FeedbackRoutingAgentSingleton.getUnmatchedFeedback();
    const reviewQueue = FeedbackRoutingAgentSingleton.getManualReviewQueue();
    const entities = FeedbackRoutingAgentSingleton.getUnregisteredEntities();
    
    setFeedbackStatus({
      active: true, // Assuming it's active if we can get stats
      stats,
      unmatchedCount: unmatched.length,
      pendingReviewCount: reviewQueue.length,
      unregisteredEntities: entities.length
    });
  };

  useEffect(() => {
    updateTestimonialStatus();
    updateFeedbackStatus();
    
    // Update status every 30 seconds
    const interval = setInterval(() => {
      updateTestimonialStatus();
      updateFeedbackStatus();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleForceUpdateTestimonials = async () => {
    setIsUpdatingTestimonials(true);
    try {
      const aiAgent = AIActivityAgentSingleton.getInstance();
      await AIActivityAgentSingleton.forceUpdate();
      updateTestimonialStatus();
    } catch (error) {
      console.error('Testimonial force update failed:', error);
    } finally {
      setIsUpdatingTestimonials(false);
    }
  };
  
  const handleForceProcessFeedback = async () => {
    setIsUpdatingFeedback(true);
    try {
      const feedbackAgent = FeedbackRoutingAgentSingleton.getInstance();
      await FeedbackRoutingAgentSingleton.processPendingFeedback();
      updateFeedbackStatus();
    } catch (error) {
      console.error('Feedback processing failed:', error);
    } finally {
      setIsUpdatingFeedback(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-[#D4AF37]/20">
        <CardHeader className="pb-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Bot className="h-5 w-5 text-[#D4AF37]" />
              AI Activity Agents Dashboard
            </CardTitle>
          </div>
          <CardDescription>
            Monitor and manage the platform's AI agents
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="testimonials" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="testimonials">Testimonial Curation</TabsTrigger>
              <TabsTrigger value="feedback">Feedback Routing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="testimonials" className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold">Testimonial Curation Agent</h3>
                <Badge variant={testimonialStatus.active ? 'default' : 'secondary'}>
                  {testimonialStatus.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Featured Stories: {testimonialStatus.featuredCount}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span>
                    Last Update: {testimonialStatus.lastUpdate 
                      ? new Date(testimonialStatus.lastUpdate).toLocaleString() 
                      : 'Never'
                    }
                  </span>
                </div>
                
                <Button 
                  onClick={handleForceUpdateTestimonials} 
                  disabled={isUpdatingTestimonials}
                  size="sm"
                  className="w-full"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isUpdatingTestimonials ? 'animate-spin' : ''}`} />
                  {isUpdatingTestimonials ? 'Updating...' : 'Curate Featured Testimonials'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="feedback" className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold">Feedback Routing Agent</h3>
                <Badge variant={feedbackStatus.active ? 'default' : 'secondary'}>
                  {feedbackStatus.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Matched</span>
                  </div>
                  <p className="text-2xl font-semibold">{feedbackStatus.stats.matched || 0}</p>
                </div>
                
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium">Unmatched</span>
                  </div>
                  <p className="text-2xl font-semibold">{feedbackStatus.stats.unmatched || 0}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                  <span>
                    Feedback awaiting review: <span className="font-semibold">{feedbackStatus.pendingReviewCount}</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span>
                    Unregistered healthcare entities: <span className="font-semibold">{feedbackStatus.unregisteredEntities}</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span>
                    Routing success rate: <span className="font-semibold">
                      {feedbackStatus.stats.matched + feedbackStatus.stats.unmatched > 0 
                        ? Math.round((feedbackStatus.stats.matched / (feedbackStatus.stats.matched + feedbackStatus.stats.unmatched)) * 100)
                        : 0}%
                    </span>
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handleForceProcessFeedback} 
                disabled={isUpdatingFeedback}
                size="sm"
                className="w-full"
              >
                <Router className={`h-4 w-4 mr-2 ${isUpdatingFeedback ? 'animate-spin' : ''}`} />
                {isUpdatingFeedback ? 'Processing...' : 'Process Pending Feedback'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAgentStatus;
