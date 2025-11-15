// TopRatedCarsPro.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const Stars = ({ value = 0, size = 14 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating ${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        const fill =
          idx <= full ? "full" : idx === full + 1 && half ? "half" : "empty";
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={
              fill === "full"
                ? "text-yellow-400"
                : fill === "half"
                ? "text-yellow-400/80"
                : "text-gray-300 dark:text-gray-700"
            }
            aria-hidden
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.538 1.118L10 15.347l-3.37 2.447c-.783.57-1.838-.198-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.644 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z"
              fill="currentColor"
            />
          </svg>
        );
      })}
    </div>
  );
};

const CardSkeleton = () => (
  <div className="animate-pulse min-w-[260px] w-64 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 shadow">
    <div className="h-36 w-full bg-gray-200 dark:bg-gray-700 rounded-md mb-3" />
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    <div className="mt-4 flex gap-2">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
    </div>
  </div>
);

const TopRatedCarsPro = ({
  apiUrl = "https://rent-wheels-nine.vercel.app/cars",
  title = "Top Rated Picks",
}) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

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
          const rent = Number(c.rentPrice || c.pricePerDay || 0) || 0;
          const availableScore = c.carStatus === "available" ? 1 : 0;
          const score =
            rating != null
              ? rating * 1000 + rent
              : availableScore * 100000 + rent;
          return { ...c, score, rating: rating ?? 0 };
        });

        scored.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        const top = scored.slice(0, 8);
        if (mounted) setCars(top);
      } catch (err) {
        if (mounted) setError(err.message || "Error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  const scrollTo = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const card = el.children[index];
    if (!card) return;
    card.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setFocusedIndex(index);
  };

  const next = () => {
    const nextIndex = Math.min(cars.length - 1, focusedIndex + 1);
    scrollTo(nextIndex);
  };
  const prev = () => {
    const prevIndex = Math.max(0, focusedIndex - 1);
    scrollTo(prevIndex);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedIndex, cars]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Curated top cars from our fleet — updated automatically.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-200"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12.707 14.707a1 1 0 01-1.414 0L6.586 10l4.707-4.707a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-200"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M7.293 5.293a1 1 0 011.414 0L13.414 10l-4.707 4.707a1 1 0 11-1.414-1.414L10.586 10 7.293 6.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden pb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg p-6 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : cars.length === 0 ? (
          <div className="rounded-lg p-6 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            No cars to show.
          </div>
        ) : (
          <div className="relative">
            <div
              ref={containerRef}
              role="list"
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
              aria-label="Top rated cars"
            >
              {cars.map((car, idx) => (
                <article
                  key={car._id}
                  role="listitem"
                  className={`snap-center min-w-[260px] w-64 rounded-xl overflow-hidden transform transition-shadow duration-200 hover:scale-[1.02] ${
                    idx === focusedIndex ? "ring-2 ring-blue-500" : ""
                  } bg-gradient-to-br from-white to-white/90 dark:from-gray-900 dark:to-gray-900/80 border border-gray-100 dark:border-gray-800 shadow`}
                >
                  <div className="relative h-40">
                    <img
                      src={car.carImgUrl || "/placeholder-car.png"}
                      alt={car.carName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    <div className="absolute left-3 top-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium">
                      {car.carType || "Car"}
                    </div>
                    <div className="absolute right-3 top-3 px-2 py-1 rounded-md bg-white/90 text-black text-xs font-semibold">
                      {car.rating ? car.rating.toFixed(1) : "—"}
                    </div>
                  </div>

                  <div className="p-3 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {car.carName}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                          {car.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="text-xs text-gray-500">Rent / day</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          ৳{car.rentPrice}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-500">Status</div>
                        <div
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            car.carStatus === "unavailable"
                              ? "bg-red-600 text-white"
                              : "bg-green-600 text-white"
                          }`}
                        >
                          {car.carStatus || "available"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Link
                        to={`/car-details/${car._id}`}
                        className="flex-1 btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <Stars value={car.rating ?? 0} size={12} />
                      <div className="text-xs text-gray-400">
                        {car.location}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 hidden lg:flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {cars.length} curated cars
              </div>
              <div className="flex gap-2">
                {cars.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Show card ${i + 1}`}
                    className={`w-2 h-2 rounded-full ${
                      i === focusedIndex
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                    title={`Card ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  function scrollToIndex(i) {
    const el = containerRef.current;
    if (!el) return;
    const card = el.children[i];
    if (!card) return;
    card.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setFocusedIndex(i);
  }
};

export default TopRatedCarsPro;
