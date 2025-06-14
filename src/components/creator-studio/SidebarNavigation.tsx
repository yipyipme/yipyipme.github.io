
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { navigationItems } from './NavigationConfig';

interface SidebarNavigationProps {
  isSidebarOpen: boolean;
}

const SidebarNavigation = ({ isSidebarOpen }: SidebarNavigationProps) => {
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
  );
};

export default SidebarNavigation;
