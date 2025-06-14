
import React from 'react';

interface VideoPlayerOverlayProps {
  title: string;
  showTitle: boolean;
  onClose?: () => void;
}

const VideoPlayerOverlay = ({ title, showTitle, onClose }: VideoPlayerOverlayProps) => {
  return (
    <>
      {/* Title overlay */}
      <div className={`absolute top-4 left-4 text-white transition-opacity duration-300 ${
        showTitle ? 'opacity-100' : 'opacity-0'
      }`}>
        <h2 className="text-xl font-bold drop-shadow-lg">{title}</h2>
      </div>

      {/* Close button */}
      {onClose && (
        <div className={`absolute top-4 right-4 transition-opacity duration-300 ${
          showTitle ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default VideoPlayerOverlay;
