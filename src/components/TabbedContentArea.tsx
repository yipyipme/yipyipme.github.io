
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BulletDanmaku from "./BulletDanmaku";
import VideoComments from "./VideoComments";
import { Badge } from "@/components/ui/badge";

interface TabbedContentAreaProps {
  video: any;
  relatedEpisodes: any[];
}

const TabbedContentArea: React.FC<TabbedContentAreaProps> = ({ video, relatedEpisodes }) => (
  <Tabs defaultValue="yipyip" className="w-full">
    <TabsList className="grid grid-cols-4 w-full mb-2">
      <TabsTrigger value="yipyip">YipYip Comments</TabsTrigger>
      <TabsTrigger value="comments">Comments</TabsTrigger>
      <TabsTrigger value="description">Description</TabsTrigger>
      <TabsTrigger value="related">Related</TabsTrigger>
    </TabsList>
    <TabsContent value="yipyip" className="min-h-[140px]">
      <BulletDanmaku videoId={video.id || video.video_id} />
    </TabsContent>
    <TabsContent value="comments" className="min-h-[220px]">
      <VideoComments videoId={video.id || video.video_id} />
    </TabsContent>
    <TabsContent value="description">
      <div className="space-y-2">
        <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {video.description ||
            'It took me 2 months to animate this famous scene of "The Horse Racing"! This is a detailed breakdown of the animation process, techniques used, and the challenges I faced during production. The scene includes complex character movements, dynamic camera work, and detailed background animation that brings this classic moment to life.'}
        </div>
        {video.tags &&
          <div className="flex flex-wrap gap-2 mt-3">
            {video.tags.map((tag: string) => (
              <Badge variant="secondary" key={tag}>#{tag}</Badge>
            ))}
          </div>
        }
      </div>
    </TabsContent>
    <TabsContent value="related">
      <div className="space-y-3">
        {relatedEpisodes.map((episode) => (
          <div key={episode.id} className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <div className="relative w-24 h-14 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden shrink-0">
              <img src={episode.thumbnail} alt={episode.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">{episode.duration}</div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2 mb-1">{episode.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{episode.channel}</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{episode.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </TabsContent>
  </Tabs>
);

export default TabbedContentArea;
