import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [step, setStep] = useState(1); // 1: form, 2: vehicle, 3: ride details, 4: searching
  const panelRef = useRef(null);

  // GSAP animation for step transitions
  useGSAP(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [step]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickup && destination) {
      setStep(2);
    }
  };

  const handleVehicleSelect = (type) => {
    setStep(3);
  };

  const confirmRide = () => {
    setStep(4);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900 flex justify-center items-center">
      {/* Step Container */}
      <div
        ref={panelRef}
        className="bg-gray-800 text-white p-8 rounded-2xl w-[90%] sm:w-[50%] transition-all duration-500 relative"
      >
        {/* Step 1: Pickup and Destination */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-semibold text-center mb-4">
              Enter your trip details 🚗
            </h1>
            <div>
              <label className="block text-gray-300 mb-1">Pickup</label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </form>
        )}

        {/* Step 2: Choose Vehicle */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">Choose your vehicle 🚘</h2>
            <div className="flex justify-around">
              <div
                onClick={() => handleVehicleSelect("Auto")}
                className="cursor-pointer bg-gray-700 p-5 rounded-xl hover:bg-blue-600 transition"
              >
                🛺 Auto
              </div>
              <div
                onClick={() => handleVehicleSelect("Car")}
                className="cursor-pointer bg-gray-700 p-5 rounded-xl hover:bg-blue-600 transition"
              >
                🚗 Car
              </div>
              <div
                onClick={() => handleVehicleSelect("Bike")}
                className="cursor-pointer bg-gray-700 p-5 rounded-xl hover:bg-blue-600 transition"
              >
                🏍️ Bike
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="mt-8 bg-gray-700 hover:bg-gray-600 text-white py-2 px-5 rounded-lg transition"
            >
              ⬅ Back
            </button>
          </div>
        )}

        {/* Step 3: Ride Details */}
        {step === 3 && (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Ride Details 📋</h2>
            <p>
              <span className="font-semibold">From:</span> {pickup}
            </p>
            <p>
              <span className="font-semibold">To:</span> {destination}
            </p>
            <p>
              <span className="font-semibold">Fare:</span> ₹180 (estimated)
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-5 rounded-lg transition"
              >
                ⬅ Back
              </button>
              <button
                onClick={confirmRide}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg transition"
              >
                Confirm Ride ✅
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Searching for Captain */}
        {step === 4 && (
          <div className="text-center space-y-5">
            <h2 className="text-xl font-semibold">Searching for Captain...</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
            </div>
            <p className="text-gray-400">Please wait while we find your ride 🚕</p>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="mt-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-5 rounded-lg transition"
            >
              ⬅ Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
