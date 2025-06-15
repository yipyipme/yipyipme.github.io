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
      },
      {
        id: "3",
        title: "Youth Night Live - Christian Concert",
        thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "1:05:00",
        views: 18700,
        timeAgo: "5 hours ago",
        channel: "Awaken Youth",
        verified: false,
        status: "published",
        category: "Worship & Music",
        description: "Experience an explosive night of music and testimony from our church youth band and guests."
      },
      {
        id: "4",
        title: "Children’s Bible Stories - Jonah & The Whale",
        thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "7:50",
        views: 2300,
        timeAgo: "3 days ago",
        channel: "Kids for Christ TV",
        verified: false,
        status: "published",
        category: "Children",
        description: "Animated read-aloud: the exciting story of Jonah and God’s mercy for all children to enjoy."
      },
      {
        id: "5",
        title: "How to Pray for Healing - Practical Guide",
        thumbnail: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "21:23",
        views: 5590,
        timeAgo: "4 hours ago",
        channel: "The Prayer Room",
        verified: true,
        status: "published",
        category: "Prayer & Meditation",
        description: "Step-by-step guide on biblical principles and testimonies of effective prayer for healing."
      },
      {
        id: "6",
        title: "Sunday Sermon: Courage in Difficult Times",
        thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "52:50",
        views: 14200,
        timeAgo: "6 hours ago",
        channel: "New Hope Church",
        verified: true,
        status: "published",
        category: "Sermons",
        description: "Pastor Lee shares practical wisdom from the life of Daniel for standing firm in adversity."
      },
      {
        id: "7",
        title: "The Meaning of Baptism Explained",
        thumbnail: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "14:05",
        views: 3800,
        timeAgo: "2 days ago",
        channel: "Discipleship 101",
        verified: false,
        status: "published",
        category: "Christian Living",
        description: "Discover why Christians get baptized, with real-life testimonies and clear teaching."
      },
      {
        id: "8",
        title: "Christian Apologetics: Who is Jesus?",
        thumbnail: "https://images.unsplash.com/photo-1465101178521-c1a9136a2737?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "33:12",
        views: 7200,
        timeAgo: "7 hours ago",
        channel: "Faith Foundations",
        verified: true,
        status: "published",
        category: "Apologetics",
        description: "A pastor answers the tough questions about the identity, claims, and divinity of Jesus Christ."
      },
      {
        id: "9",
        title: "Late Night Live: Q&A on Romans",
        thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "47:18",
        views: 3100,
        timeAgo: "12 hours ago",
        channel: "Late Night Faith",
        verified: false,
        status: "published",
        category: "Bible Study",
        description: "Panel of experts discuss your toughest Bible questions with an interactive chat."
      },
      {
        id: "10",
        title: "Prayer & Worship LIVE (Replay)",
        thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "1:15:00",
        views: 20500,
        timeAgo: "1 hour ago",
        channel: "Global Prayer Network",
        verified: true,
        status: "published",
        category: "Worship & Music",
        description: "Be part of our worldwide prayer event featuring international worship leaders and live prayers."
      },
      {
        id: "11",
        title: "The Armor of God - Ephesians 6 Explained",
        thumbnail: "https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "28:44",
        views: 9400,
        timeAgo: "18 hours ago",
        channel: "Truth Seekers",
        verified: false,
        status: "published",
        category: "Teaching",
        description: "A creative teaching for all ages: how to stand strong in God’s armor against temptation."
      },
      {
        id: "12",
        title: "Testimony: From Addiction to Freedom",
        thumbnail: "https://images.unsplash.com/photo-1516815231264-098b160a5bbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "18:09",
        views: 12100,
        timeAgo: "3 days ago",
        channel: "Real Stories",
        verified: false,
        status: "published",
        category: "Testimonies",
        description: "A moving personal testimony of transformation by the grace and hope found in Jesus."
      },
      {
        id: "13",
        title: "Kids Worship: Praise Party!",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "11:12",
        views: 670,
        timeAgo: "2 hours ago",
        channel: "Little Lights",
        verified: false,
        status: "published",
        category: "Children",
        description: "Dance along with energetic praise songs and fun movement for children aged 4-10."
      },
      {
        id: "14",
        title: "Missionary Stories: Light in the Darkness",
        thumbnail: "https://images.unsplash.com/photo-1480360211450-1c1c1c1da6c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "24:56",
        views: 2780,
        timeAgo: "1 day ago",
        channel: "Mission Impact",
        verified: true,
        status: "published",
        category: "Missionary Stories",
        description: "Be inspired by real accounts of missionaries risking all to bring the gospel to unreached places."
      },
      {
        id: "15",
        title: "Why Forgiveness Matters - Daily Devotional",
        thumbnail: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "6:31",
        views: 4530,
        timeAgo: "6 hours ago",
        channel: "Morning Devos",
        verified: false,
        status: "published",
        category: "Christian Living",
        description: "Short, encouraging thought: why forgiveness is at the heart of faith, and how to start."
      },
      {
        id: "16",
        title: "Gospel Music Night - Contemporary Worship",
        thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "57:13",
        views: 16600,
        timeAgo: "4 hours ago",
        channel: "City Church Music",
        verified: true,
        status: "published",
        category: "Worship & Music",
        description: "A celebration of modern and traditional gospel music performed live with the full band."
      },
      {
        id: "17",
        title: "Bible Project: The Psalms in Context",
        thumbnail: "https://images.unsplash.com/photo-1534081333815-ae5019106622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "19:45",
        views: 3010,
        timeAgo: "10 hours ago",
        channel: "Bible Project",
        verified: true,
        status: "published",
        category: "Bible Study",
        description: "A creative and visual journey through the Book of Psalms and its meaning for today."
      },
      {
        id: "18",
        title: "How to Start Reading the Bible",
        thumbnail: "https://images.unsplash.com/photo-1465101178521-c1a9136a2737?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "15:12",
        views: 4820,
        timeAgo: "2 days ago",
        channel: "Faith Foundations",
        verified: true,
        status: "published",
        category: "Teaching",
        description: "New to faith? Here’s how to choose a translation, set a reading plan, and get started!"
      },
      {
        id: "19",
        title: "Christian Apologetics: The Resurrection Evidence",
        thumbnail: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "38:29",
        views: 8780,
        timeAgo: "7 hours ago",
        channel: "Reason & Faith",
        verified: true,
        status: "published",
        category: "Apologetics",
        description: "Explore the most compelling historical and logical reasons to believe in the resurrection of Jesus."
      },
      {
        id: "20",
        title: "Family Night: VeggieTales Bible Quiz",
        thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "12:34",
        views: 930,
        timeAgo: "3 hours ago",
        channel: "Veggie Tales Fun",
        verified: false,
        status: "published",
        category: "Children",
        description: "Enjoy a fun, fast-paced trivia quiz on Bible stories and verses, perfect for the whole family."
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
