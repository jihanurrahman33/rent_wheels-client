import React, { useState, use, useEffect } from "react";
import { Link, useParams } from "react-router"; // Changed useLoaderData to useParams
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import CarCard from "../CarCard/CarCard";
import {
  FaCar,
  FaGasPump,
  FaCogs,
  FaChair,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Import Secure Hook
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const { user } = use(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetch Car Details
  const { data: carData = {}, isLoading: isCarLoading, isError } = useQuery({
      queryKey: ['car', id],
      queryFn: async () => {
          const res = await axiosSecure.get(`/car-details/${id}`);
          return res.data;
      }
  });

  // 2. Fetch Related Cars (Dependent Query)
  const { data: relatedCars = [] } = useQuery({
      queryKey: ['related-cars', carData.carType, id],
      enabled: !!carData.carType, // Only run if carData is loaded
      queryFn: async () => {
          const res = await axiosPublic.get("/all-cars");
          const allCars = res.data;
          return allCars.filter(car => 
               car.carType === carData.carType && car._id !== id
          ).slice(0, 3);
      }
  });

  // 3. Booking Mutation
  const bookingMutation = useMutation({
      mutationFn: async () => {
          const res = await axiosSecure.patch(`/book/?id=${id}`);
          return res.data;
      },
      onSuccess: () => {
           Swal.fire({
            title: "Booking Confirmed!",
            text: "Your ride is ready. Check 'My Bookings' for details.",
            icon: "success",
            confirmButtonColor: "#2563eb",
            background: "#1e293b",
            color: "#fff",
          });
          // Invalidate car query to update status if needed, though local state handles it visually
          queryClient.invalidateQueries(['car', id]); 
      },
      onError: (error) => {
          Swal.fire({
            title: "Booking Failed",
            text: error.message || "Something went wrong.",
            icon: "error",
            background: "#1e293b",
            color: "#fff",
          });
      }
  });

  // Local status state is less relevant if we rely on server data, 
  // but for immediate UI feedback we can check `carData.carStatus`
  const isUnavailable = carData.carStatus === "unavailable" || carData.carStatus === "booked";

  const handleBooking = async () => {
    if (isUnavailable) return;

    if (!user) {
        Swal.fire({
          title: "Login Required",
          text: "Please sign in to book this vehicle.",
          icon: "info",
          confirmButtonText: "Okay",
          background: "#1e293b",
          color: "#fff",
        });
        return;
    }

    bookingMutation.mutate();
  };

  const FeatureItem = ({ icon: Icon, label, value }) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
        <Icon className="text-xl" />
      </div>
      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{label}</span>
      <span className="text-lg font-bold text-slate-900 dark:text-white capitalize">{value}</span>
    </motion.div>
  );

  if (isCarLoading) {
       return (
          <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-black">
              <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
      );
  }

  if (isError) {
      return <div>Error loading car details.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pb-24 relative overflow-x-hidden">
      {/* 1. Immersive Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
             <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={carData.carImgUrl || "/placeholder-car.png"}
              alt={carData.carName}
              className="w-full h-full object-cover opacity-80"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-black via-transparent to-black/30" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 z-20">
             <div className="max-w-7xl mx-auto">
                <Link
                to="/all-cars"
                className="inline-flex items-center text-sm font-bold text-white/80 hover:text-white mb-6 transition-colors backdrop-blur-md bg-black/20 px-4 py-2 rounded-full"
                >
                &larr; Back to Fleet
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase tracking-wider">
                                {carData.carType || "Premium Class"}
                            </span>
                            {isUnavailable ? (
                                <span className="px-3 py-1 rounded-full bg-red-500/80 backdrop-blur-md text-white border border-red-400/50 text-xs font-bold uppercase tracking-wider">
                                    Currently Booked
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-white border border-emerald-400/50 text-xs font-bold uppercase tracking-wider">
                                    Available Now
                                </span>
                            )}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-2 leading-tight">
                            {carData.carName}
                        </h1>
                        <div className="flex items-center text-white/80 text-lg">
                            <FaMapMarkerAlt className="mr-2 text-primary" />
                            {carData.location || "Prime Location"}
                        </div>
                    </motion.div>
                </div>
             </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Specs & Info */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Specs Grid */}
                <section>
                    <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <FaCogs className="text-slate-400" /> Specifications
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FeatureItem icon={FaChair} label="Seats" value={carData.features?.seats || "4 Adults"} />
                        <FeatureItem icon={FaCogs} label="Transmission" value={carData.features?.transmission || "Automatic"} />
                        <FeatureItem icon={FaGasPump} label="Fuel Type" value={carData.features?.fuel || "Hybrid"} />
                        <FeatureItem icon={FaShieldAlt} label="Insurance" value="Included" />
                    </div>
                </section>

                {/* Description */}
                <section className="prose dark:prose-invert max-w-none">
                     <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
                        Vehicle Overview
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                        {carData.description || "Experience the pinnacle of automotive engineering. This vehicle combines luxury, performance, and cutting-edge technology to deliver an unforgettable driving experience. Perfect for executive travel, weekend getaways, or special occasions."}
                    </p>
                </section>

                 {/* Owner / Provider Profile */}
                <section className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {(carData.providerName || carData.providerEmail || "O")[0].toUpperCase()}
                    </div>
                    <div>
                         <div className="text-xs font-bold uppercase text-primary mb-1 tracking-wider">Verified Owner</div>
                         <div className="text-xl font-bold text-slate-900 dark:text-white">
                            {carData.providerName || "Premium Partner"}
                         </div>
                         <div className="text-slate-500 dark:text-slate-400 text-sm">
                            Member since 2024 • 100% Response Rate
                         </div>
                    </div>
                </section>

            </div>

            {/* Right Column: Sticky Concierge Booking */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-slate-200/50 dark:shadow-none"
                    >
                        
                        <div className="flex justify-between items-end mb-8 border-b border-slate-100 dark:border-white/10 pb-8">
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Daily Rate</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">৳{carData.rentPrice}</span>
                                    <span className="text-slate-500">/day</span>
                                </div>
                            </div>
                             <div className="flex flex-col items-end">
                                <div className="flex text-amber-400 text-sm mb-1">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <span className="text-xs font-bold text-slate-400">5.0 (24 Reviews)</span>
                            </div>
                        </div>

                         <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Service Fee</span>
                                <span className="font-bold text-slate-900 dark:text-white">৳0</span>
                            </div>
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Insurance</span>
                                <span className="font-bold text-slate-900 dark:text-white dark:text-emerald-400 text-emerald-600">Included</span>
                            </div>
                            <div className="flex justify-between text-sm pt-4 border-t border-slate-100 dark:border-white/10">
                                <span className="font-bold text-slate-900 dark:text-white">Total (1 Day)</span>
                                <span className="font-bold text-primary text-lg">৳{carData.rentPrice}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleBooking}
                            disabled={bookingMutation.isPending || isUnavailable}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                                isUnavailable
                                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
                                : "bg-primary text-white shadow-primary/30"
                            }`}
                        >
                            {bookingMutation.isPending ? (
                                <span className="loading loading-dots loading-md"></span>
                            ) : isUnavailable ? (
                                "Currently Unavailable"
                            ) : (
                                "Reserve Now"
                            )}
                        </button>

                         <p className="text-center text-xs text-slate-400 mt-6">
                            No charge until booking is confirmed.
                        </p>

                    </motion.div>
                </div>
            </div>

        </div>

        {/* Similar Cars Section */}
        {relatedCars.length > 0 && (
            <div className="mt-24 border-t border-slate-200 dark:border-white/10 pt-16">
                <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-8">
                    You Might Also Like
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedCars.map(car => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default CarDetails;
