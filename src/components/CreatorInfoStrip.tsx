
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, BellRing } from "lucide-react";

interface CreatorInfoStripProps {
  channel: string;
  isSubscribed: boolean;
  onSubscribe: () => void;
  followers: string | number;
  avatarUrl?: string;
}

const CreatorInfoStrip: React.FC<CreatorInfoStripProps> = ({
  channel,
  isSubscribed,
  onSubscribe,
  followers,
  avatarUrl
}) => (
  <div className="flex items-center gap-3 w-full py-2 border-b border-gray-200 dark:border-gray-800">
    <Avatar className="h-9 w-9 shrink-0">
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} />
      ) : (
        <AvatarFallback>{channel?.[0] ?? "U"}</AvatarFallback>
      )}
    </Avatar>
    <div className="flex-1">
      <p className="font-medium text-sm text-gray-900 dark:text-white">{channel}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{followers} followers</p>
    </div>
    <Button
      size="sm"
      onClick={onSubscribe}
      className={isSubscribed ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}
    >
      {isSubscribed ? (
        <>
          <BellRing className="h-4 w-4 mr-1" />Subscribed
        </>
      ) : (
        <>
          <Bell className="h-4 w-4 mr-1" />Subscribe
        </>
      )}
    </Button>
    <Button variant="outline" size="sm" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white ml-2">
      Charge
    </Button>
  </div>
);

export default CreatorInfoStrip;
