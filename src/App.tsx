
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthPage from "@/components/auth/AuthPage";
import ProfilePage from "@/components/auth/ProfilePage";
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
import Videos from "./pages/creator-studio/Videos";
import LiveStreams from "./pages/creator-studio/LiveStreams";
import Playlists from "./pages/creator-studio/Playlists";
import Drafts from "./pages/creator-studio/Drafts";
import Analytics from "./pages/creator-studio/Analytics";
import Comments from "./pages/creator-studio/Comments";
import Posts from "./pages/creator-studio/Posts";
import Prayers from "./pages/creator-studio/Prayers";
import Memberships from "./pages/creator-studio/Memberships";
import CreatorStudioSettings from "./pages/creator-studio/CreatorStudioSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/explore" element={<Explore />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/live" element={<Live />} />
              <Route path="/subscriptions" element={
                <ProtectedRoute>
                  <Subscriptions />
                </ProtectedRoute>
              } />
              <Route path="/watch-later" element={
                <ProtectedRoute>
                  <WatchLater />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
              <Route path="/community" element={<Community />} />
              <Route path="/bible" element={<Bible />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/creator-studio" element={
                <ProtectedRoute requireRole="creator">
                  <CreatorStudio />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/content/videos" element={
                <ProtectedRoute requireRole="creator">
                  <Videos />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/content/live" element={
                <ProtectedRoute requireRole="creator">
                  <LiveStreams />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/content/playlists" element={
                <ProtectedRoute requireRole="creator">
                  <Playlists />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/content/drafts" element={
                <ProtectedRoute requireRole="creator">
                  <Drafts />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/analytics/performance" element={
                <ProtectedRoute requireRole="creator">
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/analytics/audience" element={
                <ProtectedRoute requireRole="creator">
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/analytics/revenue" element={
                <ProtectedRoute requireRole="creator">
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/community/comments" element={
                <ProtectedRoute requireRole="creator">
                  <Comments />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/community/posts" element={
                <ProtectedRoute requireRole="creator">
                  <Posts />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/community/prayers" element={
                <ProtectedRoute requireRole="creator">
                  <Prayers />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/monetization/memberships" element={
                <ProtectedRoute requireRole="creator">
                  <Memberships />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/monetization/gifts" element={
                <ProtectedRoute requireRole="creator">
                  <Memberships />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/monetization/donations" element={
                <ProtectedRoute requireRole="creator">
                  <Memberships />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/monetization/ads" element={
                <ProtectedRoute requireRole="creator">
                  <Memberships />
                </ProtectedRoute>
              } />
              <Route path="/creator-studio/settings" element={
                <ProtectedRoute requireRole="creator">
                  <CreatorStudioSettings />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
