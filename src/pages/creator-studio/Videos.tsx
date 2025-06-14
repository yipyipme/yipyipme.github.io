
import { useState, useEffect } from 'react';
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import SimpleVideoUpload from '@/components/creator-studio/upload/SimpleVideoUpload';
import VideoCard from '@/components/creator-studio/videos/VideoCard';
import VideoFilters from '@/components/creator-studio/videos/VideoFilters';
import EmptyVideosState from '@/components/creator-studio/videos/EmptyVideosState';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { VideoService } from '@/lib/services/videoService';
import type { Database } from '@/integrations/supabase/types';

type Video = Database['public']['Tables']['videos']['Row'];

const Videos = () => {
  const { user } = useAuth();
  const [showUpload, setShowUpload] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadVideos = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await VideoService.getCreatorVideos(user.id);
      setVideos(data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, [user]);

  const handleUploadSuccess = () => {
    loadVideos();
    setShowUpload(false);
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      await VideoService.deleteVideo(id);
      setVideos(videos.filter(v => v.id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <CreatorStudioLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading videos...</div>
        </div>
      </CreatorStudioLayout>
    );
  }

  return (
    <CreatorStudioLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Videos</h1>
            <p className="text-gray-400 mt-2">Manage your video content</p>
          </div>
          <Button 
            onClick={() => setShowUpload(true)}
            className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
        </div>

        {/* Search and Filters */}
        <VideoFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
        />

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDelete={handleDeleteVideo}
              />
            ))}
          </div>
        ) : (
          <EmptyVideosState
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onUpload={() => setShowUpload(true)}
          />
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <SimpleVideoUpload 
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </CreatorStudioLayout>
  );
};

export default Videos;
