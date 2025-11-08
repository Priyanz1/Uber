import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {user,setUser}=useContext(UserDataContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, password };
      const response = await axios.post("http://localhost:3000/users/Register", newUser);

      if (response.status === 200) {
        
        const data=response.data;
        console.log(data);
        setUser(data.user);
        localStorage.setItem('token',data.token);
        navigate("/home");
      }

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-6">User Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-600 transition font-semibold mt-4"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          <p>
            Already have an account?{" "}
            <Link to="/users/login" className="text-green-500 hover:underline">
              Login
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
















