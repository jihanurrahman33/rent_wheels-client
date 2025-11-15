import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-12">
      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">
              RW
            </div>
            <h2 className="text-xl font-semibold">Rent Wheels</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Your trusted platform for renting and listing cars. Fast, safe, and
            reliable transportation for everyone.
          </p>

          <p className="mt-4 text-sm">
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:support@rentwheels.example"
              className="link link-hover"
            >
              support@rentwheels.example
            </a>
          </p>

          <p className="text-sm">
            <span className="font-medium">Phone:</span> +880 123 456 789
          </p>
        </div>

        <div>
          <h6 className="footer-title">Useful Links</h6>
          <div className="flex flex-col gap-2">
            <Link to="/" className="link link-hover">
              Home
            </Link>
            <Link to="/add-car" className="link link-hover">
              Add Car
            </Link>
            <Link to="/all-cars" className="link link-hover">
              Browse Cars
            </Link>
            <Link to="/my-listing" className="link link-hover">
              My Listings
            </Link>
            <Link to="/my-bookings" className="link link-hover">
              My Bookings
            </Link>
          </div>
        </div>

        <div>
          <h6 className="footer-title">Legal</h6>

          <div className="flex flex-col gap-2">
            <Link to="/terms" className="link link-hover">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="link link-hover">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="link link-hover">
              Cookie Policy
            </Link>
          </div>

          <h6 className="footer-title mt-4">Follow Us</h6>
          <div className="flex gap-4">
            <nav>
              <div className="grid grid-flow-col gap-4">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-5 bg-base-200">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Rent Wheels. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built with ❤️ for reliable car renting in Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
