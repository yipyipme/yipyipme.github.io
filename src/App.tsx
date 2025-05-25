
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Index";
import Explore from "./pages/Explore";
import Live from "./pages/Live";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/live" element={<Live />} />
          <Route path="/community" element={<Community />} />
          {/* Placeholder routes for other sections */}
          <Route path="/subscriptions" element={<div>Subscriptions - Coming Soon</div>} />
          <Route path="/bible" element={<div>Bible & Devotionals - Coming Soon</div>} />
          <Route path="/kids" element={<div>Kids Corner - Coming Soon</div>} />
          <Route path="/settings" element={<div>Settings - Coming Soon</div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
