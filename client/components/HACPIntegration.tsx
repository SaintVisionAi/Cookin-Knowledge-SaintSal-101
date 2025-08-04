import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Crown,
  Activity
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { 
  analyzeHACPAction, 
  mapUserTierToHACP, 
  shouldEscalate,
  HACP_TIERS 
} from "@/lib/hacp-core";
import { HACPAnalysisResponse, HACPTier } from "@shared/api";

interface HACPIntegrationProps {
  className?: string;
}

export function HACPIntegration({ className }: HACPIntegrationProps) {
  const { userTier, hasAccess } = useAuth();
  const [currentTier, setCurrentTier] = useState<HACPTier | null>(null);
  const [recentActions, setRecentActions] = useState<HACPAnalysisResponse[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const tier = mapUserTierToHACP(userTier);
    setCurrentTier(tier);
  }, [userTier]);

  const simulateHACPAction = async (intent: string, context: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate HACP analysis
      const analysis = analyzeHACPAction(intent, userTier, context);
      
      setRecentActions(prev => [analysis, ...prev.slice(0, 4)]);
      
      // Show analysis result
      alert(`🧠 HACP Analysis Complete\n\nTier: ${analysis.tier.name}\nAction: ${analysis.action.type}\nEmotional Context: ${analysis.emotional_context}\n\nNext Steps:\n${analysis.next_steps.map(step => `• ${step}`).join('\n')}`);
    } catch (error) {
      console.error('HACP analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getTierProgress = () => {
    const tiers = ['T1', 'T2', 'T3', 'T4'];
    const currentIndex = tiers.indexOf(currentTier?.level || 'T1');
    return ((currentIndex + 1) / tiers.length) * 100;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'T1': return 'text-blue-400';
      case 'T2': return 'text-green-400';
      case 'T3': return 'text-yellow-400';
      case 'T4': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  if (!hasAccess("hacp_framework")) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            HACP Framework Access Required
          </h2>
          <p className="text-gray-400 mb-6">
            Upgrade to Pro to access HACP behavioral analysis
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
              <Brain className="w-6 h-6 text-[hsl(var(--gold))]" />
              HACP Framework
            </h1>
            <p className="text-sm text-muted-foreground">
              Human-AI Connection Protocol • Behavioral Analysis Engine
            </p>
          </div>
          <Badge variant="outline" className="border-[hsl(var(--gold))] text-[hsl(var(--gold))]">
            {currentTier?.level} - {currentTier?.name}
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Current HACP Tier Status */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-[hsl(var(--gold))]/20 to-yellow-400/10 border border-[hsl(var(--gold))]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-[hsl(var(--gold))]" />
              <h3 className="text-lg font-bold">Current HACP Tier</h3>
            </div>
            <Badge className={`${getTierColor(currentTier?.level || 'T1')} border-current`}>
              {currentTier?.level}
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">{currentTier?.name}</h4>
              <p className="text-sm text-gray-300">{currentTier?.description}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Behavioral Progression</span>
                <span>{Math.round(getTierProgress())}%</span>
              </div>
              <Progress value={getTierProgress()} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-400">Emotional Calibration: </span>
                <span className="font-medium capitalize">{currentTier?.emotionalCalibration}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Features: </span>
                <span className="font-medium">{currentTier?.features.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* HACP Tier Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(HACP_TIERS).map((tier) => (
            <div 
              key={tier.level}
              className={`p-4 rounded-lg border transition-all ${
                currentTier?.level === tier.level 
                  ? 'bg-[hsl(var(--gold))]/20 border-[hsl(var(--gold))]/50' 
                  : 'bg-muted/10 border-border/30 hover:bg-muted/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-bold ${getTierColor(tier.level)}`}>
                  {tier.level}
                </span>
                <span className="text-sm font-medium">{tier.name.split(' ')[0]}</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">{tier.description}</p>
              <div className="space-y-1">
                {tier.features.slice(0, 2).map((feature) => (
                  <div key={feature} className="text-xs text-gray-500 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {feature.replace('_', ' ')}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Simulator */}
        <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold">HACP Action Simulator</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => simulateHACPAction('create_contact', 'New lead from website form')}
              disabled={isAnalyzing}
              className="justify-start"
            >
              <Users className="w-4 h-4 mr-2" />
              Create Contact
            </Button>
            
            <Button
              variant="outline"
              onClick={() => simulateHACPAction('schedule_meeting', 'High-value prospect wants demo')}
              disabled={isAnalyzing}
              className="justify-start"
            >
              <Target className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
            
            <Button
              variant="outline"
              onClick={() => simulateHACPAction('negotiate_contract', 'Client wants custom pricing')}
              disabled={isAnalyzing}
              className="justify-start"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Negotiate Contract
            </Button>
            
            <Button
              variant="outline"
              onClick={() => simulateHACPAction('handle_objection', 'Price sensitivity concerns')}
              disabled={isAnalyzing}
              className="justify-start"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Handle Objection
            </Button>
            
            <Button
              variant="outline"
              onClick={() => simulateHACPAction('escalate_opportunity', 'Enterprise deal requires executive approval')}
              disabled={isAnalyzing}
              className="justify-start"
            >
              <Crown className="w-4 h-4 mr-2" />
              Escalate Deal
            </Button>
            
            <Button
              variant="outline"
              onClick={() => simulateHACPAction('analyze_lead', 'Assess lead quality and potential')}
              disabled={isAnalyzing}
              className="justify-start"
            >
              <Activity className="w-4 h-4 mr-2" />
              Analyze Lead
            </Button>
          </div>
        </div>

        {/* Recent HACP Actions */}
        {recentActions.length > 0 && (
          <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
            <h3 className="text-lg font-bold mb-4">Recent HACP Actions</h3>
            
            <div className="space-y-3">
              {recentActions.map((action, index) => (
                <div key={index} className="p-4 rounded-lg bg-black/40 border border-border/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getTierColor(action.tier.level)} border-current`}>
                        {action.tier.level}
                      </Badge>
                      <span className="font-medium capitalize">{action.action.intent.replace('_', ' ')}</span>
                    </div>
                    <Badge variant={action.escalation_required ? "destructive" : "secondary"}>
                      {action.escalation_required ? "Escalation Required" : action.action.type}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3">{action.emotional_context}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Emotional Weight: {action.action.emotional_weight}
                    </div>
                    <Button variant="ghost" size="sm" className="text-cyan-400">
                      <ArrowRight className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Integration Status */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-bold">HACP Integration Status</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">✓</div>
              <div className="text-sm font-medium">CRM Connected</div>
              <div className="text-xs text-gray-400">GoHighLevel integrated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">✓</div>
              <div className="text-sm font-medium">AI Framework</div>
              <div className="text-xs text-gray-400">Behavioral analysis active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">✓</div>
              <div className="text-sm font-medium">Lead Discovery</div>
              <div className="text-xs text-gray-400">Seamless + Clearbit ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}