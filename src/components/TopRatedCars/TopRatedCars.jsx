// TopRatedCars.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaStar, FaArrowRight, FaChevronLeft, FaChevronRight, FaGasPump } from "react-icons/fa";
import CarCard from "../CarCard/CarCard";

const TopRatedCars = ({
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

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
             <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
                Exclusive Collection
             </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-lg leading-relaxed">
              Explore our highest-rated vehicles, curated for comfort, performance, and style.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/all-cars" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors mr-4 group">
               View All Fleet 
               <FaArrowRight className="transform transition-transform group-hover:translate-x-1" />
            </Link>
            
            <div className="flex gap-2">
               <button
                  onClick={prev}
                  disabled={focusedIndex === 0}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-primary text-slate-600 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                  aria-label="Previous"
               >
                  <FaChevronLeft className="text-lg" />
               </button>
               <button
                  onClick={next}
                  disabled={focusedIndex === cars.length - 1}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-primary text-slate-600 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                  aria-label="Next"
               >
                  <FaChevronRight className="text-lg" />
               </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="min-w-[320px] w-[320px] h-[420px] rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600">
            Error loading cars: {error}
          </div>
        ) : (
          <div className="relative">
            <div
              ref={containerRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cars.map((car, idx) => (
                <div key={car._id} className="snap-center min-w-[320px] w-[320px]">
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopRatedCars;
