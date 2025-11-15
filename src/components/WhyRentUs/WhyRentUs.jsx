import React from "react";
import {
  FaRegClock,
  FaHandshake,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";

const WhyRentUs = () => {
  const features = [
    {
      title: "Easy Booking",
      desc: "Book your perfect car within minutes with our smooth and simple process.",
      icon: <FaCheckCircle className="text-3xl text-blue-600" />,
    },
    {
      title: "Affordable Rates",
      desc: "Enjoy transparent pricing with no hidden fees. Rent quality cars at the best rates.",
      icon: <FaWallet className="text-3xl text-green-600" />,
    },
    {
      title: "Trusted Providers",
      desc: "All cars are verified and listed by trusted owners for a safe rental experience.",
      icon: <FaHandshake className="text-3xl text-indigo-600" />,
    },
    {
      title: "24/7 Support",
      desc: "Our customer support team is available 24/7 to assist you anytime.",
      icon: <FaRegClock className="text-3xl text-orange-500" />,
    },
  ];

  return (
    <div className="py-16 bg-base-200 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Why Rent With Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-md p-6 rounded-xl border dark:border-gray-700 hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center text-center gap-3">
                {f.icon}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyRentUs;
