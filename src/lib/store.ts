import { Video } from "@/components/VideoCard";
import { LiveStream } from "@/components/LiveStreamCard";

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
    },
    {
      id: "3",
      title: "Live Q&A with Pastor Emily - Faith and Modern Challenges",
      thumbnail: "https://images.unsplash.com/photo-1556075798-4825df14b14c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "1:15:00",
      views: 15600,
      timeAgo: "3 days ago",
      channel: "Community of Believers",
      verified: false,
	  status: "published",
      category: "Q&A",
      description: "Join Pastor Emily as she answers your questions about navigating faith in today's complex world."
    },
    {
      id: "4",
      title: "Acoustic Worship Session - Heartfelt Praise",
      thumbnail: "https://images.unsplash.com/photo-1503614472-8c8317004461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "22:45",
      views: 6700,
      timeAgo: "1 week ago",
      channel: "Worship Central",
      verified: true,
	  status: "published",
      category: "Worship",
      description: "Experience a time of intimate worship with our acoustic session featuring heartfelt praise and adoration."
    },
    {
      id: "5",
      title: "Testimony Time - From Struggle to Strength",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "18:20",
      views: 4200,
      timeAgo: "2 weeks ago",
      channel: "Stories of Hope",
      verified: false,
	  status: "published",
      category: "Testimonies",
      description: "Be inspired by real-life stories of individuals who have overcome challenges through faith and resilience."
    },
    {
      id: "6",
      title: "Youth Group Fun - Games and Fellowship",
      thumbnail: "https://images.unsplash.com/photo-1543076659-7b7869e20134?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "35:50",
      views: 3100,
      timeAgo: "3 weeks ago",
      channel: "Youth Arise",
      verified: true,
	  status: "published",
      category: "Youth",
      description: "Join our youth group for a time of fun, games, and meaningful fellowship with friends."
    },
    {
      id: "7",
      title: "Kids' Church - Learning About Love",
      thumbnail: "https://images.unsplash.com/photo-1547394765-185e51e1dcad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "25:00",
      views: 2800,
      timeAgo: "1 month ago",
      channel: "Little Lights",
      verified: true,
	  status: "published",
      category: "Kids",
      description: "Engage your children with our interactive Kids' Church program, teaching them about love and kindness."
    },
    {
      id: "8",
      title: "Gospel Music Night - Uplifting Melodies",
      thumbnail: "https://images.unsplash.com/photo-1510915228340-29c85a3a66ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "50:20",
      views: 9400,
      timeAgo: "6 months ago",
      channel: "Harmony Voices",
      verified: true,
	  status: "published",
      category: "Music",
      description: "Enjoy an evening filled with uplifting gospel music, celebrating faith through song."
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
    },
    {
      id: "3",
      title: "Scheduled: Bible Study Group",
      creator: "Elder Thomas",
      viewers: 0,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Bible Study",
      status: "scheduled",
	  scheduledTime: new Date()
    }
  ];

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
        title: "Live Q&A with Pastor Emily - Faith and Modern Challenges",
        thumbnail: "https://images.unsplash.com/photo-1556075798-4825df14b14c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "1:15:00",
        views: 15600,
        timeAgo: "3 days ago",
        channel: "Community of Believers",
        verified: false,
		status: "published",
        category: "Q&A",
        description: "Join Pastor Emily as she answers your questions about navigating faith in today's complex world."
      },
      {
        id: "4",
        title: "Acoustic Worship Session - Heartfelt Praise",
        thumbnail: "https://images.unsplash.com/photo-1503614472-8c8317004461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "22:45",
        views: 6700,
        timeAgo: "1 week ago",
        channel: "Worship Central",
        verified: true,
		status: "published",
        category: "Worship",
        description: "Experience a time of intimate worship with our acoustic session featuring heartfelt praise and adoration."
      },
      {
        id: "5",
        title: "Testimony Time - From Struggle to Strength",
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "18:20",
        views: 4200,
        timeAgo: "2 weeks ago",
        channel: "Stories of Hope",
        verified: false,
		status: "published",
        category: "Testimonies",
        description: "Be inspired by real-life stories of individuals who have overcome challenges through faith and resilience."
      },
      {
        id: "6",
        title: "Youth Group Fun - Games and Fellowship",
        thumbnail: "https://images.unsplash.com/photo-1543076659-7b7869e20134?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "35:50",
        views: 3100,
        timeAgo: "3 weeks ago",
        channel: "Youth Arise",
        verified: true,
		status: "published",
        category: "Youth",
        description: "Join our youth group for a time of fun, games, and meaningful fellowship with friends."
      },
      {
        id: "7",
        title: "Kids' Church - Learning About Love",
        thumbnail: "https://images.unsplash.com/photo-1547394765-185e51e1dcad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "25:00",
        views: 2800,
        timeAgo: "1 month ago",
        channel: "Little Lights",
        verified: true,
		status: "published",
        category: "Kids",
        description: "Engage your children with our interactive Kids' Church program, teaching them about love and kindness."
      },
      {
        id: "8",
        title: "Gospel Music Night - Uplifting Melodies",
        thumbnail: "https://images.unsplash.com/photo-1510915228340-29c85a3a66ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "50:20",
        views: 9400,
        timeAgo: "6 months ago",
        channel: "Harmony Voices",
        verified: true,
		status: "published",
        category: "Music",
        description: "Enjoy an evening filled with uplifting gospel music, celebrating faith through song."
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
      },
      {
        id: "3",
        title: "Scheduled: Bible Study Group",
        creator: "Elder Thomas",
        viewers: 0,
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Bible Study",
        status: "scheduled",
		scheduledTime: new Date()
      }
    ];
  }
}

