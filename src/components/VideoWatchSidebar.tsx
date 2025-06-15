
import React from "react";

interface VideoWatchSidebarProps {
  videos: any[];
}

const VideoWatchSidebar = ({ videos }: VideoWatchSidebarProps) => (
  <div className="w-full lg:w-96 space-y-2">
    <div>
      {videos.map((video) => (
        <div
          key={video.id}
          className="flex gap-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors items-center"
        >
          {/* Fixed aspect ratio thumbnail */}
          <div className="w-28 aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0 relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
              {video.duration}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-gray-900 dark:text-white text-base font-semibold leading-snug line-clamp-2 mb-1">
              {video.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-0.5">
              {video.channel}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              {video.views} views
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default VideoWatchSidebar;
