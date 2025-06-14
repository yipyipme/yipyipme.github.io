
import { useState } from 'react';
import { Upload, X, Video, Image, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { platformStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

interface VideoUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

const VideoUpload = ({ onClose, onSuccess }: VideoUploadProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    category: '',
    thumbnail: '',
    videoUrl: '',
    adsEnabled: true,
    membershipRequired: false,
    status: 'published' as 'published' | 'draft' | 'scheduled',
    publishDate: ''
  });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.videoUrl) {
      toast({
        title: "Error",
        description: "Title and video URL are required",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const video = platformStore.addVideo({
      title: formData.title,
      creator: "Pastor Mike Johnson", // In real app, get from auth
      thumbnail: formData.thumbnail || "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "0:00", // Would be calculated from actual video
      views: "0", // Initial views
      timeAgo: "just now", // Initial time
      videoUrl: formData.videoUrl,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      status: formData.status,
      category: formData.category,
      monetization: {
        adsEnabled: formData.adsEnabled,
        membershipRequired: formData.membershipRequired
      }
    });

    setUploading(false);
    toast({
      title: "Success!",
      description: "Video uploaded successfully",
    });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Upload Video</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Upload */}
            <div className="space-y-2">
              <Label className="text-white">Video URL</Label>
              <Input
                placeholder="Enter video URL..."
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Title</Label>
                <Input
                  placeholder="Enter video title..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Description</Label>
                <Textarea
                  placeholder="Enter video description..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Tags</Label>
                <Input
                  placeholder="Enter tags separated by commas..."
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Category</Label>
                <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sermons">Sermons</SelectItem>
                    <SelectItem value="worship">Worship</SelectItem>
                    <SelectItem value="bible-study">Bible Study</SelectItem>
                    <SelectItem value="podcasts">Podcasts</SelectItem>
                    <SelectItem value="movies">Movies</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Thumbnail URL</Label>
                <Input
                  placeholder="Enter thumbnail URL (optional)..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            {/* Monetization */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Monetization</h3>
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Enable Ads</Label>
                <Switch
                  checked={formData.adsEnabled}
                  onCheckedChange={(checked) => setFormData({...formData, adsEnabled: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Membership Required</Label>
                <Switch
                  checked={formData.membershipRequired}
                  onCheckedChange={(checked) => setFormData({...formData, membershipRequired: checked})}
                />
              </div>
            </div>

            {/* Publishing */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Publishing</h3>
              <Select onValueChange={(value: 'published' | 'draft' | 'scheduled') => setFormData({...formData, status: value})}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Publish Now</SelectItem>
                  <SelectItem value="draft">Save as Draft</SelectItem>
                  <SelectItem value="scheduled">Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={uploading}
                className="flex-1 bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
              >
                {uploading ? 'Uploading...' : 'Upload Video'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoUpload;
