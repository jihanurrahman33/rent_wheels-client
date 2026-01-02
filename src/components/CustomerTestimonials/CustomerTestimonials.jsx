import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Arif Hossain",
    title: "Software Engineer",
    review:
      "Rent Wheels made my business trip so easy. The booking process was smooth and the car was in excellent condition.",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sadia Ahmed",
    title: "Marketing Specialist",
    review:
      "Affordable rates and super friendly service! I highly recommend this platform for anyone looking for hassle-free car rentals.",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Tanvir Rahman",
    title: "Entrepreneur",
    review:
      "The best rental experience I’ve ever had. The support team was available 24/7 and very responsive!",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Nusrat Jahan",
    title: "UI/UX Designer",
    review:
      "Loved the easy interface and safe booking system. Everything felt secure and transparent. A premium experience.",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Kamrul Islam",
    title: "Civil Engineer",
    review:
      "Great selection of cars and very reasonable pricing. The pickup process was fast and convenient.",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    name: "Marium Siddiqua",
    title: "Fashion Blogger",
    review:
      "I booked a car for a weekend trip — everything was perfect! Definitely using this service again.",
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    name: "Imran Khan",
    title: "Banker",
    review:
      "Trustworthy providers, clean cars, and transparent pricing. This platform stands out!",
  },
  {
    id: 8,
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "Anika Rahman",
    title: "Business Analyst",
    review:
      "Customer support is top-notch. They guided me throughout the booking process with patience.",
  },
];

const TestimonialCard = ({ data }) => (
  <div className="glass-card h-full flex flex-col p-10 relative rounded-[2rem] border border-white/60 dark:border-white/5 bg-white/60 dark:bg-white/5 backdrop-blur-2xl group hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500">
    <div className="absolute top-8 right-8 text-6xl text-primary/10 font-serif leading-none select-none">"</div>
    
    <div className="flex items-center gap-4 mb-8">
      <img
        src={data.avatar}
        alt={data.name}
        className="w-16 h-16 rounded-full ring-4 ring-white dark:ring-white/10 object-cover shadow-lg"
      />
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-lg font-display">
          {data.name}
        </h4>
        <p className="text-sm text-primary font-bold uppercase tracking-wider">
          {data.title}
        </p>
      </div>
    </div>

    <p className="text-xl text-slate-600 dark:text-slate-300 italic mb-8 flex-grow leading-relaxed font-light relative z-10">
      {data.review}
    </p>

    <div className="flex items-center justify-between pt-6 border-t border-slate-200/50 dark:border-white/5">
       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Renter</span>
      <div className="flex text-yellow-400 text-sm gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default function CustomerTestimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-base-200">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">
            Driven by <span className="text-primary">Trust</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light">
            Hear from our community of happy drivers who have experienced the
            journey with Rent Wheels.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className="pb-16 testimonials-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="h-auto">
              <TestimonialCard data={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: var(--color-primary);
        }
      `}</style>
    </section>
  );
}
