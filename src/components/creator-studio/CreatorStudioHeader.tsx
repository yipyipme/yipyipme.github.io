
import { useState } from 'react';
import { Search, Bell, Upload, Radio, User, HelpCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CreatorStudioHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-xl border-b border-gray-800 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo & Branding */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/lovable-uploads/30159a4f-685f-4d6b-a3c6-a2650c1d9bbc.png" 
                alt="YipYip" 
                className="h-8 w-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-300 neon-glow"
                style={{ width: 'auto', height: '32px', minWidth: '80px' }}
              />
            </Link>
            <div className="text-gray-400 text-sm">Creator Studio</div>
          </div>

          {/* Center section - Search */}
          <div className="flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-[#FDBD34] transition-colors" />
              <Input
                type="text"
                placeholder="Search videos, analytics, comments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-10 w-full bg-gray-900/50 border-gray-700 focus:bg-gray-900/80 focus:border-[#FDBD34] focus:ring-[#FDBD34] text-gray-100 placeholder-gray-400 rounded-xl glass-effect"
              />
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-[#FDBD34] text-black border-none hover:bg-[#FDBD34]/80 btn-modern font-semibold px-4 py-2 h-9"
            >
              <Upload className="h-3 w-3 mr-2" />
              Upload
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern px-4 py-2 h-9"
            >
              <Radio className="h-3 w-3 mr-2" />
              Go Live
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern h-9 w-9 relative"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-300 hover:text-[#FDBD34] hover:bg-gray-800/50 btn-modern h-9 w-9"
            >
              <HelpCircle className="h-4 w-4" />
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
  );
};

export default CreatorStudioHeader;
