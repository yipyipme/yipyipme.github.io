
interface Video {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  duration: string;
  views: string;
  timeAgo: string;
  videoUrl: string;
  description?: string;
  tags?: string[];
  status: 'published' | 'draft' | 'scheduled';
  publishDate?: Date;
  category?: string;
  monetization?: {
    adsEnabled: boolean;
    membershipRequired: boolean;
  };
}

interface LiveStream {
  id: string;
  title: string;
  status: 'live' | 'scheduled' | 'ended';
  viewers: number;
  scheduledTime?: Date;
  streamKey?: string;
  description?: string;
  thumbnail?: string;
}

interface Analytics {
  totalViews: number;
  watchTime: number;
  subscribers: number;
  revenue: number;
  liveViewers: number;
  members: number;
  engagement: number;
  retention: number;
}

interface Comment {
  id: string;
  videoId: string;
  author: string;
  content: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'hidden';
}

interface Donation {
  id: string;
  amount: number;
  donor: string;
  message?: string;
  timestamp: Date;
}

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: number;
  type: 'text' | 'image' | 'poll' | 'devotional';
}

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  perks: string[];
  memberCount: number;
}

class PlatformStore {
  private videos: Video[] = [
    {
      id: '1',
      title: "Sunday Service: Walking by Faith",
      creator: "Pastor Mike Johnson",
      thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "45:20",
      views: "125K",
      timeAgo: "2 days ago",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      status: 'published',
      category: 'sermons',
      description: "Join us for an inspiring message about walking by faith, not by sight.",
      tags: ['faith', 'sermon', 'sunday-service'],
      monetization: { adsEnabled: true, membershipRequired: false }
    },
    {
      id: '2',
      title: "Worship Night: Amazing Grace",
      creator: "Hillsong Worship",
      thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "1:23:15",
      views: "89K",
      timeAgo: "1 week ago",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      status: 'published',
      category: 'worship',
      description: "An evening of powerful worship and praise.",
      tags: ['worship', 'music', 'praise'],
      monetization: { adsEnabled: true, membershipRequired: false }
    },
    {
      id: '3',
      title: "Bible Study: Romans Chapter 8",
      creator: "Dr. Sarah Williams",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "52:10",
      views: "34K",
      timeAgo: "3 days ago",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      status: 'published',
      category: 'bible-study',
      description: "Deep dive into Romans 8 and the life in the Spirit.",
      tags: ['bible-study', 'romans', 'scripture'],
      monetization: { adsEnabled: false, membershipRequired: true }
    }
  ];

