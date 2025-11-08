import React from "react";
import { Link } from "react-router-dom";

export default function Start() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center">
      <div className="max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
       
        <div>
        
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
            className="h-12 mb-8"
          />
 
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            From daily commutes to late-night trips, our rides are always ready
            when you are.
          </h1>

        
          <p className="text-lg text-gray-300 mb-8">
            Book a ride in minutes and travel with comfort, safety, and
            reliability—anytime, anywhere.
          </p>

        
          <div className="flex space-x-6">
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl bg-white text-black font-semibold shadow-lg hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/Register"
              className="px-6 py-3 rounded-2xl bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/296/296216.png"
            alt="Car Illustration"
            className="w-72 md:w-96 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
