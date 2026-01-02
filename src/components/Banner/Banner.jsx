import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center h-[500px] flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2940&auto=format&fit=crop")',
      }}
    >
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="glass p-10 md:p-16 rounded-3xl max-w-4xl mx-auto border border-white/20">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Ready to Start Your <span className="text-primary">Journey?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Book your premium vehicle today and experience the road like never
            before. Instant booking, zero hassle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/all-cars"
              className="btn btn-primary h-16 px-12 text-xl font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform rounded-full border-none w-full sm:w-auto"
            >
              Book Now
            </Link>
            <Link
              to="/add-car"
              className="btn h-16 px-12 text-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-full w-full sm:w-auto"
            >
              List Your Car
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
