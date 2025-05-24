
import VideoPlayer from '@/components/VideoPlayer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Danmaku Video Player
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience videos like never before with live comments that flow across the screen, 
            similar to Bilibili's danmaku system.
          </p>
        </div>
        
        <VideoPlayer />
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-white">
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Live Comments</h3>
            <p className="text-gray-300">
              Send comments that scroll across the video in real-time, creating an interactive viewing experience.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Customizable Colors</h3>
            <p className="text-gray-300">
              Choose from multiple colors for your comments to express yourself uniquely.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Full Controls</h3>
            <p className="text-gray-300">
              Complete video controls with play/pause, volume, seeking, and fullscreen support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
