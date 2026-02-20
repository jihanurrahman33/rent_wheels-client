import React, { use, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { IoHomeOutline, IoCarSportOutline, IoListOutline, IoCalendarClearOutline } from "react-icons/io5";
import Logo from "../Logo/Logo";

const NavBar = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Handler
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "night");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "night" : "light");

  // Visibility Logic
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  // Custom Link Component for "Premium" Feel
  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-1 py-2 font-display text-sm font-medium tracking-wide transition-colors duration-300 group ${
          isActive
            ? "text-primary"
            : isTransparent
            ? "text-white/90 hover:text-white"
            : "text-base-content/70 hover:text-primary"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {/* Elegant Underline Animation */}
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full transform origin-left transition-transform duration-300 ease-out ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isTransparent
            ? "bg-base-100 lg:bg-transparent py-3 lg:py-6 border-b border-base-content/10 lg:border-transparent opacity-100"
            : "bg-base-100 lg:bg-base-100/80 backdrop-blur-xl border-b border-base-content/10 shadow-sm py-3"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* Left: Logo */}
            <Link to="/" className="relative z-10 flex items-center gap-2 group">
              <div className={`transition-all duration-500 ${isTransparent ? "lg:brightness-0 lg:invert lg:opacity-90 lg:group-hover:opacity-100" : ""}`}>
                <Logo imgClassName="h-10 md:h-14 lg:h-16 w-auto" />
              </div>
              {/* Optional Text Logo if needed, but Image is cleaner */}
            </Link>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/all-cars">Browse Fleet</NavItem>
              <NavItem to="/add-car">List Your Car</NavItem>
              {user && (
                <>
                  <NavItem to="/my-listing">My Listings</NavItem>
                  <NavItem to="/my-bookings">Bookings</NavItem>
                </>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-5">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 hover:rotate-12 ${
                  isTransparent 
                    ? "text-base-content/60 lg:text-white/80 hover:bg-base-200 lg:hover:bg-white/10" 
                    : "text-base-content/60 hover:bg-base-200"
                }`}
                aria-label="Toggle Theme"
              >
                {theme === "light" ? <FaMoon className="text-sm" /> : <FaSun className="text-sm" />}
              </button>

              {/* User Profile / Auth */}
              {user ? (
                <div className="relative group/profile">
                  <button
                    onClick={() => setShowModal(!showModal)}
                    className="flex items-center gap-3 focus:outline-none"
                  >
                    <img
                      src={user.photoURL || "https://placehold.co/100x100"}
                      alt="User"
                      className={`w-10 h-10 rounded-full object-cover ring-2 transition-all ${
                         isTransparent ? "ring-base-content/20 lg:ring-white/30 hover:ring-primary lg:hover:ring-white" : "ring-base-content/20 hover:ring-primary"
                      }`}
                    />
                  </button>
                  
                  {/* Dropdown Profile Menu */}
                  {showModal && (
                    <>
                       <div className="fixed inset-0 z-40" onClick={() => setShowModal(false)} />
                       <div className="absolute right-0 mt-4 w-72 glass-card p-6 rounded-2xl border border-white/20 shadow-2xl z-50 animate-slide-up origin-top-right">
                          <div className="flex flex-col items-center border-b border-dashed border-base-content/10 pb-6 mb-6">
                             <div className="w-20 h-20 rounded-full p-1 border-2 border-primary/20 mb-3">
                                <img src={user.photoURL} className="w-full h-full rounded-full object-cover" />
                             </div>
                             <h4 className="font-display font-bold text-lg text-base-content">{user.displayName}</h4>
                             <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                          <Link 
                            to="/profile"
                            onClick={() => setShowModal(false)}
                            className="w-full py-3 mb-2 rounded-xl bg-base-200 text-base-content/70 font-bold hover:bg-base-300 transition-all flex items-center justify-center gap-2"
                          >
                            View Profile
                          </Link>
                          <button 
                            onClick={() => { logOut(); setShowModal(false); }}
                            className="w-full py-3 rounded-xl bg-error/10 text-error font-bold hover:bg-error hover:text-white transition-all flex items-center justify-center gap-2"
                          >
                            Sign Out
                          </button>
                       </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    to="/auth/login"
                    className={`px-5 py-2.5 text-sm font-bold transition-colors ${
                      isTransparent ? "text-white hover:text-white/80" : "text-base-content/70 hover:text-primary"
                    }`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-red-600 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button 
                className={`lg:hidden text-2xl text-base-content`}
                onClick={() => setIsMenuOpen(true)}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
         className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
         }`} 
         onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-base-100 shadow-2xl transform transition-transform duration-300 z-[70] lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
         <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
               <Logo imgClassName="h-8" />
               <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 hover:text-primary text-2xl">
                  <FaTimes />
               </button>
            </div>
            
            <div className="flex flex-col gap-4">
               <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `p-4 rounded-xl font-bold ${isActive ? "bg-primary/10 text-primary" : "text-base-content/70"}`}>Home</NavLink>
               <NavLink to="/all-cars" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `p-4 rounded-xl font-bold ${isActive ? "bg-primary/10 text-primary" : "text-base-content/70"}`}>Browse Fleet</NavLink>
               <NavLink to="/add-car" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `p-4 rounded-xl font-bold ${isActive ? "bg-primary/10 text-primary" : "text-base-content/70"}`}>List Your Car</NavLink>
               {user && (
                 <>
                    <NavLink to="/my-listing" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `p-4 rounded-xl font-bold ${isActive ? "bg-primary/10 text-primary" : "text-base-content/70"}`}>My Listings</NavLink>
                    <NavLink to="/my-bookings" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `p-4 rounded-xl font-bold ${isActive ? "bg-primary/10 text-primary" : "text-base-content/70"}`}>Bookings</NavLink>
                 </>
               )}
            </div>

            <div className="mt-auto space-y-4">
               {!user ? (
                 <>
                  <Link to="/auth/login" onClick={() => setIsMenuOpen(false)} className="block w-full py-4 text-center font-bold text-base-content/70 border border-base-content/10 rounded-xl">Log In</Link>
                  <Link to="/auth/register" onClick={() => setIsMenuOpen(false)} className="block w-full py-4 text-center font-bold text-white bg-primary rounded-xl shadow-lg shadow-primary/20">Get Started</Link>
                 </>
               ) : (
                  <button onClick={() => { logOut(); setIsMenuOpen(false); }} className="block w-full py-4 text-center font-bold text-error bg-error/10 rounded-xl">Sign Out</button>
               )}
            </div>
         </div>
      </div>
    </>
  );
};

export default NavBar;
