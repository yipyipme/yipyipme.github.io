
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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'Live Services', href: '/live', icon: Radio },
  { name: 'My Subscriptions', href: '/subscriptions', icon: Users },
  { name: 'Community', href: '/community', icon: MessageCircle },
  { name: 'Bible & Devotionals', href: '/bible', icon: BookOpen },
  { name: 'Kids Corner', href: '/kids', icon: Baby },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r transform transition-transform duration-300 ease-in-out",
        "md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <img 
              src="/lovable-uploads/c9f84e57-73c2-40a4-8e19-dee9964ad2da.png" 
              alt="YipYip" 
              className="h-8 w-auto"
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors",
                        isActive && "bg-orange-100 text-orange-600 font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex gap-2">
                <Link to="/about" className="hover:text-orange-600">About</Link>
                <Link to="/help" className="hover:text-orange-600">Help</Link>
              </div>
              <div className="flex gap-2">
                <Link to="/terms" className="hover:text-orange-600">Terms</Link>
                <Link to="/privacy" className="hover:text-orange-600">Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
