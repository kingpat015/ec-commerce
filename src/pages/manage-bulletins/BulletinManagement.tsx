import { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Edit,
  Plus,
  X,
  Search,
  Calendar,
  MapPin,
  Megaphone,
} from "lucide-react";
import type { Bulletin, BulletinType } from "../../types";
import api from "../../services/api";

interface FormData {
  type: BulletinType;
  title: string;
  description: string;
  short_description: string;
  event_date: string;
  location: string;
  status: string;
}

const ManageBulletins = () => {
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedBulletin, setSelectedBulletin] = useState<Bulletin | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    type: "announcement",
    title: "",
    description: "",
    short_description: "",
    event_date: "",
    location: "",
    status: "published",
  });

  const fetchBulletins = useCallback(async () => {
    try {
      setLoading(true);
      const params: {
        type?: string;
      } = {};
      if (filterType) params.type = filterType;

      const data = await api.getBulletins(params);
      setBulletins(data.bulletins || []);
    } catch (error) {
      console.error("Error fetching bulletins:", error);
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchBulletins();
  }, [fetchBulletins]);

  const handleCreateBulletin = async () => {
    try {
      await api.createBulletin(formData);
      fetchBulletins();
      closeModal();
      alert("Bulletin created successfully!");
    } catch (error) {
      console.error("Error creating bulletin:", error);
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Error creating bulletin");
    }
  };

  const handleUpdateBulletin = async () => {
    if (!selectedBulletin) return;

    try {
      await api.updateBulletin(selectedBulletin.id, formData);
      fetchBulletins();
      closeModal();
      alert("Bulletin updated successfully!");
    } catch (error) {
      console.error("Error updating bulletin:", error);
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Error updating bulletin");
    }
  };

  const handleDeleteBulletin = async (bulletinId: number) => {
    if (!confirm("Are you sure you want to delete this bulletin?")) return;

    try {
      await api.deleteBulletin(bulletinId);
      fetchBulletins();
      alert("Bulletin deleted successfully!");
    } catch (error) {
      console.error("Error deleting bulletin:", error);
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Error deleting bulletin");
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      type: "announcement",
      title: "",
      description: "",
      short_description: "",
      event_date: "",
      location: "",
      status: "published",
    });
    setShowModal(true);
  };

  const openEditModal = (bulletin: Bulletin) => {
    setModalMode("edit");
    setSelectedBulletin(bulletin);
    setFormData({
      type: bulletin.type,
      title: bulletin.title,
      description: bulletin.description || "",
      short_description: bulletin.short_description || "",
      event_date: bulletin.event_date || "",
      location: bulletin.location || "",
      status: bulletin.status || "published",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBulletin(null);
    setFormData({
      type: "announcement",
      title: "",
      description: "",
      short_description: "",
      event_date: "",
      location: "",
      status: "published",
    });
  };

  const handleSubmit = () => {
    if (!formData.type || !formData.title || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    if (modalMode === "create") {
      handleCreateBulletin();
    } else {
      handleUpdateBulletin();
    }
  };

  const filteredBulletins = bulletins.filter(
    (bulletin) =>
      bulletin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bulletin.description &&
        bulletin.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeBadgeColor = (type: BulletinType) => {
    const colors: Record<BulletinType, string> = {
      event: "bg-blue-50 text-blue-700",
      hiring: "bg-green-50 text-green-700",
      announcement: "bg-purple-50 text-purple-700",
    };
    return colors[type] || "bg-gray-50 text-gray-700";
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "published"
      ? "bg-green-50 text-green-700"
      : "bg-yellow-50 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Compact */}
      <div className="px-6 pt-4 pb-3 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">
          Bulletin Management
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage bulletins, events, and announcements
        </p>
      </div>

      {/* Filters - Compact */}
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bulletins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Types</option>
            <option value="event">Event</option>
            <option value="hiring">Hiring</option>
            <option value="announcement">Announcement</option>
          </select>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Bulletin
          </button>
        </div>
      </div>

      {/* Table - Maximized width */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Bulletin
              </th>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Type
              </th>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Event Date
              </th>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase">
                Created
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
            ) : filteredBulletins.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Megaphone className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm text-gray-500">No bulletins found</p>
                </td>
              </tr>
            ) : (
              filteredBulletins.map((bulletin) => (
                <tr key={bulletin.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-2.5">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {bulletin.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {bulletin.short_description}
                      </div>
                      {bulletin.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          {bulletin.location}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-2.5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${getTypeBadgeColor(
                        bulletin.type
                      )}`}
                    >
                      {bulletin.type}
                    </span>
                  </td>
                  <td className="px-6 py-2.5 text-sm text-gray-600">
                    {bulletin.event_date ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(bulletin.event_date).toLocaleDateString()}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-2.5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${getStatusBadgeColor(
                        bulletin.status || "published"
                      )}`}
                    >
                      {bulletin.status || "published"}
                    </span>
                  </td>
                  <td className="px-6 py-2.5 text-sm text-gray-600">
                    {bulletin.created_at
                      ? new Date(bulletin.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(bulletin)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBulletin(bulletin.id)}
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

      {/* Modal - Compact */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white px-5 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {modalMode === "create" ? "Create Bulletin" : "Edit Bulletin"}
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
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as BulletinType,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="announcement">Announcement</option>
                  <option value="event">Event</option>
                  <option value="hiring">Hiring</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter bulletin title"
                />
              </div>

              <div>
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

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Full Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={5}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter full description"
                />
              </div>

              {formData.type === "event" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.event_date}
                      onChange={(e) =>
                        setFormData({ ...formData, event_date: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Event location"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white px-5 py-3 border-t border-gray-200 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
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

export default ManageBulletins;
