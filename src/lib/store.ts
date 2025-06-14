
import { VideoService } from './services/videoService';
import { StreamService } from './services/streamService';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  timeAgo: string;
  channel: string;
  verified: boolean;
  status: 'published' | 'draft' | 'scheduled';
  category: string;
  description: string;
}

export interface LiveStream {
  id: string;
  title: string;
  creator: string;
  viewers: number;
  thumbnail: string;
  category: string;
  status: 'live' | 'scheduled' | 'ended';
  scheduledTime?: Date;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  videoId: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  type: string;
  timestamp: Date;
  likes: number;
  comments: number;
}

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  memberCount: number;
  perks: string[];
}

export interface Analytics {
  totalViews: number;
  watchTime: number;
  subscribers: number;
  revenue: number;
}

class PlatformStore {
  private videos: Video[] = [
    {
      id: "1",
      title: "Sunday Morning Worship - Power of Prayer",
      thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "45:30",
      views: 12500,
      timeAgo: "2 hours ago",
      channel: "Grace Community Church",
      verified: true,
      status: "published",
      category: "Worship",
      description: "Join us for an inspiring Sunday morning service focusing on the transformative power of prayer."
    },
    {
      id: "2",
      title: "Bible Study: The Book of Romans",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "30:15",
      views: 8900,
      timeAgo: "1 day ago",
      channel: "Faithful Scholars",
      verified: true,
      status: "published",
      category: "Bible Study",
      description: "Delve into the profound teachings of the Apostle Paul in our in-depth study of the Book of Romans."
    }
  ];

  private liveStreams: LiveStream[] = [
    {
      id: "1",
      title: "Live: Evening Prayer Service",
      creator: "Pastor Johnson",
      viewers: 245,
      thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Prayer",
      status: "live"
    },
    {
      id: "2",
      title: "Live: Sunday Morning Sermon",
      creator: "Reverend Sarah",
      viewers: 567,
      thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Sermon",
      status: "live"
    }
  ];

  private comments: Comment[] = [
    {
      id: "1",
      author: "John Smith",
      content: "Amazing service! Thank you for sharing God's word.",
      timestamp: new Date(),
      videoId: "1",
      status: "approved"
    },
    {
      id: "2",
      author: "Mary Johnson",
      content: "This really spoke to my heart today.",
      timestamp: new Date(),
      videoId: "1",
      status: "pending"
    }
  ];

  private communityPosts: CommunityPost[] = [
    {
      id: "1",
      title: "Prayer Request for Healing",
      content: "Please pray for our community member who is recovering from surgery.",
      type: "Prayer Request",
      timestamp: new Date(),
      likes: 24,
      comments: 8
    },
    {
      id: "2",
      title: "Upcoming Youth Event",
      content: "Join us this Saturday for our youth fellowship event!",
      type: "Announcement",
      timestamp: new Date(),
      likes: 15,
      comments: 5
    }
  ];

  private membershipTiers: MembershipTier[] = [
    {
      id: "1",
      name: "Supporter",
      price: 4.99,
      memberCount: 125,
      perks: ["Early access to content", "Member-only chat", "Monthly newsletter"]
    },
    {
      id: "2",
      name: "Partner",
      price: 9.99,
      memberCount: 87,
      perks: ["All Supporter perks", "Exclusive live sessions", "Prayer request priority", "Digital resources"]
    },
    {
      id: "3",
      name: "Elder",
      price: 19.99,
      memberCount: 43,
      perks: ["All Partner perks", "1-on-1 prayer sessions", "Early sermon access", "Ministry insights"]
    }
  ];

  private analytics: Analytics = {
    totalViews: 125000,
    watchTime: 2500,
    subscribers: 8500,
    revenue: 12750
  };

  // Legacy methods for compatibility with existing components
  getVideos(): Video[] {
    return this.videos;
  }

  getPublishedVideos(): Video[] {
    return this.videos.filter(video => video.status === 'published');
  }

  getLiveStreams(): LiveStream[] {
    return this.liveStreams;
  }

  getComments(): Comment[] {
    return this.comments;
  }

  getCommunityPosts(): CommunityPost[] {
    return this.communityPosts;
  }

  getMembershipTiers(): MembershipTier[] {
    return this.membershipTiers;
  }

  getAnalytics(): Analytics {
    return this.analytics;
  }

  deleteVideo(id: string): void {
    this.videos = this.videos.filter(video => video.id !== id);
  }

  // New methods to sync with database
  async loadPublishedVideos(): Promise<Video[]> {
    try {
      const dbVideos = await VideoService.getPublishedVideos();
      // Convert database format to legacy format for compatibility
      this.videos = dbVideos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail_url || 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        duration: this.formatDuration(video.duration || 0),
        views: 0, // Will be populated from analytics
        timeAgo: this.formatTimeAgo(video.created_at),
        channel: 'Creator Channel', // Will be populated from creator profile
        verified: true,
        status: video.status as 'published' | 'draft' | 'scheduled',
        category: video.category || 'General',
        description: video.description || ''
      }));
      return this.videos;
    } catch (error) {
      console.error('Error loading published videos:', error);
      return this.getFallbackVideos();
    }
  }

  async loadLiveStreams(): Promise<LiveStream[]> {
    try {
      const dbStreams = await StreamService.getLiveStreams();
      this.liveStreams = dbStreams.map(stream => ({
        id: stream.id,
        title: stream.title,
        creator: 'Creator Name', // Will be populated from creator profile
        viewers: stream.current_viewers || 0,
        thumbnail: stream.thumbnail_url || 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: stream.category || 'General',
        status: stream.status as 'live' | 'scheduled' | 'ended',
        scheduledTime: stream.scheduled_start ? new Date(stream.scheduled_start) : undefined
      }));
      return this.liveStreams;
    } catch (error) {
      console.error('Error loading live streams:', error);
      return this.getFallbackStreams();
    }
  }

  private formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} weeks ago`;
  }

  // Fallback data for when database is not available
  private getFallbackVideos(): Video[] {
    return [
      {
        id: "1",
        title: "Sunday Morning Worship - Power of Prayer",
        thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "45:30",
        views: 12500,
        timeAgo: "2 hours ago",
        channel: "Grace Community Church",
        verified: true,
        status: "published",
        category: "Worship",
        description: "Join us for an inspiring Sunday morning service focusing on the transformative power of prayer."
      },
      {
        id: "2",
        title: "Bible Study: The Book of Romans",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "30:15",
        views: 8900,
        timeAgo: "1 day ago",
        channel: "Faithful Scholars",
        verified: true,
        status: "published",
        category: "Bible Study",
        description: "Delve into the profound teachings of the Apostle Paul in our in-depth study of the Book of Romans."
      }
    ];
  }

  private getFallbackStreams(): LiveStream[] {
    return [
      {
        id: "1",
        title: "Live: Evening Prayer Service",
        creator: "Pastor Johnson",
        viewers: 245,
        thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Prayer",
        status: "live"
      },
      {
        id: "2",
        title: "Live: Sunday Morning Sermon",
        creator: "Reverend Sarah",
        viewers: 567,
        thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Sermon",
        status: "live"
      }
    ];
  }
}

export const platformStore = new PlatformStore();
