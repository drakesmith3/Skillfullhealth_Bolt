import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Search, 
  Send, 
  MoreVertical, 
  Clock,
  CheckCheck,
  Star,
  Archive,
  Trash2
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  avatar?: string;
}

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Mock messages data
  const messages: Message[] = [
    {
      id: "1",
      sender: "Dr. Sarah Johnson",
      subject: "CME Course Completion Certificate",
      preview: "Congratulations! Your certificate for the Advanced Cardiology course is now ready...",
      timestamp: "2 hours ago",
      isRead: false,
      isStarred: true
    },
    {
      id: "2",
      sender: "GLOHSEN Support",
      subject: "Profile Verification Complete",
      preview: "Your professional profile has been successfully verified. You can now apply for premium jobs...",
      timestamp: "1 day ago",
      isRead: true,
      isStarred: false
    },
    {
      id: "3",
      sender: "Dr. Michael Chen",
      subject: "Job Application Update",
      preview: "Thank you for your interest in the Emergency Medicine position. We would like to schedule...",
      timestamp: "2 days ago",
      isRead: true,
      isStarred: false
    },
    {
      id: "4",
      sender: "Course Coordinator",
      subject: "New CME Courses Available",
      preview: "Check out our latest continuing medical education courses including Telemedicine Best Practices...",
      timestamp: "3 days ago",
      isRead: true,
      isStarred: false
    },
    {
      id: "5",
      sender: "GLOHSEN Admin",
      subject: "GLOHSEN Score Update",
      preview: "Your GLOHSEN score has been updated based on your recent activities. Your new score is...",
      timestamp: "1 week ago",
      isRead: false,
      isStarred: true
    }
  ];

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMessageData = messages.find(m => m.id === selectedMessage);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="space-y-1">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors ${
                      selectedMessage === message.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-primary">
                              {message.sender.charAt(0)}
                            </span>
                          </div>
                          <p className={`text-sm font-medium truncate ${!message.isRead ? 'font-bold' : ''}`}>
                            {message.sender}
                          </p>
                        </div>
                        <p className={`text-sm truncate mb-1 ${!message.isRead ? 'font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                          {message.preview}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{message.timestamp}</span>
                          <div className="flex items-center gap-1">
                            {message.isStarred && (
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            )}
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {selectedMessageData ? (
              <>
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {selectedMessageData.sender.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{selectedMessageData.sender}</p>
                        <p className="text-sm text-gray-500">{selectedMessageData.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Star className={`h-4 w-4 ${selectedMessageData.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold">{selectedMessageData.subject}</h2>
                </CardHeader>
                <CardContent className="flex-1 p-6 overflow-y-auto">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedMessageData.preview}
                    </p>
                    <br />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <br />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>
                </CardContent>
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your reply..." 
                      className="flex-1"
                    />
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a message
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a message from the list to view its contents
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Message Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                <p className="text-2xl font-bold">{messages.filter(m => !m.isRead).length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Starred</p>
                <p className="text-2xl font-bold">{messages.filter(m => m.isStarred).length}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Read</p>
                <p className="text-2xl font-bold">{messages.filter(m => m.isRead).length}</p>
              </div>
              <CheckCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;