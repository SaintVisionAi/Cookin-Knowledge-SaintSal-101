import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale, Shield, FileText, CheckCircle, Crown, Award, Users, Building, Gavel, BookOpen, Lock, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Legal() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "hacp", title: "HACP™ Patent Technology", icon: Crown },
    { id: "privacy", title: "Privacy Policy", icon: Shield },
    { id: "terms", title: "Terms of Service", icon: FileText },
    { id: "ai-disclosure", title: "AI Ethics & Disclosure", icon: Award },
    { id: "ip-governance", title: "IP Governance", icon: Gavel },
    { id: "compliance", title: "Security & Compliance", icon: Lock },
    { id: "contact", title: "Legal Contact", icon: Users }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      let current = "";
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = section.getAttribute("data-section") || "";
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="border-[hsl(var(--gold))]/30 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Legal Center</h1>
                <p className="text-sm text-gray-400">Privacy, Terms & IP Protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex pt-20">
        {/* Fixed Table of Contents */}
        <div className="fixed left-0 top-20 bottom-0 w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[hsl(var(--gold))] mb-2">Table of Contents</h2>
            <p className="text-sm text-gray-400">Navigate to any section</p>
          </div>
          
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] border border-[hsl(var(--gold))]/30"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 p-4 bg-black/30 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-[hsl(var(--gold))]" />
              <span className="text-sm font-bold text-[hsl(var(--gold))]">Protected by Patent</span>
            </div>
            <p className="text-xs text-gray-400">U.S. Patent No. 10,290,222</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-80 flex-1">
          <div className="max-w-4xl mx-auto p-8">
            
            {/* HACP Patent Section */}
            <section id="hacp" data-section="hacp" className="mb-16 scroll-mt-24">
              <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-xl p-8 border border-yellow-400/30">
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="w-10 h-10 text-[hsl(var(--gold))]" />
                  <div>
                    <h2 className="text-3xl font-bold text-white">HACP™ Patent Technology</h2>
                    <p className="text-[hsl(var(--gold))] font-medium">U.S. Patent No. 10,290,222</p>
                  </div>
                </div>
                
                <div className="space-y-8 text-gray-300 leading-relaxed">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">What is HACP™?</h3>
                    <p className="text-lg mb-4">
                      The Human-AI Connection Protocol (HACP™) is the core adaptive intelligence framework that powers every Saint Vision interface — from SaintSal's coaching flows to immersive therapy apps, onboarding flows, PartnerTech routing, and executive dashboards.
                    </p>
                    <p>
                      More than just a UX philosophy or prompting technique, HACP is a structured, adaptive, real-time escalation engine that tunes itself based on user ability, emotional state, task complexity, and timing feedback loops.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/30 rounded-lg p-6 border border-gray-700">
                      <h4 className="text-xl font-semibold text-[hsl(var(--gold))] mb-3">Adaptive Response System</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Escalating prompts (hint → cue → example → intervention)</li>
                        <li>• Context-aware persona shifts</li>
                        <li>• Multimodal inputs (gesture, text, gaze, sensor)</li>
                        <li>• Real-time emotional calibration</li>
                      </ul>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-6 border border-gray-700">
                      <h4 className="text-xl font-semibold text-[hsl(var(--gold))] mb-3">Patent Protection</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Issued: May 2019</li>
                        <li>• Fully enforceable - no PTAB challenges</li>
                        <li>• Covers adaptive tutoring systems</li>
                        <li>• AR/VR rehabilitation guides</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Commercial Significance</h3>
                    <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-[hsl(var(--gold))] mb-1">$10M-$75M</div>
                          <div className="text-sm text-gray-400">Licensing Value</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400 mb-1">Enterprise</div>
                          <div className="text-sm text-gray-400">CRM Integration</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-400 mb-1">Healthcare</div>
                          <div className="text-sm text-gray-400">Therapy Ready</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy Policy Section */}
            <section id="privacy" data-section="privacy" className="mb-16 scroll-mt-24">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-green-400" />
                  <h2 className="text-3xl font-bold text-white">Privacy Policy</h2>
                </div>
                
                <div className="space-y-8 text-gray-300 leading-relaxed">
                  <div className="bg-green-400/10 rounded-lg p-6 border border-green-400/30">
                    <h3 className="text-xl font-semibold text-green-400 mb-3">We Protect What Matters</h3>
                    <p className="text-lg">
                      Saint Vision Group LLC and its associated platforms (SaintSal™, PartnerTech.ai, Athen.ai, EbyTech.ai, SVTlegal.ai, SVTteach.ai) are committed to the highest standards of privacy, data protection, and ethical conduct.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">🔒 What We Collect</h3>
                      <ul className="space-y-2">
                        <li>• Name, email, phone (if you submit them)</li>
                        <li>• Activity logs from SaintSal interactions</li>
                        <li>• Optional CRM, calendar, financial data you connect</li>
                        <li>• AI prompt content (with user opt-in only)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">🤖 What We NEVER Do</h3>
                      <ul className="space-y-2">
                        <li>• Sell your data</li>
                        <li>• Share personal info without consent</li>
                        <li>• Train external models with your inputs</li>
                        <li>• Track you across other websites</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">💼 How We Protect It</h3>
                    <div className="bg-black/30 rounded-lg p-6 border border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <strong className="text-white">Encryption:</strong> AES-256 for stored data
                        </div>
                        <div>
                          <strong className="text-white">Access Control:</strong> Supabase RLS
                        </div>
                        <div>
                          <strong className="text-white">Infrastructure:</strong> Zero-trust architecture
                        </div>
                        <div>
                          <strong className="text-white">Hosting:</strong> SOC 2-aligned stack
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">🌍 Global Compliance</h3>
                    <div className="flex flex-wrap gap-3">
                      {["GDPR (EU)", "CCPA (California)", "PIPEDA (Canada)", "LGPD (Brazil)", "UK DPA 2018"].map((compliance) => (
                        <div key={compliance} className="flex items-center gap-2 bg-green-400/20 px-3 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm">{compliance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Terms of Service Section */}
            <section id="terms" data-section="terms" className="mb-16 scroll-mt-24">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-8 h-8 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white">Terms of Service</h2>
                </div>
                
                <div className="space-y-8 text-gray-300 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Service Usage</h3>
                    <p>
                      By using SaintVisionAI services, you agree to use our platform responsibly and in accordance with applicable laws and regulations. Our services are designed for legitimate business purposes and professional collaboration.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Account Responsibilities</h3>
                    <ul className="space-y-2">
                      <li>• Maintain accurate account information</li>
                      <li>• Protect your login credentials</li>
                      <li>• Report security vulnerabilities</li>
                      <li>• Use services in good faith</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Intellectual Property</h3>
                    <p className="mb-4">
                      All content, features, and functionality are owned by Saint Vision Group LLC and are protected by international copyright, trademark, and patent laws, including:
                    </p>
                    <div className="bg-yellow-400/10 rounded-lg p-4 border border-yellow-400/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-[hsl(var(--gold))]" />
                        <strong className="text-[hsl(var(--gold))]">Protected Technology</strong>
                      </div>
                      <ul className="text-sm space-y-1">
                        <li>• HACP™ Human-AI Connection Protocol</li>
                        <li>• SaintSal™ Adaptive AI Assistant</li>
                        <li>• PartnerTech.ai CRM Integration</li>
                        <li>• Patent No. 10,290,222 and pending CIP filings</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Limitation of Liability</h3>
                    <p>
                      Saint Vision Group LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability is limited to the amount paid for services in the 12 months preceding the claim.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Disclosure Section */}
            <section id="ai-disclosure" data-section="ai-disclosure" className="mb-16 scroll-mt-24">
              <div className="bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-xl p-8 border border-purple-400/30">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-purple-400" />
                  <h2 className="text-3xl font-bold text-white">AI Ethics & Disclosure</h2>
                </div>
                
                <div className="space-y-8 text-gray-300 leading-relaxed">
                  <div className="bg-purple-400/10 rounded-lg p-6 border border-purple-400/30">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">SaintSal Charter</h3>
                    <p className="text-lg italic">"This isn't AI. This is assistance. Intelligent. Accountable. Adaptive."</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">✅ What SaintSal™ Is</h3>
                      <ul className="space-y-2">
                        <li>• An always-on adaptive AI assistant</li>
                        <li>• Trained with proprietary HACP™ logic</li>
                        <li>• Designed to escalate when needed</li>
                        <li>• Remembers only what matters to you</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">❌ What SaintSal™ Is NOT</h3>
                      <ul className="space-y-2">
                        <li>• A replacement for licensed professionals</li>
                        <li>• A surveillance tool</li>
                        <li>• A black-box language model</li>
                        <li>• Disconnected from human oversight</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">🧭 Ethical Principles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Clarity over manipulation",
                        "Adaptation over interruption", 
                        "Uplift over optimization",
                        "Transparency over performance",
                        "Emotional intelligence over raw data",
                        "Human dignity in every interaction"
                      ].map((principle, index) => (
                        <div key={index} className="flex items-center gap-3 bg-black/30 p-3 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span>{principle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* IP Governance Section */}
            <section id="ip-governance" data-section="ip-governance" className="mb-16 scroll-mt-24">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <Gavel className="w-8 h-8 text-orange-400" />
                  <h2 className="text-3xl font-bold text-white">IP Governance & Legal Structure</h2>
                </div>
                
                <div className="space-y-8 text-gray-300 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Corporate Structure</h3>
                    <div className="bg-orange-400/10 rounded-lg p-6 border border-orange-400/30">
                      <ul className="space-y-3">
                        <li>• <strong className="text-white">Delaware LP IP Holding Structure:</strong> All patents held separately for risk isolation</li>
                        <li>• <strong className="text-white">Operational LLC:</strong> Day-to-day business operations with full licensing control</li>
                        <li>• <strong className="text-white">International Compliance:</strong> KYC + AML protocols for global operations</li>
                        <li>• <strong className="text-white">Fund Segregation:</strong> Investor and user funds separated under compliance firewall</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Patent Portfolio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/30 rounded-lg p-6 border border-gray-700">
                        <h4 className="font-semibold text-[hsl(var(--gold))] mb-3">Current Patents</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• U.S. Patent No. 10,290,222</li>
                          <li>• Interactive Tutorial with Escalating Prompts</li>
                          <li>• Issued: May 2019</li>
                          <li>• Status: Fully enforceable</li>
                        </ul>
                      </div>
                      
                      <div className="bg-black/30 rounded-lg p-6 border border-gray-700">
                        <h4 className="font-semibold text-[hsl(var(--gold))] mb-3">Pending Filings</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• CIP extensions for HACP execution</li>
                          <li>• Memory modules and persona systems</li>
                          <li>• Advanced behavioral tier logic</li>
                          <li>• Enterprise integration protocols</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Licensed Technologies</h3>
                    <p className="mb-4">All operational tools are fully licensed and under Saint Vision Group control:</p>
                    <div className="flex flex-wrap gap-3">
                      {["GoHighLevel CRM", "Supabase Database", "Azure Cloud Services", "Twilio Communications", "OpenAI API", "Stripe Payments"].map((tech) => (
                        <div key={tech} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Compliance Section */}
            <section id="compliance" data-section="compliance" className="mb-16 scroll-mt-24">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-8 h-8 text-red-400" />
                  <h2 className="text-3xl font-bold text-white">Security & Compliance</h2>
                </div>
                
                <div className="space-y-8 text-gray-300 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Security Standards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-red-400/10 rounded-lg p-4 border border-red-400/30 text-center">
                        <Lock className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-white mb-2">SOC 2</h4>
                        <p className="text-sm">Type II Compliance</p>
                      </div>
                      <div className="bg-green-400/10 rounded-lg p-4 border border-green-400/30 text-center">
                        <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-white mb-2">AES-256</h4>
                        <p className="text-sm">Military-grade encryption</p>
                      </div>
                      <div className="bg-blue-400/10 rounded-lg p-4 border border-blue-400/30 text-center">
                        <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-white mb-2">Zero Trust</h4>
                        <p className="text-sm">Network architecture</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Regulatory Compliance</h3>
                    <p className="mb-6">
                      Our services comply with international data protection regulations and industry standards 
                      to ensure your privacy rights and business requirements are fully protected.
                    </p>
                    
                    <div className="bg-black/30 rounded-lg p-6 border border-gray-700">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-400 mb-1">GDPR</div>
                          <div className="text-xs text-gray-400">EU Compliance</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-400 mb-1">CCPA</div>
                          <div className="text-xs text-gray-400">California Privacy</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400 mb-1">PIPEDA</div>
                          <div className="text-xs text-gray-400">Canada Privacy</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-400 mb-1">LGPD</div>
                          <div className="text-xs text-gray-400">Brazil Privacy</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Data Retention</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                        <h4 className="font-semibold text-white mb-2">Default Users</h4>
                        <p className="text-sm">30 days for chat logs, immediate deletion upon request</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                        <h4 className="font-semibold text-white mb-2">Pro/Enterprise</h4>
                        <p className="text-sm">Up to 365 days unless deleted, full user control</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" data-section="contact" className="mb-16 scroll-mt-24">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-[hsl(var(--gold))]" />
                  <h2 className="text-3xl font-bold text-white">Legal Contact</h2>
                </div>
                
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    For legal inquiries, privacy concerns, compliance questions, or IP licensing opportunities, please contact our legal team:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-black/30 rounded-lg p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-4">General Legal</h3>
                      <div className="space-y-2">
                        <div className="text-[hsl(var(--gold))] font-medium">legal@saintvisionai.com</div>
                        <div className="text-sm text-gray-400">Privacy, compliance, general legal matters</div>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 rounded-lg p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-4">IP & Licensing</h3>
                      <div className="space-y-2">
                        <div className="text-[hsl(var(--gold))] font-medium">ip@saintvisionai.com</div>
                        <div className="text-sm text-gray-400">Patent licensing, IP partnerships</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-400/10 rounded-lg p-6 border border-yellow-400/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Building className="w-6 h-6 text-[hsl(var(--gold))]" />
                      <h3 className="text-lg font-semibold text-white">Corporate Information</h3>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div><strong className="text-white">Entity:</strong> Saint Vision Group LLC</div>
                      <div><strong className="text-white">Jurisdiction:</strong> Delaware, United States</div>
                      <div><strong className="text-white">Registration:</strong> IP Holding Company + Operating LLC structure</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 pt-8 pb-16">
              <div className="text-center space-y-4">
                <div className="text-[hsl(var(--gold))] font-bold">
                  © 2025 Saint Vision Group LLC
                </div>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  We protect your data. We respect your time. We serve your purpose. 
                  Built with patent-protected technology and faith-aligned values.
                </p>
                <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
                  <Award className="w-4 h-4" />
                  <span>Protected by U.S. Patent No. 10,290,222</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
