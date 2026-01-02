import React from "react";
import { Link } from "react-router";
import { FaStar, FaArrowRight } from "react-icons/fa";

const CarCard = ({ car, children }) => {
  return (
    <article className="group relative w-full bg-base-100 rounded-3xl overflow-hidden shadow-lg shadow-base-content/5 border border-base-content/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={car.carImgUrl || "https://placehold.co/600x400"}
          alt={car.carName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="glass px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md border border-white/20">
            {car.carType || "Luxury"}
          </div>
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm ${
              car.carStatus === "available"
                ? "bg-green-500/90 backdrop-blur-md"
                : "bg-red-500/90 backdrop-blur-md"
            }`}
          >
            {car.carStatus || "Available"}
          </div>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-1.5 text-yellow-400 mb-1">
            <FaStar className="text-sm" />
            <span className="text-sm font-bold">
              {car.rating ? car.rating.toFixed(1) : "5.0"}
            </span>
            <span className="text-xs text-white/60 font-medium">
              (24 reviews)
            </span>
          </div>
          <h3 className="text-xl font-display font-bold leading-tight tracking-wide truncate">
            {car.carName}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-base-200/50 p-2.5 rounded-xl border border-base-content/5">
            <span className="text-xs text-base-content/60 block mb-1 font-medium uppercase tracking-wider">
              Daily Rate
            </span>
            <span className="text-lg font-bold text-primary">
              ৳{car.rentPrice}
            </span>
          </div>
          <div className="bg-base-200/50 p-2.5 rounded-xl border border-base-content/5">
            <span className="text-xs text-base-content/60 block mb-1 font-medium uppercase tracking-wider">
              Location
            </span>
            <span className="text-sm font-semibold text-base-content truncate block">
              {car.location || "Dhaka"}
            </span>
          </div>
        </div>

        {/* Action Button - Renders children if provided, else default Book Now */}
        <div className="mt-auto">
          {children ? (
            children
          ) : (
            <Link
              to={`/car-details/${car._id}`}
              className="group/btn relative w-full flex items-center justify-center gap-2 bg-base-content text-base-100 py-3.5 rounded-xl font-bold transition-all hover:bg-primary hover:text-white shadow-lg hover:shadow-primary/30"
            >
              Book Now
              <FaArrowRight className="text-sm transition-transform group-hover/btn:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default CarCard;
