import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState(null);

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
        if (mounted) {
          setError(err.message || "Error loading bookings");
          Swal.fire({
            icon: "error",
            title: "Failed to load bookings",
            text:
              err.message || "An error occurred while loading your bookings.",
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user]);

  const performBookingAction = async (bookingId, action) => {
    const title =
      action === "complete" ? "Mark as completed?" : "Cancel this booking?";
    const confirmButtonText =
      action === "complete" ? "Yes, complete" : "Yes, cancel";
    const confirmColor = action === "complete" ? "#16a34a" : "#dc2626";

    const confirmed = await Swal.fire({
      title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "No",
      confirmButtonColor: confirmColor,
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

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Action failed");
      }

      setBookingData((prev) => prev.filter((b) => b._id !== bookingId));

      await Swal.fire({
        icon: "success",
        title:
          action === "complete" ? "Booking completed" : "Booking cancelled",
        showConfirmButton: false,
        timer: 1400,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Action failed",
        text: err.message || "An error occurred while performing the action.",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleComplete = (bookingId) =>
    performBookingAction(bookingId, "complete");
  const handleCancel = (bookingId) => performBookingAction(bookingId, "cancel");

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          My Bookings
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {bookingData.length} bookings
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex gap-4 items-center bg-white dark:bg-gray-900 rounded-lg p-4"
            >
              <div className="bg-gray-200 dark:bg-gray-700 w-36 h-24 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 border rounded-md text-sm text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
          >
            Retry
          </button>
        </div>
      ) : bookingData.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You have no bookings yet.
          </p>
          <a
            href="/cars"
            className="inline-block px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Browse Cars
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookingData.map((b) => (
            <div
              key={b._id}
              className="flex items-center gap-4 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg p-4"
            >
              <img
                src={b.carImgUrl || "/placeholder-car.png"}
                alt={b.carName}
                className="w-36 h-24 object-cover rounded-md flex-shrink-0"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {b.carName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {b.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {b.location} · {b.carType}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Provider: {b.providerName || b.providerEmail}
                    </p>
                    {b.bookedBy && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Booked by: {b.bookedBy}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Rent / day
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      ৳{b.rentPrice}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Link
                      to={`/car-details/${b._id}`}
                      className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      View
                    </Link>

                    {(!b.status || b.status === "confirmed") && (
                      <button
                        onClick={() => handleComplete(b._id)}
                        disabled={processingId === b._id}
                        className={`px-3 py-2 rounded-md text-sm text-white ${
                          processingId === b._id
                            ? "bg-gray-400"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {processingId === b._id ? "Processing..." : "Complete"}
                      </button>
                    )}

                    {b.status !== "completed" && (
                      <button
                        onClick={() => handleCancel(b._id)}
                        disabled={processingId === b._id}
                        className={`px-3 py-2 rounded-md text-sm text-white ${
                          processingId === b._id
                            ? "bg-gray-400"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {processingId === b._id ? "Processing..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
