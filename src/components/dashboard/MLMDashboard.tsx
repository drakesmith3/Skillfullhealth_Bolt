
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Users, DollarSign, TrendingUp, Share2, Gift, Award, Copy, Mail } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import mlmSystem from '../../services/mlmSystem';

interface MLMDashboardProps {
  userId: string;
  userType: string;
}

const MLMDashboard: React.FC<MLMDashboardProps> = ({ userId, userType }) => {
  const [stats, setStats] = useState(mlmSystem.getMLMStats(userId));
  const [referralHistory, setReferralHistory] = useState(mlmSystem.getReferralHistory(userId));
  const [referralCode, setReferralCode] = useState('');
  const [newReferralEmail, setNewReferralEmail] = useState('');
  const [newReferralName, setNewReferralName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const code = mlmSystem.generateReferralCode(userId);
    setReferralCode(code);
  }, [userId]);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleSendReferral = () => {
    if (!newReferralEmail || !newReferralName) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const referral = mlmSystem.processReferral(userId, newReferralEmail, newReferralName);
    setReferralHistory([...referralHistory, referral]);
    setNewReferralEmail('');
    setNewReferralName('');
    
    toast({
      title: "Referral Sent!",
      description: `Invitation sent to ${newReferralName}`,
    });
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card size="sm" variant="stats">
          <CardHeader compact className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent compact>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeReferrals} active
            </p>
          </CardContent>
        </Card>

        <Card size="sm" variant="stats">
          <CardHeader compact className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent compact>
            <div className="text-2xl font-bold">Q{stats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Q{stats.monthlyEarnings.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>

        <Card size="sm" variant="stats">
          <CardHeader compact className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank Level</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent compact>
            <div className="flex items-center space-x-2">
              <Badge className={getRankColor(stats.rankLevel)}>
                {stats.rankLevel}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.nextRankRequirement > 0 
                ? `${stats.nextRankRequirement} more referrals to next rank`
                : 'Highest rank achieved!'
              }
            </p>
          </CardContent>
        </Card>

        <Card size="sm" variant="stats">
          <CardHeader compact className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent compact>
            <div className="text-2xl font-bold">
              Q{mlmSystem.calculatePotentialEarnings(10).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              With 10 more referrals
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="refer">Refer & Earn</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="structure">Commission</TabsTrigger>
        </TabsList>        <TabsContent value="overview" className="space-y-4">
          <Card size="lg" variant="default">
            <CardHeader compact>
              <CardTitle>Referral Performance</CardTitle>
              <CardDescription>
                Your referral network and earnings overview
              </CardDescription>
            </CardHeader>
            <CardContent compact>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Recent Activity</h4>
                    {referralHistory.slice(0, 3).map((referral, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">{referral.refereeName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(referral.referralDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Earnings Breakdown</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Direct Referrals (Level 1)</span>
                        <span>Q{(stats.totalEarnings * 0.8).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Second Level</span>
                        <span>Q{(stats.totalEarnings * 0.15).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Third Level</span>
                        <span>Q{(stats.totalEarnings * 0.05).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="refer" className="space-y-4">
          <Card size="lg" variant="default">
            <CardHeader compact>
              <CardTitle>Refer New Members</CardTitle>
              <CardDescription>
                Share GLOHSEN with healthcare professionals and earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent compact className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="referral-code">Your Referral Code</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="referral-code"
                    value={referralCode} 
                    readOnly 
                    className="font-mono"
                  />
                  <Button onClick={handleCopyReferralCode} size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Send Direct Invitation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="referee-name">Full Name</Label>
                    <Input
                      id="referee-name"
                      value={newReferralName}
                      onChange={(e) => setNewReferralName(e.target.value)}
                      placeholder="Dr. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referee-email">Email Address</Label>
                    <Input
                      id="referee-email"
                      type="email"
                      value={newReferralEmail}
                      onChange={(e) => setNewReferralEmail(e.target.value)}
                      placeholder="john.doe@hospital.com"
                    />
                  </div>
                </div>
                <Button onClick={handleSendReferral} className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="history" className="space-y-4">
          <Card size="lg" variant="default">
            <CardHeader compact>
              <CardTitle>Referral History</CardTitle>
              <CardDescription>
                Track all your referrals and their status
              </CardDescription>
            </CardHeader>
            <CardContent compact>
              <div className="space-y-2">
                {referralHistory.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded">
                    <div className="flex-1">
                      <h4 className="font-medium">{referral.refereeName}</h4>
                      <p className="text-sm text-muted-foreground">{referral.refereeEmail}</p>
                      <p className="text-xs text-muted-foreground">
                        Referred on {new Date(referral.referralDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                        {referral.status}
                      </Badge>
                      {referral.bonusEarned > 0 && (
                        <p className="text-sm font-medium text-green-600 mt-1">
                          +Q{referral.bonusEarned}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {referralHistory.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No referrals yet. Start referring to earn rewards!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="structure" className="space-y-4">
          <Card size="lg" variant="default">
            <CardHeader compact>
              <CardTitle>Commission Structure</CardTitle>
              <CardDescription>
                Understand how you earn from referrals
              </CardDescription>
            </CardHeader>
            <CardContent compact>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-green-600">25%</div>
                    <div className="text-sm">Level 1 Commission</div>
                    <div className="text-xs text-muted-foreground">Direct referrals</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-blue-600">10%</div>
                    <div className="text-sm">Level 2 Commission</div>
                    <div className="text-xs text-muted-foreground">Referrals from your referrals</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-purple-600">5%</div>
                    <div className="text-sm">Level 3 Commission</div>
                    <div className="text-xs text-muted-foreground">Third level referrals</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Rank Bonuses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">Bronze</span>
                        <span className="text-sm text-muted-foreground ml-2">(5 referrals)</span>
                      </div>
                      <span className="font-medium">Q100 bonus</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">Silver</span>
                        <span className="text-sm text-muted-foreground ml-2">(15 referrals)</span>
                      </div>
                      <span className="font-medium">Q300 bonus</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">Gold</span>
                        <span className="text-sm text-muted-foreground ml-2">(30 referrals)</span>
                      </div>
                      <span className="font-medium">Q750 bonus</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <span className="font-medium">Platinum</span>
                        <span className="text-sm text-muted-foreground ml-2">(50 referrals)</span>
                      </div>
                      <span className="font-medium">Q1,500 bonus</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MLMDashboard;
