import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Gift,
  TrendingUp,
  DollarSign,
  Crown,
  Star,
  ArrowRight,
  Plus,
  Search,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ReferralTracking } from "@shared/api";

interface ReferralBotProps {
  className?: string;
}

export function ReferralBot({ className }: ReferralBotProps) {
  const { hasAccess } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tracking' | 'rewards'>('dashboard');

  // Mock referral data
  const referralStats = {
    totalReferrals: 24,
    pendingReferrals: 8,
    convertedReferrals: 16,
    totalCommission: 4750,
    pendingCommission: 1250,
    paidCommission: 3500
  };

  const recentReferrals: ReferralTracking[] = [
    {
      id: '1',
      referrer_id: 'user_123',
      referred_contact_id: 'contact_456',
      status: 'converted',
      value: 15000,
      commission: 750,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      referrer_id: 'user_124',
      referred_contact_id: 'contact_789',
      status: 'pending',
      value: 25000,
      commission: 1250,
      created_at: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      referrer_id: 'user_125',
      referred_contact_id: 'contact_101',
      status: 'rewarded',
      value: 35000,
      commission: 1750,
      created_at: '2024-01-13T09:15:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'converted': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'rewarded': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'converted': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rewarded': return <Crown className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (!hasAccess("referral_tracking")) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Referral Bot Access Required
          </h2>
          <p className="text-gray-400 mb-6">
            Upgrade to Pro to access referral tracking features
          </p>
          <Button className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-black">
            Upgrade Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white ${className}`}>
      {/* Header */}
      <div className="border-b border-border/30 px-6 py-4 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Gift className="w-6 h-6 text-[hsl(var(--gold))]" />
              Referral Bot
            </h1>
            <p className="text-sm text-muted-foreground">
              Partner Attribution & Reward System
            </p>
          </div>
          <Badge variant="outline" className="border-[hsl(var(--gold))] text-[hsl(var(--gold))]">
            PartnerTech.ai
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1 bg-muted/10 rounded-lg">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-[hsl(var(--gold))] text-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'tracking' 
                ? 'bg-[hsl(var(--gold))] text-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Tracking
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'rewards' 
                ? 'bg-[hsl(var(--gold))] text-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Rewards
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-blue-200">Total Referrals</h3>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-white">{referralStats.totalReferrals}</p>
                  <span className="text-sm font-medium text-green-400">+12%</span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-green-200">Converted</h3>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-white">{referralStats.convertedReferrals}</p>
                  <span className="text-sm font-medium text-green-400">67%</span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-r from-[hsl(var(--gold))]/20 to-yellow-400/20 border border-[hsl(var(--gold))]/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-yellow-200">Total Commission</h3>
                  <DollarSign className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-white">${referralStats.totalCommission.toLocaleString()}</p>
                  <span className="text-sm font-medium text-green-400">+25%</span>
                </div>
              </div>
            </div>

            {/* Recent Referrals */}
            <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Recent Referrals</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Referral
                </Button>
              </div>

              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-border/20">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getStatusColor(referral.status)} bg-current/20`}>
                        {getStatusIcon(referral.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Referral #{referral.id}</span>
                          <Badge variant="outline" className={`${getStatusColor(referral.status)} border-current`}>
                            {referral.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          Deal Value: ${referral.value.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(referral.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-[hsl(var(--gold))]">
                        ${referral.commission}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round((referral.commission / referral.value) * 100)}% commission
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
              <h3 className="text-lg font-bold mb-4">Referral Tracking Setup</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-5 h-5 text-blue-400" />
                    <h4 className="font-semibold">Auto-Attribution</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Automatically track referrals from partner links and campaigns
                  </p>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    Enable Auto-Tracking
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h4 className="font-semibold">Manual Attribution</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Manually assign referral credits to partners
                  </p>
                  <Button size="sm" variant="outline" className="border-green-500 text-green-400">
                    Assign Credit
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-[hsl(var(--gold))]/20 border border-[hsl(var(--gold))]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Crown className="w-5 h-5 text-[hsl(var(--gold))]" />
                    <h4 className="font-semibold">Partner Portal</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Give partners access to their referral dashboard
                  </p>
                  <Button size="sm" className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-black">
                    Generate Portal Links
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
                <h3 className="text-lg font-bold mb-4">Commission Structure</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                    <span>Tier 1 (0-10 referrals)</span>
                    <Badge variant="outline">5%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                    <span>Tier 2 (11-25 referrals)</span>
                    <Badge variant="outline">7.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                    <span>Tier 3 (26+ referrals)</span>
                    <Badge variant="outline" className="text-[hsl(var(--gold))] border-[hsl(var(--gold))]">10%</Badge>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
                <h3 className="text-lg font-bold mb-4">Payout Schedule</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/20">
                    <div>
                      <p className="font-medium">Next Payout</p>
                      <p className="text-sm text-gray-400">February 1, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">${referralStats.pendingCommission}</p>
                      <p className="text-xs text-gray-500">pending</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/20">
                    <div>
                      <p className="font-medium">Last Payout</p>
                      <p className="text-sm text-gray-400">January 1, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-400">${referralStats.paidCommission}</p>
                      <p className="text-xs text-gray-500">paid</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}