import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import {CaptainDataContext} from "../context/CaptainContext";
import {SocketContext } from "../context/SocketContext";
function CaptainHome() {
  const {captain}=useContext(CaptainDataContext);
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [step, setStep] = useState("home"); // home | rides | confirm | riding
  const [selectedRide, setSelectedRide] = useState(null);
  const [availableRides, setAvailableRides] = useState([
    {
      id: 1,
      pickup: "Indrapuri",
      destination: "MP Nagar",
      fare: "₹120",
      vehicle: "Car",
    },
    {
      id: 2,
      pickup: "Bittan Market",
      destination: "DB Mall",
      fare: "₹90",
      vehicle: "Bike",
    },
  ]);

  const {socket} = useContext(SocketContext);

   useEffect(()=>{
      if(!captain || !socket) return;
      socket.emit("join",{
        userType:"captain",
        userId:captain._id
      })


   // Set up an interval to send captain's location every 10 seconds via socket.io
   let intervalId;
   if (captain && socket) {
     // Helper function to get current geolocation and emit to server
     const sendLocation = () => {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
           (position) => {
             socket.emit("update-location-captain", {
               userId: captain._id,
               location: {
                 ltd: position.coords.latitude,
                 lng: position.coords.longitude,
               },
             });
           },
           (error) => {
             // Optionally handle error
             console.error("Geolocation error:", error);
           }
         );
       }
     };

     // Immediately send location on mount
     sendLocation();

     // Set up interval for every 10 seconds
    //  intervalId = setInterval(sendLocation, 10000);
   }

   // Cleanup interval on unmount or deps change
   return () => {
     if (intervalId) clearInterval(intervalId);
   };
   },[socket,captain]);

  // ✅ OTP states
  const [otp, setOtp] = useState("");

  const goHome = () => {
    setStep("home");
    setSelectedRide(null);
    setOtp("");
  };

  const handleReject = (id) => {
    setAvailableRides((prev) => prev.filter((ride) => ride.id !== id));
  };

  // ✅ Function to navigate to riding route
  const confirmRide = () => {
    navigate("/captain/riding", { state: { ride: selectedRide } });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        // 🗺️ New background map image
        backgroundImage:
          "url('https://www.technewsworld.com/article_images/2015/82763_620x330.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-xl w-96 shadow-xl text-center text-gray-900">
      {step === "home" && (
  <>
    <h1 className="text-2xl font-semibold">Welcome, Captain 🚖</h1>

    {/* Captain Info Box */}
    <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow space-y-1">
      <p className="text-lg font-semibold">👨‍✈️ {captain.name}</p>

      <p className="text-md text-green-600 font-medium">
        💰 Earnings Today: ₹earningsToday
      </p>

      <p className="text-md text-blue-600 font-medium">
        📊 Total Earnings: ₹totalEarnings
      </p>
    </div>
    <button
      onClick={() => setStep("rides")}
      className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
    >
      Show Available Rides
    </button>
  </>
)}


{/* {step === "home" && (
  <>
    <h1 className="text-2xl font-semibold">Welcome, Captain 🚖</h1>

    Captain Info Box
    <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow">
      <p className="text-lg font-semibold">👨‍✈️ captain</p>
      <p className="text-md text-green-600 font-medium">
        💰 Earnings Today: ₹earnings
      </p>
    </div>

    <button
      onClick={() => setStep("rides")}
      className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
    >
      Show Available Rides
    </button>
  </>
)} */}

        {/* ========== Step 2: Show Rides ========== */}
        {step === "rides" && (
          <div>
            <h2 className="text-xl mb-4 font-semibold">Available Rides</h2>
            {availableRides.length === 0 ? (
              <p className="text-gray-700">No rides available right now.</p>
            ) : (
              availableRides.map((ride) => (
                <div
                  key={ride.id}
                  className="border border-gray-400 bg-white p-3 m-2 rounded-lg shadow-md text-left text-gray-800"
                >
                  <p>
                    <b>Pickup:</b> {ride.pickup}
                  </p>
                  <p>
                    <b>Destination:</b> {ride.destination}
                  </p>
                  <p>
                    <b>Fare:</b> {ride.fare}
                  </p>
                  <p>
                    <b>Vehicle Requested:</b> {ride.vehicle}
                  </p>

                  <div className="mt-3 flex justify-between">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setSelectedRide(ride);
                        setStep("confirm");
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleReject(ride.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}

            <button
              onClick={goHome}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
            >
              Back to Home
            </button>
          </div>
        )}

        {/* ========== Step 3: Confirm Ride with OTP ========== */}
        {step === "confirm" && selectedRide && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Confirm Ride</h2>
            <p>
              <b>Pickup:</b> {selectedRide.pickup}
            </p>
            <p>
              <b>Destination:</b> {selectedRide.destination}
            </p>
            <p>
              <b>Fare:</b> {selectedRide.fare}
            </p>
            <p>
              <b>Vehicle Requested:</b> {selectedRide.vehicle}
            </p>

            {/* ✅ OTP Input BEFORE clicking Confirm */}
            <div className="mt-4">
              <label className="block mb-2 font-semibold">Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-400 rounded px-3 py-2 w-full"
                placeholder="Enter OTP"
              />
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                onClick={() => {
                  if (otp === "1234") { // ✅ Example OTP
                    confirmRide(); // Navigate to /captain/riding
                  } else {
                    alert("Incorrect OTP. Please enter the correct OTP.");
                  }
                }}
              >
                Confirm
              </button>

              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
                onClick={() => setStep("rides")}
              >
                Change Ride / Back
              </button>
            </div>
          </div>
        )}

        {/* ========== Step 4: Ride in Progress ========== */}
        {step === "riding" && selectedRide && (
          <div>
            <h1 className="text-2xl font-semibold mb-3">Ride in Progress 🗺️</h1>
            <p>
              <b>From:</b> {selectedRide.pickup}
            </p>
            <p>
              <b>To:</b> {selectedRide.destination}
            </p>
            <p>
              <b>Fare:</b> {selectedRide.fare}
            </p>
            <p>
              <b>Vehicle:</b> {selectedRide.vehicle}
            </p>

            <div className="mt-6 flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=600&q=80"
                alt="map"
                className="w-full rounded-lg shadow-lg"
              />
              <p className="mt-3 text-green-700 font-semibold">
                Tracking ride on map... 📍
              </p>
            </div>

            <button
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
              onClick={goHome}
            >
              End Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaptainHome;
