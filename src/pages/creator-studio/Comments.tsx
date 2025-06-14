
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, MoreVertical, Check, X, Heart, Reply } from 'lucide-react';
import { useState } from 'react';
import { platformStore } from '@/lib/store';

const Comments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const comments = platformStore.getComments();

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <CreatorStudioLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Comments</h1>
            <p className="text-gray-400 mt-2">Manage and respond to viewer comments</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search comments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  className="btn-modern"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('pending')}
                  className="btn-modern"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === 'approved' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('approved')}
                  className="btn-modern"
                >
                  Approved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <Card key={comment.id} className="bg-gray-900/50 border-gray-800 card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FDBD34]/20 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-[#FDBD34]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-semibold">{comment.author}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        comment.status === 'approved' 
                          ? 'bg-green-500/20 text-green-400' 
                          : comment.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {comment.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{comment.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{comment.timestamp.toLocaleDateString()}</span>
                      <span>Video ID: {comment.videoId}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {comment.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:text-[#FDBD34]">
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:text-red-400">
                      <Heart className="h-4 w-4 mr-1" />
                      Like
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

        {filteredComments.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold text-white mb-2">No comments found</h3>
              <p className="text-gray-400">
                {searchQuery ? 'Try adjusting your search terms.' : 'No comments to review at the moment.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </CreatorStudioLayout>
  );
};

export default Comments;
