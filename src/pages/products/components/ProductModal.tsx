import React from "react";
import { X, Check, Info, Package, Box, Layers } from "lucide-react";
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
  // Get product specifications based on category
  const getProductSpecs = (productName: string) => {
    const name = productName.toLowerCase();

    // Corrugated Boxes
    if (name.includes("rsc box") || name.includes("corrugated box")) {
      return {
        category: "Corrugated Boxes",
        icon: <Box className="w-5 h-5" />,
        features: [
          "Regular Slotted Container (RSC) design",
          "All flaps same length from score to edge",
          "Major flaps meet in the middle",
          "Available in Single Wall, Double Wall, and Tri Wall",
          "Custom sizes available",
          "Durable and cost-effective",
        ],
        specs: [
          { label: "Material", value: "Corrugated Cardboard" },
          { label: "Flute Types", value: "A, B, C, E, or Combination" },
          { label: "Edge Crush Test", value: "Per customer requirement" },
          { label: "Moisture", value: "Max 10%" },
          { label: "Printing", value: "Flexo printing available" },
        ],
        applications: [
          "General shipping and storage",
          "E-commerce packaging",
          "Retail distribution",
          "Industrial packaging",
        ],
      };
    }

    // Corrugated Plastic
    if (
      name.includes("coroplast") ||
      name.includes("corrugated plastic") ||
      name.includes("intepro") ||
      name.includes("corrx") ||
      name.includes("twinplast")
    ) {
      return {
        category: "Corrugated Plastic",
        icon: <Layers className="w-5 h-5" />,
        features: [
          "Extruded twinwall plastic-sheet construction",
          "High-impact polypropylene resin",
          "Waterproof and chemical resistant",
          "Reusable and durable",
          "Lightweight yet strong",
          "Available in various thicknesses",
        ],
        specs: [
          { label: "Material", value: "Polypropylene (PP)" },
          { label: "Thickness", value: "2mm - 10mm" },
          { label: "Structure", value: "Twin-wall fluted" },
          { label: "Temperature Range", value: "-20°C to +80°C" },
          { label: "Colors", value: "Various colors available" },
        ],
        applications: [
          "Packaging dividers and inserts",
          "Protective panels for shipping",
          "Signage and displays",
          "Reusable containers",
        ],
      };
    }

    // Polyethylene Foam
    if (name.includes("foam") || name.includes("polyethylene")) {
      return {
        category: "Cushioning Foam",
        icon: <Package className="w-5 h-5" />,
        features: [
          "Outstanding dimensional stability",
          "Excellent recovery characteristics",
          "Optimal cushioning protection",
          "Resistant to repeated impacts",
          "Chemical and moisture resistant",
          "Non-abrasive surface",
        ],
        specs: [
          { label: "Material", value: "Extruded Polyethylene" },
          { label: "Density", value: "1.5 - 9.0 lbs/ft³" },
          { label: "Thickness", value: "1mm - 50mm" },
          { label: "Color", value: "White, Black, Pink (Anti-static)" },
          { label: "Temperature Range", value: "-60°C to +80°C" },
        ],
        applications: [
          "Electronics packaging",
          "Semiconductor protection",
          "Medical device cushioning",
          "Precision instrument protection",
        ],
      };
    }

    // Colored Boxes
    if (name.includes("color") || name.includes("printed")) {
      return {
        category: "Colored Boxes",
        icon: <Box className="w-5 h-5" />,
        features: [
          "Custom full-color printing",
          "High-quality offset or digital printing",
          "Various finishing options",
          "Window patching available",
          "Lamination and coating options",
          "Brand-enhancing designs",
        ],
        specs: [
          { label: "Material", value: "Folding Boxboard / Corrugated" },
          { label: "Printing", value: "4-color process (CMYK)" },
          { label: "Finishing", value: "Gloss/Matte lamination, UV coating" },
          { label: "Thickness", value: "250gsm - 500gsm" },
          { label: "Minimum Order", value: "500 units" },
        ],
        applications: [
          "Retail product packaging",
          "Cosmetics and beauty products",
          "Food and beverage packaging",
          "Gift boxes and special editions",
        ],
      };
    }

    // Insulators
    if (
      name.includes("insulator") ||
      name.includes("thermal") ||
      name.includes("insulation")
    ) {
      return {
        category: "Thermal Insulators",
        icon: <Layers className="w-5 h-5" />,
        features: [
          "Excellent thermal insulation properties",
          "Maintains temperature-sensitive products",
          "Food-grade materials available",
          "Lightweight construction",
          "Custom sizes and shapes",
          "Recyclable materials",
        ],
        specs: [
          {
            label: "Material",
            value: "Expanded Polystyrene (EPS) / Polyurethane",
          },
          { label: "R-Value", value: "3.6 - 6.5 per inch" },
          { label: "Temperature Hold", value: "4-8 hours (depending on size)" },
          { label: "Thickness", value: "25mm - 100mm" },
          { label: "Compliance", value: "FDA approved materials" },
        ],
        applications: [
          "Pharmaceutical cold chain",
          "Fresh food transportation",
          "Frozen goods shipping",
          "Temperature-controlled logistics",
        ],
      };
    }

    // Paper Pallet
    if (name.includes("pallet") || name.includes("paper pallet")) {
      return {
        category: "Paper Pallet",
        icon: <Layers className="w-5 h-5" />,
        features: [
          "100% recyclable and biodegradable",
          "ISPM 15 exempt (no fumigation required)",
          "Lightweight for reduced shipping costs",
          "Strong honeycomb or corrugated structure",
          "Moisture-resistant options available",
          "Customizable dimensions",
        ],
        specs: [
          { label: "Material", value: "Kraft paper / Corrugated board" },
          { label: "Load Capacity", value: "200kg - 1000kg" },
          { label: "Standard Size", value: "1000x1200mm, 1100x1100mm" },
          { label: "Height", value: "120mm - 150mm" },
          { label: "Weight", value: "5kg - 15kg" },
        ],
        applications: [
          "Export shipping (ISPM 15 exempt)",
          "One-way shipments",
          "Lightweight product distribution",
          "Sustainable logistics solutions",
        ],
      };
    }

    // Default specifications
    return {
      category: "Packaging Solutions",
      icon: <Package className="w-5 h-5" />,
      features: [
        "High-quality materials",
        "Custom solutions available",
        "ISO 9001:2008 certified",
        "Competitive pricing",
        "On-time delivery",
        "Expert consultation",
      ],
      specs: [
        { label: "Customization", value: "Available" },
        { label: "Quality Standard", value: "ISO 9001:2008" },
        { label: "Lead Time", value: "Subject to order volume" },
        { label: "Minimum Order", value: "Contact for details" },
      ],
      applications: [
        "Electronics packaging",
        "Food industry",
        "Pharmaceuticals",
        "General manufacturing",
      ],
    };
  };

  const productInfo = getProductSpecs(product.name);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        .modal-overlay {
          animation: fadeIn 0.2s ease-out;
        }
        
        .modal-content {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .feature-item {
          transition: all 0.2s ease;
        }
        
        .feature-item:hover {
          transform: translateX(4px);
        }
        
        .spec-row {
          transition: background-color 0.15s ease;
        }
        
        .spec-row:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
        
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
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div
        className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        style={{ fontFamily: "'Sora', system-ui, sans-serif" }}
      >
        <div
          className="modal-content bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Floating */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-105"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh]">
            {/* Hero Image Section */}
            <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md">
                  <Package className="w-10 h-10 text-gray-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="px-8 pb-8 -mt-6 relative">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-5 border border-emerald-100">
                <div className="text-emerald-600">{productInfo.icon}</div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  {productInfo.category}
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-3xl font-semibold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h2>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Price Section */}
              {isAuthenticated && product.price && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="px-5 py-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Price per unit
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      ₱{product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="px-5 py-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-1">
                      In Stock
                    </p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {product.stock}
                    </p>
                  </div>
                </div>
              )}

              {!isAuthenticated && (
                <div className="mb-8 px-5 py-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-900 font-medium">
                    Please login to view pricing and place orders.
                  </p>
                </div>
              )}

              {/* Key Features */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Key Features
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {productInfo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="feature-item flex items-start gap-3"
                    >
                      <div className="w-1 h-1 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Specifications
                  </h3>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {productInfo.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="spec-row flex justify-between items-center px-5 py-3.5 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-sm font-medium text-gray-600">
                        {spec.label}
                      </span>
                      <span className="text-sm text-gray-900 font-mono">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {productInfo.applications.map((app, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {app}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  onClick={() => {
                    alert("Contact us for inquiries: info@exelpackcorp.com");
                  }}
                >
                  Request Quote
                </button>
                <button
                  className="px-6 py-3.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
