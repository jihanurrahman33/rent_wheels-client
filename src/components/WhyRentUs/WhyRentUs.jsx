import React from "react";
import {
  FaRegClock,
  FaShieldAlt,
  FaTags,
  FaCarSide,
  FaArrowRight,
} from "react-icons/fa";

const WhyRentUs = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-base-200">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-70 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-display font-bold text-base-content">
            Unmatched <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg font-light">
            We don't just rent cars; we provide a seamless journey. Discover why
            thousands of drivers choose us every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Hero Feature (Wide) */}
          <div className="md:col-span-2 group/card glass-card p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-base-100/60 border border-base-content/10 rounded-3xl relative overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
            <div className="relative z-10 space-y-4 max-w-md">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl group-hover/card:scale-110 transition-transform duration-300">
                <FaCarSide />
              </div>
              <h3 className="text-2xl font-bold text-base-content group-hover/card:text-primary transition-colors">
                Premium Fleet Selection
              </h3>
              <p className="text-base-content/60 leading-relaxed text-lg">
                From high-performance sports cars to spacious luxury SUVs, our
                fleet is curated for those who demand the best.
              </p>
            </div>
            {/* Abstract visual or image could go here */}
            <div className="hidden sm:block absolute -right-10 -bottom-10 opacity-10 transform group-hover/card:scale-110 group-hover/card:-rotate-12 transition-transform duration-700">
              <FaCarSide className="text-[12rem] text-primary" />
            </div>
          </div>

          {/* Card 2: Tall Feature (Vertical) */}
          <div className="md:row-span-2 group/card glass-card p-8 flex flex-col bg-slate-900 text-white border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-0 right-0 p-32 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary text-2xl mb-6 group-hover/card:scale-110 transition-transform duration-300">
              <FaRegClock />
            </div>
            
            <h3 className="text-xl font-bold mb-4 font-display">24/7 Concierge Support</h3>
            <p className="text-slate-400 leading-relaxed mb-auto text-lg">
              Our dedicated support team is available around the clock to assist
              you with bookings, roadside assistance, or any inquiries.
            </p>
            
            <button className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-white transition-colors group/btn">
              Contact Us <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Standard Feature */}
          <div className="group/card glass-card p-8 bg-base-100/60 border border-base-content/10 rounded-3xl hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 text-2xl mb-4 group-hover/card:scale-110 transition-transform">
              <FaTags />
            </div>
            <h3 className="text-lg font-bold text-base-content mb-2 font-display">
              Transparent Pricing
            </h3>
            <p className="text-base-content/60 leading-relaxed">
              No hidden fees or surprises. What you see is exactly what you pay.
            </p>
          </div>

          {/* Card 4: Standard Feature */}
          <div className="group/card glass-card p-8 bg-base-100/60 border border-base-content/10 rounded-3xl hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-2xl mb-4 group-hover/card:scale-110 transition-transform">
              <FaShieldAlt />
            </div>
            <h3 className="text-lg font-bold text-base-content mb-2 font-display">
              Verified Providers
            </h3>
            <p className="text-base-content/60 leading-relaxed">
              Every car is verified for safety and quality. We partner only with
              trusted owners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRentUs;
