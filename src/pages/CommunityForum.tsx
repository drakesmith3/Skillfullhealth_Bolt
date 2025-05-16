
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, ThumbsUp, ThumbsDown, Search, Filter, Users, Star } from "lucide-react";
import { useAIActivity } from "@/components/AIActivityAgent";

const CommunityForum: React.FC = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const aiActivity = useAIActivity();

  // Mock discussion data
  const mockDiscussions = [
    {
      id: 1,
      title: "Experience with Wait Times at Central Hospital",
      author: "MedPatient423",
      authorImg: "MP",
      content: "I recently visited Central Hospital and was impressed with how they've improved their wait times. I was seen within 15 minutes of my appointment time. Has anyone else noticed this improvement?",
      replies: 23,
      views: 342,
      likes: 56,
      category: "facilities",
      tags: ["wait-times", "hospital-experience"],
      timestamp: "2 hours ago",
      isPinned: true,
    },
    {
      id: 2,
      title: "Dr. Johnson's Cardiology Consultation Approach",
      author: "HeartHealthy",
      authorImg: "HH",
      content: "I wanted to share my experience with Dr. Johnson in the cardiology department. She took her time explaining my condition and treatment options in detail. It made a huge difference in my understanding and peace of mind.",
      replies: 15,
      views: 187,
      likes: 42,
      category: "professionals",
      tags: ["cardiology", "consultation"],
      timestamp: "5 hours ago",
      isPinned: false,
    },
    {
      id: 3,
      title: "ACLS Training Workshop by Dr. Patel - Review",
      author: "EmergencyMD",
      authorImg: "EM",
      content: "Just completed the ACLS training workshop led by Dr. Patel. The hands-on approach was excellent, and I feel much more confident in emergency scenarios. Would recommend to anyone needing to update their certification.",
      replies: 31,
      views: 412,
      likes: 78,
      category: "tutors",
      tags: ["training", "ACLS", "certification"],
      timestamp: "1 day ago",
      isPinned: false,
    },
    {
      id: 4,
      title: "New Electronic Medical Record System at Riverside Medical",
      author: "TechSavvyNurse",
      authorImg: "TN",
      content: "Riverside Medical Center just implemented a new EMR system. As a nurse there, I'm finding it much more efficient than the previous one. Are patients noticing any improvements in their visit experiences?",
      replies: 28,
      views: 256,
      likes: 34,
      category: "facilities",
      tags: ["EMR", "technology", "patient-care"],
      timestamp: "2 days ago",
      isPinned: false,
    },
    {
      id: 5,
      title: "Experience with Metropolitan Clinic's Pediatric Department",
      author: "ParentOfThree",
      authorImg: "PT",
      content: "My children recently had their annual checkups at Metropolitan Clinic's pediatric department. The staff was incredibly friendly and made the experience stress-free for both the kids and me.",
      replies: 19,
      views: 203,
      likes: 47,
      category: "facilities",
      tags: ["pediatrics", "children", "checkup"],
      timestamp: "3 days ago",
      isPinned: false,
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setDiscussions(mockDiscussions);
      setIsLoading(false);
    }, 1000);

    // Track page view with AI Activity Agent
    aiActivity.trackActivity('page_view', { page: 'community_forum' });
  }, []);

  // Join a discussion
  const joinDiscussion = (discussionId: number) => {
    // In a real app, this would navigate to a specific discussion page
    console.log(`Joining discussion ${discussionId}`);
    aiActivity.trackActivity('discussion_joined', { discussionId });
  };

  // Create a new discussion
  const createNewDiscussion = () => {
    console.log("Creating new discussion");
    // This would open a modal or navigate to a new discussion form
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Community Forum
              </h1>
              <p className="text-gray-600 mt-2">
                Join discussions about healthcare experiences, professionals, and facilities.
              </p>
            </div>
            
            <Button 
              onClick={createNewDiscussion}
              className="bg-red-600 hover:bg-red-700"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Start New Discussion
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <Card className="mb-6">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Search discussions..." 
                        className="max-w-xs"
                        startIcon={<Search size={18} />}
                      />
                      <Button variant="outline" size="sm">
                        <Filter className="mr-1 h-4 w-4" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab}>
                    <div className="border-b px-4">
                      <TabsList className="mb-0 bg-transparent">
                        <TabsTrigger value="trending">
                          <Star className="mr-1 h-4 w-4" /> Trending
                        </TabsTrigger>
                        <TabsTrigger value="recent">Recent</TabsTrigger>
                        <TabsTrigger value="professionals">Professionals</TabsTrigger>
                        <TabsTrigger value="facilities">Facilities</TabsTrigger>
                        <TabsTrigger value="tutors">Tutors</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="trending" className="m-0 pt-2">
                      {isLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-red-600 rounded-full"></div>
                        </div>
                      ) : (
                        <DiscussionsList 
                          discussions={discussions.filter(d => d.isPinned || d.likes > 40)} 
                          onJoin={joinDiscussion}
                        />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="recent" className="m-0 pt-2">
                      {isLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-red-600 rounded-full"></div>
                        </div>
                      ) : (
                        <DiscussionsList 
                          discussions={discussions.sort((a, b) => 
                            a.timestamp.localeCompare(b.timestamp)
                          )} 
                          onJoin={joinDiscussion}
                        />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="professionals" className="m-0 pt-2">
                      {isLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-red-600 rounded-full"></div>
                        </div>
                      ) : (
                        <DiscussionsList 
                          discussions={discussions.filter(d => d.category === "professionals")} 
                          onJoin={joinDiscussion}
                        />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="facilities" className="m-0 pt-2">
                      {isLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-red-600 rounded-full"></div>
                        </div>
                      ) : (
                        <DiscussionsList 
                          discussions={discussions.filter(d => d.category === "facilities")} 
                          onJoin={joinDiscussion}
                        />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="tutors" className="m-0 pt-2">
                      {isLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-red-600 rounded-full"></div>
                        </div>
                      ) : (
                        <DiscussionsList 
                          discussions={discussions.filter(d => d.category === "tutors")} 
                          onJoin={joinDiscussion}
                        />
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <Card className="mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li>Be respectful to all community members</li>
                    <li>Provide constructive feedback</li>
                    <li>No personal attacks or harassment</li>
                    <li>Respect patient privacy and confidentiality</li>
                    <li>Avoid sharing sensitive personal information</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Active Members</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        EM
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">EmergencyMD</p>
                        <p className="text-xs text-gray-500">31 contributions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                        HH
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">HeartHealthy</p>
                        <p className="text-xs text-gray-500">28 contributions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                        TN
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">TechSavvyNurse</p>
                        <p className="text-xs text-gray-500">24 contributions</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <Users className="mr-1 h-4 w-4" />
                    View All Members
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Discussion List Component
const DiscussionsList = ({ discussions, onJoin }: { discussions: any[], onJoin: (id: number) => void }) => {
  if (discussions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No discussions found in this category.
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {discussions.map((discussion) => (
        <div key={discussion.id} className={`px-4 py-4 hover:bg-gray-50 transition-colors ${discussion.isPinned ? 'bg-amber-50' : ''}`}>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-medium flex-shrink-0">
                {discussion.authorImg}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {discussion.isPinned && (
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded mr-2">
                      Pinned
                    </span>
                  )}
                  {discussion.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Started by {discussion.author} • {discussion.timestamp}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {discussion.content}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {discussion.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 mt-3 md:mt-0 md:ml-4">
              <div className="flex flex-col items-center">
                <div className="text-sm font-medium">{discussion.replies}</div>
                <div className="text-xs text-gray-500">Replies</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm font-medium">{discussion.views}</div>
                <div className="text-xs text-gray-500">Views</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm font-medium flex items-center">
                  <ThumbsUp size={14} className="mr-1 text-gray-400" />
                  {discussion.likes}
                </div>
                <div className="text-xs text-gray-500">Likes</div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="ml-2"
                onClick={() => onJoin(discussion.id)}
              >
                Join Discussion
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityForum;
