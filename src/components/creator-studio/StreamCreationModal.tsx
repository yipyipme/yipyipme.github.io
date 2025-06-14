
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { StreamService } from '@/lib/services/streamService';
import { useToast } from '@/hooks/use-toast';
import { Radio, Calendar } from 'lucide-react';

interface StreamCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStreamCreated: () => void;
}

const StreamCreationModal = ({ isOpen, onClose, onStreamCreated }: StreamCreationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    visibility: 'public',
    chat_enabled: true,
    recording_enabled: true,
    scheduled_start: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await StreamService.createStream({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        visibility: formData.visibility as 'public' | 'unlisted' | 'private',
        chat_enabled: formData.chat_enabled,
        recording_enabled: formData.recording_enabled,
        scheduled_start: formData.scheduled_start ? new Date(formData.scheduled_start).toISOString() : null,
        creator_id: '' // This will be set by RLS policies
      });

      toast({
        title: "Stream Created",
        description: "Your live stream has been set up successfully!",
      });

      onStreamCreated();
      onClose();
      setFormData({
        title: '',
        description: '',
        category: '',
        visibility: 'public',
        chat_enabled: true,
        recording_enabled: true,
        scheduled_start: ''
      });
    } catch (error) {
      console.error('Error creating stream:', error);
      toast({
        title: "Error",
        description: "Failed to create stream. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Radio className="h-5 w-5 text-[#FDBD34]" />
            Create Live Stream
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-300">Stream Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-gray-300">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="worship">Worship</SelectItem>
                <SelectItem value="sermon">Sermon</SelectItem>
                <SelectItem value="bible-study">Bible Study</SelectItem>
                <SelectItem value="prayer">Prayer</SelectItem>
                <SelectItem value="youth">Youth</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="scheduled_start" className="text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Start Time (Optional)
            </Label>
            <Input
              id="scheduled_start"
              type="datetime-local"
              value={formData.scheduled_start}
              onChange={(e) => setFormData({ ...formData, scheduled_start: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="chat_enabled" className="text-gray-300">Enable Chat</Label>
              <Switch
                id="chat_enabled"
                checked={formData.chat_enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, chat_enabled: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="recording_enabled" className="text-gray-300">Enable Recording</Label>
              <Switch
                id="recording_enabled"
                checked={formData.recording_enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, recording_enabled: checked })}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80">
              {isLoading ? 'Creating...' : 'Create Stream'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StreamCreationModal;
