import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { socialManager, Friend, FriendRequest, Conversation } from '../utils/socialUtils';
import { soundManager } from '../utils/soundUtils';
import { 
  UserPlus, 
  MessageSquare, 
  Users, 
  Settings, 
  Bell,
  Search,
  Star,
  Trophy,
  Gamepad2,
  Clock,
  Zap,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { isDark } = useTheme();  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setFriends(socialManager.getFriends());
    setFriendRequests(socialManager.getFriendRequests());
    setConversations(socialManager.getConversations());
  };

  const currentUser = socialManager.getCurrentUser();
  const totalUnreadMessages = socialManager.getTotalUnreadMessages();

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-black via-red-950 to-black' : 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {currentUser?.name || 'User'}!
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your social connections and stay updated with your medical learning community
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, label: 'Friends', value: friends.length, color: 'from-blue-500 to-blue-600' },
            { icon: Mail, label: 'Unread Messages', value: totalUnreadMessages, color: 'from-green-500 to-green-600' },
            { icon: Bell, label: 'Friend Requests', value: friendRequests.length, color: 'from-yellow-500 to-yellow-600' },
            { icon: Trophy, label: 'Level', value: currentUser?.level || 0, color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-white/80" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Friends Section */}
          <div className="lg:col-span-2">
            <motion.div
              className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Your Friends
                </h2>                <button
                  onClick={() => {
                    soundManager.playClickSound();
                    toast.info('Navigate to Professional Dashboard to manage friends and messages');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                >
                  <UserPlus className="w-4 h-4 inline mr-2" />
                  Manage Friends
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                />
              </div>

              {/* Friends List */}
              <div className="space-y-4">
                {filteredFriends.length === 0 ? (
                  <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {searchQuery ? 'No friends found matching your search' : 'No friends yet. Start connecting!'}
                  </div>
                ) : (
                  filteredFriends.map((friend, index) => (
                    <motion.div
                      key={friend.id}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        isDark ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'
                      } transition-colors cursor-pointer`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {friend.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {friend.name}
                          </h3>
                          {friend.isOnline && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Level {friend.level} • {friend.gameStats.favoriteGame}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {friend.isOnline ? 'Online' : `Last seen ${friend.lastSeen}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            soundManager.playClickSound();
                            toast.info(`Sending message to ${friend.name}...`);
                          }}
                          className={`p-2 rounded-lg ${
                            isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                          } text-white transition-colors`}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            soundManager.playClickSound();
                            toast.info(`Sending game invite to ${friend.name}...`);
                          }}
                          className={`p-2 rounded-lg ${
                            isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                          } text-white transition-colors`}
                        >
                          <Gamepad2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Star, text: 'Completed Diagnosis Detective', time: '2 hours ago', color: 'text-yellow-500' },
                  { icon: Trophy, text: 'Achieved new high score', time: '5 hours ago', color: 'text-purple-500' },
                  { icon: Zap, text: '7-day learning streak!', time: '1 day ago', color: 'text-orange-500' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {activity.text}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className={`rounded-2xl p-6 ${isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    soundManager.playClickSound();
                    window.location.href = '/games-quizzes';
                  }}
                  className="w-full p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-left"
                >
                  <Gamepad2 className="w-4 h-4 inline mr-2" />
                  Play Games
                </button>                <button
                  onClick={() => {
                    soundManager.playClickSound();
                    window.location.href = '/professional-dashboard';
                  }}
                  className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-left"
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  View Messages
                </button>
                <button
                  onClick={() => {
                    soundManager.playClickSound();
                    toast.info('Settings coming soon!');
                  }}
                  className={`w-full p-3 ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } ${isDark ? 'text-white' : 'text-gray-900'} rounded-lg transition-all text-left`}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Settings
                </button>
              </div>
            </motion.div>
          </div>
        </div>      </div>
    </div>
  );
};

export default Dashboard;
