import express from "express";
import { ClearbitCompany } from "@shared/api";

const router = express.Router();

// Clearbit API endpoint
const CLEARBIT_API_URL = "https://company-stream.clearbit.com/v2/companies/find";

/**
 * Get company data from Clearbit API
 */
const fetchClearbitCompany = async (domain: string): Promise<ClearbitCompany | null> => {
  try {
    const response = await fetch(`${CLEARBIT_API_URL}?domain=${domain}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLEARBIT_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Company not found
      }
      throw new Error(`Clearbit API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      name: data.name || 'Unknown Company',
      domain: data.domain || domain,
      logo: data.logo || '',
      description: data.description || '',
      employees: data.metrics?.employees || 0,
      revenue: data.metrics?.annualRevenue || 0,
      industry: data.category?.industry || 'Unknown',
      location: data.geo?.city && data.geo?.state 
        ? `${data.geo.city}, ${data.geo.state}` 
        : data.geo?.country || 'Unknown'
    };
  } catch (error) {
    console.error('Error fetching Clearbit data:', error);
    return null;
  }
};

/**
 * Enrich company data endpoint
 */
router.get("/company/:domain", async (req, res) => {
  try {
    const { domain } = req.params;
    
    if (!domain) {
      return res.status(400).json({ error: "Domain parameter is required" });
    }

    // Clean domain (remove http/https, www, etc.)
    const cleanDomain = domain
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .split('/')[0];

    console.log(`🔍 Enriching company data for: ${cleanDomain}`);
    
    const companyData = await fetchClearbitCompany(cleanDomain);
    
    if (!companyData) {
      return res.status(404).json({ 
        error: "Company not found",
        domain: cleanDomain 
      });
    }

    console.log(`✅ Company data enriched: ${companyData.name}`);
    res.json(companyData);
    
  } catch (error) {
    console.error('Error in company enrichment:', error);
    res.status(500).json({ error: "Failed to enrich company data" });
  }
});

/**
 * Bulk company enrichment endpoint
 */
router.post("/companies/bulk", async (req, res) => {
  try {
    const { domains } = req.body;
    
    if (!Array.isArray(domains) || domains.length === 0) {
      return res.status(400).json({ error: "Domains array is required" });
    }

    if (domains.length > 10) {
      return res.status(400).json({ error: "Maximum 10 domains per request" });
    }

    console.log(`🔍 Bulk enriching ${domains.length} companies`);
    
    const enrichmentPromises = domains.map(async (domain: string) => {
      const cleanDomain = domain
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .split('/')[0];
      
      const companyData = await fetchClearbitCompany(cleanDomain);
      return {
        domain: cleanDomain,
        data: companyData,
        success: !!companyData
      };
    });

    const results = await Promise.all(enrichmentPromises);
    const successful = results.filter(r => r.success).length;
    
    console.log(`✅ Bulk enrichment completed: ${successful}/${domains.length} successful`);
    
    res.json({
      results,
      total: domains.length,
      successful,
      failed: domains.length - successful
    });
    
  } catch (error) {
    console.error('Error in bulk company enrichment:', error);
    res.status(500).json({ error: "Failed to enrich company data" });
  }
});

/**
 * Search companies by criteria
 */
router.post("/search", async (req, res) => {
  try {
    const { query, filters } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Note: This would require Clearbit Discovery API (premium feature)
    // For now, return a placeholder response
    console.log(`🔍 Company search query: ${query}`);
    
    res.json({
      message: "Company search functionality requires Clearbit Discovery API",
      query,
      filters,
      results: [],
      note: "Upgrade to Clearbit Discovery for advanced search capabilities"
    });
    
  } catch (error) {
    console.error('Error in company search:', error);
    res.status(500).json({ error: "Failed to search companies" });
  }
});

/**
 * Health check endpoint
 */
router.get("/status", (req, res) => {
  const hasApiKey = !!process.env.CLEARBIT_API_KEY;
  
  res.json({
    status: hasApiKey ? "connected" : "no_api_key",
    hasApiKey,
    endpoints: [
      "GET /api/clearbit/company/:domain",
      "POST /api/clearbit/companies/bulk",
      "POST /api/clearbit/search"
    ],
    timestamp: new Date().toISOString()
  });
});

export default router;