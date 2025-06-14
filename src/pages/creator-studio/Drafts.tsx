
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Search, MoreVertical, Edit, Trash2, Calendar, Eye } from 'lucide-react';
import { useState } from 'react';
import { platformStore } from '@/lib/store';

const Drafts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const allVideos = platformStore.getVideos();
  const drafts = allVideos.filter(video => video.status === 'draft');

  const filteredDrafts = drafts.filter(draft =>
    draft.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CreatorStudioLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Drafts</h1>
            <p className="text-gray-400 mt-2">Manage your unpublished content</p>
          </div>
        </div>

        {/* Search */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search drafts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Drafts List */}
        <div className="space-y-4">
          {filteredDrafts.map((draft) => (
            <Card key={draft.id} className="bg-gray-900/50 border-gray-800 card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={draft.thumbnail}
                    alt={draft.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{draft.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {draft.description || 'No description provided.'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Last edited {draft.timeAgo}
                      </div>
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                        Draft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-[#FDBD34]">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#FDBD34]">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrafts.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold text-white mb-2">No drafts found</h3>
              <p className="text-gray-400">
                {searchQuery ? 'Try adjusting your search terms.' : 'You have no draft videos at the moment.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </CreatorStudioLayout>
  );
};

export default Drafts;
