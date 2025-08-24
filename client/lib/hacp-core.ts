/**
 * HACP (Human-AI Connection Protocol) Core Implementation
 * 4-Tier Behavioral Model with Emotional Calibration
 */

import { HACPTier, HACPAction, HACPAnalysisResponse } from '@shared/api';

/**
 * HACP 4-Tier Behavioral Framework
 */
export const HACP_TIERS: Record<string, HACPTier> = {
  T1: {
    level: 'T1',
    name: 'Discovery & Initial Contact',
    description: 'First touchpoint, relationship building, discovery mode',
    emotionalCalibration: 'low',
    features: ['basic_contact', 'lead_capture', 'initial_screening']
  },
  T2: {
    level: 'T2',
    name: 'Qualification & Engagement',
    description: 'Qualified interest, deeper engagement, needs analysis',
    emotionalCalibration: 'medium',
    features: ['needs_analysis', 'demo_scheduling', 'proposal_generation']
  },
  T3: {
    level: 'T3',
    name: 'Negotiation & Decision',
    description: 'Active negotiation, decision-making process, objection handling',
    emotionalCalibration: 'high',
    features: ['negotiation_support', 'contract_review', 'escalation_routing']
  },
  T4: {
    level: 'T4',
    name: 'Closing & Implementation',
    description: 'Final closing, implementation planning, success management',
    emotionalCalibration: 'enterprise',
    features: ['executive_escalation', 'custom_solutions', 'white_glove_service']
  }
};

/**
 * HACP User Tier Mapping (from pricing tiers to behavioral tiers)
 */
export const mapUserTierToHACP = (userTier: string): HACPTier => {
  switch (userTier) {
    case 'free':
      return HACP_TIERS.T1;
    case 'unlimited':
      return HACP_TIERS.T1;
    case 'core':
      return HACP_TIERS.T2;
    case 'pro':
    case 'fullPro':
      return HACP_TIERS.T3;
    case 'custom':
    case 'white_label':
      return HACP_TIERS.T4;
    default:
      return HACP_TIERS.T1;
  }
};

/**
 * Emotional Calibration Engine
 */
export const calibrateEmotionalResponse = (
  tier: HACPTier,
  intent: string,
  context: string
): string => {
  const calibration = tier.emotionalCalibration;
  
  switch (calibration) {
    case 'low':
      return `Friendly and informative approach. ${context}`;
    case 'medium':
      return `Professional and solution-focused. ${context}`;
    case 'high':
      return `Consultative and strategic guidance. ${context}`;
    case 'enterprise':
      return `Executive-level partnership approach. ${context}`;
    default:
      return context;
  }
};

/**
 * Intent Routing Engine
 * Determines if action should go to CRM, AI Assistant, or escalation
 */
export const routeIntent = (
  intent: string,
  userTier: string,
  leadData?: any
): 'crm' | 'ai' | 'escalation' => {
  const hacpTier = mapUserTierToHACP(userTier);
  
  // CRM actions - direct to CRM system
  const crmActions = [
    'create_contact',
    'update_contact',
    'schedule_call',
    'send_email',
    'update_pipeline',
    'create_opportunity'
  ];
  
  // AI assistant actions - handle with AI
  const aiActions = [
    'analyze_lead',
    'generate_response',
    'research_company',
    'create_proposal',
    'answer_question'
  ];
  
  // Escalation actions - require human intervention
  const escalationActions = [
    'negotiate_contract',
    'handle_objection',
    'executive_request',
    'custom_pricing'
  ];
  
  if (escalationActions.some(action => intent.includes(action))) {
    return 'escalation';
  }
  
  if (crmActions.some(action => intent.includes(action))) {
    return 'crm';
  }
  
  return 'ai';
};

/**
 * HACP Action Analyzer
 * Analyzes user intent and provides HACP-compliant response strategy
 */
