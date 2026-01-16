import React, { useEffect, useState } from "react";
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

  const bulletinTypes = [
    { value: "all", label: "All Updates", icon: "📋" },
    { value: "announcement", label: "Announcements", icon: "📢" },
    { value: "event", label: "Events", icon: "🎉" },
    { value: "hiring", label: "Careers", icon: "💼" },
    { value: "achievement", label: "Achievements", icon: "🏆" },
  ];

  useEffect(() => {
    fetchBulletins();
  }, [selectedType]);

  const fetchBulletins = async () => {
    try {
      setLoading(true);
      const params =
        selectedType !== "all"
          ? { type: selectedType, limit: 50 }
          : { limit: 50 };
      const response = await api.getBulletins(params);
      setBulletins(response.bulletins || []);
    } catch (error) {
      console.error("Error fetching bulletins:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "from-green-600 to-green-700";
      case "event":
        return "from-blue-600 to-blue-700";
      case "hiring":
        return "from-yellow-600 to-yellow-700";
      case "achievement":
        return "from-purple-600 to-purple-700";
      default:
        return "from-gray-600 to-gray-700";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-green-100 text-green-700 border-green-200";
      case "event":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "hiring":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "achievement":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Roboto', 'Open Sans', sans-serif" }}
    >
      {/* Hero Section with Background */}
      <section className="relative py-16 -mt-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80"
            alt="Team Meeting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-green-900/85 to-gray-800/90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block px-4 py-1 bg-green-600/30 backdrop-blur-sm border border-green-400/30 rounded-full mb-6">
              <span className="text-xs tracking-wider uppercase text-green-300 font-semibold">
                Company Bulletin
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News, Events & Opportunities
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              {isAuthenticated
                ? "Stay updated with the latest company announcements and opportunities"
                : "Login to view full bulletin details and stay connected"}
            </p>
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
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
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
                    getTypeColor={getTypeColor}
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
  getTypeColor: (type: string) => string;
  getTypeBadgeColor: (type: string) => string;
}> = ({ bulletin, isAuthenticated, getTypeColor, getTypeBadgeColor }) => {
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
      className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-500"
    >
      {/* Gradient Header */}
      <div
        className={`h-2 bg-gradient-to-r ${getTypeColor(bulletin.type)}`}
      ></div>

      <div className="p-6 space-y-4">
        {/* Type Badge & Date */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getTypeBadgeColor(
              bulletin.type
            )}`}
          >
            {bulletin.type.charAt(0).toUpperCase() + bulletin.type.slice(1)}
          </span>
          {bulletin.event_date && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(bulletin.event_date)}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-green-600 transition-colors line-clamp-2 min-h-[3rem]">
          {bulletin.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed min-h-[4rem]">
          {isAuthenticated ? bulletin.description : bulletin.short_description}
        </p>

        {/* Location */}
        {bulletin.location && (
          <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
            <span className="line-clamp-2">{bulletin.location}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 pt-3 mt-3"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {!isAuthenticated ? (
            <span className="text-xs text-gray-500 italic">
              Login to view details
            </span>
          ) : (
            <span className="text-xs text-gray-600">
              {bulletin.created_by_name || "Exelpack"}
            </span>
          )}
          <div className="flex items-center gap-1 text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Read more
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Bulletins;
