
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Star, Video, Music, BookOpen } from 'lucide-react';

const CreatorApplicationForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    channel_name: '',
    channel_description: '',
    content_type: '',
    ministry_background: '',
    sample_content_urls: ['', '', '']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('creator_applications')
        .insert({
          user_id: user.id,
          channel_name: formData.channel_name,
          channel_description: formData.channel_description,
          content_type: formData.content_type,
          ministry_background: formData.ministry_background,
          sample_content_urls: formData.sample_content_urls.filter(url => url.trim() !== '')
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Your creator application has been submitted for review. You'll receive an email when it's processed.",
      });

      // Reset form
      setFormData({
        channel_name: '',
        channel_description: '',
        content_type: '',
        ministry_background: '',
        sample_content_urls: ['', '', '']
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const contentTypes = [
    { value: 'sermons', label: 'Sermons & Teachings', icon: BookOpen },
    { value: 'worship', label: 'Worship Music', icon: Music },
    { value: 'bible-study', label: 'Bible Studies', icon: BookOpen },
    { value: 'testimonies', label: 'Testimonies', icon: Star },
    { value: 'youth', label: 'Youth Content', icon: Video },
    { value: 'family', label: 'Family Content', icon: Video },
    { value: 'other', label: 'Other Christian Content', icon: Video }
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-6 w-6 text-[#FDBD34]" />
          Apply to Become a Creator
        </CardTitle>
        <CardDescription>
          Join our community of Christian content creators and share your ministry with the world.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="channel_name">Channel Name *</Label>
            <Input
              id="channel_name"
              value={formData.channel_name}
              onChange={(e) => setFormData({ ...formData, channel_name: e.target.value })}
              placeholder="Enter your channel name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="channel_description">Channel Description *</Label>
            <Textarea
              id="channel_description"
              value={formData.channel_description}
              onChange={(e) => setFormData({ ...formData, channel_description: e.target.value })}
              placeholder="Describe your ministry and the type of content you plan to create"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content_type">Primary Content Type *</Label>
            <Select 
              value={formData.content_type} 
              onValueChange={(value) => setFormData({ ...formData, content_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your primary content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ministry_background">Ministry Background</Label>
            <Textarea
              id="ministry_background"
              value={formData.ministry_background}
              onChange={(e) => setFormData({ ...formData, ministry_background: e.target.value })}
              placeholder="Tell us about your ministry experience, calling, and vision"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <Label>Sample Content (Optional)</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Share up to 3 URLs of your existing content to help us review your application
            </p>
            {formData.sample_content_urls.map((url, index) => (
              <Input
                key={index}
                value={url}
                onChange={(e) => {
                  const newUrls = [...formData.sample_content_urls];
                  newUrls[index] = e.target.value;
                  setFormData({ ...formData, sample_content_urls: newUrls });
                }}
                placeholder={`Sample content URL ${index + 1}`}
                type="url"
              />
            ))}
          </div>

          <Button 
            type="submit" 
            disabled={loading || !formData.channel_name || !formData.channel_description || !formData.content_type}
            className="w-full bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatorApplicationForm;
