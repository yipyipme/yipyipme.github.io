
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import "./App.css";

// Lazy load pages for better performance
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const ProfilePage = lazy(() => import("./components/auth/ProfilePage"));
const VideoWatchPage = lazy(() => import("./components/VideoWatchPage"));
const Explore = lazy(() => import("./pages/Explore"));
const Trending = lazy(() => import("./pages/Trending"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const History = lazy(() => import("./pages/History"));
const WatchLater = lazy(() => import("./pages/WatchLater"));
const Live = lazy(() => import("./pages/Live"));
const Kids = lazy(() => import("./pages/Kids"));
const Bible = lazy(() => import("./pages/Bible"));
const Community = lazy(() => import("./pages/Community"));
const Help = lazy(() => import("./pages/Help"));
const About = lazy(() => import("./pages/About"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CreatorStudio = lazy(() => import("./pages/CreatorStudio"));
const CreatorApplication = lazy(() => import("./pages/CreatorApplication"));

// Creator Studio pages
const Videos = lazy(() => import("./pages/creator-studio/Videos"));
const Analytics = lazy(() => import("./pages/creator-studio/Analytics"));
const Comments = lazy(() => import("./pages/creator-studio/Comments"));
const LiveStreams = lazy(() => import("./pages/creator-studio/LiveStreams"));
const Playlists = lazy(() => import("./pages/creator-studio/Playlists"));
const Posts = lazy(() => import("./pages/creator-studio/Posts"));
const Prayers = lazy(() => import("./pages/creator-studio/Prayers"));
const Memberships = lazy(() => import("./pages/creator-studio/Memberships"));
const Drafts = lazy(() => import("./pages/creator-studio/Drafts"));
const CreatorStudioSettings = lazy(() => import("./pages/creator-studio/CreatorStudioSettings"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-background font-sans antialiased">
                <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-center"><div className="h-8 w-8 animate-spin border-4 border-[#FDBD34] border-t-transparent rounded-full mx-auto mb-4"></div><p className="text-gray-400">Loading...</p></div></div>}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/apply-creator" element={<CreatorApplication />} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/watch/:id" element={<VideoWatchPage />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
                    <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
                    <Route path="/watch-later" element={<ProtectedRoute><WatchLater /></ProtectedRoute>} />
                    <Route path="/live" element={<Live />} />
                    <Route path="/kids" element={<Kids />} />
                    <Route path="/bible" element={<Bible />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                    {/* Creator Studio Routes */}
                    <Route path="/creator-studio" element={<ProtectedRoute requireRole="creator"><CreatorStudio /></ProtectedRoute>} />
                    <Route path="/creator-studio/videos" element={<ProtectedRoute requireRole="creator"><Videos /></ProtectedRoute>} />
                    <Route path="/creator-studio/analytics" element={<ProtectedRoute requireRole="creator"><Analytics /></ProtectedRoute>} />
                    <Route path="/creator-studio/comments" element={<ProtectedRoute requireRole="creator"><Comments /></ProtectedRoute>} />
                    <Route path="/creator-studio/live" element={<ProtectedRoute requireRole="creator"><LiveStreams /></ProtectedRoute>} />
                    <Route path="/creator-studio/playlists" element={<ProtectedRoute requireRole="creator"><Playlists /></ProtectedRoute>} />
                    <Route path="/creator-studio/posts" element={<ProtectedRoute requireRole="creator"><Posts /></ProtectedRoute>} />
                    <Route path="/creator-studio/prayers" element={<ProtectedRoute requireRole="creator"><Prayers /></ProtectedRoute>} />
                    <Route path="/creator-studio/memberships" element={<ProtectedRoute requireRole="creator"><Memberships /></ProtectedRoute>} />
                    <Route path="/creator-studio/drafts" element={<ProtectedRoute requireRole="creator"><Drafts /></ProtectedRoute>} />
                    <Route path="/creator-studio/settings" element={<ProtectedRoute requireRole="creator"><CreatorStudioSettings /></ProtectedRoute>} />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
