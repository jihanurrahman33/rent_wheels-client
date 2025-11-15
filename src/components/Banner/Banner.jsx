import React from "react";
import cta_car_img from "../../assets/cta_car_img.png";

const Banner = () => {
  return (
    <div className="card text-white bg-gray-900 rounded grid grid-cols-2 items-center justify-between">
      <div className="p-4">
        <h1 className="text-3xl">
          Ready to hit the road? Book your car today !
        </h1>
        <p>
          Our friendly customer service team is here to help. Contact us anytime
          for support and inquiries.
        </p>
      </div>
      <div className="p-4">
        <img src={cta_car_img} alt="" />
      </div>
    </div>
  );
};

export default Banner;
