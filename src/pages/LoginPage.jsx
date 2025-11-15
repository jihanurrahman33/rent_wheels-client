import React, { useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const { loginUser, googleSignin, setUser } = use(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((res) => {
        setUser(res.user);
        localStorage.setItem("token", res.user.accessToken);
        navigate("/");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setError("");
    setLoading(true);

    googleSignin()
      .then((result) => {
        setUser(result.user);
        localStorage.setItem("token", result.user.accessToken);
        navigate("/");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 border border-gray-200 dark:border-gray-800">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Login to continue renting cars
          </p>

          {error && (
            <div className="alert alert-error py-2 mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="label text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="label text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn bg-white border border-gray-300 hover:bg-gray-100 text-black w-full"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?
            <Link
              to="/auth/register"
              className="text-blue-600 hover:underline ml-1"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
