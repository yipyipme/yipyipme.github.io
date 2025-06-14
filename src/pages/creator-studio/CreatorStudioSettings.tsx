
import CreatorStudioLayout from '@/components/creator-studio/CreatorStudioLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  CreditCard,
  Users,
  Video
} from 'lucide-react';

const CreatorStudioSettings = () => {
  return (
    <CreatorStudioLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-[#FDBD34] to-[#FF8A3D] p-3 rounded-2xl">
            <Settings className="h-8 w-8 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-gray-400 mt-2">Manage your channel preferences and configurations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Channel Information */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="h-5 w-5 text-[#FDBD34]" />
                  Channel Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="channel-name" className="text-gray-300">Channel Name</Label>
                  <Input
                    id="channel-name"
                    defaultValue="Pastor Mike Johnson"
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channel-description" className="text-gray-300">Channel Description</Label>
                  <textarea
                    id="channel-description"
                    rows={3}
                    defaultValue="Spreading God's word through inspiring sermons and worship"
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Safety */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#FDBD34]" />
                  Privacy & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Comments</Label>
                    <p className="text-sm text-gray-500">Allow comments on your videos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Auto-approve comments</Label>
                    <p className="text-sm text-gray-500">Automatically approve comments from subscribers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Show subscriber count</Label>
                    <p className="text-sm text-gray-500">Display your subscriber count publicly</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Monetization Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#FDBD34]" />
                  Monetization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Enable ads</Label>
                    <p className="text-sm text-gray-500">Show ads on your videos to earn revenue</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Accept donations</Label>
                    <p className="text-sm text-gray-500">Allow viewers to send donations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#FDBD34]" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300 text-sm">New subscribers</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300 text-sm">New comments</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300 text-sm">Video uploads</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300 text-sm">Live streams</Label>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern">
                  <Palette className="h-4 w-4 mr-2" />
                  Customize Theme
                </Button>
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern">
                  <Globe className="h-4 w-4 mr-2" />
                  Language Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern px-8">
            Save Changes
          </Button>
        </div>
      </div>
    </CreatorStudioLayout>
  );
};

export default CreatorStudioSettings;
