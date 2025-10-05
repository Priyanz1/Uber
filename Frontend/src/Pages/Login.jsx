import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 shadow-2xl">
       
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

       
        <div className="flex flex-col space-y-4">
          <Link
            to="/users/login"
            className="w-full text-center px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 transition font-semibold"
          >
            Login as User
          </Link>
          <Link
            to="/captain/login"
            className="w-full text-center px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition font-semibold"
          >
            Login as Captain
          </Link>
        </div>

        
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
