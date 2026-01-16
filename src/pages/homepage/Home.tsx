import { useEffect, useState } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "Exelpack Corporation",
      subtitle: "Leading Packaging Solutions",
      description: "Polymer foam design and box conversion since 2005",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    },
    {
      title: "ISO Certified Quality",
      subtitle: "Excellence in Manufacturing",
      description: "ISO 9001:2008 certified processes and standards",
      image:
        "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1200&q=80",
    },
    {
      title: "Polymer Foam Solutions",
      subtitle: "Custom Protection Design",
      description: "Innovative packaging for electronics and pharmaceuticals",
      image:
        "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1200&q=80",
    },
    {
      title: "Box Conversion",
      subtitle: "Precision Manufacturing",
      description: "Premium corrugated and custom box solutions",
      image:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=80",
    },
  ];

  const stats = [
    { value: "19+", label: "Years" },
    { value: "3,700", label: "Sq.m" },
    { value: "ISO", label: "Certified" },
    { value: "100%", label: "Quality" },
  ];

  const features = [
    { icon: "📦", title: "Custom Solutions" },
    { icon: "🛡️", title: "Quality Assured" },
    { icon: "💡", title: "Innovation" },
    { icon: "👥", title: "Customer Focus" },
  ];

  const industries = [
    "Electronics",
    "Semiconductors",
    "Food & Beverage",
    "Pharmaceuticals",
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider - Minimalist */}
      <section className="relative h-[70vh] overflow-hidden -mt-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-6">
                <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-90">
                  {slide.subtitle}
                </p>
                <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Minimal Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-all"
          aria-label="Previous"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-all"
          aria-label="Next"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Minimal Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-0.5 transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 w-6 hover:bg-white/75"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats - Clean Grid */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm tracking-wider uppercase text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About - Minimal */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-light text-gray-900 mb-8">
              About Exelpack
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Established in 2005, we operate from a 3,700 square meter facility
              at Filinvest Technology Park, Calamba. Specializing in polymer
              foams and box conversion with ISO 9001:2008 certified quality
              standards.
            </p>
          </div>
        </div>
      </section>

      {/* Features - Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-base font-medium text-gray-900">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries - Simple List */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-12">
            Industries
          </h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="px-6 py-3 border border-gray-300 hover:border-gray-900 transition-colors"
              >
                <span className="text-sm tracking-wider uppercase text-gray-700">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products - Two Column */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-16">
            Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-6xl mx-auto">
            <div className="relative h-96 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80"
                alt="Polymer Foams"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <h3 className="text-3xl font-light text-white tracking-wide">
                  Polymer Foams
                </h3>
              </div>
            </div>
            <div className="relative h-96 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80"
                alt="Box Conversion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <h3 className="text-3xl font-light text-white tracking-wide">
                  Box Conversion
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Minimal */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto font-light">
            Contact us to discuss your packaging needs
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              Contact Us
            </button>
            <button className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
              Get Quote
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Clean */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-900 mb-2 font-medium">
            Exelpack Corporation
          </p>
          <p className="text-sm text-gray-600">
            Filinvest Technology Park, Calamba, Laguna 4027
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
