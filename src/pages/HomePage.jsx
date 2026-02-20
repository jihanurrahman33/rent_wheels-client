import React from "react";
import "./home.css";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Keyboard,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import WhyRentUs from "../components/WhyRentUs/WhyRentUs";
import TopRatedCars from "../components/TopRatedCars/TopRatedCars";
import CustomerTestimonials from "../components/CustomerTestimonials/CustomerTestimonials";
import Banner from "../components/Banner/Banner";
import TrustedBrands from "../components/TrustedBrands/TrustedBrands";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import { Link } from "react-router";

const HomePage = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2898&auto=format&fit=crop",
      title: "Drive Your Dreams Today",
      subtitle:
        "Premium fleet available for instant booking. Experience the thrill of the open road.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2940&auto=format&fit=crop",
      title: "Luxury & Comfort Combined",
      subtitle:
        "Experience the difference with our top-tier selection of luxury vehicles.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2940&auto=format&fit=crop",
      title: "Affordable Reliability",
      subtitle:
        "Best rates for the best rides in town. Efficiency meets style.",
    },
  ];

  return (
    <div className="bg-base-100 min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay, Pagination, Keyboard, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + ' !bg-white !opacity-100"></span>';
            },
          }}
          keyboard={{ enabled: true }}
          navigation={true}
          className="h-full w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className="relative h-full w-full">
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="w-full h-full object-cover animate-pulse-slow"
                  style={{ animationDuration: '10s' }} 
                />
                
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full container mx-auto px-6 lg:px-12 flex flex-col justify-center text-white">
                <div className="max-w-4xl space-y-2 animate-slide-up">
                  <div className="mb-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary-content text-sm font-semibold tracking-wider backdrop-blur-md">
                      PREMIUM CAR RENTALS
                    </span>
                  </div>
                  
                  {/* Fixed Height Title Wrapper for Alignment */}
                  <div className="min-h-[120px] md:min-h-[160px] flex items-end">
                    <h1 className="text-5xl md:text-7xl font-display font-bold leading-none drop-shadow-lg">
                      {slide.title.split(" ").map((word, idx) => (
                        <span key={idx} className={idx === 1 ? "text-primary" : ""}>
                          {word}{" "}
                        </span>
                      ))}
                    </h1>
                  </div>
                  
                  {/* Fixed Height Subtitle Wrapper */}
                  <div className="min-h-[80px] flex items-start pt-4">
                     <p className="text-lg md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light">
                      {slide.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                      to="/all-cars"
                      className="btn btn-primary h-14 px-8 text-lg font-medium shadow-xl shadow-primary/30 hover:scale-105 transition-transform border-none rounded-xl"
                    >
                      Book Your Ride
                    </Link>
                    <Link
                      to="/add-car"
                      className="btn h-14 px-8 text-lg font-medium glass text-white hover:bg-white/20 hover:text-white border border-white/30 rounded-xl"
                    >
                      List Your Car
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Stats / Value Prop Strip */}
      <div className="relative -mt-20 z-20 max-w-7xl mx-auto px-6 mb-24">
        <div className="glass-card bg-base-100/80 backdrop-blur-xl border border-base-content/10 shadow-2xl rounded-3xl p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center hover:transform hover:-translate-y-1 transition-transform duration-500">
            <div className="space-y-1 border-r border-base-content/10 last:border-none">
              <div className="text-4xl font-bold font-display text-primary">500+</div>
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-widest">Premium Cars</div>
            </div>
            <div className="space-y-1 border-r border-base-content/10 last:border-none">
              <div className="text-4xl font-bold font-display text-primary">24/7</div>
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-widest">Support</div>
            </div>
            <div className="space-y-1 border-r border-base-content/10 last:border-none">
              <div className="text-4xl font-bold font-display text-primary">100%</div>
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-widest">Secure</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold font-display text-primary">5.0</div>
              <div className="text-xs font-bold text-base-content/60 uppercase tracking-widest">User Rating</div>
            </div>
        </div>
      </div>
      
      {/* Trusted Brands Marquee (New) */}
      <TrustedBrands />

      {/* Why Choose Us */}
      <section className="relative z-10">
          <WhyRentUs />
      </section>
      
      {/* Featured Section */}
      <section className="pt-24 pb-16 bg-base-100">
        <div className="container mx-auto px-6">
          <TopRatedCars />
        </div>
      </section>

      {/* How It Works (New) */}
      <HowItWorks />

      {/* Testimonials */}
      <CustomerTestimonials />
      
      {/* Parallax CTA Banner (New Style) */}
      <Banner />

    </div>
  );
};

export default HomePage;
