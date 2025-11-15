// HomePage.jsx
import React from "react";
import "./home.css";
import car1 from "../assets/car1.jpeg";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import {
  Autoplay,
  Pagination,
  EffectFade,
  Thumbs,
  Keyboard,
  Virtual,
  A11y,
} from "swiper/modules";
import WhyRentUs from "../components/WhyRentUs/WhyRentUs";

const HomePage = () => {
  const items = [car1, car2, car3];

  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Keyboard]}
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        navigation
      >
        {items.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-[450px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <WhyRentUs></WhyRentUs>
    </div>
  );
};

export default HomePage;
