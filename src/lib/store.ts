
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
}

interface Analytics {
  totalViews: number;
  watchTime: number;
  subscribers: number;
  revenue: number;
  liveViewers: number;
  members: number;
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
      monetization: { adsEnabled: true, membershipRequired: false }
    }
  ];

  private liveStreams: LiveStream[] = [
    {
      id: '1',
      title: "Sunday Morning Service",
      status: 'live',
      viewers: 2300,
      streamKey: 'sk_live_123456'
    }
  ];

  private analytics: Analytics = {
    totalViews: 125400,
    watchTime: 2340,
    subscribers: 8745,
    revenue: 1234,
    liveViewers: 245,
    members: 432
  };

  private comments: Comment[] = [];
  private donations: Donation[] = [];

  // Video Management
  getVideos() {
    return this.videos;
  }

  getPublishedVideos() {
    return this.videos.filter(video => video.status === 'published');
  }

  addVideo(video: Omit<Video, 'id'>) {
    const newVideo: Video = {
      ...video,
      id: Date.now().toString(),
      views: '0',
      timeAgo: 'just now'
    };
    this.videos.unshift(newVideo);
    return newVideo;
  }

  updateVideo(id: string, updates: Partial<Video>) {
    const index = this.videos.findIndex(v => v.id === id);
    if (index !== -1) {
      this.videos[index] = { ...this.videos[index], ...updates };
    }
  }

  deleteVideo(id: string) {
    this.videos = this.videos.filter(v => v.id !== id);
  }

  // Live Stream Management
  getLiveStreams() {
    return this.liveStreams;
  }

  addLiveStream(stream: Omit<LiveStream, 'id'>) {
    const newStream: LiveStream = {
      ...stream,
      id: Date.now().toString()
    };
    this.liveStreams.push(newStream);
    return newStream;
  }

  // Analytics
  getAnalytics() {
    return this.analytics;
  }

  updateAnalytics(updates: Partial<Analytics>) {
    this.analytics = { ...this.analytics, ...updates };
  }

  // Comments
  getComments() {
    return this.comments;
  }

  addComment(comment: Omit<Comment, 'id'>) {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString()
    };
    this.comments.push(newComment);
    return newComment;
  }

  // Donations
  getDonations() {
    return this.donations;
  }

  addDonation(donation: Omit<Donation, 'id'>) {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString()
    };
    this.donations.push(newDonation);
    return newDonation;
  }
}

export const platformStore = new PlatformStore();
export type { Video, LiveStream, Analytics, Comment, Donation };
