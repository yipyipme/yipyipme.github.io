
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

const getAbsoluteVideoUrl = (id: string) => {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/watch/${id}`;
};

/**
 * Sets up SEO and social sharing meta tags for a video.
 * Uses the provided imageUrl as shared image (defaults to /lovable-uploads/dove-share.png).
 */
const VideoMetaTags: React.FC<VideoMetaTagsProps> = ({
  video,
  imageUrl = "/lovable-uploads/dove-share.png",
}) => {
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/watch/${video.id}`
    : ""; // Will be SSR-safe

  return (
    <Helmet>
      <title>{video.title} | YipYip</title>
      <meta name="description" content={video.description || "Watch this video on YipYip!"} />

      {/* Open Graph Meta */}
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
