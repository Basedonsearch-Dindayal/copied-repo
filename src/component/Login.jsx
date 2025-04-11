import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/home");
    } catch (error) {
      console.error("Login request failed:", error);
      alert("Network error! Check console.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Form Section */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-24 bg-white">
        {/* Website Title */}
        <h1 className="text-5xl font-extrabold text-blue-600 mb-6">College Connect</h1>

        <h2 className="text-3xl font-semibold mb-2 text-gray-800">Welcome Back!</h2>
        <p className="text-gray-600 mb-6">
          Login to your account and reconnect with your academic network.
        </p>

        <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <p className="text-sm text-gray-600 mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 p-10">
        <img
          src="https://static.vecteezy.com/system/resources/previews/001/991/652/non_2x/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg"
          alt="Login Illustration"
          className="max-w-md w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
