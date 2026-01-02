import React, { useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const { loginUser, googleSignin, setUser } = use(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await loginUser(email, password);
      setUser(res.user);
      localStorage.setItem("token", res.user.accessToken);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await googleSignin();
      setUser(result.user);
      localStorage.setItem("token", result.user.accessToken);
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-black px-4 py-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 dark:bg-blue-900/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="bg-white dark:bg-slate-900/50 backdrop-blur-2xl w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/20 dark:border-white/5">
        
        {/* Left Side - Visual */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-black overflow-hidden group">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                    alt="Luxury Car" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 mt-auto">
                 <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.536 9.636a10.38 10.38 0 10-1.42 1.42l5.357 5.357a6 6 0 010-7.743z" />
                    </svg>
                 </div>
                <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
                  Unlock the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Extraordinary.</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
                  Access an exclusive fleet of premium vehicles designed for those who demand excellence.
                </p>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome Back
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Sign in to manage your bookings and fleet.
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-6 rounded-xl text-sm font-medium shadow-sm bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="input input-lg w-full pl-11 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl transition-all dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-control">
               <div className="flex justify-between items-center mb-1">
                    <label className="label text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Password
                    </label>
                    <Link
                    to="#"
                    className="text-xs font-medium text-primary hover:text-primary-focus transition-colors"
                    >
                    Forgot Password?
                    </Link>
               </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  className="input input-lg w-full pl-11 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full rounded-xl font-bold text-white shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md" />
              ) : (
                "Sign In to Account"
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
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn btn-lg btn-outline w-full rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-300 transition-all normal-case font-medium relative overflow-hidden group"
          >
             <div className="flex items-center gap-3 relative z-10">
                <FaGoogle className="text-xl text-red-500 group-hover:scale-110 transition-transform" />
                <span>Sign in with Google</span>
             </div>
          </button>

          <p className="text-center text-sm mt-8 text-slate-600 dark:text-slate-400">
            New to RentWheels?{" "}
            <Link
              to="/auth/register"
              className="text-primary font-bold hover:text-primary-focus transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
