import React from "react";
import { Link, useLoaderData } from "react-router";

const BrowseCars = () => {
  const data = useLoaderData() || [];

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          All Available Cars
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {data.length} cars
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((car) => (
          <article
            key={car._id}
            className="bg-white dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={car.carImgUrl || "/placeholder-car.png"}
                alt={car.carName}
                className="w-full h-full object-cover"
              />
              <div className="absolute left-3 top-3 px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white">
                {car.carType || "Car"}
              </div>
              <div
                className={`absolute right-3 top-3 px-3 py-1 rounded-full text-xs font-medium ${
                  car.carStatus === "unavailable"
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {car.carStatus || "available"}
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {car.carName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                {car.description || "No description provided."}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-100">
                    {car.location || "-"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Rent / day
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    ৳{car.rentPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/car-details/${car._id}`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  View Details
                </Link>

                <Link
                  to={
                    car.carStatus === "unavailable"
                      ? "#"
                      : `/car-details/${car._id}`
                  }
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                    car.carStatus === "unavailable"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={(e) => {
                    if (car.carStatus === "unavailable") e.preventDefault();
                  }}
                >
                  {car.carStatus === "unavailable" ? "Unavailable" : "Book"}
                </Link>
              </div>

              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Listed by: {car.providerName || car.providerEmail || "Unknown"}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BrowseCars;
