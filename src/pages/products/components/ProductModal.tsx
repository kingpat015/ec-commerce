import React from "react";
import { X, Check, Info, Package, Box, Layers, Sparkles } from "lucide-react";
import type { Product } from "../../../types";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  isAuthenticated: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isAuthenticated,
}) => {
  const getProductSpecs = (productName: string) => {
    const name = productName.toLowerCase();

    if (name.includes("rsc box") || name.includes("corrugated box")) {
      return {
        category: "Corrugated Boxes",
        icon: <Box className="w-4 h-4" />,
        color: "blue",
        features: [
          "RSC design with equal flap lengths",
          "Single/Double/Tri Wall options",
          "Custom sizes available",
          "Cost-effective solution",
        ],
        specs: [
          { label: "Material", value: "Corrugated Board" },
          { label: "Flute Type", value: "A, B, C, E" },
          { label: "ECT", value: "Custom" },
        ],
        applications: ["Shipping", "Storage", "E-commerce", "Distribution"],
      };
    }

    if (
      name.includes("coroplast") ||
      name.includes("corrugated plastic") ||
      name.includes("intepro") ||
      name.includes("corrx") ||
      name.includes("twinplast")
    ) {
      return {
        category: "Corrugated Plastic",
        icon: <Layers className="w-4 h-4" />,
        color: "purple",
        features: [
          "Twinwall plastic construction",
          "Waterproof & chemical resistant",
          "Reusable and durable",
          "Lightweight yet strong",
        ],
        specs: [
          { label: "Material", value: "Polypropylene" },
          { label: "Thickness", value: "2-10mm" },
          { label: "Temp Range", value: "-20°C to +80°C" },
        ],
        applications: [
          "Dividers",
          "Protective panels",
          "Signage",
          "Containers",
        ],
      };
    }

    if (name.includes("foam") || name.includes("polyethylene")) {
      return {
        category: "Cushioning Foam",
        icon: <Package className="w-4 h-4" />,
        color: "pink",
        features: [
          "Excellent dimensional stability",
          "Optimal cushioning protection",
          "Chemical & moisture resistant",
          "Non-abrasive surface",
        ],
        specs: [
          { label: "Material", value: "PE Foam" },
          { label: "Density", value: "1.5-9.0 lbs/ft³" },
          { label: "Thickness", value: "1-50mm" },
        ],
        applications: [
          "Electronics",
          "Semiconductors",
          "Medical",
          "Instruments",
        ],
      };
    }

    if (name.includes("color") || name.includes("printed")) {
      return {
        category: "Colored Boxes",
        icon: <Sparkles className="w-4 h-4" />,
        color: "orange",
        features: [
          "Full-color custom printing",
          "Various finishing options",
          "Window patching available",
          "Brand-enhancing designs",
        ],
        specs: [
          { label: "Printing", value: "CMYK" },
          { label: "Finish", value: "Gloss/Matte/UV" },
          { label: "MOQ", value: "500 units" },
        ],
        applications: ["Retail", "Cosmetics", "Food & Beverage", "Gifts"],
      };
    }

    if (
      name.includes("insulator") ||
      name.includes("thermal") ||
      name.includes("insulation")
    ) {
      return {
        category: "Thermal Insulators",
        icon: <Layers className="w-4 h-4" />,
        color: "cyan",
        features: [
          "Excellent thermal insulation",
          "Food-grade materials",
          "Lightweight construction",
          "Recyclable materials",
        ],
        specs: [
          { label: "Material", value: "EPS/PU" },
          { label: "R-Value", value: "3.6-6.5/inch" },
          { label: "Hold Time", value: "4-8 hours" },
        ],
        applications: [
          "Pharmaceuticals",
          "Fresh food",
          "Frozen goods",
          "Cold chain",
        ],
      };
    }

    if (name.includes("pallet") || name.includes("paper pallet")) {
      return {
        category: "Paper Pallet",
        icon: <Layers className="w-4 h-4" />,
        color: "amber",
        features: [
          "100% recyclable",
          "ISPM 15 exempt",
          "Lightweight design",
          "Strong honeycomb structure",
        ],
        specs: [
          { label: "Material", value: "Kraft paper" },
          { label: "Capacity", value: "200-1000kg" },
          { label: "Size", value: "1000x1200mm" },
        ],
        applications: [
          "Export shipping",
          "One-way shipments",
          "Distribution",
          "Logistics",
        ],
      };
    }

    return {
      category: "Packaging Solutions",
      icon: <Package className="w-4 h-4" />,
      color: "green",
      features: [
        "High-quality materials",
        "Custom solutions available",
        "ISO 9001:2015 certified",
        "Competitive pricing",
      ],
      specs: [
        { label: "Quality", value: "ISO 9001:2015" },
        { label: "Customization", value: "Available" },
        { label: "Lead Time", value: "Contact us" },
      ],
      applications: ["Electronics", "Food", "Pharma", "Manufacturing"],
    };
  };

  const productInfo = getProductSpecs(product.name);

  const colorClasses = {
    green: {
      badge: "bg-emerald-50 border-emerald-200/60 text-emerald-700",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
      dot: "bg-emerald-500",
      gradient: "from-emerald-500 to-emerald-600",
      light: "emerald",
      accentBg: "bg-emerald-500/10",
      ring: "ring-emerald-500/20",
    },
    blue: {
      badge: "bg-blue-50 border-blue-200/60 text-blue-700",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
      dot: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      light: "blue",
      accentBg: "bg-blue-500/10",
      ring: "ring-blue-500/20",
    },
    purple: {
      badge: "bg-purple-50 border-purple-200/60 text-purple-700",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
      dot: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      light: "purple",
      accentBg: "bg-purple-500/10",
      ring: "ring-purple-500/20",
    },
    pink: {
      badge: "bg-pink-50 border-pink-200/60 text-pink-700",
      iconBg: "bg-pink-100",
      iconText: "text-pink-600",
      dot: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600",
      light: "pink",
      accentBg: "bg-pink-500/10",
      ring: "ring-pink-500/20",
    },
    orange: {
      badge: "bg-orange-50 border-orange-200/60 text-orange-700",
      iconBg: "bg-orange-100",
      iconText: "text-orange-600",
      dot: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
      light: "orange",
      accentBg: "bg-orange-500/10",
      ring: "ring-orange-500/20",
    },
    cyan: {
      badge: "bg-cyan-50 border-cyan-200/60 text-cyan-700",
      iconBg: "bg-cyan-100",
      iconText: "text-cyan-600",
      dot: "bg-cyan-500",
      gradient: "from-cyan-500 to-cyan-600",
      light: "cyan",
      accentBg: "bg-cyan-500/10",
      ring: "ring-cyan-500/20",
    },
    amber: {
      badge: "bg-amber-50 border-amber-200/60 text-amber-700",
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
      dot: "bg-amber-500",
      gradient: "from-amber-500 to-amber-600",
      light: "amber",
      accentBg: "bg-amber-500/10",
      ring: "ring-amber-500/20",
    },
  };

  const colors = colorClasses[productInfo.color as keyof typeof colorClasses];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>

      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Enhanced Header with Image */}
        <div className="relative h-48 overflow-hidden">
          {product.image_url ? (
            <div className="relative w-full h-full">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
            </div>
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center relative overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Package className="w-10 h-10 text-white" />
              </div>
            </div>
          )}

          {/* Floating Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110 active:scale-95 border border-gray-200/50"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Category Badge - Floating */}
          <div className="absolute bottom-4 left-4">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 ${colors.badge} rounded-full border backdrop-blur-sm`}
            >
              <div className={colors.iconText}>{productInfo.icon}</div>
              <span className="text-sm font-semibold">
                {productInfo.category}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-12rem)] px-6 py-6">
          {/* Title Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price & Stock Cards */}
          {isAuthenticated && product.price && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 border border-gray-200/50">
                <div className="relative z-10">
                  <p className="text-xs text-gray-500 mb-1 font-medium">
                    Price
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₱{product.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">per unit</p>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-300/20 to-transparent rounded-full -mr-10 -mt-10"></div>
              </div>
              <div
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors.gradient} p-4 border border-white/20 shimmer-effect`}
              >
                <div className="relative z-10">
                  <p className="text-xs text-white/90 mb-1 font-medium">
                    Stock Available
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {product.stock}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">units</p>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="mb-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 p-4">
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-0.5">
                    Login Required
                  </p>
                  <p className="text-xs text-amber-700">
                    Sign in to view pricing and stock availability
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center`}
              >
                <Check className={`w-4 h-4 ${colors.iconText}`} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Key Features
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {productInfo.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-1.5 h-1.5 ${colors.dot} rounded-full mt-2 flex-shrink-0`}
                  ></div>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center`}
              >
                <Info className={`w-4 h-4 ${colors.iconText}`} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Specifications
              </h3>
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
              {productInfo.specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-50/50 transition-colors"
                >
                  <span className="text-sm text-gray-600 font-medium">
                    {spec.label}
                  </span>
                  <span className="text-sm text-gray-900 font-semibold">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Common Applications
            </h3>
            <div className="flex flex-wrap gap-2">
              {productInfo.applications.map((app, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 ${colors.accentBg} ${colors.badge.split(" ")[2]} rounded-full text-sm font-medium border border-current/20`}
                >
                  {app}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className={`flex-1 px-5 py-3.5 bg-gradient-to-r ${colors.gradient} text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-${colors.light}-500/25 hover:shadow-xl hover:shadow-${colors.light}-500/30 hover:scale-105 active:scale-95`}
              onClick={() => {
                alert("Contact: info@exelpackcorp.com");
              }}
            >
              Request Quote
            </button>
            <button
              className="px-5 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
