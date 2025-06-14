import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Upload,
  Bell,
  Search,
  Menu,
  LifeBuoy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import VideoUpload from './VideoUpload';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';

interface CreatorStudioLayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_WIDTH = 288; // 72 * 4 (rem to px)

const CreatorStudioLayout = ({ children }: CreatorStudioLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-950 flex w-full">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-300 ease-out shadow-2xl",
        "md:sticky md:transform-none",
        isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0 md:w-16"
      )}>
        <div className="flex flex-col h-full">
          <SidebarHeader 
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onShowUpload={() => setShowUploadModal(true)}
          />
          <SidebarNavigation isSidebarOpen={isSidebarOpen} />
          <div className="p-4 border-t border-gray-800">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-[#FDBD34] transition-colors btn-modern"
            >
              <Home className="h-4 w-4" />
              {isSidebarOpen && <span className="text-sm">Back to Platform</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 flex flex-col min-h-screen",
        isSidebarOpen ? "ml-0 md:ml-72" : "ml-0 md:ml-16"
      )}>
        {/* Top Header */}
        <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 px-4 py-4 w-full shrink-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-400 hover:text-[#FDBD34] btn-modern md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search videos, analytics, users..."
                  className="pl-10 w-80 bg-gray-800/50 border-gray-700 text-gray-100 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#FDBD34] btn-modern relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#FDBD34] btn-modern">
                <LifeBuoy className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <VideoUpload
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default CreatorStudioLayout;
