
import { 
  Home, 
  Video, 
  Radio, 
  BarChart3, 
  Users, 
  DollarSign, 
  Settings,
  PlaySquare,
  Calendar,
  MessageSquare,
  Heart,
  Coins,
  CreditCard,
  UserCheck,
  BookOpen
} from 'lucide-react';

export const navigationItems = [
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
