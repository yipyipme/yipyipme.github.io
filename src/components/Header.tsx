
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import ThemeToggle from './ThemeToggle';
import UserMenu from './auth/UserMenu';
import YipYipLogo from './brand/YipYipLogo';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const location = useLocation();

  const isCreatorStudio = location.pathname.startsWith('/creator-studio');

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <YipYipLogo 
              size="md"
              variant="gradient"
              className="text-white hover:text-[#FDBD34] transition-colors cursor-pointer"
              onClick={() => window.location.href = '/'}
            />
          </div>

          {/* Center - Search (hidden on creator studio) */}
          {!isCreatorStudio && (
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search videos, creators, and more..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#FDBD34] focus:ring-[#FDBD34] rounded-full"
                />
              </div>
            </div>
          )}

          {/* Right side - Search (mobile), Theme toggle, User menu */}
          <div className="flex items-center gap-2">
            {/* Mobile search button */}
            {!isCreatorStudio && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 md:hidden"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                {isSearchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
            )}
            
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>

        {/* Mobile search bar */}
        {!isCreatorStudio && isSearchExpanded && (
          <div className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search videos, creators, and more..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#FDBD34] focus:ring-[#FDBD34] rounded-full"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
