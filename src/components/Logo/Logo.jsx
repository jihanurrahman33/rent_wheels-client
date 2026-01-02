import React from "react";
import { Link } from "react-router";
import logoImg from "../../assets/logo.png";

const Logo = ({ className = "", imgClassName = "h-12 w-auto", to = "/" }) => {
  return (
    <Link
      to={to}
      className={`relative inline-flex items-center gap-2 group ${className}`}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image */}
      <img
        src={logoImg}
        alt="Rent Wheels"
        className={`relative z-10 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm ${imgClassName}`}
      />
    </Link>
  );
};

export default Logo;