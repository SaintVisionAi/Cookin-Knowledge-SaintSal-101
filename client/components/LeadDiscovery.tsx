import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Building2,
  Users,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Loader,
  CheckCircle,
  XCircle,
  Star,
  ArrowRight,
  Plus,
  Eye,
  Download
} from "lucide-react";
import { SeamlessLead, ClearbitCompany, PartnerTechLead } from "@shared/api";
import { useAuth } from "@/hooks/useAuth";

interface LeadDiscoveryProps {
  className?: string;
}

export function LeadDiscovery({ className }: LeadDiscoveryProps) {
  const { hasAccess } = useAuth();
  const [searchType, setSearchType] = useState<'company' | 'title'>('company');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<SeamlessLead[]>([]);
  const [companyData, setCompanyData] = useState<ClearbitCompany | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (searchType === 'company') {
        // First, enrich company data with Clearbit
        const companyResponse = await fetch(`/api/clearbit/company/${encodeURIComponent(searchQuery)}`);
        if (companyResponse.ok) {
          const company = await companyResponse.json();
          setCompanyData(company);
        }
        
        // Then search for leads with Seamless
        const leadsResponse = await fetch('/api/seamless/search/company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company: searchQuery, limit: 10 })
        });
        
        if (leadsResponse.ok) {
          const data = await leadsResponse.json();
          setLeads(data.leads || []);
        }
      } else {
        // Search by title
        const response = await fetch('/api/seamless/search/title', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: searchQuery, limit: 10 })
        });
        
        if (response.ok) {
          const data = await response.json();
          setLeads(data.leads || []);
        }
      }
    } catch (err) {
      setError('Failed to search leads. Please try again.');
      console.error('Lead search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToGHL = async (lead: SeamlessLead) => {
    try {
      const response = await fetch('/api/ghl/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: lead.name.split(' ')[0],
          lastName: lead.name.split(' ').slice(1).join(' '),
          email: lead.email,
          phone: '',
          companyName: lead.company.name,
          source: 'PartnerTech Lead Discovery'
        })
      });
      
      if (response.ok) {
        alert(`✅ ${lead.name} added to GHL CRM successfully!`);
      } else {
        alert('❌ Failed to add lead to CRM');
      }
    } catch (err) {
      alert('❌ Error adding lead to CRM');
      console.error('GHL add error:', err);
    }
  };

  if (!hasAccess("lead_discovery")) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Lead Discovery Access Required
          </h2>
          <p className="text-gray-400 mb-6">
            Upgrade to Core Tools to access lead discovery features
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
              <Search className="w-6 h-6 text-[hsl(var(--gold))]" />
              Lead Discovery
            </h1>
            <p className="text-sm text-muted-foreground">
              Powered by Clearbit + Seamless.ai Integration
            </p>
          </div>
          <Badge variant="outline" className="border-[hsl(var(--gold))] text-[hsl(var(--gold))]">
            PartnerTech.ai
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Interface */}
        <div className="p-6 rounded-xl bg-muted/10 backdrop-blur-sm border border-border/30">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="company"
                  checked={searchType === 'company'}
                  onChange={() => setSearchType('company')}
                  className="w-4 h-4"
                />
                <label htmlFor="company" className="text-sm">Search by Company</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="title"
                  checked={searchType === 'title'}
                  onChange={() => setSearchType('title')}
                  className="w-4 h-4"
                />
                <label htmlFor="title" className="text-sm">Search by Title</label>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Input
                placeholder={searchType === 'company' ? 'Enter company name...' : 'Enter job title...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-black"
              >
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Search
              </Button>
            </div>
            
            {error && (
              <div className="text-red-400 text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Company Data (if available) */}
        {companyData && (
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <div className="flex items-start gap-4">
              {companyData.logo && (
                <img 
                  src={companyData.logo} 
                  alt={companyData.name}
                  className="w-16 h-16 rounded-lg object-contain bg-white/10 p-2"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{companyData.name}</h3>
                  <Badge variant="outline">Company Data</Badge>
                </div>
                <p className="text-gray-300 mb-3">{companyData.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{companyData.employees} employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-sm">${companyData.revenue?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{companyData.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-sm">{companyData.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lead Results */}
        {leads.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Found {leads.length} leads</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Bulk Add
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {leads.map((lead, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-muted/10 border border-border/30 hover:bg-muted/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-yellow-400 flex items-center justify-center">
                        <span className="text-black font-bold">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{lead.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(lead.confidence * 100)}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{lead.title}</p>
                        <p className="text-sm text-blue-400">{lead.company.name}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          {lead.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </div>
                          )}
                          {lead.linkedin && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              LinkedIn
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => addToGHL(lead)}
                        className="bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-black"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add to CRM
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && leads.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No leads found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}