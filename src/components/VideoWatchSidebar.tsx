import React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import VideoCard from "./VideoCard";

interface VideoWatchSidebarProps {
  videos: any[];
}

const VideoWatchSidebar = ({ videos }: VideoWatchSidebarProps) => (
  <div className="w-full lg:w-96 space-y-0">
    <div>
      {videos.map((video) => (
        <div
          key={video.id}
          className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
        >
          <div className="relative w-32 h-18 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden shrink-0">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2 mb-1">
              {video.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
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
