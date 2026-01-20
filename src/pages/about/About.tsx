import React, { useEffect, useRef, useState } from "react";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [isPiP, setIsPiP] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page entrance animation
    window.scrollTo(0, 0);

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 },
    );

    // Observe all animated sections
    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Picture-in-Picture scroll handler
    const handleScroll = () => {
      if (!videoContainerRef.current) return;

      const rect = videoContainerRef.current.getBoundingClientRect();
      const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;

      setIsPiP(isOutOfView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-white animate-fadeIn"
      style={{
        fontFamily: "'Roboto', 'Open Sans', sans-serif",
        animation: "fadeIn 0.6s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.8s ease-out forwards;
        }

        [data-animate] {
          opacity: 0;
        }

        [data-animate].visible {
          opacity: 1;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
      `}</style>

      {/* Hero Section with Image */}
      <section className="relative h-[65vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-green-900/70 to-gray-800/85 z-10" />
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
          alt="Exelpack Facility"
          className="w-full h-full object-cover"
          style={{ animation: "scaleIn 1s ease-out" }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-6">
            <div className="inline-block px-4 py-1 bg-green-600/30 backdrop-blur-sm border border-green-400/30 rounded-full mb-6 animate-slideUp stagger-1">
              <p className="text-xs tracking-wider uppercase text-green-300 font-semibold">
                About Us
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp stagger-2">
              The New Way to Progress
            </h1>
            <p className="text-base md:text-lg text-gray-200 animate-slideUp stagger-3">
              Leading packaging innovation since 2005
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview with Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div
              id="company-image"
              data-animate
              className={`relative ${
                isVisible["company-image"] ? "animate-slideInLeft visible" : ""
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80"
                alt="Exelpack Corporation"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div
              id="company-content"
              data-animate
              className={
                isVisible["company-content"]
                  ? "animate-slideInRight visible"
                  : ""
              }
            >
              <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Exelpack Corporation
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-justify">
                  Established in September 2005, Exelpack Corporation has grown
                  to become a trusted name in the packaging industry. Our
                  state-of-the-art facility spans 3,700 square meters at the
                  PEZA Zone at Filinvest Technology Park, Ciudad de Calamba,
                  Laguna, strategically positioned to serve both local and
                  international clients with efficiency and reliability.
                </p>
                <p className="text-justify">
                  We specialize in the design and fabrication of polymer foams
                  and the conversion of corrugated boxes, providing customized
                  packaging solutions that meet the exacting standards of
                  various industries. As an ISO 9001:2015 certified company, we
                  uphold the highest standards in quality management, ensuring
                  that every product we deliver meets strict industry
                  requirements.
                </p>
                <p className="text-justify">
                  At Exelpack Corporation, we go beyond fabrication—we provide
                  total packaging solutions that protect, promote, and add value
                  to every product. Our dedication to innovation, quality, and
                  sustainability drives us to be a trusted partner for
                  businesses across diverse industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div
              id="mission"
              data-animate
              className={isVisible["mission"] ? "animate-slideUp visible" : ""}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-justify">
                  Our mission is to deliver innovative and sustainable packaging
                  solutions that meet the highest standards of quality. We are
                  committed to on-time delivery, competitive pricing, and
                  building lasting partnerships with our customers through
                  reliability, integrity, and continuous improvement. We empower
                  our employees as key contributors to our success by fostering
                  a culture of collaboration, growth, and shared responsibility.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div
              id="vision"
              data-animate
              className={
                isVisible["vision"] ? "animate-slideUp visible stagger-2" : ""
              }
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed text-justify">
                  To be the most trusted packaging partner in the
                  country—delivering world-class quality, sustainable
                  innovation, and exceptional value. We aim to lead the industry
                  through operational excellence, strong customer relationships,
                  and a people-driven culture that ensures long-term growth for
                  our stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 20th Anniversary Section with Building Image */}
      <section
        id="anniversary"
        data-animate
        className={`py-16 relative overflow-hidden ${
          isVisible["anniversary"] ? "animate-scaleIn visible" : ""
        }`}
      >
        {/* Background Image with Green Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
            alt="Exelpack Corporation Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-600/85"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto text-white">
            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-xs tracking-wider uppercase font-semibold">
                Milestone
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6">20th Anniversary</h2>
            <p className="text-lg text-green-50 leading-relaxed text-justify">
              Two decades of excellence in packaging solutions. From our humble
              beginnings in 2005 to becoming an industry leader, we've
              continuously evolved to meet the changing needs of our clients
              while maintaining our commitment to quality, innovation, and
              customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Company Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div
              id="video-header"
              data-animate
              className={`text-center mb-12 ${
                isVisible["video-header"] ? "animate-slideUp visible" : ""
              }`}
            >
              <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                See Exelpack in Action
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our state-of-the-art facility, innovative processes,
                and dedicated team committed to delivering excellence
              </p>
            </div>

            {/* Enhanced Video Container with Decorative Frame */}
            <div
              id="video-container"
              ref={videoContainerRef}
              data-animate
              className={`relative ${
                isVisible["video-container"] ? "animate-scaleIn visible" : ""
              } ${isPiP ? "opacity-50" : ""}`}
            >
              {/* Animated glow effects */}
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-green-400/40 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute -bottom-8 -right-8 w-48 h-48 bg-yellow-400/40 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div className="absolute top-1/2 -right-6 w-32 h-32 bg-green-300/30 rounded-full blur-2xl"></div>
              <div className="absolute top-1/4 -left-6 w-28 h-28 bg-yellow-300/30 rounded-full blur-2xl"></div>

              {/* Triple-layer decorative frame */}
              <div className="relative bg-gradient-to-br from-green-500 via-green-400 to-yellow-400 p-1.5 rounded-[2rem] shadow-2xl">
                <div className="relative bg-gradient-to-br from-green-100 via-white to-yellow-100 p-5 rounded-[1.875rem]">
                  <div className="relative bg-white p-5 rounded-3xl shadow-xl">
                    {/* Video container */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white ring-4 ring-green-200/50">
                      <div className="aspect-video bg-black">
                        {!isPiP && (
                          <iframe
                            id="main-video"
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
                            title="Exelpack Corporation Company Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        )}
                      </div>
                    </div>

                    {/* Enhanced corner accents with double borders */}
                    <div className="absolute -top-3 -left-3 w-16 h-16 border-t-[6px] border-l-[6px] border-green-600 rounded-tl-3xl shadow-lg"></div>
                    <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-green-400 rounded-tl-2xl"></div>

                    <div className="absolute -top-3 -right-3 w-16 h-16 border-t-[6px] border-r-[6px] border-green-600 rounded-tr-3xl shadow-lg"></div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-green-400 rounded-tr-2xl"></div>

                    <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-[6px] border-l-[6px] border-yellow-500 rounded-bl-3xl shadow-lg"></div>
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-yellow-400 rounded-bl-2xl"></div>

                    <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-[6px] border-r-[6px] border-yellow-500 rounded-br-3xl shadow-lg"></div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-yellow-400 rounded-br-2xl"></div>

                    {/* Decorative dots on sides */}
                    <div className="absolute top-1/2 -left-4 w-3 h-3 bg-green-600 rounded-full shadow-lg"></div>
                    <div className="absolute top-1/2 -right-4 w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Caption */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 italic">
                Experience our journey of innovation and excellence in packaging
                solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Picture-in-Picture Video - Separate instance */}
      {isPiP && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideInPiP">
          <div className="relative bg-gradient-to-br from-green-500 via-green-400 to-yellow-400 p-1 rounded-2xl shadow-2xl">
            <div className="relative bg-white p-2 rounded-xl">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-white w-80">
                <div className="aspect-video bg-black">
                  <iframe
                    id="pip-video"
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&autoplay=1"
                    title="Exelpack Corporation Company Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => {
                  setIsPiP(false);
                  videoContainerRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Picture-in-Picture Video */}
      {isPiP && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideInPiP">
          <div className="relative bg-gradient-to-br from-green-500 via-green-400 to-yellow-400 p-1 rounded-2xl shadow-2xl">
            <div className="relative bg-white p-2 rounded-xl">
              <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-white w-80">
                <div className="aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Exelpack Corporation Company Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsPiP(false)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div
              id="why-choose-header"
              data-animate
              className={`text-center mb-12 ${
                isVisible["why-choose-header"] ? "animate-slideUp visible" : ""
              }`}
            >
              <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase">
                  Our Advantages
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We combine expertise, quality, and innovation to deliver
                packaging solutions that exceed expectations
              </p>
            </div>

            <div
              id="why-choose-grid"
              data-animate
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
                isVisible["why-choose-grid"] ? "visible" : ""
              }`}
            >
              <div
                className={`bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 hover:shadow-lg transition-all ${
                  isVisible["why-choose-grid"]
                    ? "animate-slideUp stagger-1"
                    : ""
                }`}
              >
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What can we do to protect your valuable products?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  Custom-designed packaging solutions tailored to your specific
                  product protection needs
                </p>
              </div>

              <div
                className={`bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all ${
                  isVisible["why-choose-grid"]
                    ? "animate-slideUp stagger-2"
                    : ""
                }`}
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Do you possess state-of-the-art machineries for packaging?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  Advanced equipment and technology ensuring precision and
                  quality in every package
                </p>
              </div>

              <div
                className={`bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl border border-yellow-100 hover:shadow-lg transition-all ${
                  isVisible["why-choose-grid"]
                    ? "animate-slideUp stagger-3"
                    : ""
                }`}
              >
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Does your team have enough expertise?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  Skilled professionals with years of experience in packaging
                  design and production
                </p>
              </div>

              <div
                className={`bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-all ${
                  isVisible["why-choose-grid"]
                    ? "animate-slideUp stagger-4"
                    : ""
                }`}
              >
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Do you have trained technical people?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  Certified technicians ensuring quality control and technical
                  excellence
                </p>
              </div>

              <div
                className={`bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-100 hover:shadow-lg transition-all ${
                  isVisible["why-choose-grid"]
                    ? "animate-slideUp stagger-5"
                    : ""
                }`}
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">5</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Do you have a factory for your packaging?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  3,700 sqm facility at Filinvest Technology Park equipped for
                  large-scale production
                </p>
              </div>

              <div
                className={`bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl border border-teal-100 hover:shadow-lg transition-all ${
                  isVisible["why-choose-grid"]
                    ? "animate-slideUp stagger-6"
                    : ""
                }`}
              >
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">6</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Are you an ISO/TS certified company?
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  ISO 9001:2015 certified, ensuring international quality
                  management standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div
              id="cta"
              data-animate
              className={`bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100 ${
                isVisible["cta"] ? "animate-scaleIn visible" : ""
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can provide the perfect packaging solution
                for your business needs
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="#products"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  View Products
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
