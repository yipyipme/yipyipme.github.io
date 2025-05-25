
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Index";
import Explore from "./pages/Explore";
import Live from "./pages/Live";
import Community from "./pages/Community";
import Trending from "./pages/Trending";
import Subscriptions from "./pages/Subscriptions";
import WatchLater from "./pages/WatchLater";
import History from "./pages/History";
import Bible from "./pages/Bible";
import Kids from "./pages/Kids";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CreatorStudio from "./pages/CreatorStudio";
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
          <Route path="/trending" element={<Trending />} />
          <Route path="/live" element={<Live />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/history" element={<History />} />
          <Route path="/community" element={<Community />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/creator-studio/*" element={<CreatorStudio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
