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
    { value: "all", label: "All Bulletins" },
    { value: "announcement", label: "Announcements" },
    { value: "event", label: "Events" },
    { value: "hiring", label: "Job Openings" },
    { value: "achievement", label: "Achievements" },
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
        return "bg-green-600";
      case "event":
        return "bg-red-600";
      case "hiring":
        return "bg-yellow-500";
      case "achievement":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "announcement":
        return "bg-green-50 text-green-700";
      case "event":
        return "bg-red-50 text-red-700";
      case "hiring":
        return "bg-yellow-50 text-yellow-700";
      case "achievement":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Megaphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-light text-gray-900">
                Company <span className="font-semibold">Bulletins</span>
              </h1>
              <p className="text-lg text-gray-600 mt-1 font-light">
                News, Events & Opportunities
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl font-light">
            {isAuthenticated
              ? "Stay updated with announcements, events, and opportunities"
              : "Login to view full bulletin details"}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <div className="flex gap-3 flex-wrap">
            {bulletinTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedType === type.value
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm"
                }`}
              >
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

            {bulletins.length === 0 && (
              <div className="text-center py-32">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Megaphone className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  No bulletins found
                </h3>
                <p className="text-lg text-gray-600 font-light">
                  Check back later for new announcements
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
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-green-500"
    >
      {/* Type Badge Stripe */}
      <div className={`h-2 ${getTypeColor(bulletin.type)}`}></div>

      <div className="p-6 space-y-4">
        {/* Type Label & Date */}
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
              bulletin.type
            )}`}
          >
            {bulletin.type.charAt(0).toUpperCase() + bulletin.type.slice(1)}
          </span>
          {bulletin.event_date && (
            <div className="flex items-center gap-2 text-sm text-gray-600 font-light">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(bulletin.event_date)}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-green-600 transition-colors line-clamp-2 min-h-[3.5rem]">
          {bulletin.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed font-light min-h-[4rem]">
          {isAuthenticated ? bulletin.description : bulletin.short_description}
        </p>

        {/* Location */}
        {bulletin.location && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2 font-light">{bulletin.location}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 pt-4 mt-4"></div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {!isAuthenticated ? (
            <span className="text-sm text-gray-500 font-light italic">
              Login to view details
            </span>
          ) : (
            <span className="text-sm text-gray-600 font-light">
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
