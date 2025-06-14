
import React, { useEffect, useState } from 'react';
import { SkipBack, SkipForward } from 'lucide-react';

interface VideoSkipIndicatorProps {
  skipAmount: number;
  direction: 'forward' | 'backward';
  show: boolean;
}

const VideoSkipIndicator = ({ skipAmount, direction, show }: VideoSkipIndicatorProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="bg-black/70 text-white px-4 py-2 rounded-lg flex items-center space-x-2 animate-fade-in">
        {direction === 'backward' ? (
          <SkipBack className="h-5 w-5" />
        ) : (
          <SkipForward className="h-5 w-5" />
        )}
        <span>{skipAmount}s</span>
      </div>
    </div>
  );
};

export default VideoSkipIndicator;
