import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 18 CORE PAGES - Master Structure Only
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

// CORE COMPONENTS - Consolidated
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
            {/* 18 CORE PAGES ONLY - Perfect Master Structure */}
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

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
if (!container._reactRootContainer) {
  createRoot(container).render(<App />);
}
