
import { Link } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header onSidebarToggle={() => {}} />
      <main className="pt-4">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="mt-16 bg-gray-900/50 border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/30159a4f-685f-4d6b-a3c6-a2650c1d9bbc.png" 
                alt="YipYip" 
                className="h-8 w-auto"
                style={{ width: 'auto', height: '32px', minWidth: '80px' }}
              />
              <p className="text-gray-400 text-sm">
                Your premier destination for Christian content, worship, and spiritual growth.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Content</h3>
              <div className="space-y-2 text-sm">
                <Link to="/explore?category=sermons" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Sermons</Link>
                <Link to="/explore?category=worship" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Worship Music</Link>
                <Link to="/explore?category=bible-study" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Bible Studies</Link>
                <Link to="/kids" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Kids Content</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Community</h3>
              <div className="space-y-2 text-sm">
                <Link to="/live" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Live Services</Link>
                <Link to="/community" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Forums</Link>
                <Link to="/subscriptions" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Subscriptions</Link>
                <Link to="/watch-later" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Watch Later</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Support</h3>
              <div className="space-y-2 text-sm">
                <Link to="/help" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Help Center</Link>
                <Link to="/about" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">About Us</Link>
                <Link to="/terms" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Terms of Service</Link>
                <Link to="/privacy" className="block text-gray-400 hover:text-[#FDBD34] transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2024 YipYip. All rights reserved. Spreading the Gospel through digital media.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-[#FDBD34] transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-[#FDBD34] transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-[#FDBD34] transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-[#FDBD34] transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
