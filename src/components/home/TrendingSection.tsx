
import VideoCard from "@/components/VideoCard";
import BrandedButton from "@/components/brand/BrandedButton";
import DoveIcon from "@/components/brand/DoveIcon";
import { TrendingUp, Zap } from "lucide-react";

interface TrendingSectionProps {
  loading: boolean;
  featuredVideos: any[];
  onVideoClick: (video: any) => void;
  convertVideoForCard: (video: any) => any;
}

const TrendingSection = ({ loading, featuredVideos, onVideoClick, convertVideoForCard }: TrendingSectionProps) => (
  <section className="w-full px-4 md:px-6 py-8">
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-[#FDBD34]" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
          <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
          <DoveIcon size="md" animate />
        </div>
        <BrandedButton variant="outline">
          View All
        </BrandedButton>
      </div>
      {loading ? (
        <div className="text-center text-gray-400">Loading videos...</div>
      ) : featuredVideos.length > 0 ? (
        <div className="netflix-grid">
          {featuredVideos.slice(0, 4).map((video) => {
            const cardData = convertVideoForCard(video);
            return (
              <VideoCard 
                key={video.id}
                title={cardData.title}
                channel={cardData.channel}
                thumbnail={cardData.thumbnail}
                duration={cardData.duration}
                views={cardData.views != null ? String(cardData.views) : "0"}
                timeAgo={cardData.timeAgo}
                onClick={() => onVideoClick(cardData)}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-400">No videos uploaded yet</div>
      )}
    </div>
  </section>
);

export default TrendingSection;
