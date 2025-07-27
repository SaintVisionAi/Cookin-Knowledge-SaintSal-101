import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Shield, 
  Zap, 
  Crown, 
  ArrowRight, 
  CheckCircle,
  Lock,
  Award,
  Building2,
  Users,
  Brain,
  Globe,
  Cpu,
  Eye,
  FileText,
  TrendingUp,
  Star,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';

export default function AppleHomepage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whyUsPoints = [
    {
      icon: Award,
      title: "Patent Protected Technology",
      description: "HACP™ U.S. Patent No. 10,290,222 - The only legally protected AI collaboration protocol in the industry"
    },
    {
      icon: TrendingUp, 
      title: "Proven Revenue Generation",
      description: "$8,947+ generated for clients through our Route Intelligence platform with 47+ satisfied customers"
    },
    {
      icon: Shield,
      title: "Enterprise Security First",
      description: "SOC 2 compliant, AES-256 encryption, faith-aligned values with transparent data practices"
    }
  ];

  const eliteTech = [
    {
      icon: Crown,
      title: "SaintSal™ AI",
      description: "HACP™-powered companion with advanced reasoning",
      status: "Enterprise"
    },
    {
      icon: Cpu,
      title: "Route Intelligence", 
      description: "Real-time website monitoring & optimization",
      status: "+$47 Add-On"
    },
    {
      icon: Users,
      title: "PartnerTech.ai",
      description: "Integrated CRM with AI-powered insights",
      status: "Platform"
    }
  ];

  const ecosystemPartners = [
    {
      name: "Athena Legacy Care",
      description: "AI-powered legacy system modernization",
      icon: "🏛️",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "EbyTech Finance", 
      description: "Advanced financial technology solutions",
      icon: "💎", 
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "SVTLegal.ai",
      description: "Legal technology and compliance automation", 
      icon: "⚖️",
      color: "from-red-500 to-rose-600"
    },
    {
      name: "SBVG Institute",
      description: "Research and development excellence",
      icon: "🎓",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Parallax Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F2c553a9d8cf24e6eae81a4a63962c5a4%2F446d6f0fa2c34f478f99f49fc6ba7f85?format=webp&width=800')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundAttachment: 'fixed',
          transform: `translateY(${scrollY * 0.5}px)`,
          filter: 'brightness(0.6)'
        }}
      />

      {/* Charcoal Overlay */}
      <div className="fixed inset-0 z-0 bg-gray-900/20 backdrop-blur-[0.3px]" />

      {/* Navigation */}
      <GlobalHeader />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-start justify-center pt-64">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Main Headline */}
          <h1 className="text-7xl md:text-8xl font-light tracking-tight mb-6 leading-none">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              The Future of
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-semibold">
              Enterprise AI
            </span>
          </h1>

          {/* SaintSal Subheadline */}
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-yellow-400/90 font-medium italic tracking-wide">
              Powered by SaintSal™ • Where AI meets intuition 😉
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            HACP™ technology powers the world's most advanced AI collaboration platform. 
            <span className="text-white"> Patent-protected. Enterprise-proven. Faith-aligned.</span>
          </p>

          {/* Trusted Tech Stack */}
          <div className="flex justify-center items-center gap-8 mb-12 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white/60">Azure Cognitive Services</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white/60">OpenAI GPT-4</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-white/60">Enterprise Grade</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/warroom">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 px-8 py-4 text-lg font-semibold shadow-2xl shadow-yellow-400/20">
                Explore SaintSal™
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 px-8 py-4 text-lg backdrop-blur-sm">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Patent Badge - Moved Below Buttons */}
          <div className="mb-8">
            <Badge className="bg-white/10 text-white backdrop-blur-sm px-6 py-2 border-0">
              🛡️ Protected by U.S. Patent No. 10,290,222
            </Badge>
          </div>
        </div>
      </section>

      {/* Minimal spacing for scroll continuation */}
      <div className="h-screen"></div>

      {/* Footer */}
      <GlobalFooter />
    </div>
  );
}
