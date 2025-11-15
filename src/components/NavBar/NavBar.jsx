import React, { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const navBtnStyle =
  "px-3 py-2 rounded hover:bg-gray-900 hover:text-white transition";

const links = (
  <>
    <NavLink to="/" className={navBtnStyle}>
      Home
    </NavLink>
    <NavLink to="/add-car" className={navBtnStyle}>
      Add Car
    </NavLink>
    <PrivateRoute>
      <NavLink to="/my-listing" className={navBtnStyle}>
        My Listings
      </NavLink>
      <NavLink to="/my-bookings" className={navBtnStyle}>
        My Bookings
      </NavLink>
    </PrivateRoute>
    <NavLink to="/all-cars" className={navBtnStyle}>
      Browse Cars
    </NavLink>
  </>
);

const NavBar = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      setShowModal(false);
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">
              RW
            </span>
            <span className="hidden sm:inline">Rent Wheels</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 items-center gap-2">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <div
                role="button"
                onClick={() => setShowModal(true)}
                className="avatar cursor-pointer"
                title="Open profile"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary">
                  <img
                    src={user.photoURL || "/placeholder-avatar.png"}
                    alt="avatar"
                  />
                </div>
              </div>

              <div className="hidden md:flex flex-col items-start mr-2">
                <span className="text-sm font-medium">
                  {user.displayName || user.email.split("@")[0]}
                </span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth/login">
                <button className="btn btn-ghost btn-sm">Login</button>
              </Link>
              <Link to="/auth/register">
                <button className="btn btn-primary btn-sm">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {showModal && user && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />

          <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={user.photoURL || "/placeholder-avatar.png"}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {user.displayName || user.email.split("@")[0]}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    navigate("/profile");
                  }}
                  className="btn w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
                >
                  View Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="btn w-full bg-red-600 text-white text-sm"
                >
                  Logout
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="btn w-full btn-ghost text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
