/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * HACP (Human-AI Connection Protocol) Types
 */
export interface HACPTier {
  level: 'T1' | 'T2' | 'T3' | 'T4';
  name: string;
  description: string;
  emotionalCalibration: 'low' | 'medium' | 'high' | 'enterprise';
  features: string[];
}

export interface HACPAction {
  id: string;
  type: 'crm' | 'ai' | 'escalation' | 'analysis';
  tier: 'T1' | 'T2' | 'T3' | 'T4';
  intent: string;
  emotional_weight: number;
  requires_escalation: boolean;
}

/**
 * CRM Integration Types
 */
export interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  status: 'hot' | 'warm' | 'cold';
  value?: number;
  lastContact: string;
  locationId: string;
}

export interface GHLOpportunity {
  id: string;
  name: string;
  stage: string;
  value: number;
  contactId: string;
  status: 'open' | 'won' | 'lost';
  pipelineId: string;
  locationId: string;
}

export interface GHLWebhookPayload {
  type: 'contact.created' | 'contact.updated' | 'opportunity.created' | 'opportunity.updated';
  data: GHLContact | GHLOpportunity;
  locationId: string;
  timestamp: string;
}

/**
 * Lead Discovery Types
 */
export interface ClearbitCompany {
  name: string;
  domain: string;
  logo: string;
  description: string;
  employees: number;
  revenue: number;
  industry: string;
  location: string;
}

export interface SeamlessLead {
  name: string;
  email: string;
  title: string;
  company: ClearbitCompany;
  linkedin: string;
  confidence: number;
}

export interface PartnerTechLead {
  id: string;
  source: 'web_crawl' | 'seamless' | 'clearbit' | 'manual';
  contact: GHLContact;
  company: ClearbitCompany;
  enrichment_data: SeamlessLead;
  score: number;
  hacp_tier: 'T1' | 'T2' | 'T3' | 'T4';
  created_at: string;
}

/**
 * Referral Tracking Types
 */
export interface ReferralTracking {
  id: string;
  referrer_id: string;
  referred_contact_id: string;
  status: 'pending' | 'converted' | 'rewarded';
  value: number;
  commission: number;
  created_at: string;
}

/**
 * API Response Types
 */
export interface CRMHealthResponse {
  status: 'connected' | 'disconnected' | 'error';
  hasCredentials: boolean;
  locationId: string;
  timestamp: string;
}

export interface LeadDiscoveryResponse {
  leads: PartnerTechLead[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface HACPAnalysisResponse {
  action: HACPAction;
  tier: HACPTier;
  next_steps: string[];
  emotional_context: string;
  escalation_required: boolean;
}
