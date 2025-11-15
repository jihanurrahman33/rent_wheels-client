// TopRatedCarsFromApi.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const Stars = ({ value }) => {
  const v = Math.round(value || 0);
  return (
    <div className="flex items-center gap-1 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < v ? "text-yellow-400" : "text-gray-300 dark:text-gray-700"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.538 1.118L10 15.347l-3.37 2.447c-.783.57-1.838-.198-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.644 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z" />
        </svg>
      ))}
    </div>
  );
};

const TopRatedCars = ({
  apiUrl = "http://localhost:3000/cars",
  title = "Top Rated Cars",
}) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();

        const scored = (data || []).map((c) => {
          const rating = typeof c.rating === "number" ? c.rating : null;
          const rent = Number(c.rentPrice || c.pricePerDay || 0);
          const availableScore = c.carStatus === "available" ? 1 : 0;
          const score =
            rating != null
              ? rating * 1000 + rent
              : availableScore * 100000 + rent;
          return { ...c, score, rating };
        });

        scored.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        const top = scored.slice(0, 6);

        if (mounted) setCars(top);
      } catch (err) {
        if (mounted) {
          setError(err.message || "Error");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  const scroll = (dir = "right") => {
    const el = containerRef.current;
    if (!el) return;
    const offset = el.clientWidth * 0.7;
    el.scrollBy({
      left: dir === "right" ? offset : -offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="btn btn-ghost btn-sm"
            >
              ‹
            </button>
            <button
              onClick={() => scroll("right")}
              className="btn btn-ghost btn-sm"
            >
              ›
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-gray-900 rounded-xl p-4 h-56"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : cars.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No cars found.
          </div>
        ) : (
          <>
            <div
              ref={containerRef}
              className="flex gap-4 overflow-x-auto no-scrollbar pb-3 snap-x snap-mandatory"
            >
              {cars.map((car) => (
                <article
                  key={car._id}
                  className="snap-center min-w-[280px] w-72 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition p-3"
                >
                  <div className="relative rounded-md overflow-hidden h-40 mb-3">
                    <img
                      src={car.carImgUrl || "/placeholder-car.png"}
                      alt={car.carName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-0.5 rounded text-xs">
                      {car.carType || "Car"}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/80 text-black px-2 py-0.5 rounded text-xs font-semibold">
                      {car.rating != null ? car.rating.toFixed(1) : "—"}
                    </div>
                  </div>

                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                    {car.carName}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 my-2">
                    {car.description}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <div className="text-xs text-gray-500">Rent / day</div>
                      <div className="text-lg font-semibold">
                        ৳{car.rentPrice}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-500">Status</div>
                      <div
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          car.carStatus === "unavailable"
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {car.carStatus || "available"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <Link
                      to={`/car-details/${car._id}`}
                      className="btn btn-ghost btn-sm flex-1"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={car.carStatus === "unavailable"}
                      onClick={() => {
                        if (car.carStatus === "unavailable") return;
                        window.location.href = `/car-details/${car._id}`;
                      }}
                    >
                      Book
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TopRatedCars;
