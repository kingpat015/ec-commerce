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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-light text-gray-900">
                Our <span className="font-semibold">Products</span>
              </h1>
              <p className="text-lg text-gray-600 mt-1 font-light">
                Premium Packaging Solutions
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed font-light">
            {isAuthenticated
              ? "Explore our comprehensive range of polymer foams and corrugated packaging solutions for electronics, semiconductors, food, and pharmaceuticals."
              : "Login to view full product specifications, pricing, and technical details for our packaging solutions"}
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-4 max-w-3xl">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by name or description..."
                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all font-light text-base shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Search
            </button>
          </div>
        </form>

        {/* Products Grid */}
        {loading ? (
          <div className="py-32 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-32">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  No products found
                </h3>
                <p className="text-lg text-gray-600 font-light">
                  Try adjusting your search criteria
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
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-green-500 w-full text-left"
    >
      {/* Image */}
      <div className="relative bg-gray-100 h-56 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-green-600 transition-colors line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed font-light min-h-[2.5rem]">
          {product.short_description}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-4 mt-4"></div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          {isAuthenticated && product.price ? (
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                ₱{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 font-light">per unit</span>
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
              <span className="text-sm font-medium">Login for pricing</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            View
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
