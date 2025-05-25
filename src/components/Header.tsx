
import { useState } from 'react';
import { Search, Bell, MessageSquare, Upload, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header = ({ onSidebarToggle }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo and menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/c9f84e57-73c2-40a4-8e19-dee9964ad2da.png" 
                alt="YipYip" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for sermons, worship, bible studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Right section - Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
