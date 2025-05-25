
import { useState } from 'react';
import { Search, Bell, MessageSquare, Upload, User, Menu, Mic, Play, Calendar, BookOpen, Users, Baby, Crown, Cross } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const topNavItems = [
  { name: 'Sermons', href: '/explore?category=sermons', icon: '🎙️' },
  { name: 'Worship', href: '/explore?category=worship', icon: '🎵' },
  { name: 'Bible Study', href: '/explore?category=bible-study', icon: '📖' },
  { name: 'Live Services', href: '/live', icon: '📺' },
  { name: 'Kids', href: '/kids', icon: '👶' },
  { name: 'Movies', href: '/explore?category=movies', icon: '🎬' },
  { name: 'Podcasts', href: '/explore?category=podcasts', icon: '🎧' },
  { name: 'Devotionals', href: '/explore?category=devotionals', icon: '🙏' },
];

const Header = ({ onSidebarToggle }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-xl border-b border-gray-800 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left section - Logo */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                  src="/lovable-uploads/c9f84e57-73c2-40a4-8e19-dee9964ad2da.png" 
                  alt="YipYip" 
                  className="h-10 w-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-300 neon-glow"
                  style={{ width: 'auto', height: '40px', minWidth: '120px' }}
                />
              </Link>
            </div>

            {/* Center section - Search */}
            <div className="flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-[#FDBD34] transition-colors" />
                <Input
                  type="text"
                  placeholder="Search sermons, worship, bible studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-10 w-full bg-gray-900/50 border-gray-700 focus:bg-gray-900/80 focus:border-[#FDBD34] focus:ring-[#FDBD34] text-gray-100 placeholder-gray-400 rounded-xl glass-effect"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FDBD34] btn-modern h-6 w-6"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right section - Action buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern relative h-9 w-9"
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:flex text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern h-9 w-9"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex gradient-bg text-black border-none hover:scale-105 btn-modern font-semibold px-4 py-2 h-9"
              >
                <Upload className="h-3 w-3 mr-2" />
                Upload
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern h-9 w-9"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation Bar */}
      <nav className="sticky top-16 z-40 w-full bg-gray-950/98 backdrop-blur-xl border-b border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap btn-modern ${
                location.pathname === '/' 
                  ? 'bg-[#FDBD34] text-black' 
                  : 'text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50'
              }`}
            >
              <span className="text-base">🏠</span>
              Home
            </Link>
            {topNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap btn-modern ${
                  location.pathname === item.href || (item.href.includes('?') && location.pathname === item.href.split('?')[0])
                    ? 'bg-[#FDBD34] text-black' 
                    : 'text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <Link 
              to="/trending" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap btn-modern ${
                location.pathname === '/trending' 
                  ? 'bg-[#FDBD34] text-black' 
                  : 'text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50'
              }`}
            >
              <span className="text-base">🔥</span>
              Trending
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
