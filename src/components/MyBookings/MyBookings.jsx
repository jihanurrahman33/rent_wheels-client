import React, { use, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaFileInvoiceDollar,
  FaPlaneDeparture,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCar,
} from "react-icons/fa";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState(null);

  // Derived Stats
  const stats = useMemo(() => {
    const totalTrips = bookingData.length;
    const activeTrips = bookingData.filter(b => (!b.status || b.status === "confirmed")).length;
    const completedTrips = bookingData.filter(b => b.status === "completed").length;
    return { totalTrips, activeTrips, completedTrips };
  }, [bookingData]);

  useEffect(() => {
    if (!user?.email) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const token = user?.accessToken || localStorage.getItem("token");
        const res = await fetch(
          `https://rent-wheels-nine.vercel.app/my-bookings?email=${encodeURIComponent(
            user.email
          )}`,
          {
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to load bookings");
        const data = await res.json();
        if (mounted) setBookingData(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [user]);

  const performBookingAction = async (bookingId, action) => {
    const title = action === "complete" ? "Complete Trip?" : "Cancel Trip?";
    const text = action === "complete" ? "Mark this rental as finished." : "This will cancel your reservation.";
    const confirmButtonText = action === "complete" ? "Yes, Complete" : "Yes, Cancel";
    const confirmColor = action === "complete" ? "#10B981" : "#EF4444";

    const confirmed = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "No, Keep",
      confirmButtonColor: confirmColor,
      customClass: {
        popup: "bg-base-100 text-base-content border border-base-content/10",
        title: "text-base-content",
        htmlContainer: "text-base-content/70"
      }
    });

    if (!confirmed.isConfirmed) return;

    setProcessingId(bookingId);
    try {
      const token = user?.accessToken || localStorage.getItem("token");
      const res = await fetch(
        `https://rent-wheels-nine.vercel.app/removeBooking/?id=${encodeURIComponent(
          bookingId
        )}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action }),
        }
      );

      if (!res.ok) throw new Error("Action failed");

      setBookingData((prev) => prev.filter((b) => b._id !== bookingId));

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
        title: action === "complete" ? "Trip Completed" : "Booking Cancelled"
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Action failed",
        text: err.message,
        customClass: {
            popup: "bg-base-100 text-base-content border border-base-content/10",
            title: "text-base-content",
            htmlContainer: "text-base-content/70"
        }
      });
    } finally {
      setProcessingId(null);
    }
  };

  const StatusBadge = ({ status }) => {
    // Default to 'confirmed' if status is missing or confirmed
    let colorClass = "bg-blue-500/10 text-blue-500 border-blue-500/20";
    let icon = <FaClock />;
    let label = "Confirmed";

    if (status === "completed") {
        colorClass = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        icon = <FaCheckCircle />;
        label = "Completed";
    } else if (status === "cancelled") {
        colorClass = "bg-red-500/10 text-red-500 border-red-500/20";
        icon = <FaTimesCircle />;
        label = "Cancelled";
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${colorClass}`}>
            {icon} {label}
        </span>
    );
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 lg:py-24 relative overflow-hidden transition-colors duration-500">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
            
            {/* Header & Stats */}
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-base-content mb-2">
                        My Trips
                    </h1>
                    <p className="text-base-content/60">
                        View upcoming reservations and past rental history.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                     <div className="glass-card bg-base-200/50 p-4 rounded-2xl border border-base-content/5 shadow-sm text-center min-w-[140px]">
                        <div className="text-base-content/60 text-xs font-bold uppercase mb-1">Upcoming</div>
                        <div className="text-2xl font-bold text-base-content flex items-center justify-center gap-2">
                            <FaPlaneDeparture className="text-primary text-lg" /> {stats.activeTrips}
                        </div>
                    </div>
                    <div className="glass-card bg-base-200/50 p-4 rounded-2xl border border-base-content/5 shadow-sm text-center min-w-[140px]">
                        <div className="text-base-content/60 text-xs font-bold uppercase mb-1">Completed</div>
                         <div className="text-2xl font-bold text-base-content flex items-center justify-center gap-2">
                            <FaCheckCircle className="text-emerald-500 text-lg" /> {stats.completedTrips}
                        </div>
                    </div>
                </div>
            </div>

            {/* Error State */}
            {error && (
                 <div className="mb-8 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-center text-sm">
                    {error} <button onClick={() => window.location.reload()} className="underline ml-2 font-bold">Retry</button>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="w-full h-64 flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : bookingData.length === 0 ? (
                /* Empty State */
                 <div className="text-center py-24 bg-base-200/30 rounded-3xl border border-dashed border-base-content/10">
                    <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 text-base-content/30">
                        <FaCalendarCheck className="text-4xl" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content mb-2">No upcoming trips</h3>
                    <p className="text-base-content/60 mb-8 max-w-md mx-auto">
                        You haven't booked any cars yet. Explore our premium fleet and plan your next journey.
                    </p>
                    <Link to="/all-cars" className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/30 text-white">
                        Browse Fleet
                    </Link>
                </div>
            ) : (
                /* Bookings Table */
                <div className="bg-base-100 rounded-3xl border border-base-content/10 overflow-hidden shadow-xl shadow-base-content/5">
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-base-200/50 border-b border-base-content/5 text-xs uppercase tracking-wider text-base-content/60 font-bold">
                                <th className="p-6">Vehicle Details</th>
                                <th className="p-6">Dates & Location</th>
                                <th className="p-6">Total Cost</th>
                                <th className="p-6 text-center">Status</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-content/5">
                            {bookingData.map((booking) => (
                                <tr key={booking._id} className="group hover:bg-base-200/50 transition-colors">
                                    
                                    {/* Vehicle */}
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-14 rounded-lg bg-base-200 overflow-hidden border border-base-content/5">
                                                <img src={booking.carImgUrl} alt={booking.carName} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-base-content group-hover:text-primary transition-colors">
                                                    {booking.carName}
                                                </div>
                                                <div className="text-xs text-base-content/60">
                                                    {booking.carType}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Dates & Loc */}
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-2 text-sm text-base-content/80">
                                                <FaCalendarCheck className="text-base-content/40" /> 
                                                <span className="font-medium">
                                                    {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "Just Now"}
                                                </span>
                                            </span>
                                             <span className="flex items-center gap-2 text-xs text-base-content/60">
                                                <FaMapMarkerAlt className="text-base-content/40" /> {booking.location || "N/A"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Cost */}
                                    <td className="p-6">
                                        <div className="font-bold text-base-content">
                                            ৳{booking.rentPrice}
                                        </div>
                                        <div className="text-xs text-base-content/60">per day</div>
                                    </td>

                                    {/* Status */}
                                    <td className="p-6 text-center">
                                        <StatusBadge status={booking.status} />
                                    </td>

                                    {/* Actions */}
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            {(!booking.status || booking.status === 'confirmed') && (
                                                <button 
                                                    onClick={() => performBookingAction(booking._id, "cancel")}
                                                    disabled={processingId === booking._id}
                                                    className="px-4 py-2 rounded-lg text-xs font-bold bg-base-100 border border-base-content/10 text-base-content/70 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all shadow-sm"
                                                >
                                                    {processingId === booking._id ? "..." : "Cancel"}
                                                </button>
                                            )}
                                            {(!booking.status || booking.status === 'confirmed') && (
                                                 <button 
                                                    onClick={() => performBookingAction(booking._id, "complete")}
                                                    disabled={processingId === booking._id}
                                                    className="px-4 py-2 rounded-lg text-xs font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                                                >
                                                    Complete
                                                </button>
                                            )}
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                    {/* Mobile Card Layout */}
                    <div className="md:hidden divide-y divide-base-content/5">
                        {bookingData.map((booking) => (
                            <div key={booking._id} className="p-4 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-14 rounded-lg bg-base-200 overflow-hidden border border-base-content/5 shrink-0">
                                        <img src={booking.carImgUrl} alt={booking.carName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-bold text-base-content truncate">{booking.carName}</div>
                                        <div className="text-xs text-base-content/60">{booking.carType}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-base-content/60">
                                        <FaCalendarCheck className="text-base-content/40" />
                                        <span>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "Just Now"}</span>
                                    </div>
                                    <div className="font-bold text-base-content">৳{booking.rentPrice}<span className="text-xs text-base-content/60 font-normal">/day</span></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <StatusBadge status={booking.status} />
                                    <div className="flex gap-2">
                                        {(!booking.status || booking.status === 'confirmed') && (
                                            <>
                                                <button 
                                                    onClick={() => performBookingAction(booking._id, "cancel")}
                                                    disabled={processingId === booking._id}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-base-100 border border-base-content/10 text-base-content/70 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                                >
                                                    {processingId === booking._id ? "..." : "Cancel"}
                                                </button>
                                                <button 
                                                    onClick={() => performBookingAction(booking._id, "complete")}
                                                    disabled={processingId === booking._id}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-white shadow-sm hover:scale-[1.02] transition-all"
                                                >
                                                    Complete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default MyBookings;
