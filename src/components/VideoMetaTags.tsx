
import React from "react";
import { Helmet } from "react-helmet-async";

interface VideoMetaTagsProps {
  video: {
    id: string;
    title: string;
    description?: string;
  };
  imageUrl?: string;
}

/**
 * Always use yellow dove share image unless specified.
 * Social platforms will use this image on share. 
 * Change imageUrl only if you want to override the yellow dove preview!
 */
const VideoMetaTags: React.FC<VideoMetaTagsProps> = ({
  video,
  imageUrl = "/lovable-uploads/dove-share.png", // <-- This is your yellow dove!
}) => {
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/watch/${video.id}`
    : "";

  return (
    <Helmet>
      <title>{video.title} | YipYip</title>
      <meta name="description" content={video.description || "Watch this video on YipYip!"} />

      {/* Open Graph Meta for social previews */}
      <meta property="og:type" content="video.other" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={video.title} />
      <meta property="og:description" content={video.description || "Watch this video on YipYip!"} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={video.title} />
      <meta name="twitter:description" content={video.description || "Watch this video on YipYip!"} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:url" content={url} />
    </Helmet>
  );
};

export default VideoMetaTags;
