
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, Crown, Star } from 'lucide-react';

const ProfilePage = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: profile?.username || '',
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
  });

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to update profile",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: profile?.username || '',
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
    });
    setIsEditing(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'creator':
        return <Star className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500 text-white';
      case 'creator':
        return 'bg-[#FDBD34] text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (!user || !profile) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-300">Please sign in to view your profile</h1>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                  <AvatarFallback className="text-2xl bg-gray-700 text-white">
                    {profile.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold text-white mb-2">
                  {profile.full_name || 'Anonymous User'}
                </h2>
                
                {profile.username && (
                  <p className="text-gray-400 mb-3">@{profile.username}</p>
                )}
                
                <Badge className={`${getRoleBadgeColor(profile.role)} mb-4`}>
                  {getRoleIcon(profile.role)}
                  <span className="ml-1 capitalize">{profile.role}</span>
                </Badge>
                
                <p className="text-gray-400 text-sm">
                  Member since {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:text-[#FDBD34]"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-gray-700 text-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Email</Label>
                  <Input
                    value={user.email || ''}
                    disabled
                    className="bg-gray-800 border-gray-700 text-gray-400"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Username</Label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Choose a unique username"
                    className="bg-gray-800 border-gray-700 text-white disabled:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Full Name</Label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Your full name"
                    className="bg-gray-800 border-gray-700 text-white disabled:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Bio</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white disabled:text-gray-400 resize-none"
                  />
                </div>

                {profile.role === 'user' && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="text-blue-400 font-medium mb-2">Want to become a creator?</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Apply to become a creator and start sharing your content with the YipYip community.
                    </p>
                    <Button
                      onClick={() => window.location.href = '/creator-application'}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Apply Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
