import React, { useState, use } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const CarDetails = () => {
  const data = useLoaderData() || {};

  const { user } = use(AuthContext);
  const [booking, setBooking] = useState(false);
  const [status, setStatus] = useState(data.carStatus || "available");
  const [error, setError] = useState(null);

  const handleBooking = async () => {
    if (status === "unavailable") return;

    setError(null);
    setBooking(true);

    try {
      const token = user?.accessToken || localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          title: "Login Required",
          text: "You must be logged in to book a car.",
          icon: "warning",
          confirmButtonText: "Okay",
        });
        setBooking(false);
        return;
      }

      const res = await fetch(`http://localhost:3000/book/?id=${data._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Booking failed");
      }

      await res.json();
      setStatus("unavailable");

      Swal.fire({
        title: "Booking Successful!",
        text: "The car has been booked successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");

      Swal.fire({
        title: "Booking Failed",
        text: err.message || "Unknown error occurred",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
            <img
              src={data.carImgUrl || "/placeholder-car.png"}
              alt={data.carName}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{data.carName}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {data.carType || "Car"}
                </p>
              </div>

              <div className="text-right">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status === "unavailable"
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {status}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Listed by {data.providerName || data.providerEmail}
                </div>
              </div>
            </div>

            <div className="mt-4 text-gray-700 dark:text-gray-300">
              <h3 className="font-medium mb-2">About this car</h3>
              <p className="text-sm leading-relaxed">
                {data.description || "No description provided."}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <div className="font-medium">Location</div>
                  <div>{data.location || "-"}</div>
                </div>
                <div>
                  <div className="font-medium">Seats</div>
                  <div>{data.features?.seats ?? "-"}</div>
                </div>
                <div>
                  <div className="font-medium">Transmission</div>
                  <div>{data.features?.transmission ?? "-"}</div>
                </div>
                <div>
                  <div className="font-medium">Fuel</div>
                  <div>{data.features?.fuel ?? "-"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold mb-2">Provider Info</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm">
                {String(
                  (data.providerName || data.providerEmail || "U").charAt(0)
                ).toUpperCase()}
              </div>
              <div>
                <div className="font-medium">
                  {data.providerName || data.providerEmail}
                </div>
                <div className="text-xs text-gray-500">
                  {data.providerEmail}
                </div>
              </div>
              <div className="ml-auto">
                <a
                  href={`mailto:${data.providerEmail}`}
                  className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <aside className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Rent / day</div>
                <div className="text-2xl font-bold">৳{data.rentPrice}</div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>Security deposit</div>
                <div className="font-medium">৳{data.deposit ?? "0"}</div>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className={`btn w-full ${
                status === "unavailable" ? "btn-disabled" : "btn-primary"
              }`}
              disabled={booking || status === "unavailable"}
            >
              {booking
                ? "Booking..."
                : status === "unavailable"
                ? "Unavailable"
                : "Book Now"}
            </button>

            <div className="text-xs text-gray-500">
              By booking you agree to the provider's terms.
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm">
            <h4 className="font-semibold mb-3">Booking info</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <span className="font-medium">Minimum rental:</span>{" "}
                {data.minDays ?? 1} day(s)
              </li>
              <li>
                <span className="font-medium">Cancellation:</span>{" "}
                {data.cancellation ?? "Contact provider"}
              </li>
              <li>
                <span className="font-medium">Booked by:</span>{" "}
                {data.bookedBy ?? "—"}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CarDetails;
