import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Refs for scroll animations
  const statsRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const industriesRef = useRef(null);
  const productsRef = useRef(null);
  const ctaRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const industriesInView = useInView(industriesRef, {
    once: true,
    margin: "-100px",
  });
  const productsInView = useInView(productsRef, {
    once: true,
    margin: "-100px",
  });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const slides = [
    {
      title: "Leading Packaging Solutions",
      subtitle: "Innovation Meets Quality",
      description: "Trusted polymer foam and box conversion experts since 2005",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    },
    {
      title: "ISO Certified Excellence",
      subtitle: "Quality You Can Trust",
      description: "Certified processes ensuring the highest standards",
      image:
        "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1200&q=80",
    },
    {
      title: "Custom Foam Solutions",
      subtitle: "Designed for Protection",
      description: "Tailored packaging for your specific needs",
      image:
        "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1200&q=80",
    },
    {
      title: "Premium Box Conversion",
      subtitle: "Precision Manufacturing",
      description: "High-quality corrugated solutions for every industry",
      image:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=80",
    },
  ];

  const stats = [
    { value: "20", label: "Years of Excellence", icon: "🏆" },
    { value: "3,700", label: "Square Meters", icon: "🏭" },
    {
      value: "ISO",
      label: "Certified Quality",
      isISO: true,
    },
    { value: "100%", label: "Satisfaction", icon: "⭐" },
  ];

  const features = [
    {
      icon: "🎯",
      title: "Custom Solutions",
      description: "Tailored packaging designed for your specific requirements",
    },
    {
      icon: "🛡️",
      title: "Quality Assured",
      description: "ISO certified processes and rigorous quality control",
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Cutting-edge technology and innovative design approaches",
    },
    {
      icon: "🤝",
      title: "Customer Focus",
      description: "Dedicated support and partnership every step of the way",
    },
  ];

  const industries = [
    { name: "Electronics", icon: "💻" },
    { name: "Semiconductors", icon: "🔬" },
    { name: "Food & Beverage", icon: "🍱" },
    { name: "Pharmaceuticals", icon: "💊" },
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
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        rotateX: 10,
        y: 50,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateX: 0,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        transition: {
          duration: 0.4,
          ease: [0.7, 0, 0.84, 0],
        },
      }}
      className="min-h-screen bg-white relative overflow-hidden"
      style={{
        fontFamily: "'Roboto', 'Open Sans', sans-serif",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Floating background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-yellow-200/20 to-green-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/10 to-purple-200/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      {/* Hero Slider - Enhanced with parallax effect */}
      <section className="relative h-[65vh] overflow-hidden -mt-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Enhanced gradient overlay with mesh effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-green-900/70 to-gray-800/80 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)] z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover scale-110 transition-transform duration-[8000ms]"
              style={{
                transform: index === currentSlide ? "scale(1)" : "scale(1.1)",
              }}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-6">
                <div
                  className="inline-block px-4 py-1 bg-green-600/30 backdrop-blur-sm border border-green-400/30 rounded-full mb-6 shadow-lg"
                  style={{
                    animation:
                      index === currentSlide
                        ? "slideDown 0.8s ease-out"
                        : "none",
                    opacity: index === currentSlide ? 1 : 0,
                  }}
                >
                  <p className="text-sm tracking-wider uppercase text-green-300 font-medium">
                    {slide.subtitle}
                  </p>
                </div>
                <h1
                  className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-2xl"
                  style={{
                    animation:
                      index === currentSlide
                        ? "slideUp 1s ease-out 0.2s both"
                        : "none",
                    opacity: index === currentSlide ? 1 : 0,
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 drop-shadow-lg"
                  style={{
                    animation:
                      index === currentSlide
                        ? "fadeIn 1s ease-out 0.4s both"
                        : "none",
                    opacity: index === currentSlide ? 1 : 0,
                  }}
                >
                  {slide.description}
                </p>
                <div
                  className="flex gap-4 justify-center"
                  style={{
                    animation:
                      index === currentSlide
                        ? "fadeIn 1s ease-out 0.6s both"
                        : "none",
                    opacity: index === currentSlide ? 1 : 0,
                  }}
                >
                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all hover:shadow-xl hover:-translate-y-0.5 hover:scale-105">
                    Explore Products
                  </button>
                  <button className="px-6 py-3 border-2 border-white/80 hover:bg-white hover:text-gray-900 text-white font-semibold rounded-lg transition-all hover:scale-105">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Enhanced navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg"
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
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
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg"
          aria-label="Next"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Enhanced indicators with glow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-green-400 w-10 shadow-lg shadow-green-400/50"
                  : "bg-white/40 w-6 hover:bg-white/60"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section - Enhanced with gradient cards */}
      <motion.section
        ref={statsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-16 bg-gradient-to-b from-white to-gray-50 relative"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={
                  statsInView
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          delay: index * 0.1,
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      }
                    : { opacity: 0, y: 30, scale: 0.9 }
                }
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all group border border-gray-100 hover:border-green-200 relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/0 group-hover:from-green-50/50 group-hover:to-transparent transition-all duration-300"></div>

                <div className="text-center relative z-10">
                  {stat.isISO ? (
                    <>
                      <div className="flex justify-center mb-3">
                        <svg
                          viewBox="0 0 120 120"
                          className="w-16 h-16 group-hover:scale-110 transition-transform"
                        >
                          <circle
                            cx="60"
                            cy="60"
                            r="55"
                            fill="none"
                            stroke="#003366"
                            strokeWidth="4"
                          />
                          <circle cx="60" cy="60" r="42" fill="#003366" />
                          <path
                            id="topArc1"
                            d="M 20,60 A 40,40 0 0,1 100,60"
                            fill="none"
                          />
                          <text
                            fill="#003366"
                            fontSize="9"
                            fontWeight="bold"
                            letterSpacing="1"
                          >
                            <textPath
                              href="#topArc1"
                              startOffset="50%"
                              textAnchor="middle"
                            >
                              CERTIFIED
                            </textPath>
                          </text>
                          <path
                            id="bottomArc1"
                            d="M 100,60 A 40,40 0 0,1 20,60"
                            fill="none"
                          />
                          <text
                            fill="#003366"
                            fontSize="9"
                            fontWeight="bold"
                            letterSpacing="1"
                          >
                            <textPath
                              href="#bottomArc1"
                              startOffset="50%"
                              textAnchor="middle"
                            >
                              COMPANY
                            </textPath>
                          </text>
                          <text
                            x="60"
                            y="58"
                            fill="white"
                            fontSize="20"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            ISO
                          </text>
                          <text
                            x="60"
                            y="72"
                            fill="white"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            9001:2015
                          </text>
                        </svg>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-3xl mb-2 group-hover:animate-bounce">
                        {stat.icon}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2 group-hover:from-green-500 group-hover:to-green-600 transition-all">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section - Enhanced with floating effect */}
      <motion.section
        ref={aboutRef}
        initial={{ opacity: 0, x: -50 }}
        animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-20 bg-white relative"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image Grid with enhanced effects */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all group">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
                      alt="Manufacturing"
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all group">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                      alt="Team"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all group">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                      alt="Quality"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all group">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
                      alt="Facility"
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              {/* Enhanced decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-full mb-4 shadow-sm">
                <span className="text-xs font-semibold tracking-wider uppercase">
                  About Exelpack
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Protecting What{" "}
                <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Matters Most
                </span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-green-600 via-green-500 to-yellow-500 mb-6 rounded-full shadow-lg shadow-green-500/30"></div>
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                Since 2005, Exelpack Corporation has been at the forefront of
                packaging innovation. Operating from our state-of-the-art 3,700
                square meter facility in Filinvest Technology Park, Calamba, we
                specialize in custom-designed polyethylene foams and precision
                box conversion.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8 text-justify">
                Our ISO 9001:2015 certification reflects our unwavering
                commitment to quality and excellence. We don't just create
                packaging—we create protection solutions that safeguard your
                valuable products throughout their journey.
              </p>

              {/* ISO Certifications with enhanced styling */}
              <div className="flex items-center gap-6 mb-8 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"></div>
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full relative z-10"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="95"
                      fill="none"
                      stroke="#003366"
                      strokeWidth="8"
                    />
                    <circle cx="100" cy="100" r="70" fill="#003366" />
                    <path
                      id="topArc"
                      d="M 30,100 A 70,70 0 0,1 170,100"
                      fill="none"
                    />
                    <text
                      fill="#003366"
                      fontSize="18"
                      fontWeight="bold"
                      letterSpacing="2"
                    >
                      <textPath
                        href="#topArc"
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        CERTIFIED
                      </textPath>
                    </text>
                    <path
                      id="bottomArc"
                      d="M 170,100 A 70,70 0 0,1 30,100"
                      fill="none"
                    />
                    <text
                      fill="#003366"
                      fontSize="18"
                      fontWeight="bold"
                      letterSpacing="2"
                    >
                      <textPath
                        href="#bottomArc"
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        COMPANY
                      </textPath>
                    </text>
                    <text
                      x="100"
                      y="90"
                      fill="white"
                      fontSize="32"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ISO
                    </text>
                    <text
                      x="100"
                      y="115"
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      9001:2015
                    </text>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">
                    ISO 9001:2015 Certified
                  </h4>
                  <p className="text-sm text-gray-600 text-justify">
                    Internationally recognized quality management system
                  </p>
                </div>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all hover:shadow-xl hover:-translate-y-0.5 hover:scale-105 shadow-lg shadow-green-500/30">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section - Enhanced cards with icons */}
      <motion.section
        ref={featuresRef}
        initial={{ opacity: 0, y: 50 }}
        animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-100/30 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Exelpack
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-green-600 to-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine innovation, quality, and customer service to deliver
              exceptional packaging solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                animate={
                  featuresInView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        transition: {
                          delay: index * 0.15,
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      }
                    : { opacity: 0, y: 30, rotate: -5 }
                }
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all group border border-gray-100 hover:border-green-200 relative overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-blue-50/0 group-hover:from-green-50 group-hover:to-blue-50/30 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Industries Section - Enhanced with modern cards */}
      <motion.section
        ref={industriesRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          industriesInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-green-600 to-blue-600 mx-auto rounded-full mb-4 shadow-lg shadow-green-500/30"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted packaging solutions across diverse sectors
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  industriesInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: index * 0.1,
                          duration: 0.4,
                          ease: "easeOut",
                        },
                      }
                    : { opacity: 0, scale: 0.8 }
                }
                className="bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 p-6 rounded-2xl border-2 border-green-200/50 hover:border-green-400 hover:shadow-2xl transition-all group text-center relative overflow-hidden"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-blue-400/0 group-hover:from-green-400/10 group-hover:to-blue-400/10 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-md group-hover:shadow-xl">
                    <span className="text-4xl">{industry.icon}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide group-hover:text-green-700 transition-colors">
                    {industry.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Section - Enhanced with overlay effects */}
      <motion.section
        ref={productsRef}
        initial={{ opacity: 0, y: 60 }}
        animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-green-200/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Product Range
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-green-600 to-yellow-600 mx-auto rounded-full mb-4 shadow-lg shadow-green-500/30"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive packaging solutions designed to protect and enhance
              your products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="relative h-80 overflow-hidden rounded-2xl group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80"
                alt="Polymer Foams"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-800/60 to-transparent group-hover:from-green-900/100 transition-all flex flex-col justify-end p-8">
                {/* Decorative accent */}
                <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-yellow-400 mb-4 group-hover:w-24 transition-all"></div>
                <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">
                  Polymer Foams
                </h3>
                <p className="text-green-100 mb-4 text-justify group-hover:translate-x-2 transition-transform">
                  Custom protective foam solutions engineered for maximum
                  protection
                </p>
                <button className="self-start px-5 py-2.5 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all hover:shadow-xl hover:scale-105 group-hover:translate-x-2">
                  Learn More →
                </button>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80"
                alt="Box Conversion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/95 via-yellow-800/60 to-transparent group-hover:from-yellow-900/100 transition-all flex flex-col justify-end p-8">
                {/* Decorative accent */}
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-green-400 mb-4 group-hover:w-24 transition-all"></div>
                <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">
                  Box Conversion
                </h3>
                <p className="text-yellow-100 mb-4 text-justify group-hover:translate-x-2 transition-transform">
                  Premium corrugated packaging with precision manufacturing
                </p>
                <button className="self-start px-5 py-2.5 bg-white text-yellow-700 font-semibold rounded-lg hover:bg-yellow-50 transition-all hover:shadow-xl hover:scale-105 group-hover:translate-x-2">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section - Enhanced with particles effect */}
      <motion.section
        ref={ctaRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-20 relative overflow-hidden"
      >
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=80"
            alt="Packaging Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/95 via-green-700/90 to-green-800/95"></div>
          {/* Mesh overlay for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        {/* Enhanced decorative blurred circles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-green-100">
              Get Started Today
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Ready to Protect Your Products?
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-white to-yellow-300 mx-auto rounded-full mb-6 shadow-lg shadow-white/30"></div>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto drop-shadow-lg">
            Let's discuss how we can create the perfect packaging solution for
            your business
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-white text-green-700 hover:bg-green-50 transition-all font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:scale-105">
              Get a Quote
            </button>
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-green-700 transition-all font-bold rounded-xl hover:scale-105 backdrop-blur-sm">
              View Products
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-green-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">20 Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Custom Solutions</span>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
