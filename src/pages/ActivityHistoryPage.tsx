
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Activity, Clock, BookOpen, MessageCircle, Briefcase, 
  Award, TrendingUp, Search, Filter, Calendar 
} from "lucide-react";
import { useTheme } from '@/contexts/ThemeContext';

interface ActivityItem {
  id: string;
  type: 'course' | 'forum' | 'job' | 'achievement' | 'login' | 'profile';
  title: string;
  description: string;
  timestamp: Date;
  points: number;
  category: string;
}

const ActivityHistoryPage: React.FC = () => {
  const { theme } = useTheme();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock activity data
  useEffect(() => {
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'course',
        title: 'Completed Advanced Cardiology CME',
        description: 'Successfully completed 4-hour CME course on Advanced Cardiovascular Medicine',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        points: 50,
        category: 'Education'
      },
      {
        id: '2',
        type: 'forum',
        title: 'Commented on Telemedicine Discussion',
        description: 'Shared insights on "Best Practices in Telemedicine" forum thread',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        points: 10,
        category: 'Community'
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Earned Knowledge Master Badge',
        description: 'Achieved perfect score on Medical Ethics assessment',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        points: 25,
        category: 'Achievement'
      },
      {
        id: '4',
        type: 'job',
        title: 'Applied for Nursing Position',
        description: 'Applied for Senior Nurse position at General Hospital',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        points: 5,
        category: 'Career'
      },
      {
        id: '5',
        type: 'forum',
        title: 'Joined Oncology Group',
        description: 'Became a member of the Oncology Professionals discussion group',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        points: 15,
        category: 'Community'
      },
      {
        id: '6',
        type: 'profile',
        title: 'Updated Professional Certificates',
        description: 'Added new BLS and ACLS certifications to profile',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        points: 20,
        category: 'Profile'
      },
      {
        id: '7',
        type: 'course',
        title: 'Started Emergency Procedures Course',
        description: 'Enrolled in Emergency Medical Procedures certification program',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        points: 5,
        category: 'Education'
      },
      {
        id: '8',
        type: 'login',
        title: 'Consistent Learner Streak',
        description: 'Achieved 7-day consecutive login streak',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        points: 30,
        category: 'Engagement'
      }
    ];
    
    setActivities(mockActivities);
    setFilteredActivities(mockActivities);
  }, []);

  // Filter activities
  useEffect(() => {
    let filtered = activities;

    if (filterType !== 'all') {
      filtered = filtered.filter(activity => activity.type === filterType);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(activity => activity.category === filterCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActivities(filtered);
  }, [activities, filterType, filterCategory, searchTerm]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-5 w-5" />;
      case 'forum':
        return <MessageCircle className="h-5 w-5" />;
      case 'job':
        return <Briefcase className="h-5 w-5" />;
      case 'achievement':
        return <Award className="h-5 w-5" />;
      case 'login':
        return <TrendingUp className="h-5 w-5" />;
      case 'profile':
        return <Activity className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'text-blue-600';
      case 'forum':
        return 'text-green-600';
      case 'job':
        return 'text-purple-600';
      case 'achievement':
        return 'text-yellow-600';
      case 'login':
        return 'text-indigo-600';
      case 'profile':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'Less than an hour ago';
    }
  };

  const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0);
  const thisWeekPoints = activities
    .filter(activity => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return activity.timestamp > weekAgo;
    })
    .reduce((sum, activity) => sum + activity.points, 0);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Activity History</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your platform engagement and GLOHSEN score contributions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Activities</p>
                  <p className="text-2xl font-bold">{activities.length}</p>
                </div>
                <Activity className="h-8 w-8 text-[#ea384c]" />
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Points</p>
                  <p className="text-2xl font-bold">{totalPoints}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">This Week</p>
                  <p className="text-2xl font-bold">{thisWeekPoints} pts</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className={`mb-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="course">Courses</SelectItem>
                  <SelectItem value="forum">Forum</SelectItem>
                  <SelectItem value="job">Jobs</SelectItem>
                  <SelectItem value="achievement">Achievements</SelectItem>
                  <SelectItem value="login">Login Activity</SelectItem>
                  <SelectItem value="profile">Profile Updates</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                  <SelectItem value="Achievement">Achievement</SelectItem>
                  <SelectItem value="Engagement">Engagement</SelectItem>
                  <SelectItem value="Profile">Profile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
              <CardContent className="p-12 text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No activities found</h3>
                <p className="text-gray-500">Try adjusting your filters or search term.</p>
              </CardContent>
            </Card>
          ) : (
            filteredActivities.map((activity) => (
              <Card key={activity.id} className={`hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${getActivityColor(activity.type)} bg-opacity-10`}>
                        <div className={getActivityColor(activity.type)}>
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{activity.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {activity.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTimestamp(activity.timestamp)}
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            +{activity.points} points
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More Button */}
        {filteredActivities.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8">
              Load More Activities
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityHistoryPage;
