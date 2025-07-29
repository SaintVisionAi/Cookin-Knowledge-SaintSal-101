import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Package,
  Crown,
  Star,
  CheckCircle,
  Zap,
  Users,
  Building2,
  Rocket,
  Brain,
  Shield,
  Sparkles,
  Download,
  Play,
  Settings,
  BarChart3,
  FileText,
  Mail,
  Calendar,
  Code,
  Image as ImageIcon,
  Video,
  Palette,
  Target,
  Award,
} from "lucide-react";

export function AIToolsSuite() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState("starter");
  const [installedPackages, setInstalledPackages] = useState<string[]>([
    "starter",
  ]);

  const productivityPackages = [
    {
      id: "starter",
      name: "Starter Pack",
      price: "Free",
      description: "Essential AI tools to get you started",
      tier: "Free",
      color: "from-green-400 to-emerald-400",
      iconColor: "text-green-400",
      icon: Rocket,
      tools: [
        { name: "SaintGPT Search", icon: Brain, status: "active" },
        { name: "Basic Notes", icon: FileText, status: "active" },
        { name: "Simple Analytics", icon: BarChart3, status: "active" },
      ],
      features: [
        "3 Core AI Tools",
        "Basic Templates",
        "Community Support",
        "5GB Storage",
      ],
      installed: true,
    },
    {
      id: "productivity",
      name: "Productivity Pro",
      price: "$27/month",
      description: "Advanced productivity tools for professionals",
      tier: "Premium",
      color: "from-[hsl(var(--gold))] to-yellow-400",
      iconColor: "text-[hsl(var(--gold))]",
      icon: Zap,
      tools: [
        { name: "Advanced SaintGPT", icon: Brain, status: "active" },
        { name: "Smart Sticky Notes", icon: FileText, status: "active" },
        { name: "Email Assistant", icon: Mail, status: "active" },
        { name: "Calendar AI", icon: Calendar, status: "active" },
        { name: "Analytics Pro", icon: BarChart3, status: "active" },
      ],
      features: [
        "8 Premium AI Tools",
        "Advanced Templates",
        "Priority Support",
        "50GB Storage",
        "Team Collaboration",
        "Custom Workflows",
      ],
      installed: false,
    },
    {
      id: "creative",
      name: "Creative Studio",
      price: "$47/month",
      description: "Complete creative toolkit for content creators",
      tier: "Professional",
      color: "from-purple-400 to-pink-400",
      iconColor: "text-purple-400",
      icon: Palette,
      tools: [
        { name: "Image Generator", icon: ImageIcon, status: "active" },
        { name: "Video Studio", icon: Video, status: "active" },
        { name: "Design Templates", icon: Palette, status: "active" },
        { name: "Brand Manager", icon: Crown, status: "active" },
        { name: "Asset Library", icon: Package, status: "active" },
      ],
      features: [
        "Complete Creative Suite",
        "AI Image Generation",
        "Video Creation Tools",
        "Brand Management",
        "100GB Storage",
        "Commercial License",
      ],
      installed: false,
    },
    {
      id: "enterprise",
      name: "Enterprise Suite",
      price: "$97/month",
      description: "Full business automation and AI workflow platform",
      tier: "Enterprise",
      color: "from-blue-400 to-cyan-400",
      iconColor: "text-blue-400",
      icon: Building2,
      tools: [
        { name: "All Tools Included", icon: Package, status: "active" },
        { name: "Custom AI Models", icon: Brain, status: "active" },
        { name: "API Access", icon: Code, status: "active" },
        { name: "White Label", icon: Crown, status: "active" },
        { name: "Team Management", icon: Users, status: "active" },
        { name: "Analytics Dashboard", icon: BarChart3, status: "active" },
      ],
      features: [
        "All AI Tools & Features",
        "Custom AI Training",
        "API Integration",
        "White-label Solution",
        "Unlimited Storage",
        "24/7 Support",
        "Custom Development",
      ],
      installed: false,
    },
    {
      id: "developer",
      name: "Developer Pack",
      price: "$67/month",
      description: "Specialized tools for developers and technical teams",
      tier: "Professional",
      color: "from-emerald-400 to-green-400",
      iconColor: "text-emerald-400",
      icon: Code,
      tools: [
        { name: "Code Assistant", icon: Code, status: "active" },
        { name: "API Documentation", icon: FileText, status: "active" },
        { name: "Code Review AI", icon: CheckCircle, status: "active" },
        { name: "Performance Monitor", icon: BarChart3, status: "active" },
        { name: "Deploy Assistant", icon: Rocket, status: "active" },
      ],
      features: [
        "Code Generation & Review",
        "API Documentation Tools",
        "Performance Analytics",
        "Deployment Automation",
        "Version Control Integration",
        "Team Code Collaboration",
      ],
      installed: false,
    },
    {
      id: "marketing",
      name: "Marketing Mastery",
      price: "$57/month",
      description: "AI-powered marketing and content creation tools",
      tier: "Professional",
      color: "from-red-400 to-pink-400",
      iconColor: "text-red-400",
      icon: Target,
      tools: [
        { name: "Content Generator", icon: FileText, status: "active" },
        { name: "Social Media AI", icon: Users, status: "active" },
        { name: "Campaign Analytics", icon: BarChart3, status: "active" },
        { name: "SEO Assistant", icon: Target, status: "active" },
        { name: "Lead Generator", icon: Crown, status: "active" },
      ],
      features: [
        "Content Creation Suite",
        "Social Media Automation",
        "Campaign Management",
        "SEO Optimization",
        "Lead Generation Tools",
        "Performance Tracking",
      ],
      installed: false,
    },
  ];

  const selectedPkg = productivityPackages.find(
    (pkg) => pkg.id === selectedPackage,
  );

  const installPackage = (packageId: string) => {
    if (!installedPackages.includes(packageId)) {
      setInstalledPackages((prev) => [...prev, packageId]);
    }
    // In real implementation, this would handle payment/subscription
    const pkg = productivityPackages.find((p) => p.id === packageId);
    alert(
      `🚀 ${pkg?.name} Package Installed!\n\nYour new AI tools are now available. Start boosting your productivity!`,
    );
  };

  const [activeTool, setActiveTool] = useState<string | null>(null);

  const renderActiveTool = () => {
    switch (activeTool) {
      case "saintgpt":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[hsl(var(--gold))] mb-4">🧠 SaintGPT AI Assistant</h3>
            <div className="bg-black rounded-lg p-4 border border-gray-700">
              <textarea
                placeholder="Ask SaintGPT anything... Your AI assistant is ready to help!"
                className="w-full h-32 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none"
              />
              <Button className="mt-3 bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))]/90">
                <Brain className="w-4 h-4 mr-2" />
                Ask SaintGPT
              </Button>
            </div>
          </div>
        );

      case "sticky-notes":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[hsl(var(--gold))] mb-4">📝 Smart Sticky Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-yellow-400 text-black p-4 rounded-lg">
                  <textarea
                    placeholder={`Note ${i}...`}
                    className="w-full h-24 bg-transparent border-none outline-none resize-none"
                  />
                </div>
              ))}
            </div>
            <Button className="bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))]/90">
              <FileText className="w-4 h-4 mr-2" />
              Add New Note
            </Button>
          </div>
        );

      case "email":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[hsl(var(--gold))] mb-4">📧 Email Assistant</h3>
            <div className="space-y-4">
              <input
                placeholder="To: recipient@example.com"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400"
              />
              <input
                placeholder="Subject: Your email subject"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400"
              />
              <textarea
                placeholder="Compose your email... AI will help enhance it!"
                className="w-full h-32 p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 resize-none"
              />
              <div className="flex gap-2">
                <Button className="bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))]/90">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="border-[hsl(var(--gold))]/30 text-[hsl(var(--gold))]">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Enhance
                </Button>
              </div>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[hsl(var(--gold))] mb-4">🎨 AI Image Generator</h3>
            <div className="space-y-4">
              <textarea
                placeholder="Describe the image you want to generate... Be creative!"
                className="w-full h-24 p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 resize-none"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <select className="p-2 bg-black border border-gray-700 rounded text-white">
                  <option>Style: Realistic</option>
                  <option>Style: Artistic</option>
                  <option>Style: Cartoon</option>
                </select>
                <select className="p-2 bg-black border border-gray-700 rounded text-white">
                  <option>Size: 1024x1024</option>
                  <option>Size: 1920x1080</option>
                  <option>Size: 512x512</option>
                </select>
                <select className="p-2 bg-black border border-gray-700 rounded text-white">
                  <option>Quality: High</option>
                  <option>Quality: Standard</option>
                </select>
                <Button className="bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))]/90">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>
              <div className="bg-gray-800 rounded-lg p-8 text-center border-2 border-dashed border-gray-600">
                <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Generated image will appear here</p>
              </div>
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[hsl(var(--gold))] mb-4">🎬 Video Studio</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Script/Content</label>
                  <textarea
                    placeholder="Enter your video script or content..."
                    className="w-full h-32 p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Video Settings</label>
                  <div className="space-y-2">
                    <select className="w-full p-2 bg-black border border-gray-700 rounded text-white">
                      <option>Format: MP4</option>
                      <option>Format: MOV</option>
                    </select>
                    <select className="w-full p-2 bg-black border border-gray-700 rounded text-white">
                      <option>Duration: 30 seconds</option>
                      <option>Duration: 1 minute</option>
                      <option>Duration: 2 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
              <Button className="bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))]/90">
                <Video className="w-4 h-4 mr-2" />
                Create Video
              </Button>
            </div>
          </div>
        );

      case "code":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[hsl(var(--gold))] mb-4">💻 Code Assistant</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select className="p-2 bg-black border border-gray-700 rounded text-white">
                  <option>Language: JavaScript</option>
                  <option>Language: Python</option>
                  <option>Language: TypeScript</option>
                  <option>Language: React</option>
                </select>
                <select className="p-2 bg-black border border-gray-700 rounded text-white">
                  <option>Task: Generate Code</option>
                  <option>Task: Debug Code</option>
                  <option>Task: Optimize Code</option>
                </select>
              </div>
              <textarea
                placeholder="Describe what you want to code or paste code to debug/optimize..."
                className="w-full h-32 p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 resize-none font-mono"
              />
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Generated Code:</span>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                    Copy
                  </Button>
                </div>
                <pre className="text-sm text-green-400 font-mono">
                  {`// Your AI-generated code will appear here
function example() {
  console.log("Hello from Code Assistant!");
}`}
                </pre>
              </div>
              <Button className="bg-[hsl(var(--gold))] text-black hover:bg-[hsl(var(--gold))]/90">
                <Code className="w-4 h-4 mr-2" />
                Generate Code
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <Sparkles className="w-16 h-16 text-[hsl(var(--gold))] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">AI Tool Ready!</h3>
            <p className="text-gray-400">This tool is being loaded...</p>
          </div>
        );
    }
  };

  const launchTool = (toolName: string) => {
    // Launch tools within this same page
    switch (toolName) {
      case "SaintGPT Search":
      case "Advanced SaintGPT":
        setActiveTool("saintgpt");
        break;
      case "Smart Sticky Notes":
      case "Basic Notes":
        setActiveTool("sticky-notes");
        break;
      case "Email Assistant":
        setActiveTool("email");
        break;
      case "Image Generator":
        setActiveTool("image");
        break;
      case "Video Studio":
        setActiveTool("video");
        break;
      case "Code Assistant":
        setActiveTool("code");
        break;
      default:
        alert(
          `🛠️ ${toolName}\n\nThis tool is included in your package and launching now!`,
        );
        setActiveTool("default");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (activeTool) {
                  setActiveTool(null);
                } else {
                  navigate("/");
                }
              }}
              className="border-[hsl(var(--gold))]/30 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {activeTool ? "Back to Suite" : "Back to Home"}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Tools Suite</h1>
                <p className="text-sm text-gray-400">
                  Complete toolkit for AI-powered workflows
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-[hsl(var(--gold))]">
                Installed
              </div>
              <div className="text-xs text-gray-400">
                {installedPackages.length} packages
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--gold))] to-yellow-400 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Render Active Tool */}
        {activeTool && (
          <div className="mb-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              {renderActiveTool()}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Package Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-[hsl(var(--gold))]" />
                Productivity Packages
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productivityPackages.map((pkg) => {
                  const Icon = pkg.icon;
                  const isInstalled = installedPackages.includes(pkg.id);
                  return (
                    <div
                      key={pkg.id}
                      className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                        selectedPackage === pkg.id
                          ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/5"
                          : "border-gray-700 bg-gray-800 hover:border-gray-600"
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {/* Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                      ></div>

                      {/* Content */}
                      <div className="relative">
                        <div className="flex items-start justify-between mb-3">
                          <Icon className={`w-8 h-8 ${pkg.iconColor}`} />
                          <div className="flex items-center gap-2">
                            {isInstalled && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                            <div
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                pkg.tier === "Free"
                                  ? "bg-green-900 text-green-300"
                                  : pkg.tier === "Premium"
                                    ? "bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))]"
                                    : pkg.tier === "Professional"
                                      ? "bg-purple-900 text-purple-300"
                                      : "bg-blue-900 text-blue-300"
                              }`}
                            >
                              {pkg.tier}
                            </div>
                          </div>
                        </div>

                        <h4 className="font-semibold text-white mb-1">
                          {pkg.name}
                        </h4>
                        <div className="text-lg font-bold text-[hsl(var(--gold))] mb-2">
                          {pkg.price}
                        </div>
                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                          {pkg.description}
                        </p>

                        <div className="text-xs text-gray-500 mb-4">
                          {pkg.tools.length} AI tools included
                        </div>

                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isInstalled) {
                              setSelectedPackage(pkg.id);
                            } else {
                              installPackage(pkg.id);
                            }
                          }}
                          className={`w-full ${
                            isInstalled
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : pkg.tier === "Free"
                                ? "bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-black"
                                : "bg-gray-700 hover:bg-gray-600 text-white"
                          }`}
                          disabled={isInstalled}
                        >
                          {isInstalled ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Installed
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              {pkg.tier === "Free"
                                ? "Install Free"
                                : "Upgrade & Install"}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-6">
            {selectedPkg && (
              <>
                {/* Package Overview */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <selectedPkg.icon
                      className={`w-5 h-5 ${selectedPkg.iconColor}`}
                    />
                    {selectedPkg.name}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-[hsl(var(--gold))] mb-1">
                        {selectedPkg.price}
                      </div>
                      <div className="text-sm text-gray-400">
                        {selectedPkg.description}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-white mb-2">
                        Features Included:
                      </h4>
                      <div className="space-y-1">
                        {selectedPkg.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tools in Package */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[hsl(var(--gold))]" />
                    Included Tools
                  </h3>

                  <div className="space-y-3">
                    {selectedPkg.tools.map((tool, index) => {
                      const Icon = tool.icon;
                      const isInstalled = installedPackages.includes(
                        selectedPkg.id,
                      );
                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            isInstalled ? "bg-gray-800" : "bg-gray-800/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-[hsl(var(--gold))]" />
                            <span
                              className={`font-medium ${
                                isInstalled ? "text-white" : "text-gray-400"
                              }`}
                            >
                              {tool.name}
                            </span>
                          </div>
                          {isInstalled ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => launchTool(tool.name)}
                              className="border-[hsl(var(--gold))]/30 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Launch
                            </Button>
                          ) : (
                            <div className="text-xs text-gray-500">
                              Install package
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[hsl(var(--gold))]" />
                    Package Stats
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(var(--gold))] mb-1">
                        {selectedPkg.tools.length}
                      </div>
                      <div className="text-xs text-gray-400">AI Tools</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {selectedPkg.features.length}
                      </div>
                      <div className="text-xs text-gray-400">Features</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIToolsSuite;
