import React, { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface YipYipDanmakuBarProps {
  videoId: string;
}

const sendBulletComment = async ({
  videoId,
  userId,
  text,
}: {
  videoId: string;
  userId: string;
  text: string;
}) => {
  const { error } = await supabase.from("video_bullet_comments").insert([
    {
      video_id: videoId,
      user_id: userId,
      text,
    },
  ]);
  if (error) throw error;
};

const YipYipDanmakuBar: React.FC<YipYipDanmakuBarProps> = ({ videoId }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      sendBulletComment({
        videoId,
        userId: user!.id,
        text: comment.trim(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bullet-comments", videoId] });
      setComment("");
      inputRef.current?.focus();
      // Broadcast to overlay for instant show
      const ev = new CustomEvent("new-bullet-danmaku", {
        detail: { text: comment.trim(), user, ts: Date.now() }
      });
      window.dispatchEvent(ev);
    },
    onError: () => {
      toast({
        title: "Could not send YipYip",
        description: "Please try again or re-login.",
        variant: "destructive",
      });
    },
  });

  const handleSend = () => {
    if (!user || !comment.trim() || mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <div className="flex items-center px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-3 w-full min-h-[48px]">
      {!user ? (
        <>
          <span className="text-gray-500 text-sm flex-1">
            Please{" "}
            <Link to="/auth" className="text-blue-500 hover:underline">
              log in
            </Link>{" "}
            or{" "}
            <Link to="/auth" className="text-blue-500 hover:underline">
              register first
            </Link>
          </span>
          <Button
            variant="ghost"
            disabled
            className="ml-3 text-gray-400 bg-gray-100 dark:bg-gray-900 cursor-not-allowed"
          >
            send
          </Button>
        </>
      ) : (
        <>
          <input
            ref={inputRef}
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            onKeyDown={e => {
              if (
                e.key === "Enter" &&
                comment.trim() &&
                !mutation.isPending
              ) {
                handleSend();
              }
            }}
            placeholder="Send a YipYip"
            maxLength={120}
            disabled={mutation.isPending}
            className="flex-1 bg-transparent placeholder-gray-500 border-0 focus:ring-0 outline-none mr-2 text-base"
          />
          <a
            href="https://en.wikipedia.org/wiki/Danmaku_(video_gaming)"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-xs px-2 mr-1 hover:underline hidden sm:inline"
          >
            Barrage Etiquette &#8594;
          </a>
          <Button
            size="sm"
            className="rounded px-4 bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            onClick={handleSend}
            disabled={!comment.trim() || mutation.isPending}
            aria-label="Send YipYip"
          >
            <Send className="w-4 h-4 mr-1" /> send
          </Button>
        </>
      )}
    </div>
  );
};

export default YipYipDanmakuBar;
