
import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

interface VideoCommentsProps {
  videoId: string;
}

interface VideoComment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

const fetchComments = async (videoId: string): Promise<VideoComment[]> => {
  const { data, error } = await supabase
    .from("video_comments")
    .select("id, user_id, content, created_at")
    .eq("video_id", videoId)
    .eq("parent_comment_id", null)
    .order("created_at", { ascending: false }) // newest first
    .limit(40);
  if (error) throw error;
  return data || [];
};

const sendComment = async ({
  videoId,
  userId,
  content,
}: {
  videoId: string;
  userId: string;
  content: string;
}) => {
  const { error } = await supabase.from("video_comments").insert([
    {
      video_id: videoId,
      user_id: userId,
      content,
      status: "published",
    },
  ]);
  if (error) throw error;
};

const VideoComments: React.FC<VideoCommentsProps> = ({ videoId }) => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => fetchComments(videoId),
    refetchInterval: 20000,
  });

  const mutation = useMutation({
    mutationFn: () =>
      sendComment({
        videoId,
        userId: user!.id,
        content: comment.trim(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
      setComment("");
      toast({
        title: "Comment posted!",
        description: "Thanks for sharing your thoughts.",
      });
      inputRef.current?.focus();
    },
    onError: () => {
      toast({
        title: "Could not post comment",
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
    <section className="space-y-2 mt-8">
      <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
        Comments
      </h3>
      <div className="flex gap-3 mb-2">
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
                handleSend();
              }
            }}
            placeholder={
              user
                ? "Add a public comment (press Enter to send)"
                : "Please log in to comment"
            }
            disabled={!user || mutation.isPending}
            maxLength={500}
            className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-3 py-2 rounded"
          />
        </div>
        <Button
          disabled={!user || !comment.trim() || mutation.isPending}
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Post
        </Button>
      </div>
      <div className="space-y-2">
        {isLoading ? (
          <div className="text-gray-400 text-sm text-center">Loading...</div>
        ) : comments.length === 0 ? (
          <div className="text-gray-400 text-sm text-center">
            No comments yet.
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-2 items-center text-sm py-1">
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
                <span className="ml-2">{comment.content}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default VideoComments;
