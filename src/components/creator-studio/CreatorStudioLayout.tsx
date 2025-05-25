
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Video, 
  Radio, 
  BarChart3, 
  Users, 
  DollarSign, 
  Settings,
  Upload,
  Bell,
  Search,
  Menu,
  X,
  PlaySquare,
  Calendar,
  MessageSquare,
  Heart,
  Coins,
  CreditCard,
  UserCheck,
  BookOpen,
  LifeBuoy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CreatorStudioLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { name: 'Overview', href: '/creator-studio', icon: Home, badge: null },
  { 
    name: 'Content', 
    icon: Video, 
    badge: null,
    children: [
      { name: 'Videos', href: '/creator-studio/content/videos', icon: Video },
      { name: 'Live Streams', href: '/creator-studio/content/live', icon: Radio },
      { name: 'Playlists', href: '/creator-studio/content/playlists', icon: PlaySquare },
      { name: 'Drafts', href: '/creator-studio/content/drafts', icon: Calendar },
    ]
  },
  { 
    name: 'Analytics', 
    icon: BarChart3, 
    badge: null,
    children: [
      { name: 'Performance', href: '/creator-studio/analytics/performance', icon: BarChart3 },
      { name: 'Audience', href: '/creator-studio/analytics/audience', icon: Users },
      { name: 'Revenue', href: '/creator-studio/analytics/revenue', icon: DollarSign },
    ]
  },
  { 
    name: 'Community', 
    icon: Users, 
    badge: '12',
    children: [
      { name: 'Comments', href: '/creator-studio/community/comments', icon: MessageSquare },
      { name: 'Posts', href: '/creator-studio/community/posts', icon: BookOpen },
      { name: 'Prayer Requests', href: '/creator-studio/community/prayers', icon: Heart },
    ]
  },
  { 
    name: 'Monetization', 
    icon: DollarSign, 
    badge: null,
    children: [
      { name: 'Memberships', href: '/creator-studio/monetization/memberships', icon: UserCheck },
      { name: 'Virtual Gifts', href: '/creator-studio/monetization/gifts', icon: Coins },
      { name: 'Donations', href: '/creator-studio/monetization/donations', icon: Heart },
      { name: 'Ad Settings', href: '/creator-studio/monetization/ads', icon: CreditCard },
    ]
  },
  { name: 'Settings', href: '/creator-studio/settings', icon: Settings, badge: null },
];

const CreatorStudioLayout = ({ children }: CreatorStudioLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Content']);
  const location = useLocation();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-300 ease-out shadow-2xl",
        "md:sticky md:transform-none",
        isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0 md:w-16"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/30159a4f-685f-4d6b-a3c6-a2650c1d9bbc.png" 
                alt="YipYip" 
                className="h-8 w-auto neon-glow"
              />
              {isSidebarOpen && (
                <span className="text-white font-bold text-lg">Creator Studio</span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-[#FDBD34] btn-modern"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Quick Actions */}
          {isSidebarOpen && (
            <div className="p-4 border-b border-gray-800">
              <div className="grid grid-cols-2 gap-2">
                <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern">
                  <Radio className="h-4 w-4 mr-2" />
                  Go Live
                </Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-[#FDBD34] transition-all duration-300 btn-modern",
                        expandedItems.includes(item.name) && "text-[#FDBD34] bg-gray-800/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                      </div>
                      {item.badge && isSidebarOpen && (
                        <span className="bg-[#FDBD34] text-black text-xs px-2 py-1 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                    {expandedItems.includes(item.name) && isSidebarOpen && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-[#FDBD34] transition-all duration-300 btn-modern text-sm",
                              location.pathname === child.href && "bg-gradient-to-r from-[#FDBD34]/20 to-[#FF8A3D]/20 text-[#FDBD34] font-semibold border border-[#FDBD34]/30"
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-[#FDBD34] transition-all duration-300 btn-modern",
                      location.pathname === item.href && "bg-gradient-to-r from-[#FDBD34]/20 to-[#FF8A3D]/20 text-[#FDBD34] font-semibold border border-[#FDBD34]/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                    </div>
                    {item.badge && isSidebarOpen && (
                      <span className="bg-[#FDBD34] text-black text-xs px-2 py-1 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-[#FDBD34] transition-colors btn-modern"
            >
              <Home className="h-4 w-4" />
              {isSidebarOpen && <span className="text-sm">Back to Platform</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-400 hover:text-[#FDBD34] btn-modern md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search videos, analytics, users..."
                  className="pl-10 w-80 bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#FDBD34] btn-modern relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#FDBD34] btn-modern">
                <LifeBuoy className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default CreatorStudioLayout;
