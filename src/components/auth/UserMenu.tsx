
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, LogOut, Crown, Star, Video } from 'lucide-react';

const UserMenu = () => {
  const { user, profile, signOut } = useAuth();

  if (!user || !profile) {
    return (
      <Button
        onClick={() => window.location.href = '/auth'}
        className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern"
      >
        Sign In
      </Button>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'creator':
        return <Star className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
            <AvatarFallback className="bg-gray-700 text-white">
              {profile.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-white">
              {profile.full_name || 'Anonymous User'}
            </p>
            <p className="w-[200px] truncate text-sm text-gray-400">
              {user.email}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              {getRoleIcon(profile.role)}
              <span className="capitalize">{profile.role}</span>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={() => window.location.href = '/profile'}
          className="text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        {(profile.role === 'creator' || profile.role === 'admin') && (
          <DropdownMenuItem 
            onClick={() => window.location.href = '/creator-studio'}
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <Video className="mr-2 h-4 w-4" />
            Creator Studio
          </DropdownMenuItem>
        )}
        {profile.role === 'user' && (
          <DropdownMenuItem 
            onClick={() => window.location.href = '/apply-creator'}
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <Star className="mr-2 h-4 w-4" />
            Apply to Become Creator
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={() => window.location.href = '/settings'}
          className="text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={signOut}
          className="text-red-400 hover:text-red-300 hover:bg-gray-800"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
