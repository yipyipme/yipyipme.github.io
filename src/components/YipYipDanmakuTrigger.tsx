
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import BulletDanmaku from "./BulletDanmaku";

// Props: videoId (string, required)
interface YipYipDanmakuTriggerProps {
  videoId: string;
}

const YipYipDanmakuTrigger: React.FC<YipYipDanmakuTriggerProps> = ({ videoId }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white rounded-full px-6 py-3 font-semibold shadow-sm flex items-center justify-center gap-2 text-lg w-full max-w-xs mx-auto mb-3"
          aria-label="Send YipYip (bullets)"
        >
          <Send className="h-5 w-5 -ml-1" />
          <span>Send YipYip (弹幕)</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-md rounded-xl p-0 overflow-hidden bg-white dark:bg-gray-900 shadow-xl"
        onInteractOutside={() => setOpen(false)}
      >
        <div className="p-4 min-w-[320px]">
          <h2 className="text-lg font-bold text-blue-600 mb-1">Send a YipYip 弹幕</h2>
          <p className="text-gray-500 mb-2 text-sm">Everyone will see your bullet comment fly across the video!</p>
          <BulletDanmaku videoId={videoId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YipYipDanmakuTrigger;
