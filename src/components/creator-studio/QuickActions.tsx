
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Upload, 
  Radio, 
  Users, 
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  BookOpen
} from 'lucide-react';

interface QuickActionsProps {
  onUploadClick: () => void;
}

const QuickActions = ({ onUploadClick }: QuickActionsProps) => {
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
      color: 'border-red-500/50 text-red-400 hover:bg-red-500/10'
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
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.title === 'Upload Video' ? 'default' : 'outline'}
              onClick={action.onClick}
              className={`h-20 flex flex-col gap-2 btn-modern ${
                action.title === 'Upload Video' 
                  ? action.color 
                  : `border-gray-700 ${action.color}`
              }`}
            >
              <action.icon className="h-5 w-5" />
              <div className="text-center">
                <div className="text-xs font-medium">{action.title}</div>
                <div className="text-[10px] opacity-75">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
