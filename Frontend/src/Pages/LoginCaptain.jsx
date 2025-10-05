import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginCaptain() {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        identifier, 
        password,
      };

      const response = await axios.post("http://localhost:3000/captain/login", loginData);

      if (response.status === 200) {
        const { captain, token } = response.data;

        // localStorage.setItem("captain", JSON.stringify(captain));
        localStorage.setItem("token", token);

        navigate("/captain/dashboard");
      }
    } catch (error) {
      console.error("Captain login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Captain Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email or Phone</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or phone"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition font-semibold mt-4"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/Register/captain" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/" className="hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
