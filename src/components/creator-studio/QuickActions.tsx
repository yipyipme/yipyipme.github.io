
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Upload, 
  Radio, 
  Users, 
  MessageSquare,
  BarChart3,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  onUploadClick: () => void;
}

const QuickActions = ({ onUploadClick }: QuickActionsProps) => {
  const navigate = useNavigate();

  const handleScheduleStream = () => {
    navigate('/creator-studio/live');
  };

  const actions = [
    {
      title: 'Upload Video',
      description: 'Share new content',
      icon: Upload,
      color: 'bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80',
      onClick: onUploadClick
    },
    {
      title: 'Schedule Stream',
      description: 'Plan live service',
      icon: Radio,
      color: 'border-red-500/50 text-red-400 hover:bg-red-500/10',
      onClick: handleScheduleStream
    },
    {
      title: 'Create Post',
      description: 'Engage community',
      icon: BookOpen,
      color: 'border-blue-500/50 text-blue-400 hover:bg-blue-500/10'
    },
    {
      title: 'View Analytics',
      description: 'Check performance',
      icon: BarChart3,
      color: 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10'
    },
    {
      title: 'Manage Members',
      description: 'Support community',
      icon: Users,
      color: 'border-green-500/50 text-green-400 hover:bg-green-500/10'
    },
    {
      title: 'Respond to Comments',
      description: '12 pending',
      icon: MessageSquare,
      color: 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10'
    }
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-800 w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.title === 'Upload Video' ? 'default' : 'outline'}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center h-20 btn-modern text-xs px-3 py-3 w-full ${
                action.title === 'Upload Video' 
                  ? action.color 
                  : `border-gray-700 ${action.color}`
              }`}
            >
              <action.icon className="h-5 w-5 mb-2 flex-shrink-0" />
              <span className="font-medium text-center leading-tight text-xs">{action.title}</span>
              <span className="text-[10px] opacity-75 text-center leading-tight mt-1">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
