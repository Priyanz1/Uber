import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import  {CaptainDataContext}  from "../context/CaptainContext";

export default function RegisterCaptain() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newCaptain = {
        name,
        email,
        password,
        vehicle: {
          type: vehicleType,
          model: vehicleModel,
          plateNumber,
        },
      };

      const response = await axios.post("http://localhost:3000/captain/Register", newCaptain);

      if (response.status === 200) {
        const data=response.data;
        setCaptain(data.captain)
        localStorage.setItem("token",data.token);
        navigate('/captainhome'); 
      }
    } catch (error) {
      console.error("Captain registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Captain Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Vehicle Info */}
          <div>
            <label className="block text-gray-300 mb-1">Vehicle Type</label>
            <input
              type="text"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              placeholder="Car, Bike, etc."
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Vehicle Model</label>
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              placeholder="e.g. Toyota Prius"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Plate Number</label>
            <input
              type="text"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="e.g. AB-1234"
              className="w-full px-4 py-2 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition font-semibold mt-4"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-gray-300">
          <p>
            Already have an account?{" "}
            <Link to="/captain/login" className="text-blue-400 hover:underline">
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
