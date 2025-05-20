
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, Paperclip, Search, Filter, UserCircle, Check, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const InboxActivities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState("msg-1");
  const [newMessage, setNewMessage] = useState("");
  
  const conversations = [
    {
      id: "msg-1",
      with: "Dr. Elizabeth Okafor",
      role: "Medical Director",
      avatar: "",
      initials: "EO",
      lastMessage: "Thank you for your interest in the emergency locum position.",
      timestamp: "2025-05-18 10:30 AM",
      unread: true,
      messages: [
        {
          from: "Dr. Elizabeth Okafor",
          content: "Hello Dr. Olusiji, I've reviewed your application for the Emergency Department position at Mercy Medical Center. Your qualifications match what we're looking for.",
          timestamp: "2025-05-18 09:15 AM",
          isRead: true
        },
        {
          from: "Dr. Elizabeth Okafor",
          content: "We would like to schedule an interview with you next week. Are you available on Tuesday or Wednesday?",
          timestamp: "2025-05-18 09:16 AM",
          isRead: true
        },
        {
          from: "You",
          content: "Thank you for considering my application, Dr. Okafor. I'm available on Tuesday afternoon after 2 PM. Would that work for you?",
          timestamp: "2025-05-18 10:20 AM",
          isRead: true
        },
        {
          from: "Dr. Elizabeth Okafor",
          content: "That works perfectly. Let's schedule for Tuesday at 3 PM then. I'll send you the interview details shortly. Thank you for your interest in the emergency locum position.",
          timestamp: "2025-05-18 10:30 AM",
          isRead: false
        }
      ]
    },
    {
      id: "msg-2",
      with: "Dr. Samuel Okoye",
      role: "Community Health Director",
      avatar: "",
      initials: "SO",
      lastMessage: "We appreciate your application, but the position requires more experience.",
      timestamp: "2025-05-15 14:22 PM",
      unread: false,
      messages: [
        {
          from: "Dr. Samuel Okoye",
          content: "Dear Dr. Olusiji, thank you for your application to the Primary Care Physician position at our Community Health Center.",
          timestamp: "2025-05-15 14:20 PM",
          isRead: true
        },
        {
          from: "Dr. Samuel Okoye",
          content: "After reviewing your application, we've determined that this particular position requires more experience specifically in rural healthcare settings. We appreciate your interest and encourage you to apply for future positions that better match your experience profile.",
          timestamp: "2025-05-15 14:22 PM",
          isRead: true
        }
      ]
    },
    {
      id: "msg-3",
      with: "GLOHSEN Admin",
      role: "System Notification",
      avatar: "",
      initials: "GA",
      lastMessage: "Your BLS certification expires in 30 days. Please renew it soon.",
      timestamp: "2025-05-14 08:00 AM",
      unread: true,
      messages: [
        {
          from: "GLOHSEN Admin",
          content: "Important Notification: Your BLS (Basic Life Support) certification will expire in 30 days. Please ensure you renew it before expiration to maintain your current GLOHSEN Score and job eligibility.",
          timestamp: "2025-05-14 08:00 AM",
          isRead: false
        }
      ]
    }
  ];
  
  const notifications = [
    {
      id: "notif-1",
      title: "New Job Match",
      content: "A new job matching your profile has been posted: ICU Physician at Premier Hospital.",
      timestamp: "Just now",
      isRead: false,
      type: "job"
    },
    {
      id: "notif-2",
      title: "Score Update",
      content: "Your GLOHSEN Score has increased by 5 points due to recent CPD activity.",
      timestamp: "2 hours ago",
      isRead: false,
      type: "score"
    },
    {
      id: "notif-3",
      title: "Upcoming Interview",
      content: "Reminder: You have an interview scheduled with Dr. Elizabeth Okafor tomorrow at 3 PM.",
      timestamp: "1 day ago",
      isRead: true,
      type: "interview"
    },
    {
      id: "notif-4",
      title: "Certificate Expiration",
      content: "Your ACLS certification will expire in 60 days. Please plan for renewal.",
      timestamp: "3 days ago",
      isRead: true,
      type: "certificate"
    }
  ];
  
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      // In a real application, this would update the messages array and send to backend
      console.log(`Sending message: ${newMessage}`);
      setNewMessage("");
    }
  };
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    conv => conv.with.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <MessageSquare className="mr-2 h-6 w-6 text-[#D4AF37]" />
          Inbox & Activities
        </h2>
      </div>
      
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="messages" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" /> Messages
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1 border rounded-lg overflow-hidden flex flex-col">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b">
                <Input 
                  icon={<Search className="h-4 w-4 text-gray-500" />}
                  placeholder="Search messages..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <ScrollArea className="h-[500px]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conv) => (
                    <div 
                      key={conv.id}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        selectedConversation === conv.id 
                          ? "bg-gray-100 dark:bg-gray-700" 
                          : ""
                      } ${
                        conv.unread 
                          ? "border-l-4 border-l-[#D4AF37]" 
                          : ""
                      }`}
                      onClick={() => setSelectedConversation(conv.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={conv.avatar} alt={conv.with} />
                          <AvatarFallback className="bg-[#D4AF37] text-white">
                            {conv.initials}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-sm">{conv.with}</h4>
                            <span className="text-xs text-gray-500">{conv.timestamp.split(' ')[0]}</span>
                          </div>
                          
                          <p className="text-xs text-gray-600 truncate">{conv.role}</p>
                          <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                        </div>
                        
                        {conv.unread && (
                          <div className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No conversations found
                  </div>
                )}
              </ScrollArea>
            </div>
            
            {/* Chat Area */}
            <div className="lg:col-span-2 border rounded-lg overflow-hidden flex flex-col">
              {selectedConversation && (
                <>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-[#D4AF37] text-white">
                          {conversations.find(c => c.id === selectedConversation)?.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-medium">
                          {conversations.find(c => c.id === selectedConversation)?.with}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {conversations.find(c => c.id === selectedConversation)?.role}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Button variant="ghost" size="icon">
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4 h-[400px]">
                    <div className="space-y-4">
                      {conversations
                        .find(c => c.id === selectedConversation)
                        ?.messages.map((msg, idx) => (
                        <div 
                          key={idx}
                          className={`flex flex-col max-w-[80%] ${
                            msg.from === "You" 
                              ? "ml-auto items-end" 
                              : "items-start"
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium">{msg.from}</span>
                            <span className="text-xs text-gray-500">{msg.timestamp}</span>
                            {msg.from === "You" && (
                              <Check 
                                className={`h-3 w-3 ${
                                  msg.isRead ? "text-blue-500" : "text-gray-400"
                                }`}
                              />
                            )}
                          </div>
                          
                          <div className={`p-3 rounded-xl ${
                            msg.from === "You"
                              ? "bg-[#D4AF37]/10 text-gray-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-3 border-t flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    
                    <Input 
                      placeholder="Type your message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    
                    <Button 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim()}
                      className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Notifications</h3>
            
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 border rounded-lg ${
                  !notif.isRead ? "bg-gray-50 border-l-4 border-l-[#D4AF37]" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      notif.type === "job" ? "bg-blue-100 text-blue-600" :
                      notif.type === "score" ? "bg-green-100 text-green-600" :
                      notif.type === "interview" ? "bg-purple-100 text-purple-600" :
                      "bg-amber-100 text-amber-600"
                    }`}>
                      {notif.type === "job" ? <Briefcase className="h-4 w-4" /> :
                       notif.type === "score" ? <ChartBar className="h-4 w-4" /> :
                       notif.type === "interview" ? <UserCircle className="h-4 w-4" /> :
                       <Bell className="h-4 w-4" />}
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{notif.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notif.content}</p>
                      <span className="text-xs text-gray-500 mt-2 block">{notif.timestamp}</span>
                    </div>
                  </div>
                  
                  {!notif.isRead && (
                    <Badge className="bg-[#D4AF37] text-white">New</Badge>
                  )}
                </div>
                
                {!notif.isRead && (
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="ghost">
                      Mark as read
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline">View All Notifications</Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InboxActivities;
