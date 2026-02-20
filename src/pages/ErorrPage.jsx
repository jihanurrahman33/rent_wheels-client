import React from "react";
import { Link, useNavigate } from "react-router";

const ErorrPage = ({ code = 404, title = "Page not found", message }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-base-content/10">
        <div className="p-8 flex flex-col justify-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-extrabold text-primary">
              {code}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                {title}
              </h1>
              <p className="text-sm text-base-content/60 mt-1">
                {message ||
                  "Sorry — the page you are looking for doesn't exist or an error occurred."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-neutral w-full sm:w-auto"
            >
              Go back
            </button>

            <Link to="/" className="btn btn-primary w-full sm:w-auto">
              Go to Home
            </Link>

            <a
              href="mailto:support@rentwheels.example"
              className="btn btn-ghost w-full sm:w-auto"
            >
              Contact Support
            </a>
          </div>

          <div className="text-xs text-base-content/40 mt-4">
            Tip: Try refreshing the page or check the URL for typos.
          </div>

          <div className="mt-4 text-sm text-base-content/60">
            If the problem persists, please report it to support.
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center bg-base-200 p-6">
          <svg
            width="320"
            height="240"
            viewBox="0 0 320 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-full"
            aria-hidden
          >
            <rect
              x="12"
              y="12"
              width="296"
              height="216"
              rx="16"
              fill="#F8FAFF"
            />
            <path
              d="M40 176h240v-96H40v96z"
              fill="#E6F0FF"
              stroke="#D0E4FF"
              strokeWidth="2"
            />
            <circle cx="96" cy="96" r="22" fill="#CFE6FF" />
            <rect
              x="136"
              y="72"
              width="120"
              height="12"
              rx="6"
              fill="#BBD9FF"
            />
            <rect x="136" y="96" width="90" height="10" rx="5" fill="#DFF0FF" />
            <rect
              x="40"
              y="188"
              width="240"
              height="10"
              rx="5"
              fill="#F1F5F9"
            />
            <g transform="translate(40 40)">
              <path
                d="M90 10c0 12.15-10.85 22-24 22S42 22.15 42 10"
                stroke="#FFB4B4"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M80 24c-8 6-22 6-30 0"
                stroke="#FF8A8A"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ErorrPage;
