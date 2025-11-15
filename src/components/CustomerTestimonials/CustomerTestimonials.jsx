import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Arif Hossain",
    title: "Software Engineer",
    review:
      "Rent Wheels made my business trip so easy. The booking process was smooth and the car was in excellent condition.",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sadia Ahmed",
    title: "Marketing Specialist",
    review:
      "Affordable rates and super friendly service! I highly recommend this platform for anyone looking for hassle-free car rentals.",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Tanvir Rahman",
    title: "Entrepreneur",
    review:
      "The best rental experience I’ve ever had. The support team was available 24/7 and very responsive!",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Nusrat Jahan",
    title: "UI/UX Designer",
    review:
      "Loved the easy interface and safe booking system. Everything felt secure and transparent.",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Kamrul Islam",
    title: "Civil Engineer",
    review:
      "Great selection of cars and very reasonable pricing. The pickup process was fast and convenient.",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    name: "Marium Siddiqua",
    title: "Fashion Blogger",
    review:
      "I booked a car for a weekend trip — everything was perfect! Definitely using this service again.",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    name: "Imran Khan",
    title: "Banker",
    review:
      "Trustworthy providers, clean cars, and transparent pricing. This platform stands out!",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 8,
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "Anika Rahman",
    title: "Business Analyst",
    review:
      "Customer support is top-notch. They guided me throughout the booking process with patience.",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
];

export default function CustomerTestimonials() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {t.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {t.title}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {t.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
