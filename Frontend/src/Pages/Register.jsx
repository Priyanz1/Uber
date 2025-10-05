import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 shadow-2xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <div className="flex flex-col space-y-4">
          <Link
            to="/users/Register"
            className="w-full text-center px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 transition font-semibold"
          >
            Register as User
          </Link>
          <Link
            to="/captain/Register"
            className="w-full text-center px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition font-semibold"
          >
            Register as Captain
          </Link>
        </div>

      
        <div className="text-center mt-6 text-gray-300">
          <Link to="/" className="hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
