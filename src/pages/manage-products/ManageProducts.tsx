import { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Edit,
  Plus,
  X,
  Search,
  Package,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Product, ProductCategory } from "../../types";
import api from "../../services/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface FormData {
  name: string;
  description: string;
  short_description: string;
  price: number | string;
  stock: number | string;
  category_id: number | string;
  image_url: string;
  status: string;
  imageFile?: File; // Add this to store the actual file
}

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    short_description: "",
    price: "",
    stock: "",
    category_id: "",
    image_url: "",
    status: "active",
  });

  // Helper function to get full image URL
  const getImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${API_URL}${imageUrl}`;
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params: { category?: string; search?: string } = {};
      if (filterCategory) params.category = filterCategory;
      if (searchTerm) params.search = searchTerm;

      const data = await api.getProducts(params);
      setProducts(data.products || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [filterCategory, searchTerm]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await api.getProductCategories();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const startItem = products.length > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(endIndex, products.length);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(
          "Image file is too large. Please select an image smaller than 5MB."
        );
        return;
      }

      // Store the actual file
      setFormData({ ...formData, imageFile: file, image_url: "" });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, image_url: url, imageFile: undefined });
    setImagePreview(url);
  };

  const handleCreateProduct = async () => {
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category_id: formData.category_id
          ? Number(formData.category_id)
          : undefined,
      };

      await api.createProduct(productData);
      fetchProducts();
      closeModal();
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Error creating product");
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category_id: formData.category_id
          ? Number(formData.category_id)
          : undefined,
      };

      await api.updateProduct(selectedProduct.id, productData);
      fetchProducts();
      closeModal();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Error updating product");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.deleteProduct(productId);
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setImagePreview("");
    setFormData({
      name: "",
      description: "",
      short_description: "",
      price: "",
      stock: "",
      category_id: "",
      image_url: "",
      status: "active",
    });
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    const fullImageUrl = getImageUrl(product.image_url);
    setImagePreview(fullImageUrl || "");
    setFormData({
      name: product.name,
      description: product.description || "",
      short_description: product.short_description || "",
      price: product.price || "",
      stock: product.stock || "",
      category_id: product.category_id || "",
      image_url: product.image_url || "",
      status: product.status || "active",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setImagePreview("");
    setFormData({
      name: "",
      description: "",
      short_description: "",
      price: "",
      stock: "",
      category_id: "",
      image_url: "",
      status: "active",
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    if (modalMode === "create") {
      handleCreateProduct();
    } else {
      handleUpdateProduct();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 pt-4 pb-3 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">
          Product Management
        </h1>
      </div>

      <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      <div>
        <table className="w-full">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Product
              </th>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Category
              </th>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Price
              </th>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Stock
              </th>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-2.5 text-right text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-500">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : currentProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Package className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm text-gray-500">No products found</p>
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-2.5">
                    <div className="flex items-center gap-3">
                      {product.image_url ? (
                        <img
                          src={getImageUrl(product.image_url)}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center border border-gray-200">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </div>
                        {product.short_description && (
                          <div className="text-xs text-gray-500 truncate">
                            {product.short_description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2.5">
                    <span className="text-sm text-blue-600">
                      {product.category_name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-2.5">
                    <div className="flex items-center gap-0.5 text-sm font-medium text-gray-900">
                      ₱{" "}
                      {product.price
                        ? Number(product.price).toFixed(2)
                        : "0.00"}
                    </div>
                  </td>
                  <td className="px-6 py-2.5">
                    <span className="text-sm text-gray-700">
                      {product.stock || 0}
                    </span>
                  </td>
                  <td className="px-6 py-2.5">
                    <span className="text-sm text-green-600 font-medium">
                      {product.status || "active"}
                    </span>
                  </td>
                  <td className="px-6 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && products.length > 0 && (
        <div className="px-6 py-2.5 border-t border-gray-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-xs text-gray-600">per page</span>
            </div>
            <div className="text-xs text-gray-600">
              Showing{" "}
              <span className="font-medium text-gray-900">{startItem}</span> to{" "}
              <span className="font-medium text-gray-900">{endItem}</span> of{" "}
              <span className="font-medium text-gray-900">
                {products.length}
              </span>{" "}
              products
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;
              if (
                p === 1 ||
                p === totalPages ||
                (p >= currentPage - 1 && p <= currentPage + 1)
              ) {
                return (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`min-w-[28px] h-7 px-2 text-xs font-medium rounded transition-colors ${
                      currentPage === p
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                );
              } else if (p === currentPage - 2 || p === currentPage + 2) {
                return (
                  <span key={p} className="px-1 text-gray-400 text-xs">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white px-5 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {modalMode === "create" ? "Create Product" : "Edit Product"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="flex items-start gap-4">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 rounded object-cover border border-gray-200"
                      onError={() => setImagePreview("")}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded bg-gray-100 flex items-center justify-center border border-gray-200">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <label className="flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                      <Upload className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-700">
                        Upload from Computer
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-2 bg-white text-xs text-gray-500">
                          or
                        </span>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Paste image URL"
                      value={
                        formData.image_url.startsWith("data:")
                          ? ""
                          : formData.image_url
                      }
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500">
                      Max file size: 5MB. Supported: JPG, PNG, GIF
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    value={formData.short_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        short_description: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Brief description"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Full Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Enter full description"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) =>
                      setFormData({ ...formData, category_id: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white px-5 py-3 border-t border-gray-200 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {modalMode === "create" ? "Create" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
