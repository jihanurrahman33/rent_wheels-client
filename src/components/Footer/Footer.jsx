import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="relative bg-[#0f172a] text-slate-300 overflow-hidden border-t border-white/5">
      {/* Decorative Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>

      <div className="container mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              {/* Force logo to white/light mode for the dark footer */}
              <div className="brightness-0 invert opacity-90 transition-opacity group-hover:opacity-100">
                <Logo imgClassName="h-16 w-auto" />
              </div>
            </Link>
            <p className="max-w-xs text-sm text-slate-400 leading-relaxed">
              Experience the thrill of the open road with our premium fleet.
              Luxury, performance, and comfort—curated for the discerning
              driver.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, label: "Facebook" },
                { icon: <FaTwitter />, label: "Twitter" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaLinkedinIn />, label: "LinkedIn" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm mb-6">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Browse Fleet", path: "/all-cars" },
                { name: "Latest Deals", path: "/all-cars" },
                { name: "List Your Car", path: "/add-car" },
                { name: "How It Works", path: "/#how-it-works" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm mb-6">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Help Center", path: "/" },
                { name: "Terms of Service", path: "/" },
                { name: "Privacy Policy", path: "/" },
                { name: "Contact Us", path: "mailto:support@rentwheels.com" },
              ].map((link) => (
                <li key={link.name}>
                  {link.path.startsWith("mailto") ? (
                    <a
                      href={link.path}
                      className="hover:text-white hover:pl-2 transition-all duration-300"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="hover:text-white hover:pl-2 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm mb-6">
              Stay in the Loop
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1 focus-within:ring-2 focus-within:ring-primary/50 transition-all"
            >
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent text-sm w-full px-3 py-2 outline-none text-white placeholder-slate-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                aria-label="Subscribe"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#0b1120]">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Rent Wheels. Crafted for
            Performance.
          </p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-slate-300 transition-colors">
              English (US)
            </span>
            <span className="cursor-pointer hover:text-slate-300 transition-colors">
              USD ($)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
