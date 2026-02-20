import React from "react";
import {
  SiMercedes,
  SiTesla,
  SiBmw,
  SiAudi,
  SiPorsche,
  SiFerrari,
  SiToyota,
  SiHonda,
} from "react-icons/si";

const brands = [
  { icon: <SiMercedes />, name: "Mercedes" },
  { icon: <SiTesla />, name: "Tesla" },
  { icon: <SiBmw />, name: "BMW" },
  { icon: <SiAudi />, name: "Audi" },
  { icon: <SiPorsche />, name: "Porsche" },
  { icon: <SiFerrari />, name: "Ferrari" },
  { icon: <SiToyota />, name: "Toyota" },
  { icon: <SiHonda />, name: "Honda" },
];

const TrustedBrands = () => {
  return (
    <section className="py-12 border-b border-base-200 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Trusted by drivers of
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-20 px-4">
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3 text-base-content/30 hover:text-base-content transition-all duration-500 cursor-default"
            >
              <div className="text-5xl opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm">{brand.icon}</div>
              <span className="text-2xl font-display font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-20 px-4">
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3 text-base-content/30 hover:text-base-content transition-all duration-500 cursor-default"
            >
              <div className="text-5xl opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm">{brand.icon}</div>
              <span className="text-2xl font-display font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add custom keyframes if not present in Tailwind config */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedBrands;
