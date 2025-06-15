
import React, { useState } from "react";
import Header from "./Header";
import VideoWatchMain from "./VideoWatchMain";
import VideoWatchSidebar from "./VideoWatchSidebar";
import { platformStore } from "@/lib/store";

interface VideoWatchPageProps {
  video: any;
  onClose: () => void;
}

const VideoWatchPage = ({ video, onClose }: VideoWatchPageProps) => {
  // Sample chapters data
  const chapters = [
    { id: '1', title: 'Opening Prayer', timestamp: 0, duration: 120 },
    { id: '2', title: 'Scripture Reading', timestamp: 120, duration: 180 },
    { id: '3', title: 'Main Message', timestamp: 300, duration: 900 },
    { id: '4', title: 'Community Prayer', timestamp: 1200, duration: 300 },
    { id: '5', title: 'Closing Blessing', timestamp: 1500, duration: 120 },
  ];

  const [currentTime, setCurrentTime] = useState(0);

  const suggestedVideos = platformStore.getPublishedVideos().slice(0, 8);
  const relatedEpisodes = platformStore.getPublishedVideos().slice(0, 3);

  // Merge and deduplicate videos for sidebar (by id)
  const sidebarVideos = Array.from(
    new Map(
      [...relatedEpisodes, ...suggestedVideos]
        .filter((v) => v.id !== video.id)
        .map((v) => [v.id, v])
    ).values()
  );

  // Modal close on Escape
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-gray-950 overflow-y-auto">
      {/* Header */}
      <Header onMenuToggle={() => {}} />
      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        {/* Main video column */}
        <VideoWatchMain
          video={video}
          chapters={chapters}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          onClose={onClose}
          relatedEpisodes={relatedEpisodes}
        />
        {/* Sidebar (merged/clean list) */}
        <VideoWatchSidebar videos={sidebarVideos} />
      </div>
    </div>
  );
};

export default VideoWatchPage;
