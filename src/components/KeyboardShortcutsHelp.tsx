
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcutsHelp = ({ isOpen, onClose }: KeyboardShortcutsHelpProps) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', action: 'Play/Pause' },
    { key: '← →', action: 'Skip 5 seconds' },
    { key: 'J / L', action: 'Skip 10 seconds' },
    { key: 'F', action: 'Fullscreen' },
    { key: 'T', action: 'Theater mode' },
    { key: 'W', action: 'Wide screen' },
    { key: 'M', action: 'Mute/Unmute' },
    { key: 'D', action: 'Toggle comments' },
    { key: '?', action: 'Show shortcuts' },
    { key: 'Esc', action: 'Exit modes' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Keyboard Shortcuts
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">{shortcut.action}</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp;
