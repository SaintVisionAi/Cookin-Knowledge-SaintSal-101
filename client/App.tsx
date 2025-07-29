import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CORE PAGES - Clean Master Structure
import Splash from "./pages/Splash";
import AppleHomepage from "./pages/AppleHomepage";
import Why from "./pages/Why";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import GeneralDashboard from "./pages/GeneralDashboard"; // /gen
import SaintGPT from "./pages/SaintGPT";
import SimpleSearch from "./pages/SimpleSearch"; // /search
import WarRoom from "./pages/WarRoom";
import Institute from "./pages/Institute";
import Broker from "./pages/Broker";
import Help from "./pages/Help";
import Legal from "./pages/Legal";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// ALL EXISTING PAGES - Preserving full functionality
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Landing from "./pages/Landing";
import Enterprise from "./pages/Enterprise";
import HACP from "./pages/HACP";
import Tools from "./pages/Tools";
import AuditService from "./pages/AuditService";
import AuditDashboard from "./pages/AuditDashboard";
import CheckoutSuccess from "./pages/CheckoutSuccess";

// CORE COMPONENTS
import { PartnerTech } from "./components/PartnerTech";
import { CRM } from "./components/CRM";
import { AIToolsSuite } from "./components/AIToolsSuite";
import { ImageGenerator } from "./components/ImageGenerator";
import { StickyNotes } from "./components/StickyNotes";
import { EmailAssistant } from "./components/EmailAssistant";
import { VideoStudio } from "./components/VideoStudio";
import { CodeAcademy } from "./components/CodeAcademy";

import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Master Structure - Your EXACT Specifications */}
            <Route path="/splash" element={<Splash />} />
            <Route path="/applehome" element={<AppleHomepage />} />
            <Route path="/" element={<AppleHomepage />} />
            <Route path="/why" element={<Why />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/gen" element={<GeneralDashboard />} />
            <Route path="/saintgpt" element={<SaintGPT />} />
            <Route path="/search" element={<SimpleSearch />} />
            <Route path="/warroom" element={<WarRoom />} />
            <Route path="/partnertech" element={<PartnerTech />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/institute" element={<Institute />} />
            <Route path="/broker" element={<Broker />} />
            <Route path="/help" element={<Help />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/ai-tools" element={<AIToolsSuite />} />
            <Route path="/about" element={<About />} />

            {/* Keep ALL existing pages - maintain full functionality */}
            <Route path="/home" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/about/hacp" element={<HACP />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/audit-service" element={<AuditService />} />
            <Route path="/audit-dashboard" element={<AuditDashboard />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />

            {/* AI Tool Routes - Your existing components */}
            <Route path="/image-generator" element={<ImageGenerator />} />
            <Route path="/sticky-notes" element={<StickyNotes />} />
            <Route path="/email-assistant" element={<EmailAssistant />} />
            <Route path="/video-studio" element={<VideoStudio />} />
            <Route path="/code-academy" element={<CodeAcademy />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