export const analyzeHACPAction = (
  intent: string,
  userTier: string,
  context: string,
  leadData?: any
): HACPAnalysisResponse => {
  const hacpTier = mapUserTierToHACP(userTier);
  const route = routeIntent(intent, userTier, leadData);
  
  const action: HACPAction = {
    id: `hacp_${Date.now()}`,
    type: route,
    tier: hacpTier.level,
    intent,
    emotional_weight: getEmotionalWeight(hacpTier, intent),
    requires_escalation: route === 'escalation'
  };
  
  const emotional_context = calibrateEmotionalResponse(hacpTier, intent, context);
  const next_steps = generateNextSteps(hacpTier, action, leadData);
  
  return {
    action,
    tier: hacpTier,
    next_steps,
    emotional_context,
    escalation_required: action.requires_escalation
  };
};

/**
 * Calculate emotional weight for action based on tier and intent
 */
const getEmotionalWeight = (tier: HACPTier, intent: string): number => {
  const baseWeight = {
    'T1': 1,
    'T2': 2,
    'T3': 3,
    'T4': 4
  }[tier.level] || 1;
  
  // High-impact intents get weight multiplier
  const highImpactIntents = ['negotiate', 'close', 'objection', 'escalate'];
  const multiplier = highImpactIntents.some(word => intent.includes(word)) ? 1.5 : 1;
  
  return baseWeight * multiplier;
};

/**
 * Generate contextual next steps based on HACP tier and action
 */
const generateNextSteps = (
  tier: HACPTier,
  action: HACPAction,
  leadData?: any
): string[] => {
  const baseSteps = {
    'T1': [
      'Capture lead information',
      'Initial qualification call',
      'Send welcome sequence'
    ],
    'T2': [
      'Schedule needs analysis',
      'Prepare custom demo',
      'Research company background'
    ],
    'T3': [
      'Prepare proposal',
      'Schedule stakeholder meeting',
      'Address specific objections'
    ],
    'T4': [
      'Executive alignment call',
      'Custom solution design',
      'Implementation planning'
    ]
  };
  
  return baseSteps[tier.level] || baseSteps['T1'];
};

/**
 * HACP Escalation Framework
 */
export const shouldEscalate = (
  action: HACPAction,
  userTier: string,
  leadValue?: number
): boolean => {
  // Always escalate T4 actions
  if (action.tier === 'T4') return true;
  
  // Escalate high-value leads (> $50K)
  if (leadValue && leadValue > 50000) return true;
  
  // Escalate high emotional weight actions
  if (action.emotional_weight > 4) return true;
  
  // Escalate complex negotiations for non-enterprise users
  if (action.intent.includes('negotiate') && !['custom', 'white_label'].includes(userTier)) {
    return true;
  }
  
  return action.requires_escalation;
};

/**
 * HACP Middleware for CRM Actions
 * Wraps CRM actions with HACP behavioral compliance
 */
export const hacpMiddleware = async (
  action: string,
  userTier: string,
  context: string,
  leadData?: any,
  next?: Function
) => {
  try {
    // Analyze action through HACP framework
    const analysis = analyzeHACPAction(action, userTier, context, leadData);
    
    // Check if escalation is required
    if (shouldEscalate(analysis.action, userTier, leadData?.value)) {
      return {
        success: false,
        escalation_required: true,
        message: analysis.emotional_context,
        next_steps: analysis.next_steps,
        tier: analysis.tier
      };
    }
    
    // Process action based on routing
    if (analysis.action.type === 'crm' && next) {
      const result = await next();
      return {
        success: true,
        result,
        hacp_analysis: analysis,
        emotional_context: analysis.emotional_context
      };
    }
    
    return {
      success: true,
      hacp_analysis: analysis,
      emotional_context: analysis.emotional_context,
      next_steps: analysis.next_steps
    };
    
  } catch (error) {
    console.error('HACP Middleware Error:', error);
    return {
      success: false,
      error: 'HACP processing failed',
      fallback_tier: HACP_TIERS.T1
    };
  }
};