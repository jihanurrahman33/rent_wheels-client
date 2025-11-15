import React, { useRef, useState, useEffect } from "react";

const sampleTestimonials = [
  {
    id: 1,
    name: "Sadia Rahman",
    role: "Designer, Dhaka",
    text: "Booked a Toyota Corolla — smooth pickup, clean car, and the owner was very helpful. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Arif Khan",
    role: "Developer, Chattogram",
    text: "Best rates and easy booking. Customer support helped me with pickup instructions. Will use again.",
    rating: 4,
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Photographer, Sylhet",
    text: "Great experience — car was spotless and the trip went flawlessly. Loved the app flow.",
    rating: 5,
  },
];

const StarInline = ({ value }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < value ? "text-yellow-400" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.538 1.118L10 15.347l-3.37 2.447c-.783.57-1.838-.198-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.644 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z" />
      </svg>
    ))}
  </div>
);

const CustomerTestimonials = ({
  testimonials = sampleTestimonials,
  title = "What Our Customers Say",
}) => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const child = el.querySelector(`[data-idx="${index}"]`);
    if (child)
      child.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  }, [index]);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <div className="flex gap-2">
            <button onClick={prev} className="btn btn-ghost btn-sm">
              ‹
            </button>
            <button onClick={next} className="btn btn-ghost btn-sm">
              ›
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          aria-live="polite"
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.id}
              data-idx={i}
              className={`min-w-[320px] w-80 snap-center bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-6 shadow-sm transition transform ${
                i === index ? "scale-100" : "scale-95 opacity-80"
              }`}
            >
              <blockquote className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                “{t.text}”
              </blockquote>

              <figcaption className="mt-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
                <div className="text-right">
                  <StarInline value={t.rating || 5} />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Real users — real trips. Want to share your experience?{" "}
          <a className="text-blue-600 hover:underline" href="/profile">
            Leave a review
          </a>
          .
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
