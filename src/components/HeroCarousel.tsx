import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroSlides = [
  {
    id: 1,
    title: "Easter Celebration Service 2024",
    subtitle: "Join us for a special celebration of Christ's resurrection with powerful worship and inspiring messages",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    ctaText: "Watch Now",
    category: "Live Event"
  },
  {
    id: 2,
    title: "Sunday Morning Worship",
    subtitle: "Experience life-changing worship every Sunday with our global community",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    ctaText: "Join Live",
    category: "Live Stream"
  },
  {
    id: 3,
    title: "Bible Study Series: Acts",
    subtitle: "Dive deep into the early church with Pastor Johnson in this comprehensive study",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    ctaText: "Start Series",
    category: "Bible Study"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden rounded-3xl shadow-2xl mx-6">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-8">
              <div className="max-w-3xl text-white space-y-6 animate-slide-in-blur">
                <div className="inline-block bg-[#FDBD34] text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  {slide.category}
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                  {slide.subtitle}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <Button className="gradient-bg text-black px-8 py-4 text-lg font-semibold rounded-xl btn-modern hover:scale-105">
                    <Play className="mr-3 h-6 w-6" fill="currentColor" />
                    {slide.ctaText}
                  </Button>
                  <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl btn-modern backdrop-blur-sm">
                    <Info className="mr-3 h-5 w-5" />
                    More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-[#FDBD34] hover:text-black btn-modern h-14 w-14"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-[#FDBD34] hover:text-black btn-modern h-14 w-14"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[#FDBD34] scale-125 shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
