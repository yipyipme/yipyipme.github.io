
import BrandedButton from "@/components/brand/BrandedButton";
import DoveIcon from "@/components/brand/DoveIcon";
import { Play, Users, Calendar, Zap } from "lucide-react";

const LiveBannerSection = () => (
  <section className="w-full px-4 md:px-6 py-8">
    <div className="w-full">
      <div className="relative gradient-bg rounded-3xl p-8 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-black font-bold text-lg uppercase tracking-wider">LIVE NOW</span>
              <DoveIcon size="sm" className="text-black animate-float" />
            </div>
            <h3 className="text-4xl font-bold text-black">Sunday Morning Service</h3>
            <p className="text-black/80 text-xl">Join 2.3K viewers watching live</p>
            <BrandedButton showIcon>
              <Play className="mr-3 h-6 w-6" fill="currentColor" />
              Join Live Service
            </BrandedButton>
          </div>
          <div className="hidden md:flex items-center gap-8 text-black">
            <div className="text-center space-y-2">
              <Users className="h-12 w-12 mx-auto" />
              <div className="text-3xl font-bold">2.3K</div>
              <div className="text-sm font-medium">Watching</div>
            </div>
            <div className="text-center space-y-2">
              <Calendar className="h-12 w-12 mx-auto" />
              <div className="text-3xl font-bold">9:00</div>
              <div className="text-sm font-medium">AM EST</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LiveBannerSection;
