
import DoveIcon from "@/components/brand/DoveIcon";

const quickLinks = [
  { name: 'Sermons', icon: '🎙️', count: '12.5K', gradient: 'from-blue-500 to-purple-600', href: '/explore?category=sermons' },
  { name: 'Worship', icon: '🎵', count: '8.2K', gradient: 'from-purple-500 to-pink-500', href: '/explore?category=worship' },
  { name: 'Bible Study', icon: '📖', count: '6.1K', gradient: 'from-green-500 to-blue-500', href: '/explore?category=bible-study' },
  { name: 'Podcasts', icon: '🎧', count: '4.8K', gradient: 'from-yellow-500 to-orange-500', href: '/explore?category=podcasts' },
  { name: 'Movies', icon: '🎬', count: '2.3K', gradient: 'from-red-500 to-pink-500', href: '/explore?category=movies' },
  { name: 'Kids', icon: '👨‍👩‍👧‍👦', count: '3.1K', gradient: 'from-cyan-500 to-blue-500', href: '/kids' },
  { name: 'Devotionals', icon: '🙏', count: '5.7K', gradient: 'from-indigo-500 to-purple-500', href: '/explore?category=devotionals' },
  { name: 'Testimonies', icon: '✨', count: '1.9K', gradient: 'from-pink-500 to-rose-500', href: '/explore?category=testimonies' },
];

const QuickLinksSection = () => (
  <section className="w-full px-4 md:px-6 py-8">
    <div className="w-full">
      <div className="flex items-center gap-4 mb-8">
        <DoveIcon size="lg" animate className="text-[#FDBD34]" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explore by Category</h2>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
        {quickLinks.map((link) => (
          <div
            key={link.name}
            className="group cursor-pointer"
            onClick={() => window.location.href = link.href}
          >
            <div className={`bg-gradient-to-br ${link.gradient} rounded-2xl p-6 card-hover glass-effect border border-white/10 relative overflow-hidden`}>
              <div className="absolute top-2 right-2">
                <DoveIcon size="sm" className="text-white/30" />
              </div>
              <div className="text-3xl mb-3 animate-float">{link.icon}</div>
              <span className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors text-center block">
                {link.name}
              </span>
              <span className="text-xs text-white/80 mt-2 block">{link.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickLinksSection;
