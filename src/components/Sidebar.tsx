
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Radio, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Baby, 
  Settings,
  X,
  TrendingUp,
  Heart,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Home', href: '/', icon: Home, badge: null },
  { name: 'Explore', href: '/explore', icon: Compass, badge: null },
  { name: 'Trending', href: '/trending', icon: TrendingUp, badge: 'Hot' },
  { name: 'Live Services', href: '/live', icon: Radio, badge: '2' },
  { name: 'My Subscriptions', href: '/subscriptions', icon: Users, badge: null },
  { name: 'Watch Later', href: '/watch-later', icon: Heart, badge: null },
  { name: 'History', href: '/history', icon: History, badge: null },
  { name: 'Community', href: '/community', icon: MessageCircle, badge: null },
  { name: 'Bible & Devotionals', href: '/bible', icon: BookOpen, badge: null },
  { name: 'Kids Corner', href: '/kids', icon: Baby, badge: null },
  { name: 'Settings', href: '/settings', icon: Settings, badge: null },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-72 bg-gray-950/95 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-500 ease-out shadow-2xl",
        "md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800 md:hidden">
            <img 
              src="/lovable-uploads/c9f84e57-73c2-40a4-8e19-dee9964ad2da.png" 
              alt="YipYip" 
              className="h-12 w-auto neon-glow"
            />
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-[#FDBD34] btn-modern">
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:text-[#FDBD34] transition-all duration-300 group btn-modern relative overflow-hidden",
                    isActive && "bg-gradient-to-r from-[#FDBD34]/20 to-[#FF8A3D]/20 text-[#FDBD34] font-semibold border border-[#FDBD34]/30"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform group-hover:scale-110",
                      isActive && "text-[#FDBD34]"
                    )} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#FDBD34] text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 space-y-4">
            <div className="text-xs text-gray-500 space-y-2">
              <div className="flex gap-4">
                <Link to="/about" className="hover:text-[#FDBD34] transition-colors">About</Link>
                <Link to="/help" className="hover:text-[#FDBD34] transition-colors">Help</Link>
              </div>
              <div className="flex gap-4">
                <Link to="/terms" className="hover:text-[#FDBD34] transition-colors">Terms</Link>
                <Link to="/privacy" className="hover:text-[#FDBD34] transition-colors">Privacy</Link>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              © 2024 YipYip. All rights reserved.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
