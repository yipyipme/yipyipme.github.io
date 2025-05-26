
import { useState } from 'react';
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import VideoUpload from '@/components/creator-studio/VideoUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Play, 
  Edit, 
  Trash2,
  Eye,
  Calendar
} from 'lucide-react';
import { platformStore } from '@/lib/store';

const Videos = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [videos, setVideos] = useState(platformStore.getVideos());
  const [searchQuery, setSearchQuery] = useState('');

  const handleUploadSuccess = () => {
    setVideos(platformStore.getVideos());
  };

  const handleDeleteVideo = (id: string) => {
    platformStore.deleteVideo(id);
    setVideos(platformStore.getVideos());
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

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
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-[#FDBD34]/30 transition-colors">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" className="bg-[#FDBD34] text-black">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <Badge className={`absolute top-2 left-2 ${getStatusColor(video.status)} text-white`}>
                  {video.status}
                </Badge>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {video.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {video.timeAgo}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:text-[#FDBD34]">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-700 text-red-400 hover:bg-red-500/10"
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No videos found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Upload your first video to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowUpload(true)} className="bg-[#FDBD34] text-black">
                Upload Video
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <VideoUpload 
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </CreatorStudioLayout>
  );
};

export default Videos;
