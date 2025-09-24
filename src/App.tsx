import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tracking from "./pages/Tracking";
import CollisionDetection from "./pages/CollisionDetection";
import Scheduling from "./pages/Scheduling";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Assistant from "./pages/Assistant";
import Settings from "./pages/Settings";
import AllRoutes from "./pages/AllRoutes";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/collision-detection" element={<CollisionDetection />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/all-routes" element={<AllRoutes />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
