import React, { useState, useMemo, useEffect } from "react";
import { FaSearch, FaSortAmountDown, FaCar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CarCard from "../CarCard/CarCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion, AnimatePresence } from "framer-motion";

const BrowseCars = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Data Fetching with TanStack Query
  const { data: loadedCars = [], isLoading, isError } = useQuery({
      queryKey: ['cars'],
      queryFn: async () => {
          const res = await axiosPublic.get('/all-cars');
          return res.data;
      }
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  // Filtering and Sorting Logic
  const filteredAndSortedCars = useMemo(() => {
    let result = [...loadedCars];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (car) =>
          car.carName?.toLowerCase().includes(lower) ||
          car.model?.toLowerCase().includes(lower) ||
          car.brand?.toLowerCase().includes(lower)
      );
    }

    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => Number(a.rentPrice) - Number(b.rentPrice));
        break;
      case "price-high":
        result.sort((a, b) => Number(b.rentPrice) - Number(a.rentPrice));
        break;
      case "rating":
            // Assuming cars have a rating, default to 0 if not present for safe sort
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Default order (usually newest or API order)
        break;
    }

    return result;
  }, [loadedCars, searchTerm, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCars = filteredAndSortedCars.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll to top of grid
  };

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-base-100">
              <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
      );
  }

  if (isError) {
       return (
          <div className="min-h-screen flex items-center justify-center bg-base-100">
              <div className="text-center">
                   <h2 className="text-2xl font-bold text-error mb-2">Error Loading Fleet</h2>
                   <p className="text-base-content/60">Please try again later.</p>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-base-100 pb-24">
      
      {/* 1. Page Header (Premium Hero Style) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden"
      >
         {/* Abstract Background Patterns */}
         <div className="absolute top-0 right-0 p-64 bg-primary/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-0 left-0 p-40 bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
         
         <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.span 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.3, duration: 0.5 }}
                 className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md"
            >
                Protocol: Luxury
            </motion.span>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight"
            >
               The <span className="text-primary">Fleet</span> Inventory
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
            >
               Select from our meticulously curated collection of premium vehicles. 
               Performance, comfort, and style—ready for your command.
            </motion.p>
         </div>
      </motion.div>

      <div className="container mx-auto px-6 -mt-8 relative z-20">
        {/* 2. Control Bar (Glassmorphism) */}
        <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.5 }}
             className="glass-card p-4 rounded-2xl bg-base-100/80 backdrop-blur-xl border border-base-content/10 shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by model, brand, or style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-base-200 border-none rounded-xl py-3.5 pl-12 pr-4 text-base-content placeholder:text-base-content/50 focus:ring-2 focus:ring-primary/50 transition-all font-medium"
            />
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 px-4 py-3.5 bg-base-200 rounded-xl text-base-content min-w-[180px]">
               <FaSortAmountDown className="text-slate-400" />
               <select 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-bold w-full cursor-pointer appearance-none"
               >
                  <option value="default">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
               </select>
            </div>
            
             <div className="hidden md:flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl text-primary font-bold">
                {filteredAndSortedCars.length}
             </div>
          </div>
        </motion.div>

        {/* 3. Vehicles Grid */}
        <div className="mt-12 min-h-[600px]">
          {filteredAndSortedCars.length > 0 ? (
            <>
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                <AnimatePresence mode="popLayout">
                {currentCars.map((car, index) => (
                    <motion.div
                        key={car._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <CarCard car={car}>
                        {/* We can pass custom children here if we want a different button, but default is "Book Now" */}
                        </CarCard>
                    </motion.div>
                ))}
                </AnimatePresence>
                </motion.div>

                {/* 4. Pagination Controls */}
                {totalPages > 1 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 flex flex-col items-center gap-6"
                    >
                        <div className="join shadow-xl border border-base-content/5">
                            <button 
                                className="join-item btn btn-lg bg-base-100 text-base-content hover:bg-base-200 border-none"
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                <FaChevronLeft />
                            </button>
                            
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`join-item btn btn-lg border-none ${currentPage === idx + 1 ? 'btn-primary text-white' : 'bg-base-100 text-base-content hover:bg-base-200'}`}
                                    onClick={() => handlePageChange(idx + 1)}
                                >
                                    {idx + 1}
                                </button>
                            ))}

                            <button 
                                className="join-item btn btn-lg bg-base-100 text-base-content hover:bg-base-200 border-none"
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                        <div className="text-sm text-base-content/50 font-medium">
                            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedCars.length)} of {filteredAndSortedCars.length} vehicles
                        </div>
                    </motion.div>
                )}
            </>
          ) : (
            /* 5. Empty State */
            <div className="flex flex-col items-center justify-center py-32 text-center opacity-70">
              <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center text-base-content/30 mb-6">
                <FaCar className="text-5xl" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-2">No Vehicles Found</h3>
              <p className="text-base-content/60">Try adjusting your search terms or filters.</p>
              <button 
                onClick={() => { setSearchTerm(""); setSortOption("default"); }}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseCars;
