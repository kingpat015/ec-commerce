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
        icon: <Box className="w-3.5 h-3.5" />,
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
        icon: <Layers className="w-3.5 h-3.5" />,
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
        icon: <Package className="w-3.5 h-3.5" />,
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
        icon: <Sparkles className="w-3.5 h-3.5" />,
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
        icon: <Layers className="w-3.5 h-3.5" />,
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
        icon: <Layers className="w-3.5 h-3.5" />,
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
      icon: <Package className="w-3.5 h-3.5" />,
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
      badge: "bg-emerald-50 border-emerald-200/50 text-emerald-700",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
      dot: "bg-emerald-500",
      price: "bg-emerald-50 border-emerald-200 text-emerald-700",
      priceValue: "text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700",
    },
    blue: {
      badge: "bg-blue-50 border-blue-200/50 text-blue-700",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
      dot: "bg-blue-500",
      price: "bg-blue-50 border-blue-200 text-blue-700",
      priceValue: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    purple: {
      badge: "bg-purple-50 border-purple-200/50 text-purple-700",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
      dot: "bg-purple-500",
      price: "bg-purple-50 border-purple-200 text-purple-700",
      priceValue: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
    },
    pink: {
      badge: "bg-pink-50 border-pink-200/50 text-pink-700",
      iconBg: "bg-pink-100",
      iconText: "text-pink-600",
      dot: "bg-pink-500",
      price: "bg-pink-50 border-pink-200 text-pink-700",
      priceValue: "text-pink-600",
      button: "bg-pink-600 hover:bg-pink-700",
    },
    orange: {
      badge: "bg-orange-50 border-orange-200/50 text-orange-700",
      iconBg: "bg-orange-100",
      iconText: "text-orange-600",
      dot: "bg-orange-500",
      price: "bg-orange-50 border-orange-200 text-orange-700",
      priceValue: "text-orange-600",
      button: "bg-orange-600 hover:bg-orange-700",
    },
    cyan: {
      badge: "bg-cyan-50 border-cyan-200/50 text-cyan-700",
      iconBg: "bg-cyan-100",
      iconText: "text-cyan-600",
      dot: "bg-cyan-500",
      price: "bg-cyan-50 border-cyan-200 text-cyan-700",
      priceValue: "text-cyan-600",
      button: "bg-cyan-600 hover:bg-cyan-700",
    },
    amber: {
      badge: "bg-amber-50 border-amber-200/50 text-amber-700",
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
      dot: "bg-amber-500",
      price: "bg-amber-50 border-amber-200 text-amber-700",
      priceValue: "text-amber-600",
      button: "bg-amber-600 hover:bg-amber-700",
    },
  };

  const colors = colorClasses[productInfo.color as keyof typeof colorClasses];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-md"
      onClick={onClose}
      style={{ animation: "fadeIn 0.15s ease-out" }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200/50"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Compact Header */}
        <div className="relative h-28 bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden border-b border-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div
                className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center`}
              >
                <Package className={`w-6 h-6 ${colors.iconText}`} />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-7 h-7 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all hover:scale-105"
          >
            <X className="w-3.5 h-3.5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content - Compact */}
        <div className="overflow-y-auto max-h-[calc(90vh-7rem)] px-5 py-4">
          {/* Category Badge - Inline */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 ${colors.badge} rounded-full mb-2.5 border`}
          >
            <div className={colors.iconText}>{productInfo.icon}</div>
            <span className="text-xs font-medium">{productInfo.category}</span>
          </div>

          {/* Title - Compact */}
          <h2 className="text-lg font-semibold text-gray-900 mb-1.5 leading-tight">
            {product.name}
          </h2>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Price Grid - Compact */}
          {isAuthenticated && product.price && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="px-3 py-2 bg-gray-50/80 rounded-lg border border-gray-200/50">
                <p className="text-xs text-gray-500 mb-0.5">Price</p>
                <p className="text-base font-bold text-gray-900">
                  ₱{product.price.toLocaleString()}
                </p>
              </div>
              <div className={`px-3 py-2 ${colors.price} rounded-lg border`}>
                <p className="text-xs mb-0.5">Stock</p>
                <p className={`text-base font-bold ${colors.priceValue}`}>
                  {product.stock}
                </p>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="mb-4 px-3 py-2 bg-amber-50/80 border border-amber-200/50 rounded-lg">
              <p className="text-xs text-amber-800">
                Login to view pricing and stock
              </p>
            </div>
          )}

          {/* Two Column Layout for Features & Specs */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            {/* Features - Compact */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <div
                  className={`w-5 h-5 ${colors.iconBg} rounded flex items-center justify-center`}
                >
                  <Check className={`w-3 h-3 ${colors.iconText}`} />
                </div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                  Features
                </h3>
              </div>
              <div className="space-y-1.5">
                {productInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div
                      className={`w-1 h-1 ${colors.dot} rounded-full mt-1.5 flex-shrink-0`}
                    ></div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs - Compact Table */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <div
                  className={`w-5 h-5 ${colors.iconBg} rounded flex items-center justify-center`}
                >
                  <Info className={`w-3 h-3 ${colors.iconText}`} />
                </div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                  Specifications
                </h3>
              </div>
              <div className="border border-gray-200/50 rounded-lg overflow-hidden divide-y divide-gray-100">
                {productInfo.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-3 py-1.5 hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="text-xs text-gray-600">{spec.label}</span>
                    <span className="text-xs text-gray-900 font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Applications - Compact Pills */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-2">
              Applications
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {productInfo.applications.map((app, index) => (
                <div
                  key={index}
                  className="px-2.5 py-1 bg-gray-50 border border-gray-200/50 rounded-full text-xs text-gray-700"
                >
                  {app}
                </div>
              ))}
            </div>
          </div>

          {/* Actions - Compact */}
          <div className="flex gap-2">
            <button
              className={`flex-1 px-3 py-2 ${colors.button} text-white rounded-lg text-xs font-medium transition-all shadow-sm hover:shadow`}
              onClick={() => {
                alert("Contact: info@exelpackcorp.com");
              }}
            >
              Request Quote
            </button>
            <button
              className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
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
