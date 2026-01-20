import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Search, Package, ShoppingBag } from "lucide-react";
import type { Product } from "../../types";
import api from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ProductModal from "./components/ProductModal";

const Products: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const categories = [
    { id: "all", name: "All Products", icon: "📦" },
    { id: "foam", name: "Polymer Foams", icon: "🔲" },
    { id: "box", name: "Box Conversion", icon: "📦" },
    { id: "custom", name: "Custom Solutions", icon: "✨" },
  ];

  useEffect(() => {
    fetchProducts();

    // Intersection Observer for scroll animations
    const timer = setTimeout(() => {
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

      const sections = document.querySelectorAll("[data-animate]");
      sections.forEach((section) => {
        if (observerRef.current) {
          observerRef.current.observe(section);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const fetchProducts = async (searchTerm = "") => {
    try {
      setLoading(true);
      const response = await api.getProducts({ search: searchTerm, limit: 50 });
      setProducts(response.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      style={{
        fontFamily: "'Roboto', 'Open Sans', sans-serif",
        animation: "fadeIn 0.6s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        [data-animate] {
          opacity: 1;
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
        .stagger-7 { animation-delay: 0.7s; }
        .stagger-8 { animation-delay: 0.8s; }

        .product-card-enter {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .product-frame {
          position: relative;
        }

        .product-frame::before {
          content: '';
          position: absolute;
          top: -12px;
          left: -12px;
          right: -12px;
          bottom: -12px;
          border: 3px solid transparent;
          border-radius: 20px;
          background: linear-gradient(135deg, #16a34a, #059669) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .product-frame:hover::before {
          opacity: 0.6;
        }

        .product-frame::after {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 2px solid #16a34a;
          border-radius: 18px;
          opacity: 0.2;
          pointer-events: none;
        }

        .shimmer-line {
          background: linear-gradient(90deg, transparent, rgba(22, 163, 74, 0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .floating-accent {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Hero Section with Enhanced Visuals */}
      <section className="relative h-[50vh] overflow-hidden -mt-4">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=1200&q=80"
            alt="Cardboard Boxes"
            className="w-full h-full object-cover"
            style={{ animation: "scaleIn 1s ease-out" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-green-900/85 to-gray-800/90"></div>

          {/* Floating Decorative Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl floating-accent"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl floating-accent"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-600/30 backdrop-blur-sm border border-green-400/30 rounded-full mb-6 animate-slideUp stagger-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs tracking-wider uppercase text-green-300 font-semibold">
                  Our Products
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp stagger-2 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                Premium Packaging Solutions
              </h1>
              <div className="shimmer-line h-0.5 w-24 mx-auto mb-4"></div>
              <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto animate-slideUp stagger-3">
                {isAuthenticated
                  ? "Explore our comprehensive range of polymer foams and corrugated packaging solutions"
                  : "Login to view full product specifications, pricing, and technical details"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Search & Filter */}
        <div className="mb-12">
          {/* Search Bar with Enhanced Design */}
          <form
            onSubmit={handleSearch}
            className="mb-8"
            id="search-bar"
            data-animate
          >
            <div
              className={`flex gap-4 max-w-3xl mx-auto ${
                isVisible["search-bar"] ? "animate-slideUp visible" : ""
              }`}
            >
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all shadow-sm hover:shadow-md"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          {/* Category Filters with Enhanced Style */}
          <div
            id="category-filters"
            data-animate
            className={`flex gap-3 justify-center flex-wrap ${
              isVisible["category-filters"] ? "visible" : ""
            }`}
          >
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-600/30 scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-green-200 hover:shadow-md"
                } ${
                  isVisible["category-filters"]
                    ? `animate-fadeInUp stagger-${index + 1}`
                    : ""
                }`}
              >
                <span className="mr-2 text-base">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Section Divider */}
        <div className="flex items-center gap-4 mb-10 max-w-4xl mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-32 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div
                id="products-grid"
                data-animate
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`${
                      isVisible["products-grid"]
                        ? `product-card-enter stagger-${(index % 8) + 1}`
                        : ""
                    }`}
                    style={{
                      opacity: isVisible["products-grid"] ? undefined : 1,
                    }}
                  >
                    <ProductCard
                      product={product}
                      onClick={() => setSelectedProduct(product)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-sm text-gray-600">
                  Try adjusting your search criteria or browse all products
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({
  product,
  onClick,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="product-frame">
      <button
        onClick={onClick}
        className="group bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-green-500 w-full text-left relative"
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-3 border-l-3 border-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <div className="absolute top-0 right-0 w-5 h-5 border-t-3 border-r-3 border-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-3 border-l-3 border-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-3 border-r-3 border-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

        {/* Image */}
        <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white h-56 overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-lg border border-gray-200">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Decorative Badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform group-hover:scale-105">
            View Details
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-green-600 transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {product.short_description}
          </p>

          {/* Divider with gradient */}
          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-2">
            {isAuthenticated && product.price ? (
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  ₱{product.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  per unit
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="text-xs font-semibold">Login for pricing</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
              <span className="text-xs">View</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Products;
