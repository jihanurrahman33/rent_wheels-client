import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyListing = () => {
  const { user } = use(AuthContext);
  const [listingData, setListingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdateStatus = async (car) => {
    const current = car.carStatus || "available";
    const newStatus = current === "unavailable" ? "available" : "unavailable";
    const confirmTitle =
      newStatus === "available"
        ? "Mark this car as available?"
        : "Mark this car as unavailable?";
    const confirmButtonText =
      newStatus === "available"
        ? "Yes, make available"
        : "Yes, make unavailable";
    const confirmColor = newStatus === "available" ? "#16a34a" : "#dc2626";

    const confirmed = await Swal.fire({
      title: confirmTitle,
      icon: "question",
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: "No",
      confirmButtonColor: confirmColor,
    });

    if (!confirmed.isConfirmed) return;

    setProcessingId(car._id);
    try {
      const token = user?.accessToken || localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/removeBooking/?id=${encodeURIComponent(
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

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to update status");
      }

      const updated = await res.json().catch(() => ({}));

      setListingData((prev) =>
        prev.map((c) =>
          c._id === car._id ? { ...c, carStatus: newStatus, ...updated } : c
        )
      );

      await Swal.fire({
        icon: "success",
        title:
          newStatus === "available"
            ? "Car is now available"
            : "Car set to unavailable",
        showConfirmButton: false,
        timer: 1400,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err.message || "An error occurred while updating status.",
      });
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/my-listing?email=${encodeURIComponent(
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
        if (mounted) {
          setError(err.message || "Error");
          Swal.fire({
            icon: "error",
            title: "Failed to load listings",
            text:
              err.message || "An error occurred while loading your listings.",
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

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Remove this listing?",
      text: "This action will permanently delete your listing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user.accessToken}`,
          "content-type": "application/json",
        },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Delete failed");
      }
      setListingData((prev) => prev.filter((c) => c._id !== id));
      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Your listing has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Could not remove listing",
        text: err.message || "An error occurred while removing the listing.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          My Listings
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {listingData.length} items
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl shadow-sm p-4 bg-gray-50 dark:bg-gray-800"
            >
              <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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
      ) : listingData.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You haven't listed any cars yet.
          </p>
          <a
            href="/add-car"
            className="inline-block px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Add your first car
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listingData.map((car) => (
            <div
              key={car._id}
              className="rounded-xl shadow transition hover:shadow-lg overflow-hidden bg-white dark:bg-gray-900 border border-transparent dark:border-gray-800"
            >
              <div className="relative h-48">
                <img
                  src={car.carImgUrl || "/placeholder-car.png"}
                  alt={car.carName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium bg-black/60 text-white">
                  {car.carType || "Car"}
                </div>
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium ${
                    car.carStatus === "unavailable"
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {car.carStatus || "available"}
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {car.carName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {car.description || "No description provided."}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {car.location}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Listed by: {car.providerName || car.providerEmail}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Rent / day
                    </p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      ৳{car.rentPrice}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {car.bookedBy ? (
                      <span>
                        Booked by:{" "}
                        <span className="font-medium">{car.bookedBy}</span>
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        No current booking
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(car)}
                      className={`px-3 py-2 rounded-md text-sm text-white ${
                        processingId === car._id
                          ? "bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={processingId === car._id}
                    >
                      {processingId === car._id ? "Processing..." : "Update"}
                    </button>
                    <button
                      onClick={() => handleRemove(car._id)}
                      className={`px-3 py-2 rounded-md text-sm text-white ${
                        deletingId === car._id
                          ? "bg-gray-400"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      disabled={deletingId === car._id}
                    >
                      {deletingId === car._id ? "Removing..." : "Remove"}
                    </button>
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

export default MyListing;
