import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Phone,
  Mail,
  Calendar,
  Activity,
  Brain,
  Zap,
  Crown,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AnalyticsDashboardProps {
  className?: string;
}

export function AnalyticsDashboard({ className }: AnalyticsDashboardProps) {
  const { hasAccess, userTier } = useAuth();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data
  const metrics = {
    totalLeads: { value: 247, change: 12.5, trend: 'up' },
    conversionRate: { value: 34.7, change: 2.1, trend: 'up' },
    avgDealSize: { value: 45000, change: -5.2, trend: 'down' },
    pipelineValue: { value: 850000, change: 18.3, trend: 'up' },
    callsToday: { value: 23, change: 0, trend: 'neutral' },
    emailsSent: { value: 156, change: 8.7, trend: 'up' },
    meetingsBooked: { value: 12, change: 3, trend: 'up' },
    hacpTierDistribution: {
      T1: 45,
      T2: 30,
      T3: 20,
      T4: 5
    }
  };

  const leadSources = [
    { name: 'Website', leads: 89, percentage: 36 },
    { name: 'Lead Discovery', leads: 67, percentage: 27 },
    { name: 'Referrals', leads: 45, percentage: 18 },
    { name: 'Cold Outreach', leads: 32, percentage: 13 },
    { name: 'Events', leads: 14, percentage: 6 }
  ];

  const recentActivity = [
    { time: '2m ago', action: 'New lead created via Seamless discovery', type: 'lead' },
    { time: '15m ago', action: 'HACP T2 escalation triggered for TechCorp deal', type: 'hacp' },
    { time: '1h ago', action: 'Email sequence completed for 23 contacts', type: 'email' },
    { time: '2h ago', action: 'Referral commission paid: $750', type: 'referral' },
    { time: '3h ago', action: 'GHL webhook processed: opportunity updated', type: 'crm' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead': return <Users className="w-4 h-4 text-blue-400" />;
      case 'hacp': return <Brain className="w-4 h-4 text-[hsl(var(--gold))]" />;
      case 'email': return <Mail className="w-4 h-4 text-purple-400" />;
      case 'referral': return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'crm': return <Activity className="w-4 h-4 text-cyan-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!hasAccess("analytics")) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Analytics Access Required
          </h2>
          <p className="text-gray-400 mb-6">
            Upgrade to Pro to access advanced analytics dashboard
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
              <BarChart3 className="w-6 h-6 text-[hsl(var(--gold))]" />
              Analytics Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive CRM & HACP Performance Analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-muted/10 rounded-lg">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-3 py-1 rounded-md text-sm transition-all ${
                    timeRange === range 
                      ? 'bg-[hsl(var(--gold))] text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsLoading(true)}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-200">Total Leads</h3>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">{metrics.totalLeads.value}</p>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.totalLeads.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.totalLeads.trend)}`}>
                  {Math.abs(metrics.totalLeads.change)}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-green-200">Conversion Rate</h3>
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">{metrics.conversionRate.value}%</p>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.conversionRate.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.conversionRate.trend)}`}>
                  {Math.abs(metrics.conversionRate.change)}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-r from-[hsl(var(--gold))]/20 to-yellow-400/20 border border-[hsl(var(--gold))]/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-yellow-200">Avg Deal Size</h3>
              <DollarSign className="w-5 h-5 text-[hsl(var(--gold))]" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">${(metrics.avgDealSize.value / 1000).toFixed(0)}K</p>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.avgDealSize.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.avgDealSize.trend)}`}>
                  {Math.abs(metrics.avgDealSize.change)}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-purple-200">Pipeline Value</h3>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-white">${(metrics.pipelineValue.value / 1000000).toFixed(1)}M</p>
              <div className="flex items-center gap-1">
                {getTrendIcon(metrics.pipelineValue.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metrics.pipelineValue.trend)}`}>
                  {Math.abs(metrics.pipelineValue.change)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-muted/10 border border-border/30">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-cyan-400" />
              <span className="font-medium">Calls Today</span>
            </div>
            <p className="text-2xl font-bold">{metrics.callsToday.value}</p>
          </div>

          <div className="p-4 rounded-lg bg-muted/10 border border-border/30">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-purple-400" />
              <span className="font-medium">Emails Sent</span>
            </div>
            <p className="text-2xl font-bold">{metrics.emailsSent.value}</p>
          </div>

          <div className="p-4 rounded-lg bg-muted/10 border border-border/30">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-green-400" />
              <span className="font-medium">Meetings Booked</span>
            </div>
            <p className="text-2xl font-bold">{metrics.meetingsBooked.value}</p>
          </div>
        </div>

        {/* HACP Tier Distribution & Lead Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* HACP Tier Distribution */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[hsl(var(--gold))]/20 to-yellow-400/10 border border-[hsl(var(--gold))]/30">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-[hsl(var(--gold))]" />
              <h3 className="text-lg font-bold">HACP Tier Distribution</h3>
            </div>
            
            <div className="space-y-3">
              {Object.entries(metrics.hacpTierDistribution).map(([tier, percentage]) => (
                <div key={tier} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{tier} - {['Discovery', 'Qualification', 'Negotiation', 'Closing'][parseInt(tier.replace('T', '')) - 1]}</span>
                    <span className="text-sm">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Lead Sources */}
          <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
            <h3 className="text-lg font-bold mb-4">Lead Sources</h3>
            
            <div className="space-y-3">
              {leadSources.map((source) => (
                <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-black/40">
                  <div>
                    <p className="font-medium">{source.name}</p>
                    <p className="text-sm text-gray-400">{source.leads} leads</p>
                  </div>
                  <Badge variant="outline">{source.percentage}%</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Activity</h3>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-black/40 hover:bg-black/60 transition-all">
                <div className="p-2 rounded-lg bg-current/20">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Status */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-bold">System Status</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">✓</div>
              <div className="text-sm font-medium">CRM Active</div>
              <div className="text-xs text-gray-400">GoHighLevel connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">✓</div>
              <div className="text-sm font-medium">HACP Framework</div>
              <div className="text-xs text-gray-400">Behavioral analysis online</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">✓</div>
              <div className="text-sm font-medium">Lead Discovery</div>
              <div className="text-xs text-gray-400">Seamless + Clearbit ready</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">✓</div>
              <div className="text-sm font-medium">Referral Bot</div>
              <div className="text-xs text-gray-400">Attribution tracking active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}