import { VideoService } from './services/videoService';
import { StreamService } from './services/streamService';

class PlatformStore {
  private videos: Video[] = [];
  private liveStreams: LiveStream[] = [];

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
        title: "Live Q&A with Pastor Emily - Faith and Modern Challenges",
        thumbnail: "https://images.unsplash.com/photo-1556075798-4825df14b14c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "1:15:00",
        views: 15600,
        timeAgo: "3 days ago",
        channel: "Community of Believers",
        verified: false,
		status: "published",
        category: "Q&A",
        description: "Join Pastor Emily as she answers your questions about navigating faith in today's complex world."
      },
      {
        id: "4",
        title: "Acoustic Worship Session - Heartfelt Praise",
        thumbnail: "https://images.unsplash.com/photo-1503614472-8c8317004461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "22:45",
        views: 6700,
        timeAgo: "1 week ago",
        channel: "Worship Central",
        verified: true,
		status: "published",
        category: "Worship",
        description: "Experience a time of intimate worship with our acoustic session featuring heartfelt praise and adoration."
      },
      {
        id: "5",
        title: "Testimony Time - From Struggle to Strength",
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "18:20",
        views: 4200,
        timeAgo: "2 weeks ago",
        channel: "Stories of Hope",
        verified: false,
		status: "published",
        category: "Testimonies",
        description: "Be inspired by real-life stories of individuals who have overcome challenges through faith and resilience."
      },
      {
        id: "6",
        title: "Youth Group Fun - Games and Fellowship",
        thumbnail: "https://images.unsplash.com/photo-1543076659-7b7869e20134?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "35:50",
        views: 3100,
        timeAgo: "3 weeks ago",
        channel: "Youth Arise",
        verified: true,
		status: "published",
        category: "Youth",
        description: "Join our youth group for a time of fun, games, and meaningful fellowship with friends."
      },
      {
        id: "7",
        title: "Kids' Church - Learning About Love",
        thumbnail: "https://images.unsplash.com/photo-1547394765-185e51e1dcad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "25:00",
        views: 2800,
        timeAgo: "1 month ago",
        channel: "Little Lights",
        verified: true,
		status: "published",
        category: "Kids",
        description: "Engage your children with our interactive Kids' Church program, teaching them about love and kindness."
      },
      {
        id: "8",
        title: "Gospel Music Night - Uplifting Melodies",
        thumbnail: "https://images.unsplash.com/photo-1510915228340-29c85a3a66ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "50:20",
        views: 9400,
        timeAgo: "6 months ago",
        channel: "Harmony Voices",
        verified: true,
		status: "published",
        category: "Music",
        description: "Enjoy an evening filled with uplifting gospel music, celebrating faith through song."
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
      },
      {
        id: "3",
        title: "Scheduled: Bible Study Group",
        creator: "Elder Thomas",
        viewers: 0,
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Bible Study",
        status: "scheduled",
		scheduledTime: new Date()
      }
    ];
  }
}

export const platformStore = new PlatformStore();
