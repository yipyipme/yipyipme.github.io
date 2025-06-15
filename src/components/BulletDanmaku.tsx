
import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

interface BulletDanmakuProps {
  videoId: string;
}

interface BulletComment {
  id: string;
  user_id: string;
  text: string;
  color: string | null;
  created_at: string;
}

const fetchBulletComments = async (videoId: string): Promise<BulletComment[]> => {
  const { data, error } = await supabase
    .from("video_bullet_comments")
    .select("id, user_id, text, color, created_at")
    .eq("video_id", videoId)
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) throw error;
  return data || [];
};

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

const BulletDanmaku: React.FC<BulletDanmakuProps> = ({ videoId }) => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["bullet-comments", videoId],
    queryFn: () => fetchBulletComments(videoId),
    refetchInterval: 5000,
  });

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
      toast({
        title: "Bullet sent!",
        description: "Your message appears instantly for all viewers.",
      });
      inputRef.current?.focus();
    },
    onError: () => {
      toast({
        title: "Could not send bullet comment",
        description: "Please try again or re-login.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
          Bullet Comments
        </h3>
        <span className="text-gray-600 dark:text-gray-400">
          {comments.length} sent
        </span>
      </div>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          {profile?.avatar_url ? (
            <AvatarImage src={profile.avatar_url} />
          ) : (
            <AvatarFallback>
              {(profile?.full_name ?? user?.email ?? "U")[0]}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <input
            ref={inputRef}
            value={comment}
            onChange={e => setComment(e.target.value)}
            onKeyDown={e => {
              if (
                e.key === "Enter" &&
                comment.trim() &&
                !mutation.isPending &&
                user
              ) {
                mutation.mutate();
              }
            }}
            placeholder={
              user
                ? "Send a bullet message (press Enter to send)"
                : "Please log in to send bullet comments"
            }
            disabled={!user || mutation.isPending}
            maxLength={140}
            className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-3 py-2 rounded"
          />
        </div>
        <Button
          disabled={!user || !comment.trim() || mutation.isPending}
          onClick={() => mutation.mutate()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Send
        </Button>
      </div>
      <div className="overflow-y-auto max-h-36 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 space-y-1">
        {isLoading ? (
          <div className="text-gray-400 text-sm text-center">Loading...</div>
        ) : comments.length === 0 ? (
          <div className="text-gray-400 text-sm text-center">
            No bullet comments yet.
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-2 items-center text-sm">
              <Avatar className="h-6 w-6">
                <AvatarFallback>
                  {comment.user_id ? comment.user_id[0] : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  User
                </span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">
                  {new Date(comment.created_at).toLocaleTimeString()}
                </span>
                <span className="ml-2">{comment.text}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BulletDanmaku;
