
import React, { useState, ChangeEvent } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  User, 
  FileText, 
  Clock, 
  Search, 
  CheckCircle, 
  XCircle, 
  ChevronDown,
  Briefcase,
  BarChart as ChartBar
} from "lucide-react";

const InboxActivities: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMessages, setExpandedMessages] = useState<number[]>([]);
  
  // Mock data for inbox messages
  const messages = [
    {
      id: 1,
      sender: 'Hospital Corp Medical Center',
      subject: 'Job Application Update',
      content: 'Thank you for your application for the Cardiology Specialist position. We are pleased to inform you that your application has been shortlisted. Our HR team will contact you shortly to schedule an interview.',
      time: '2 hours ago',
      read: false,
      type: 'job',
      priority: 'high'
    },
    {
      id: 2,
      sender: 'Dr. Sarah Johnson',
      subject: 'Collaboration Opportunity',
      content: 'I recently came across your research paper on cardiovascular interventions and would like to discuss a potential collaboration on an upcoming study. Please let me know if you would be interested in scheduling a call to discuss this further.',
      time: '1 day ago',
      read: true,
      type: 'message',
      priority: 'medium'
    },
    {
      id: 3,
      sender: 'GLOHSEN System',
      subject: 'Certificate Renewal Reminder',
      content: 'This is a reminder that your Advanced Cardiac Life Support (ACLS) certification will expire in 30 days. Please take the necessary steps to renew your certification before the expiration date to maintain your professional standing.',
      time: '2 days ago',
      read: true,
      type: 'system',
      priority: 'medium'
    },
    {
      id: 4,
      sender: 'Medical Conference Board',
      subject: 'Speaker Invitation',
      content: 'We are pleased to invite you to be a speaker at the upcoming International Cardiology Conference in Dubai. Based on your expertise and recent publications, we believe you would be an excellent presenter for our session on "Innovations in Interventional Cardiology."',
      time: '4 days ago',
      read: false,
      type: 'opportunity',
      priority: 'high'
    },
    {
      id: 5,
      sender: 'Medical Journal of Cardiology',
      subject: 'Peer Review Request',
      content: 'Due to your expertise in the field, we would like to invite you to review a manuscript submitted to our journal titled "Novel Approaches to Treating Ventricular Arrhythmias." The review process should take approximately 2 weeks.',
      time: '1 week ago',
      read: true,
      type: 'opportunity',
      priority: 'medium'
    }
  ];
  
  // Filter messages based on active tab and search query
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return !message.read && matchesSearch;
    return message.type === activeTab && matchesSearch;
  });
  
  // Toggle message expansion
  const toggleExpand = (id: number) => {
    if (expandedMessages.includes(id)) {
      setExpandedMessages(expandedMessages.filter(msgId => msgId !== id));
    } else {
      setExpandedMessages([...expandedMessages, id]);
    }
    
    // Mark as read when expanded
    // In a real app, you'd call an API here
  };
  
  // Message type icon mapping
  const getMessageIcon = (type: string) => {
    switch(type) {
      case 'job':
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'system':
        return <ChartBar className="h-5 w-5 text-amber-500" />;
      case 'opportunity':
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search messages..."
                className="pl-10"
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="ml-2">
              Filters
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs md:text-sm">Unread</TabsTrigger>
              <TabsTrigger value="job" className="text-xs md:text-sm">Jobs</TabsTrigger>
              <TabsTrigger value="message" className="text-xs md:text-sm">Messages</TabsTrigger>
              <TabsTrigger value="opportunity" className="text-xs md:text-sm">Opportunities</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredMessages.length > 0 ? (
                <div className="space-y-3">
                  {filteredMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`border rounded-lg p-4 transition-all duration-200 ${
                        message.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-700'
                      } ${expandedMessages.includes(message.id) ? 'shadow-md' : 'hover:shadow-sm'}`}
                    >
                      <div 
                        className="flex items-start cursor-pointer"
                        onClick={() => toggleExpand(message.id)}
                      >
                        <div className="mr-4 mt-1">
                          {getMessageIcon(message.type)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className={`font-medium ${!message.read ? 'font-semibold' : ''}`}>
                              {message.subject}
                            </h3>
                            <div className="flex items-center">
                              {message.priority === 'high' && (
                                <Badge variant="destructive" className="mr-2 text-xs">Important</Badge>
                              )}
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{message.sender}</p>
                          
                          {!expandedMessages.includes(message.id) && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                              {message.content}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {expandedMessages.includes(message.id) && (
                        <div className="mt-3 pl-9">
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                            {message.content}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              <User className="mr-1 h-3 w-3" />
                              View Profile
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Clock className="mr-1 h-3 w-3" />
                              Snooze
                            </Button>
                            <Button variant="default" size="sm" className="text-xs bg-primary">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-300" />
                  <h3 className="mt-2 text-lg font-medium">No messages found</h3>
                  <p className="text-gray-500">No messages match your current filters.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" size="sm" className="text-xs">
              <CheckCircle className="mr-1 h-3 w-3" />
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <XCircle className="mr-1 h-3 w-3" />
              Delete Selected
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InboxActivities;
