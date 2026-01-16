import React, { useEffect, useState } from "react";
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

  const categories = [
    { id: "all", name: "All Products", icon: "📦" },
    { id: "foam", name: "Polymer Foams", icon: "🔲" },
    { id: "box", name: "Box Conversion", icon: "📦" },
    { id: "custom", name: "Custom Solutions", icon: "✨" },
  ];

  useEffect(() => {
    fetchProducts();
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
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Roboto', 'Open Sans', sans-serif" }}
    >
      {/* Hero Section with Background Image */}
      <section className="relative py-16 -mt-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=1200&q=80"
            alt="Cardboard Boxes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-green-900/85 to-gray-800/90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block px-4 py-1 bg-green-600/30 backdrop-blur-sm border border-green-400/30 rounded-full mb-6">
              <span className="text-xs tracking-wider uppercase text-green-300 font-semibold">
                Our Products
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Packaging Solutions
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              {isAuthenticated
                ? "Explore our comprehensive range of polymer foams and corrugated packaging solutions"
                : "Login to view full product specifications, pricing, and technical details"}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Search & Filter */}
        <div className="mb-12">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Category Filters */}
          <div className="flex gap-3 justify-center flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-32 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No products found
                </h3>
                <p className="text-base text-gray-600">
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
    <button
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-500 w-full text-left"
    >
      {/* Image */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 h-48 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-green-600 transition-colors line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {product.short_description}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-3 mt-3"></div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          {isAuthenticated && product.price ? (
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-600">
                ₱{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">per unit</span>
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
              <span className="text-xs font-medium">Login for pricing</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Details
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
    </button>
  );
};

export default Products;
