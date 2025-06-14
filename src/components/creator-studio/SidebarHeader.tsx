
import { Button } from '@/components/ui/button';
import { Menu, X, Upload, Radio } from 'lucide-react';

interface SidebarHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onShowUpload: () => void;
}

const SidebarHeader = ({ isSidebarOpen, onToggleSidebar, onShowUpload }: SidebarHeaderProps) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/30159a4f-685f-4d6b-a3c6-a2650c1d9bbc.png" 
            alt="YipYip" 
            className="h-8 w-auto neon-glow"
          />
          {isSidebarOpen && (
            <span className="text-white font-bold text-lg">Creator Studio</span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="text-gray-400 hover:text-[#FDBD34] btn-modern"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Quick Actions */}
      {isSidebarOpen && (
        <div className="p-4 border-b border-gray-800">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={onShowUpload}
              className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80 btn-modern"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-[#FDBD34] btn-modern">
              <Radio className="h-4 w-4 mr-2" />
              Go Live
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarHeader;
