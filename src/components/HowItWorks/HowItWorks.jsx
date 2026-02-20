import React from "react";
import { FaSearch, FaCalendarCheck, FaCar } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Browse Fleet",
    desc: "Explore our wide range of premium vehicles and choose the one that fits your style.",
    icon: <FaSearch />,
  },
  {
    id: 2,
    title: "Book Securely",
    desc: "Select your dates and book instantly with our secure payment system.",
    icon: <FaCalendarCheck />,
  },
  {
    id: 3,
    title: "Hit the Road",
    desc: "Pick up your car or have it delivered, and enjoy your journey with peace of mind.",
    icon: <FaCar />,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-base-content mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            Rent your dream car in three simple steps. No paperwork, no hassles.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-base-content/15 z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
              <div className="relative w-28 h-28 rounded-3xl bg-base-100 border-2 border-base-content/10 shadow-xl flex items-center justify-center text-4xl text-primary mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out z-10">
                {step.icon}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-base-content text-base-100 flex items-center justify-center text-lg font-bold shadow-lg transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    {step.id}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold font-display text-base-content mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-base-content/60 leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
