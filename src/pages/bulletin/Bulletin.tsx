import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Calendar, MapPin, Megaphone } from "lucide-react";
import type { Bulletin } from "../../types";
import api from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Bulletins: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [pageLoaded, setPageLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const bulletinTypes = [
    { value: "all", label: "All Updates", icon: "📋" },
    { value: "announcement", label: "Announcements", icon: "📢" },
    { value: "event", label: "Events", icon: "🎉" },
    { value: "hiring", label: "Careers", icon: "💼" },
    { value: "achievement", label: "Achievements", icon: "🏆" },
  ];

  // Page load animation
  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 50);

    // Setup Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Fetch bulletins when type changes
  useEffect(() => {
    fetchBulletins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  // Observe cards after render
  useEffect(() => {
    if (!loading && bulletins.length > 0) {
      const timer = setTimeout(() => {
        const cards = document.querySelectorAll(".bulletin-card");
        cards.forEach((card) => {
          if (observerRef.current) {
            observerRef.current.observe(card);
          }
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, bulletins]);

  const fetchBulletins = async () => {
    try {
      setLoading(true);
      const params =
        selectedType !== "all"
          ? { type: selectedType, limit: 50 }
          : { limit: 50 };
      const response = await api.getBulletins(params);
      console.log("Bulletins API Response:", response);
      console.log("Bulletins Data:", response.bulletins);
      setBulletins(response.bulletins || []);
    } catch (error) {
      console.error("Error fetching bulletins:", error);
      setBulletins([]);
    } finally {
      setLoading(false);
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-green-100 text-green-700 border-2 border-green-200";
      case "event":
        return "bg-blue-100 text-blue-700 border-2 border-blue-200";
      case "hiring":
        return "bg-amber-100 text-amber-700 border-2 border-amber-200";
      case "achievement":
        return "bg-purple-100 text-purple-700 border-2 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-2 border-gray-200";
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 transition-opacity duration-700 ${
        pageLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ fontFamily: "'Roboto', 'Open Sans', sans-serif" }}
    >
      <style>{`
        @keyframes fadeInUp {
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
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-1 {
          width: 150px;
          height: 150px;
          top: 10%;
          left: 10%;
          animation: float 8s ease-in-out infinite;
        }

        .particle-2 {
          width: 100px;
          height: 100px;
          top: 60%;
          right: 15%;
          animation: float 10s ease-in-out infinite 1s;
        }

        .particle-3 {
          width: 120px;
          height: 120px;
          bottom: 20%;
          left: 20%;
          animation: float 12s ease-in-out infinite 2s;
        }

        .particle-4 {
          width: 80px;
          height: 80px;
          top: 30%;
          right: 25%;
          animation: float 9s ease-in-out infinite 0.5s;
        }

        .particle-5 {
          width: 90px;
          height: 90px;
          bottom: 35%;
          right: 10%;
          animation: float 11s ease-in-out infinite 1.5s;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }

        .bulletin-card {
          opacity: 0;
          transform: translateY(30px);
          transition: none;
        }

        .bulletin-card.animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .filter-tab {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }

        .filter-tab:nth-child(1) { animation-delay: 0.1s; }
        .filter-tab:nth-child(2) { animation-delay: 0.2s; }
        .filter-tab:nth-child(3) { animation-delay: 0.3s; }
        .filter-tab:nth-child(4) { animation-delay: 0.4s; }
        .filter-tab:nth-child(5) { animation-delay: 0.5s; }
      `}</style>

      {/* Hero Section with Background - ENHANCED */}
      <section className="relative py-32 md:py-40 -mt-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80"
            alt="Business Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-green-900/85 to-gray-800/90"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 opacity-30">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block px-4 py-1 bg-green-600/30 backdrop-blur-sm border border-green-400/30 rounded-full mb-6 animate-pulse-subtle">
              <span className="text-xs tracking-wider uppercase text-green-300 font-semibold">
                Company Bulletin
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-green-50 to-white">
              News, Events & Opportunities
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              {isAuthenticated
                ? "Stay updated with the latest company announcements and opportunities"
                : "Login to view full bulletin details and stay connected"}
            </p>

            {/* Stats bar - subtle and professional */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-green-300">
                  {bulletins.length}
                </div>
                <div className="text-xs text-gray-300 mt-1">Active Posts</div>
              </div>
              <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-green-300">
                  {bulletinTypes.length - 1}
                </div>
                <div className="text-xs text-gray-300 mt-1">Categories</div>
              </div>
              <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-green-300">24/7</div>
                <div className="text-xs text-gray-300 mt-1">Updated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Filter Tabs */}
        <div className="mb-12">
          <div className="flex gap-3 flex-wrap justify-center">
            {bulletinTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`filter-tab px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedType === type.value
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bulletins Grid */}
        {loading ? (
          <div className="py-32 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {bulletins.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bulletins.map((bulletin) => (
                  <BulletinCard
                    key={bulletin.id}
                    bulletin={bulletin}
                    isAuthenticated={isAuthenticated}
                    getTypeBadgeColor={getTypeBadgeColor}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Megaphone className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No bulletins found
                </h3>
                <p className="text-base text-gray-600">
                  Check back later for new announcements and updates
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const BulletinCard: React.FC<{
  bulletin: Bulletin;
  isAuthenticated: boolean;
  getTypeBadgeColor: (type: string) => string;
}> = ({ bulletin, isAuthenticated, getTypeBadgeColor }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link
      to={isAuthenticated ? `/bulletins/${bulletin.id}` : "/login"}
      className="bulletin-card group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-green-400 hover:-translate-y-2 relative"
    >
      {/* Subtle Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="p-8 space-y-5">
        {/* Type Badge & Date - More visible */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span
            className={`px-4 py-2 rounded-full text-xs font-semibold ${getTypeBadgeColor(
              bulletin.type,
            )} shadow-sm`}
          >
            {bulletin.type.charAt(0).toUpperCase() + bulletin.type.slice(1)}
          </span>
          {bulletin.event_date && (
            <div className="flex items-center gap-2 text-xs text-gray-600 font-semibold bg-gray-50 px-3 py-1.5 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(bulletin.event_date)}</span>
            </div>
          )}
        </div>

        {/* Title - More prominent */}
        <h3 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-green-600 transition-colors line-clamp-2 min-h-[3.5rem]">
          {bulletin.title}
        </h3>

        {/* Description - Better contrast */}
        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed min-h-[4.5rem] font-medium">
          {isAuthenticated ? bulletin.description : bulletin.short_description}
        </p>

        {/* Location - More prominent */}
        {bulletin.location && (
          <div className="flex items-start gap-3 text-sm text-gray-700 bg-green-50/50 p-4 rounded-xl border-2 border-green-100">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
            <span className="line-clamp-2 font-medium">
              {bulletin.location}
            </span>
          </div>
        )}

        {/* Visible Divider */}
        <div className="border-t-2 border-gray-100 pt-5 mt-5"></div>

        {/* Footer - More contrast */}
        <div className="flex items-center justify-between">
          {!isAuthenticated ? (
            <span className="text-xs text-gray-500 italic font-semibold">
              Login to view details
            </span>
          ) : (
            <span className="text-xs text-gray-600 font-semibold">
              {bulletin.created_by_name || "Exelpack"}
            </span>
          )}
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm group-hover:gap-3 transition-all">
            <span>Read more</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </div>
        </div>
      </div>

      {/* More visible hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50/0 via-green-50/0 to-green-100/0 group-hover:from-green-50/50 group-hover:to-green-100/20 transition-all duration-500 pointer-events-none"></div>
    </Link>
  );
};

export default Bulletins;
