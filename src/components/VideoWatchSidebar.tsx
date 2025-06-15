
import React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import VideoCard from "./VideoCard";

interface VideoWatchSidebarProps {
  suggestedVideos: any[];
  relatedEpisodes: any[];
}

const VideoWatchSidebar = ({ suggestedVideos, relatedEpisodes }: VideoWatchSidebarProps) => (
  <div className="w-full lg:w-96 space-y-6">
    {/* Removed Automatic streaming toggle */}
    {/* Current Episode Info */}
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-900 dark:text-white font-semibold">Barrage list</h3>
        <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <div className="text-blue-600 dark:text-blue-400 text-sm">天气的动画(1/1)</div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">273,000 views • Introduction</div>
        <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">
          🎵 It took me 2 months to animate th... 04:44
        </div>
      </div>
    </div>
    {/* Related Episodes */}
    {relatedEpisodes.length > 0 && (
      <div className="space-y-4">
        <h3 className="text-gray-900 dark:text-white font-semibold">Related Episodes</h3>
        <div className="space-y-3">
          {relatedEpisodes.map((episode) => (
            <div key={episode.id} className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <div className="relative w-24 h-14 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden shrink-0">
                <img src={episode.thumbnail} alt={episode.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">{episode.duration}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2 mb-1">{episode.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{episode.channel}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{episode.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    {/* Suggested Videos */}
    <div className="space-y-4">
      <h3 className="text-gray-900 dark:text-white font-semibold">Suggested Videos</h3>
      <div className="space-y-3">
        {suggestedVideos.map((suggestedVideo) => (
          <div key={suggestedVideo.id} className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <div className="relative w-32 h-18 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden shrink-0">
              <img src={suggestedVideo.thumbnail}
                alt={suggestedVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {suggestedVideo.duration}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2 mb-1">
                {suggestedVideo.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{suggestedVideo.channel}</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{suggestedVideo.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default VideoWatchSidebar;

