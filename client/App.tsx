import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Core Pages - Your Master Structure
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

// Components for dedicated routes
import { PartnerTech } from "./components/PartnerTech";
import { CRM } from "./components/CRM";
import { AIToolsSuite } from "./components/AIToolsSuite";

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
            <Route path="/" element={<AppleHomepage />} />
            <Route path="/home" element={<Index />} />
            <Route path="/saintgpt" element={<SaintGPT />} />
            <Route path="/search" element={<SimpleSearch />} />
            <Route path="/warroom" element={<WarRoom />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/why" element={<Why />} />
            <Route path="/help" element={<Help />} />
            <Route path="/institute" element={<Institute />} />
            <Route path="/broker" element={<Broker />} />
            <Route path="/partnertech" element={<PartnerTech />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/audit-service" element={<AuditService />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/about/hacp" element={<HACP />} />
            <Route path="/dashboard" element={<GeneralDashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/splash" element={<Splash />} />
            {/* AI Tool Routes */}
            <Route path="/image-generator" element={<ImageGenerator />} />
            <Route path="/sticky-notes" element={<StickyNotes />} />
            <Route path="/email-assistant" element={<EmailAssistant />} />
            <Route path="/video-studio" element={<VideoStudio />} />
            <Route path="/code-academy" element={<CodeAcademy />} />
            <Route path="/ai-tools-suite" element={<AIToolsSuite />} />
            <Route path="/audit-dashboard" element={<AuditDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
