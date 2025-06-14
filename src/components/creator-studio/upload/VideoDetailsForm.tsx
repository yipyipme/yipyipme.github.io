
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface VideoFormData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  visibility: string;
  monetization_enabled: boolean;
}

interface VideoDetailsFormProps {
  formData: VideoFormData;
  onFormDataChange: (data: Partial<VideoFormData>) => void;
  categories: string[];
}

const VideoDetailsForm = ({ formData, onFormDataChange, categories }: VideoDetailsFormProps) => {
  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      onFormDataChange({
        tags: [...formData.tags, tag]
      });
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    onFormDataChange({
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Title *
        </label>
        <Input
          value={formData.title}
          onChange={(e) => onFormDataChange({ title: e.target.value })}
          placeholder="Enter video title"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => onFormDataChange({ description: e.target.value })}
          placeholder="Describe your video content"
          rows={4}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Category
        </label>
        <Select
          value={formData.category}
          onValueChange={(value) => onFormDataChange({ category: value })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {categories.map((category) => (
              <SelectItem key={category} value={category} className="text-white">
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-[#FDBD34]/20 text-[#FDBD34]">
              {tag}
              <button
                onClick={() => handleTagRemove(tag)}
                className="ml-2 text-[#FDBD34] hover:text-red-400"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
        <Input
          placeholder="Add tags (press Enter)"
          className="bg-gray-800 border-gray-700 text-white"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleTagAdd(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Visibility
        </label>
        <Select
          value={formData.visibility}
          onValueChange={(value) => onFormDataChange({ visibility: value })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="public" className="text-white">Public</SelectItem>
            <SelectItem value="unlisted" className="text-white">Unlisted</SelectItem>
            <SelectItem value="private" className="text-white">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VideoDetailsForm;