  private liveStreams: LiveStream[] = [
    {
      id: '1',
      title: "Sunday Morning Service",
      status: 'live',
      viewers: 2300,
      streamKey: 'sk_live_123456',
      description: "Join us for our weekly Sunday service",
      thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: '2',
      title: "Evening Prayer Meeting",
      status: 'scheduled',
      viewers: 0,
      scheduledTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      streamKey: 'sk_scheduled_789',
      description: "Weekly prayer meeting",
      thumbnail: "https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  private analytics: Analytics = {
    totalViews: 125400,
    watchTime: 2340,
    subscribers: 8745,
    revenue: 1234,
    liveViewers: 245,
    members: 432,
    engagement: 87.5,
    retention: 65.2
  };

  private comments: Comment[] = [
    {
      id: '1',
      videoId: '1',
      author: 'John Smith',
      content: 'Amazing message! This really spoke to my heart.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'approved'
    },
    {
      id: '2',
      videoId: '1',
      author: 'Mary Johnson',
      content: 'Thank you for this powerful sermon.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'pending'
    }
  ];

  private donations: Donation[] = [
    {
      id: '1',
      amount: 50,
      donor: 'Anonymous',
      message: 'God bless this ministry',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    }
  ];

  private communityPosts: CommunityPost[] = [
    {
      id: '1',
      title: 'Weekly Prayer Request',
      content: 'Please pray for our community outreach program this weekend.',
      author: 'Pastor Mike',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      likes: 45,
      comments: 12,
      type: 'text'
    }
  ];

  private membershipTiers: MembershipTier[] = [
    {
      id: '1',
      name: 'Supporter',
      price: 4.99,
      perks: ['Ad-free viewing', 'Early access to content'],
      memberCount: 156
    },
    {
      id: '2',
      name: 'Partner',
      price: 9.99,
      perks: ['All Supporter benefits', 'Exclusive Bible studies', 'Prayer request priority'],
      memberCount: 89
    },
    {
      id: '3',
      name: 'Elder',
      price: 19.99,
      perks: ['All Partner benefits', 'Monthly video call with pastor', 'Ministry updates'],
      memberCount: 34
    }
  ];

  // Video Management
  getVideos() {
    return [...this.videos];
  }

  getPublishedVideos() {
    return this.videos.filter(video => video.status === 'published');
  }

  getVideoById(id: string) {
    return this.videos.find(video => video.id === id);
  }

  addVideo(video: Omit<Video, 'id'>) {
    const newVideo: Video = {
      ...video,
      id: Date.now().toString(),
      views: '0',
      timeAgo: 'just now'
    };
    this.videos.unshift(newVideo);
    this.updateAnalytics({ totalViews: this.analytics.totalViews + 1 });
    return newVideo;
  }

  updateVideo(id: string, updates: Partial<Video>) {
    const index = this.videos.findIndex(v => v.id === id);
    if (index !== -1) {
      this.videos[index] = { ...this.videos[index], ...updates };
      return this.videos[index];
    }
    return null;
  }

  deleteVideo(id: string) {
    this.videos = this.videos.filter(v => v.id !== id);
  }

  // Live Stream Management
  getLiveStreams() {
    return [...this.liveStreams];
  }

  addLiveStream(stream: Omit<LiveStream, 'id'>) {
    const newStream: LiveStream = {
      ...stream,
      id: Date.now().toString()
    };
    this.liveStreams.push(newStream);
    return newStream;
  }

  updateLiveStream(id: string, updates: Partial<LiveStream>) {
    const index = this.liveStreams.findIndex(s => s.id === id);
    if (index !== -1) {
      this.liveStreams[index] = { ...this.liveStreams[index], ...updates };
      return this.liveStreams[index];
    }
    return null;
  }

  // Analytics
  getAnalytics() {
    return { ...this.analytics };
  }

  updateAnalytics(updates: Partial<Analytics>) {
    this.analytics = { ...this.analytics, ...updates };
  }

  // Comments
  getComments(videoId?: string) {
    if (videoId) {
      return this.comments.filter(comment => comment.videoId === videoId);
    }
    return [...this.comments];
  }

  addComment(comment: Omit<Comment, 'id'>) {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString()
    };
    this.comments.push(newComment);
    return newComment;
  }

  updateComment(id: string, updates: Partial<Comment>) {
    const index = this.comments.findIndex(c => c.id === id);
    if (index !== -1) {
      this.comments[index] = { ...this.comments[index], ...updates };
      return this.comments[index];
    }
    return null;
  }

  // Donations
  getDonations() {
    return [...this.donations];
  }

  addDonation(donation: Omit<Donation, 'id'>) {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString()
    };
    this.donations.push(newDonation);
    this.updateAnalytics({ revenue: this.analytics.revenue + donation.amount });
    return newDonation;
  }

  // Community Posts
  getCommunityPosts() {
    return [...this.communityPosts];
  }

  addCommunityPost(post: Omit<CommunityPost, 'id'>) {
    const newPost: CommunityPost = {
      ...post,
      id: Date.now().toString()
    };
    this.communityPosts.unshift(newPost);
    return newPost;
  }

  // Membership Tiers
  getMembershipTiers() {
    return [...this.membershipTiers];
  }

  addMembershipTier(tier: Omit<MembershipTier, 'id'>) {
    const newTier: MembershipTier = {
      ...tier,
      id: Date.now().toString()
    };
    this.membershipTiers.push(newTier);
    return newTier;
  }

  updateMembershipTier(id: string, updates: Partial<MembershipTier>) {
    const index = this.membershipTiers.findIndex(t => t.id === id);
    if (index !== -1) {
      this.membershipTiers[index] = { ...this.membershipTiers[index], ...updates };
      return this.membershipTiers[index];
    }
    return null;
  }

  // Search functionality
  searchContent(query: string) {
    const lowerQuery = query.toLowerCase();
    
    const videos = this.videos.filter(video => 
      video.title.toLowerCase().includes(lowerQuery) ||
      video.creator.toLowerCase().includes(lowerQuery) ||
      video.description?.toLowerCase().includes(lowerQuery) ||
      video.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );

    const streams = this.liveStreams.filter(stream =>
      stream.title.toLowerCase().includes(lowerQuery) ||
      stream.description?.toLowerCase().includes(lowerQuery)
    );

    const posts = this.communityPosts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
    );

    return { videos, streams, posts };
  }
}

export const platformStore = new PlatformStore();
export type { Video, LiveStream, Analytics, Comment, Donation, CommunityPost, MembershipTier };
