import express from "express";
import { SeamlessLead, ClearbitCompany } from "@shared/api";

const router = express.Router();

// Seamless.ai API endpoint
const SEAMLESS_API_URL = "https://api.seamless.ai/v1";

/**
 * Search for leads using Seamless.ai API
 */
const searchSeamlessLeads = async (
  company: string,
  title?: string,
  location?: string
): Promise<SeamlessLead[]> => {
  try {
    const searchParams = new URLSearchParams({
      company,
      ...(title && { title }),
      ...(location && { location }),
      limit: "10"
    });

    const response = await fetch(`${SEAMLESS_API_URL}/leads/search?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${process.env.SEAMLESS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Seamless API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.results?.map((lead: any) => ({
      name: `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
      email: lead.email || '',
      title: lead.title || '',
      company: {
        name: lead.company_name || company,
        domain: lead.company_domain || '',
        logo: lead.company_logo || '',
        description: lead.company_description || '',
        employees: lead.company_size || 0,
        revenue: 0, // Seamless doesn't provide revenue data
        industry: lead.company_industry || '',
        location: lead.company_location || location || ''
      },
      linkedin: lead.linkedin_url || '',
      confidence: lead.confidence_score || 0.5
    })) || [];
    
  } catch (error) {
    console.error('Error fetching Seamless leads:', error);
    return [];
  }
};

/**
 * Get lead details by email
 */
const getLeadByEmail = async (email: string): Promise<SeamlessLead | null> => {
  try {
    const response = await fetch(`${SEAMLESS_API_URL}/leads/email/${email}`, {
      headers: {
        'Authorization': `Bearer ${process.env.SEAMLESS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Lead not found
      }
      throw new Error(`Seamless API error: ${response.status} ${response.statusText}`);
    }

    const lead = await response.json();
    
    return {
      name: `${lead.first_name || ''} ${lead.last_name || ''}`.trim(),
      email: lead.email || email,
      title: lead.title || '',
      company: {
        name: lead.company_name || '',
        domain: lead.company_domain || '',
        logo: lead.company_logo || '',
        description: lead.company_description || '',
        employees: lead.company_size || 0,
        revenue: 0,
        industry: lead.company_industry || '',
        location: lead.company_location || ''
      },
      linkedin: lead.linkedin_url || '',
      confidence: lead.confidence_score || 0.5
    };
    
  } catch (error) {
    console.error('Error fetching lead by email:', error);
    return null;
  }
};

/**
 * Search leads by company
 */
router.post("/search/company", async (req, res) => {
  try {
    const { company, title, location, limit = 10 } = req.body;
    
    if (!company) {
      return res.status(400).json({ error: "Company name is required" });
    }

    console.log(`🔍 Searching Seamless leads for company: ${company}`);
    
    const leads = await searchSeamlessLeads(company, title, location);
    
    console.log(`✅ Found ${leads.length} leads for ${company}`);
    
    res.json({
      leads: leads.slice(0, limit),
      total: leads.length,
      company,
      filters: { title, location }
    });
    
  } catch (error) {
    console.error('Error in company lead search:', error);
    res.status(500).json({ error: "Failed to search leads" });
  }
});

/**
 * Search leads by title/role
 */
router.post("/search/title", async (req, res) => {
  try {
    const { title, company, location, limit = 10 } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    console.log(`🔍 Searching Seamless leads by title: ${title}`);
    
    const leads = await searchSeamlessLeads(company || '', title, location);
    
    console.log(`✅ Found ${leads.length} leads with title: ${title}`);
    
    res.json({
      leads: leads.slice(0, limit),
      total: leads.length,
      title,
      filters: { company, location }
    });
    
  } catch (error) {
    console.error('Error in title lead search:', error);
    res.status(500).json({ error: "Failed to search leads by title" });
  }
});

/**
 * Get lead details by email
 */
router.get("/lead/:email", async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    console.log(`🔍 Looking up lead by email: ${email}`);
    
    const lead = await getLeadByEmail(email);
    
    if (!lead) {
      return res.status(404).json({ 
        error: "Lead not found",
        email 
      });
    }

    console.log(`✅ Lead found: ${lead.name} at ${lead.company.name}`);
    res.json(lead);
    
  } catch (error) {
    console.error('Error in lead lookup:', error);
    res.status(500).json({ error: "Failed to lookup lead" });
  }
});

/**
 * Verify email addresses
 */
router.post("/verify", async (req, res) => {
  try {
    const { emails } = req.body;
    
    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: "Emails array is required" });
    }

    if (emails.length > 25) {
      return res.status(400).json({ error: "Maximum 25 emails per request" });
    }

    console.log(`📧 Verifying ${emails.length} email addresses`);
    
    // Note: This would require Seamless email verification API
    // For now, return a placeholder response
    const results = emails.map((email: string) => ({
      email,
      valid: email.includes('@') && email.includes('.'),
      deliverable: 'unknown',
      confidence: 0.5
    }));
    
    res.json({
      results,
      total: emails.length,
      note: "Email verification requires Seamless premium features"
    });
    
  } catch (error) {
    console.error('Error in email verification:', error);
    res.status(500).json({ error: "Failed to verify emails" });
  }
});

/**
 * Health check endpoint
 */
router.get("/status", (req, res) => {
  const hasApiKey = !!process.env.SEAMLESS_API_KEY;
  
  res.json({
    status: hasApiKey ? "connected" : "no_api_key",
    hasApiKey,
    endpoints: [
      "POST /api/seamless/search/company",
      "POST /api/seamless/search/title",
      "GET /api/seamless/lead/:email",
      "POST /api/seamless/verify"
    ],
    timestamp: new Date().toISOString()
  });
});

export default router;