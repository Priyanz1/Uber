import axios from "axios";
import React, { useContext, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";

function LoginCaptain() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/captain/login",
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captainhome");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex justify-center min-h-screen w-screen items-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 shadow-2xl space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 transition font-semibold mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginCaptain;
