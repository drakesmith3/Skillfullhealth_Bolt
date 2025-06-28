import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, UserPlus, Check, UserX, MessageSquare, UserCheck } from 'lucide-react';
import { socialManager, Friend, FriendRequest, Conversation } from '../utils/socialUtils';
import { soundManager } from '../utils/soundUtils';
import { toast } from 'sonner';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSoundEnabled?: boolean;
}

const SocialModal: React.FC<SocialModalProps> = ({ isOpen, onClose, isSoundEnabled = true }) => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'messages'>('friends');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadSocialData();
    }
  }, [isOpen]);

  const loadSocialData = () => {
    setFriends(socialManager.getFriends());
    setFriendRequests(socialManager.getFriendRequests());
    setConversations(socialManager.getConversations());
  };

  const handleAcceptFriendRequest = async (requestId: string) => {
    if (isSoundEnabled) soundManager.playClickSound();
    try {
      await socialManager.acceptFriendRequest(requestId);
      loadSocialData();
      toast.success('Friend request accepted!');
    } catch (error) {
      toast.error('Failed to accept friend request');
    }
  };

  const handleRejectFriendRequest = async (requestId: string) => {
    if (isSoundEnabled) soundManager.playClickSound();
    try {
      await socialManager.rejectFriendRequest(requestId);
      loadSocialData();
      toast.success('Friend request rejected');
    } catch (error) {
      toast.error('Failed to reject friend request');
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    if (isSoundEnabled) soundManager.playWhooshSound();
    
    try {
      await socialManager.sendMessage(selectedConversation, messageInput);
      setMessageInput('');
      loadSocialData();
      toast.success('Message sent!');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const TabButton = ({ tab, label, count }: { tab: typeof activeTab; label: string; count?: number }) => (
    <button
      onClick={() => {
        if (isSoundEnabled) soundManager.playClickSound();
        setActiveTab(tab);
      }}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        activeTab === tab
          ? 'bg-red-500 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span className="ml-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl w-full max-w-4xl h-[80vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Social Hub</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-4 border-b border-gray-700">
              <TabButton tab="friends" label="Friends" count={friends.length} />
              <TabButton tab="requests" label="Requests" count={friendRequests.length} />
              <TabButton tab="messages" label="Messages" count={conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)} />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {activeTab === 'friends' && (
                <div className="p-4 space-y-3">
                  {friends.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No friends yet. Start connecting with other medical professionals!</p>
                    </div>
                  ) : (
                    friends.map((friend) => (
                      <motion.div
                        key={friend.id}
                        className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {friend.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-white font-medium">{friend.name}</h3>
                            {friend.isOnline && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">Level {friend.level} • {friend.gameStats.favoriteGame}</p>
                          <p className="text-gray-500 text-xs">{friend.isOnline ? 'Online' : friend.lastSeen}</p>
                        </div>
                        <button
                          onClick={() => {
                            if (isSoundEnabled) soundManager.playClickSound();
                            toast.info(`Send game invite to ${friend.name}?`);
                          }}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Invite to Game
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'requests' && (
                <div className="p-4 space-y-3">
                  {friendRequests.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <UserCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No pending friend requests</p>
                    </div>
                  ) : (
                    friendRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                          {request.senderName[0]}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{request.senderName}</h3>
                          <p className="text-gray-400 text-sm">{request.mutualFriends} mutual friends</p>
                          {request.message && (
                            <p className="text-gray-300 text-sm mt-1 italic">"{request.message}"</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptFriendRequest(request.id)}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectFriendRequest(request.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="flex h-full">
                  {/* Conversations List */}
                  <div className="w-1/3 border-r border-gray-700 p-4">
                    <h3 className="text-white font-medium mb-3">Conversations</h3>
                    <div className="space-y-2">
                      {conversations.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => {
                            if (isSoundEnabled) soundManager.playClickSound();
                            setSelectedConversation(conv.id);
                          }}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedConversation === conv.id
                              ? 'bg-red-500/20 border border-red-500/50'
                              : 'bg-gray-800/50 hover:bg-gray-700/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium text-sm">Friend Chat</span>
                            {conv.unreadCount > 0 && (
                              <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs mt-1 truncate">
                            {conv.lastMessage.content}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message View */}
                  <div className="flex-1 flex flex-col">
                    {selectedConversation ? (
                      <>
                        <div className="flex-1 p-4 overflow-auto">
                          <div className="text-center text-gray-400 py-4">
                            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Start chatting with your friends!</p>
                          </div>
                        </div>
                        <div className="p-4 border-t border-gray-700">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                              placeholder="Type a message..."
                              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                            />
                            <button
                              onClick={handleSendMessage}
                              disabled={!messageInput.trim()}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Select a conversation to start messaging</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialModal;
