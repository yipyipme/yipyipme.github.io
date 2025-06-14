
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Heart, 
  MessageSquare,
  Eye,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import { platformStore } from '@/lib/store';

const Posts = () => {
  const posts = platformStore.getCommunityPosts();

  return (
    <CreatorStudioLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-[#FDBD34] to-[#FF8A3D] p-3 rounded-2xl">
              <BookOpen className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Community Posts</h1>
              <p className="text-gray-400 mt-2">Manage your community posts and engagement</p>
            </div>
          </div>
          <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Posts</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{posts.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {posts.reduce((sum, post) => sum + post.likes, 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {posts.reduce((sum, post) => sum + post.comments, 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Engagement</CardTitle>
              <Eye className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">87.5%</div>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold">{post.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {post.type}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.timestamp).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes} likes
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post.comments} comments
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#FDBD34] btn-modern">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400 btn-modern">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CreatorStudioLayout>
  );
};

export default Posts;
