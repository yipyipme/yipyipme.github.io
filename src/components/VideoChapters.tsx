
import React from 'react';
import { Button } from '@/components/ui/button';

interface Chapter {
  id: string;
  title: string;
  timestamp: number;
  duration: number;
}

interface VideoChaptersProps {
  chapters: Chapter[];
  currentTime: number;
  onChapterClick: (timestamp: number) => void;
}

const VideoChapters = ({ chapters, currentTime, onChapterClick }: VideoChaptersProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCurrentChapter = () => {
    return chapters.find(chapter => 
      currentTime >= chapter.timestamp && 
      currentTime < chapter.timestamp + chapter.duration
    );
  };

  const currentChapter = getCurrentChapter();

  return (
    <div className="space-y-4">
      <h3 className="text-gray-900 dark:text-white font-semibold">Chapters</h3>
      <div className="space-y-2">
        {chapters.map((chapter) => (
          <Button
            key={chapter.id}
            variant="ghost"
            onClick={() => onChapterClick(chapter.timestamp)}
            className={`w-full justify-start text-left p-3 h-auto ${
              currentChapter?.id === chapter.id 
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {formatTime(chapter.timestamp)}
                </span>
                <span className="text-sm">{chapter.title}</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VideoChapters;
