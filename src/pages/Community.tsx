
import Layout from '@/components/Layout';
import { MessageCircle, Users, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const forumTopics = [
  {
    title: "Prayer Requests",
    description: "Share your prayer needs with the community",
    posts: 1247,
    members: 3420,
    lastActivity: "2 minutes ago"
  },
  {
    title: "Bible Study Discussions",
    description: "Dive deeper into God's word together",
    posts: 892,
    members: 2156,
    lastActivity: "15 minutes ago"
  },
  {
    title: "Worship & Music",
    description: "Share and discover uplifting worship songs",
    posts: 645,
    members: 1834,
    lastActivity: "1 hour ago"
  },
  {
    title: "Youth Ministry",
    description: "Connect with other young believers",
    posts: 523,
    members: 987,
    lastActivity: "3 hours ago"
  },
];

const recentPosts = [
  {
    title: "How do you maintain faith during difficult times?",
    author: "Sarah M.",
    replies: 23,
    timeAgo: "2 hours ago",
    category: "Prayer Requests"
  },
  {
    title: "Favorite worship songs for personal devotion",
    author: "David K.",
    replies: 18,
    timeAgo: "4 hours ago",
    category: "Worship & Music"
  },
  {
    title: "Study group for the Book of Romans",
    author: "Pastor John",
    replies: 12,
    timeAgo: "6 hours ago",
    category: "Bible Study"
  },
];

const Community = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Forum Categories */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Discussion Forums</h2>
              <div className="space-y-4">
                {forumTopics.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-orange-300 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{topic.title}</h3>
                        <p className="text-gray-600 mb-4">{topic.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {topic.posts} posts
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {topic.members} members
                          </div>
                          <span>Last activity: {topic.lastActivity}</span>
                        </div>
                      </div>
                      <div className="text-orange-500">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Posts */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-semibold text-gray-900">Recent Discussions</h2>
              </div>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-orange-300 transition-colors cursor-pointer">
                    <h3 className="font-medium text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>by {post.author}</span>
                      <span>•</span>
                      <span>{post.replies} replies</span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold">8,397</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Online Now</span>
                  <span className="font-semibold text-green-600">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold">89</span>
                </div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Be respectful and kind</li>
                <li>• Stay on topic</li>
                <li>• No spam or self-promotion</li>
                <li>• Keep discussions family-friendly</li>
                <li>• Respect different viewpoints</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
