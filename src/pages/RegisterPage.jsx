import React, { useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const RegisterPage = () => {
  const { registerUser, googleSignin, setUser } = use(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    const re = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const isValidPassword = (pw) => {
      return re.test(pw);
    };

    setError("");
    const { name, email, password } = values;
    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("At least 6 chars, include 1 uppercase and 1 lowercase");
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser(email, password);
      setUser(res.user);
      localStorage.setItem("token", res.user.accessToken);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await googleSignin();
      setUser(result.user);
      localStorage.setItem("token", result.user.accessToken);
      navigate("/");
    } catch (err) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center items-start p-10 bg-gradient-to-tr from-blue-600 to-indigo-600">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Create your account
          </h2>
          <p className="text-white/90 mb-6">
            Join RentWheels — list your car or book trusted local rentals in
            minutes.
          </p>
          <ul className="text-white text-sm space-y-3">
            <li>✔ Fast listings</li>
            <li>✔ Secure payments</li>
            <li>✔ Verified providers</li>
          </ul>
          <div className="mt-8">
            <div className="text-xs text-white/80">Already registered?</div>
            <Link
              to="/auth/login"
              className="inline-block mt-3 px-4 py-2 rounded-md bg-white/20 text-white text-sm border border-white/20"
            >
              Sign in
            </Link>
          </div>
        </div>

        <form onSubmit={handleRegister} className="p-6 md:p-10">
          <div className="mb-4 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Register
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              Create an account to start listing or booking cars.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 p-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
                Full name
              </label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow hover:opacity-95 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
              <span className="h-px w-16 bg-gray-200 dark:bg-gray-700 inline-block"></span>
              <span>OR</span>
              <span className="h-px w-16 bg-gray-200 dark:bg-gray-700 inline-block"></span>
            </div>

            <button
              onClick={handleGoogle}
              type="button"
              disabled={loading}
              className="
    btn w-full 
    bg-white text-black 
    border border-gray-300 
    hover:bg-gray-100 
    dark:bg-gray-800 dark:text-white 
    dark:border-gray-600 
    dark:hover:bg-gray-700
  "
            >
              <svg
                aria-label="Google logo"
                width="18"
                height="18"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Continue with Google
            </button>

            <p className="text-xs text-center text-gray-500 mt-1">
              By creating an account you agree to our{" "}
              <Link to="/terms" className="text-blue-600 underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
