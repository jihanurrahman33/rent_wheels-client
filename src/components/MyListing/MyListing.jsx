import React, { use, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import {
  FaTrashAlt,
  FaEdit,
  FaChartLine,
  FaCar,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaSort,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFileAlt,
  FaLayerGroup,
  FaImage,
} from "react-icons/fa";

const MyListing = () => {
  const { user } = use(AuthContext);
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  // Derived Statistics
  const stats = useMemo(() => {
    const totalCars = listingData.length;
    const totalValue = listingData.reduce((acc, car) => acc + (Number(car.rentPrice) || 0), 0);
    const activeListings = listingData.filter(car => car.carStatus === "available").length;
    return { totalCars, totalValue, activeListings };
  }, [listingData]);

  const handleUpdateStatus = async (car) => {
    const current = car.carStatus || "available";
    const newStatus = current === "unavailable" ? "available" : "unavailable";
    
    setProcessingId(car._id);
    try {
      const token = user?.accessToken || localStorage.getItem("token");
      const res = await fetch(
        `https://rent-wheels-nine.vercel.app/removeBooking/?id=${encodeURIComponent(
          car._id
        )}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ carStatus: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      const updated = await res.json().catch(() => ({}));

      setListingData((prev) =>
        prev.map((c) =>
          c._id === car._id ? { ...c, carStatus: newStatus, ...updated } : c
        )
      );


      const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: "bg-base-100 text-base-content border border-base-content/10"
        }
      });
      toast.fire({
        icon: 'success',
        title: newStatus === 'available' ? 'Marked as Available' : 'Marked as Unavailable'
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err.message,
        customClass: {
            popup: "bg-base-100 text-base-content border border-base-content/10",
            title: "text-base-content"
        }
      });
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(
          `https://rent-wheels-nine.vercel.app/my-listing?email=${encodeURIComponent(
            user.email
          )}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
              "content-type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to load listings");
        const data = await res.json();
        if (mounted) setListingData(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [user]);

  const handleEdit = (id) => {
    const car = listingData.find(c => c._id === id);
    if (car) {
        setEditingCar({ ...car });
    }
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingCar) return;

    setSaveLoading(true);
    try {
        const token = user?.accessToken || localStorage.getItem("token");
        // Using PUT /cars/:id assumption strictly based on REST patterns matching DELETE /cars/:id
        const res = await fetch(`https://rent-wheels-nine.vercel.app/cars/${editingCar._id}`, { 
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editingCar)
        });

        if (!res.ok) throw new Error("Update failed");

        setListingData(prev => prev.map(c => c._id === editingCar._id ? editingCar : c));
        setEditingCar(null);
        
        Swal.fire({
            icon: "success",
            title: "Listing Updated",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: "bg-base-100 text-base-content border border-base-content/10",
                title: "text-base-content"
            }
        });

    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Failed to update", 
            text: err.message,
            customClass: {
                popup: "bg-base-100 text-base-content border border-base-content/10",
                title: "text-base-content",
                htmlContainer: "text-base-content/70"
            }
        });
    } finally {
        setSaveLoading(false);
    }
  };

  const handleChangeEdit = (e) => {
      const { name, value } = e.target;
      setEditingCar(prev => ({ ...prev, [name]: value }));
  };


  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Delete Listing?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, delete it",
      customClass: {
        popup: "bg-base-100 text-base-content border border-base-content/10",
        title: "text-base-content",
        htmlContainer: "text-base-content/70"
      }
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(
        `https://rent-wheels-nine.vercel.app/cars/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.accessToken}`,
            "content-type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Delete failed");
      
      setListingData((prev) => prev.filter((c) => c._id !== id));
      
      Swal.fire({
        icon: "success",
        title: "Deleted",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "bg-base-100 text-base-content border border-base-content/10",
          title: "text-base-content"
        }
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Could not remove listing" });
    } finally {
      setDeletingId(null);
    }
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const isAvailable = status === "available";
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
        isAvailable 
          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
          : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
      }`}>
        {isAvailable ? <FaCheckCircle /> : <FaTimesCircle />}
        {isAvailable ? "Available" : "Booked"}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 lg:py-24 relative overflow-hidden transition-colors duration-500">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
            
            {/* 1. Header & Stats Section */}
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-base-content mb-2">
                        My Fleet Dashboard
                    </h1>
                    <p className="text-base-content/60">
                        Manage your inventory, track listings, and update availability.
                    </p>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
                    <div className="glass-card bg-base-200/50 p-4 rounded-2xl border border-base-content/5 shadow-sm text-center min-w-[120px]">
                        <div className="text-base-content/60 text-xs font-bold uppercase mb-1">Total Cars</div>
                        <div className="text-2xl font-bold text-base-content flex items-center justify-center gap-2">
                            <FaCar className="text-primary text-lg" /> {stats.totalCars}
                        </div>
                    </div>
                    <div className="glass-card bg-base-200/50 p-4 rounded-2xl border border-base-content/5 shadow-sm text-center min-w-[120px]">
                        <div className="text-base-content/60 text-xs font-bold uppercase mb-1">Fleet Value</div>
                        <div className="text-2xl font-bold text-base-content flex items-center justify-center gap-2">
                            <FaDollarSign className="text-emerald-500 text-lg" /> {stats.totalValue.toLocaleString()}
                        </div>
                    </div>
                     <div className="glass-card bg-base-200/50 p-4 rounded-2xl border border-base-content/5 shadow-sm text-center min-w-[120px]">
                        <div className="text-base-content/60 text-xs font-bold uppercase mb-1">Active</div>
                        <div className="text-2xl font-bold text-base-content flex items-center justify-center gap-2">
                            <FaChartLine className="text-blue-500 text-lg" /> {stats.activeListings}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Loading / Error / Content */}
            {loading ? (
                <div className="w-full h-96 flex items-center justify-center">
                    <span className="loading loading-bars loading-lg text-primary"></span>
                </div>
            ) : listingData.length === 0 ? (
                /* Empty State */
                <div className="text-center py-24 bg-base-200/30 rounded-3xl border border-dashed border-base-content/10">
                    <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 text-base-content/30">
                        <FaCar className="text-4xl" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content mb-2">No cars listed yet</h3>
                    <p className="text-base-content/60 mb-8 max-w-md mx-auto">
                        Your fleet is empty. Start adding vehicles to reach thousands of potential renters.
                    </p>
                    <a href="/add-car" className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/30 text-white">
                        Add Your First Car
                    </a>
                </div>
            ) : (
                /* 3. Data Table */
                <div className="bg-base-100 rounded-3xl border border-base-content/10 overflow-hidden shadow-xl shadow-base-content/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-base-200/50 border-b border-base-content/5 text-xs uppercase tracking-wider text-base-content/60 font-bold">
                                    <th className="p-6">Vehicle</th>
                                    <th className="p-6">Daily Rate</th>
                                    <th className="p-6 text-center">Status</th>
                                    <th className="p-6 text-center">Date Added</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-content/5">
                                {listingData.map((car) => (
                                    <tr key={car._id} className="group hover:bg-base-200/50 transition-colors">
                                        
                                        {/* Column: Vehicle Info */}
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg bg-base-200 overflow-hidden relative border border-base-content/5">
                                                    <img src={car.carImgUrl} alt={car.carName} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-base-content group-hover:text-primary transition-colors">
                                                        {car.carName}
                                                    </div>
                                                    <div className="text-xs text-base-content/60 flex items-center gap-1">
                                                        {car.carType} • {car.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Column: Price */}
                                        <td className="p-6">
                                            <div className="font-bold text-base-content">
                                                ৳{Number(car.rentPrice).toLocaleString()}
                                            </div>
                                            <div className="text-xs text-base-content/60">per day</div>
                                        </td>

                                        {/* Column: Status */}
                                        <td className="p-6 text-center">
                                            <button 
                                                onClick={() => handleUpdateStatus(car)}
                                                disabled={processingId === car._id}
                                                className={`transition-transform active:scale-95 ${processingId === car._id ? 'opacity-50' : ''}`}
                                            >
                                                <StatusBadge status={car.carStatus} />
                                            </button>
                                        </td>

                                        {/* Column: Date Added */}
                                        <td className="p-6 text-center">
                                            <div className="flex items-center justify-center gap-2 text-sm text-base-content/60">
                                                <FaCalendarAlt className="text-base-content/40" />
                                                {car.dateAdded ? new Date(car.dateAdded).toLocaleDateString() : "N/A"}
                                            </div>
                                        </td>

                                        {/* Column: Actions */}
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="tooltip" data-tip="Edit Listing">
                                                     <button  onClick={() => handleEdit(car._id)} className="w-10 h-10 rounded-xl bg-base-200 text-base-content/70 hover:bg-blue-500/10 hover:text-blue-500 flex items-center justify-center transition-all">
                                                        <FaEdit />
                                                     </button>
                                                </div>
                                                <div className="tooltip" data-tip="Delete Listing">
                                                    <button 
                                                        onClick={() => handleRemove(car._id)}
                                                        disabled={deletingId === car._id}
                                                        className="w-10 h-10 rounded-xl bg-base-200 text-base-content/70 hover:bg-red-500/10 hover:text-red-500 flex items-center justify-center transition-all"
                                                    >
                                                        {deletingId === car._id ? (
                                                            <span className="loading loading-spinner loading-xs"></span>
                                                        ) : (
                                                            <FaTrashAlt />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-base-200/30 border-t border-base-content/5 text-center text-xs text-base-content/60">
                        Showing all {listingData.length} records in your inventory.
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingCar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="glass-card bg-base-100 w-full max-w-2xl rounded-3xl shadow-2xl border border-base-content/10 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-base-content/10 flex items-center justify-between sticky top-0 bg-base-100 z-10 backdrop-blur-lg bg-opacity-90">
                            <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                                <FaEdit className="text-primary" /> Edit Listing
                            </h3>
                            <button 
                                onClick={() => setEditingCar(null)}
                                className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:bg-base-300 transition-colors"
                            >
                                <FaTimesCircle />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSaveEdit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Car Name</label>
                                    <div className="relative">
                                        <FaCar className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                        <input
                                            name="carName"
                                            value={editingCar.carName || ''}
                                            onChange={handleChangeEdit}
                                            className="input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-base-content"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Price (৳)</label>
                                    <div className="relative">
                                        <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                        <input
                                            name="rentPrice"
                                            type="number"
                                            value={editingCar.rentPrice || ''}
                                            onChange={handleChangeEdit}
                                            className="input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-base-content"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Category</label>
                                    <div className="relative">
                                        <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                        <select
                                            name="carType"
                                            value={editingCar.carType || 'Luxury'}
                                            onChange={handleChangeEdit}
                                            className="select w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-base-content"
                                        >
                                            <option value="Luxury">Luxury</option>
                                            <option value="Sedan">Sedan</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Electric">Electric</option>
                                            <option value="Coupe">Coupe</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Location</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                        <input
                                            name="location"
                                            value={editingCar.location || ''}
                                            onChange={handleChangeEdit}
                                            className="input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-base-content"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Image URL</label>
                                    <div className="relative">
                                        <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                                        <input
                                            name="carImgUrl"
                                            value={editingCar.carImgUrl || ''}
                                            onChange={handleChangeEdit}
                                            className="input w-full pl-11 bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-base-content"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label text-xs font-bold uppercase text-base-content/60 mb-1">Description</label>
                                    <div className="relative">
                                        <textarea
                                            name="description"
                                            value={editingCar.description || ''}
                                            onChange={handleChangeEdit}
                                            rows="4"
                                            className="textarea w-full bg-base-200/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-base-content"
                                            placeholder="Description..."
                                            required
                                        ></textarea>
                                        <FaFileAlt className="absolute right-4 top-4 text-base-content/40" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingCar(null)}
                                    className="btn btn-ghost flex-1 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saveLoading}
                                    className="btn btn-primary flex-1 rounded-xl text-white shadow-lg shadow-primary/30"
                                >
                                    {saveLoading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default MyListing;
