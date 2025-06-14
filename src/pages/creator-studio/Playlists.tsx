
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaySquare, Plus, Search, MoreVertical, Play, Clock, Eye } from 'lucide-react';
import { useState } from 'react';

const Playlists = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const playlists = [
    {
      id: '1',
      title: 'Sunday Sermons 2024',
      videoCount: 12,
      thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      visibility: 'Public',
      views: '1.2K',
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'Bible Study Series',
      videoCount: 8,
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      visibility: 'Public',
      views: '856',
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      title: 'Worship Songs',
      videoCount: 15,
      thumbnail: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      visibility: 'Unlisted',
      views: '2.1K',
      lastUpdated: '3 days ago'
    }
  ];

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CreatorStudioLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Playlists</h1>
            <p className="text-gray-400 mt-2">Organize your content into playlists</p>
          </div>
          <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern">
            <Plus className="h-4 w-4 mr-2" />
            New Playlist
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search playlists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((playlist) => (
            <Card key={playlist.id} className="bg-gray-900/50 border-gray-800 card-hover group">
              <div className="relative">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                  <Button
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {playlist.videoCount} videos
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{playlist.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {playlist.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {playlist.lastUpdated}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        playlist.visibility === 'Public' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {playlist.visibility}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#FDBD34]">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlaylists.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-12 text-center">
              <PlaySquare className="h-16 w-16 mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold text-white mb-2">No playlists found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? 'Try adjusting your search terms.' : 'Create your first playlist to organize your content.'}
              </p>
              {!searchQuery && (
                <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Playlist
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </CreatorStudioLayout>
  );
};

export default Playlists;
