
import { useState } from 'react';
import { Search, Bell, MessageSquare, Upload, User, Menu, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header = ({ onSidebarToggle }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-gray-800 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Left section - Logo and menu */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="md:hidden text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/lovable-uploads/c9f84e57-73c2-40a4-8e19-dee9964ad2da.png" 
                alt="YipYip" 
                className="h-16 w-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-300 neon-glow"
                style={{ width: 'auto', height: '64px', minWidth: '200px' }}
              />
            </Link>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-[#FDBD34] transition-colors" />
              <Input
                type="text"
                placeholder="Search sermons, worship, bible studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-12 w-full bg-gray-900/50 border-gray-700 focus:bg-gray-900/80 focus:border-[#FDBD34] focus:ring-[#FDBD34] text-gray-100 placeholder-gray-400 rounded-xl glass-effect"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FDBD34] btn-modern"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right section - Action buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern relative"
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex gradient-bg text-black border-none hover:scale-105 btn-modern font-semibold"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
