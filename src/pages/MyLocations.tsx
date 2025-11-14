import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit2, Trash2, Eye, EyeOff, MapPin, Calendar } from "lucide-react";

interface Location {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  status: "active" | "inactive";
  bookings: number;
  views: number;
  createdDate: string;
}

const MyLocations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      title: "Modern Studio Loft",
      location: "Makati, Manila",
      price: 5000,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop",
      status: "active",
      bookings: 12,
      views: 245,
      createdDate: "2024-01-15",
    },
    {
      id: "2",
      title: "Urban Rooftop Venue",
      location: "Quezon City, Manila",
      price: 8000,
      image: "https://images.unsplash.com/photo-1600607687644-c173236e3440?w=400&h=400&fit=crop",
      status: "active",
      bookings: 8,
      views: 156,
      createdDate: "2024-02-10",
    },
    {
      id: "3",
      title: "Beach Resort Space",
      location: "Boracay Island",
      price: 12000,
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop",
      status: "inactive",
      bookings: 3,
      views: 89,
      createdDate: "2024-03-05",
    },
  ]);

  const toggleStatus = (id: string) => {
    setLocations(
      locations.map((loc) =>
        loc.id === id
          ? { ...loc, status: loc.status === "active" ? "inactive" : "active" }
          : loc
      )
    );
  };

  const deleteLocation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Locations</h1>
            </div>
            <button
              onClick={() => navigate("/upload")}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Location
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2">Manage Your Locations</h2>
          <p className="text-white/90 text-lg">
            {locations.length} location{locations.length !== 1 ? "s" : ""} listed
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Locations</p>
            <p className="text-3xl font-bold text-gray-900">{locations.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 text-sm font-medium mb-2">Active</p>
            <p className="text-3xl font-bold text-green-600">
              {locations.filter((l) => l.status === "active").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Bookings</p>
            <p className="text-3xl font-bold text-primary">
              {locations.reduce((sum, l) => sum + l.bookings, 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Views</p>
            <p className="text-3xl font-bold text-blue-600">
              {locations.reduce((sum, l) => sum + l.views, 0)}
            </p>
          </div>
        </div>

        {/* Locations Table */}
        {locations.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Bookings
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {locations.map((location) => (
                    <tr key={location.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={location.image}
                            alt={location.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{location.title}</p>
                            <div className="flex items-center gap-1 text-gray-600 text-sm">
                              <MapPin className="h-3 w-3" />
                              {location.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">
                          ₱{location.price.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            location.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {location.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{location.bookings}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{location.views}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleStatus(location.id)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                            title={location.status === "active" ? "Deactivate" : "Activate"}
                          >
                            {location.status === "active" ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => navigate(`/location/${location.id}`)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteLocation(location.id)}
                            className="p-2 hover:bg-red-200 rounded-lg transition-colors text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No locations yet
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Start by adding your first location to the platform
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Your First Location
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLocations;
