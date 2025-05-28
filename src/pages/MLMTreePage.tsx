import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Copy, Users, DollarSign, Share2, Link as LinkIcon, Trophy, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import PreHeader from '@/components/PreHeader';
import { uinSystem, UINUser, MLMTreeNode } from '@/services/uinSystem';
import { quidSystem } from '@/services/quidSystem';
import { mlmAgent } from '@/services/mlmAgent';

interface MLMTreePageProps {
  userUIN?: string;
}

const MLMTreePage: React.FC<MLMTreePageProps> = ({ userUIN = '1A2' }) => {
  const [user, setUser] = useState<UINUser | null>(null);
  const [mlmTree, setMLMTree] = useState<MLMTreeNode | null>(null);
  const [affiliateLink, setAffiliateLink] = useState('');
  const [mlmStats, setMLMStats] = useState({
    totalDownlines: 0,
    directDownlines: 0,
    totalEarnings: 0,
    mlmBonusEarnings: 0,
    generationLevels: [] as Array<{ level: number; count: number; totalEarnings: number }>
  });

  useEffect(() => {
    loadMLMData();
  }, [userUIN]);

  const loadMLMData = () => {
    // Get user information
    const userData = uinSystem.getUserByUIN(userUIN);
    if (!userData) {
      toast.error('User not found');
      return;
    }
    setUser(userData);

    // Get MLM tree
    const tree = uinSystem.getMLMTree(userUIN);
    setMLMTree(tree);

    // Generate affiliate link
    const domain = window.location.origin;
    const link = `${domain}/signup?affiliate=${userUIN}&uin=${userUIN}`;
    setAffiliateLink(link);

    // Get MLM stats
    const stats = mlmAgent.getMLMStats(userUIN);
    setMLMStats(stats);
  };

  const copyAffiliateLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast.success('Affiliate link copied to clipboard!');
  };

  const shareAffiliateLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join GLOHSEN Healthcare Platform',
        text: 'Join the leading healthcare professionals platform with my referral link!',
        url: affiliateLink,
      });
    } else {
      copyAffiliateLink();
    }
  };

  const renderTreeNode = (node: MLMTreeNode, level: number = 0) => {
    const isCurrentUser = node.uin === userUIN;
    const maxLevel = 4; // Show up to 4 generations

    if (level > maxLevel) return null;

    return (
      <motion.div
        key={node.uin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: level * 0.1 }}
        className={`relative ${level === 0 ? '' : 'ml-8'}`}
      >
        {/* Connection Line */}
        {level > 0 && (
          <div className="absolute left-0 top-6 w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
        )}

        {/* User Node */}
        <Card className={`mb-4 ${isCurrentUser ? 'border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-transparent' : 'border-gray-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCurrentUser ? 'bg-[#D4AF37] text-black' : 'bg-[#ea384c] text-white'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-semibold ${isCurrentUser ? 'text-[#D4AF37]' : 'text-gray-900 dark:text-white'}`}>
                    {node.user.firstName} {node.user.lastName}
                    {isCurrentUser && ' (You)'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    UIN: {node.uin} • {node.user.role}
                  </div>
                  <div className="text-xs text-gray-500">
                    Joined: {new Date(node.user.registrationDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="mb-1 bg-blue-100 text-blue-800">
                  Level {node.level}
                </Badge>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Downlines: {node.totalDownlines}
                </div>
                <div className="text-sm font-semibold text-green-600">
                  {quidSystem.formatQUID(node.user.totalEarnings)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Render downlines */}
        {node.downlines.length > 0 && level < maxLevel && (
          <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
            {node.downlines.map(downline => renderTreeNode(downline, level + 1))}
          </div>
        )}
      </motion.div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading MLM Tree...</div>
          <div className="text-gray-600 dark:text-gray-400">Please wait while we load your network.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PreHeader currentPage="MLM Network Tree" userName={`${user.firstName} ${user.lastName}`} />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              MLM Network Tree
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your referral network and track multi-level marketing earnings
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-[#ea384c] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mlmStats.directDownlines}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Direct Referrals</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mlmStats.totalDownlines}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Network</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {quidSystem.formatQUID(mlmStats.totalEarnings)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {quidSystem.formatQUID(mlmStats.mlmBonusEarnings)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">MLM Bonuses</div>
              </CardContent>
            </Card>
          </div>

          {/* Affiliate Link Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-[#ea384c]">
                <Share2 className="w-5 h-5 mr-2" />
                Your Affiliate Link
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input
                  value={affiliateLink}
                  readOnly
                  className="flex-1 font-mono text-sm"
                />
                <Button
                  onClick={copyAffiliateLink}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </Button>
                <Button
                  onClick={shareAffiliateLink}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  Share this link with healthcare professionals to earn MLM bonuses when they:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Sign up for the platform</li>
                  <li>Complete job assignments</li>
                  <li>Purchase courses</li>
                  <li>Make any platform transactions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Generation Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-[#ea384c]">
                <Trophy className="w-5 h-5 mr-2" />
                Generation Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mlmStats.generationLevels.map((gen, index) => (
                  <div key={gen.level} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#ea384c] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        G{gen.level}
                      </div>
                      <div>
                        <div className="font-semibold">Generation {gen.level}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {gen.count} members • 0.25% commission
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {quidSystem.formatQUID(gen.totalEarnings)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Earned from this level
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* MLM Tree Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-[#ea384c]">
                <Users className="w-5 h-5 mr-2" />
                Network Tree Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mlmTree && (
                <div className="overflow-x-auto">
                  {renderTreeNode(mlmTree)}
                </div>
              )}
              
              {(!mlmTree || mlmTree.downlines.length === 0) && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No Network Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Start building your network by sharing your affiliate link with healthcare professionals.
                  </p>
                  <Button
                    onClick={shareAffiliateLink}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
                  >
                    Share Your Link
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MLMTreePage;
