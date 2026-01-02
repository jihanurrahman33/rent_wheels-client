import React, { useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

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
      setError("Password must have 1 uppercase & 1 lowercase letter.");
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
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-black px-4 py-8 relative overflow-hidden">
       {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 dark:bg-indigo-900/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="bg-white dark:bg-slate-900/50 backdrop-blur-2xl w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/20 dark:border-white/5">
        
        {/* Left Side - Visual */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-black overflow-hidden group">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                    alt="Premium Lifestyle" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 mt-auto">
                 <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
                  Join the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Elite League.</span>
                </h2>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</span>
                        <span>Exclusive access to premium fleet</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</span>
                        <span>Preferred pricing & 24/7 support</span>
                    </li>
                     <li className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</span>
                        <span>Instant booking confirmation</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Create Account
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Start your journey with RentWheels today.
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-6 rounded-xl text-sm font-medium shadow-sm bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="input input-lg w-full pl-11 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl transition-all dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <FaEnvelope className="text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  className="input input-lg w-full pl-11 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl transition-all dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <FaLock className="text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  className="input input-lg w-full pl-11 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl transition-all dark:text-white"
                  placeholder="Min 6 chars, 1 Upper, 1 Lower"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full rounded-xl font-bold text-white shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-[#0f172a] text-slate-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
           className="btn btn-lg btn-outline w-full rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-300 transition-all normal-case font-medium relative overflow-hidden group"
          >
             <div className="flex items-center gap-3 relative z-10">
                <FaGoogle className="text-xl text-red-500 group-hover:scale-110 transition-transform" />
                <span>Sign up with Google</span>
             </div>
          </button>

          <p className="text-center text-sm mt-8 text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-bold hover:text-primary-focus transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
