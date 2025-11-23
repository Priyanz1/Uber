import React, { useRef, useState, useEffect, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import {SocketContext} from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext';

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [step, setStep] = useState(1);

  const [vehicle, setVehicle] = useState("");
  const [fareval, setfareval] = useState(0);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [ride,setride]=useState(null);

  const [showPickupBox, setShowPickupBox] = useState(false);
  const [showDestBox, setShowDestBox] = useState(false);

  const panelRef = useRef(null);
  const pickupBoxRef = useRef(null);
  const destBoxRef = useRef(null);
  const {socket} = useContext(SocketContext);
  const {user} =useContext(UserDataContext);
   
  useEffect(() => {
    if (!socket || !user?._id) return; 
    socket.emit("join", {
      userType: "user",
      userId: user._id,
    });
  
    console.log("JOIN EVENT SENT");
  }, [socket, user]);
  
  

  useGSAP(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [step]);

  const fetchFare = async () => {
    try {
      const res = await axios.get("http://localhost:3000/ride/getfare", {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("Fetched Fare:", res.data.fare);
      setfareval(res.data.fare);
    } catch (err) {
      console.log(err);
    }
  };

    useEffect(()=>{
       if (pickup && destination) fetchFare();
       socket.emit("join",{
        userType:"user",
        userId:user._id
       })
  
       socket.on("ride-comfirmed",(data)=>{
         console.log("Ride confirmed:",data);
         setride(data);
          // setStep(4);
         // You can add more logic here to update the UI or notify the user
       });
    },[user,pickup,destination])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickup && destination) setStep(2);
  };

  const handleVehicleSelect = (type) => {
    setVehicle(type);
    setStep(3);
    if (fareval && fareval[type]) setfareval(fareval[type]);
  };

  const confirmRide = async () => {
    setStep(4);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/ride/create",
        {
          pickup,
          destination,
          vehicleType: vehicle
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
  
      console.log("Ride created:", response.data);
  
    } catch (error) {
      console.log("Ride error:", error);
    }
  };
  
  
  const handleBack = () => step > 1 && setStep(step - 1);

  // -------- PICKUP SEARCH ----------
  const searchPickup = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (!value.trim()) {
      setPickupSuggestions([]);
      setShowPickupBox(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/map/getsuggestions", {
        params: { input: value },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setPickupSuggestions(response.data.suggestions);
      setShowPickupBox(true);
      setShowDestBox(false);
    } catch (error) {
      console.log(error);
    }
  };

  // -------- DESTINATION SEARCH ----------
  const searchDestination = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (!value.trim()) {
      setDestSuggestions([]);
      setShowDestBox(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/map/getsuggestions", {
        params: { input: value },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setDestSuggestions(response.data.suggestions);
      setShowDestBox(true);
      setShowPickupBox(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function handleOutside(e) {
      if (pickupBoxRef.current && !pickupBoxRef.current.contains(e.target)) {
        setShowPickupBox(false);
      }
      if (destBoxRef.current && !destBoxRef.current.contains(e.target)) {
        setShowDestBox(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-900 flex justify-center items-center">
      <div
        ref={panelRef}
        className="bg-gray-800 text-white p-8 rounded-2xl w-[90%] sm:w-[50%] relative"
      >

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-semibold text-center">Enter trip details 🚗</h1>

            {/* Pickup */}
            <div className="relative">
              <label>Pickup</label>
              <input
                value={pickup}
                onChange={searchPickup}
                placeholder="Enter pickup location"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg"
              />

              {showPickupBox && pickupSuggestions.length > 0 && (
                <div
                  ref={pickupBoxRef}
                  className="absolute z-50 w-full bg-white text-black rounded shadow max-h-64 overflow-y-auto"
                >
                  {pickupSuggestions.map((item, i) => (
                    <div
                      key={i}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        const clean = item.name.split(",")[0].trim();
                        setPickup(clean);
                        setShowPickupBox(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Destination */}
            <div className="relative">
              <label>Destination</label>
              <input
                value={destination}
                onChange={searchDestination}
                placeholder="Enter destination"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg"
              />

              {showDestBox && destSuggestions.length > 0 && (
                <div
                  ref={destBoxRef}
                  className="absolute z-50 w-full bg-white text-black rounded shadow max-h-64 overflow-y-auto"
                >
                  {destSuggestions.map((item, i) => (
                    <div
                      key={i}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        const clean = item.name.split(",")[0].trim();
                        setDestination(clean);
                        setShowDestBox(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-blue-600 py-3 rounded">
              Next
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-6">Choose your vehicle</h2>

            <div className="flex justify-around">
              <div
                onClick={() => handleVehicleSelect("auto")}
                className="bg-gray-700 p-5 rounded-xl hover:bg-blue-600 cursor-pointer"
              >
                🛺 Auto
              </div>
              <div
                onClick={() => handleVehicleSelect("car")}
                className="bg-gray-700 p-5 rounded-xl hover:bg-blue-600 cursor-pointer"
              >
                🚗 Car
              </div>
              <div
                onClick={() => handleVehicleSelect("moto")}
                className="bg-gray-700 p-5 rounded-xl hover:bg-blue-600 cursor-pointer"
              >
                🏍️ Moto
              </div>
            </div>

            <button
              onClick={handleBack}
              className="mt-6 bg-gray-700 px-5 py-2 rounded"
            >
              ⬅ Back
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Ride Details 📋</h2>

            <p><b>From:</b> {pickup}</p>
            <p><b>To:</b> {destination}</p>

            <p><b>Fare:</b> ₹{fareval}</p>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-700 px-5 py-2 rounded"
              >
                ⬅ Back
              </button>
              <button
                onClick={confirmRide}
                className="bg-green-600 px-5 py-2 rounded"
              >
                Confirm Ride
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
  <div className="text-center space-y-5">

    {/* 🔹 Fare & Location Details Box */}
    <div className="bg-gray-800 p-4 rounded-xl shadow-md text-left space-y-2">
      <h3 className="text-lg font-semibold text-white">Ride Details</h3>

      <p className="text-gray-300">
        <span className="font-medium text-white">Pickup:</span> {pickup}
      </p>

      <p className="text-gray-300">
        <span className="font-medium text-white">Destination:</span> {destination}
      </p>

      <p className="text-gray-300">
        <span className="font-medium text-white">Estimated Fare:</span> ₹{fareval}
      </p>
    </div>

    {/* 🔹 Searching Loader */}
    {/* <h2 className="text-xl font-semibold text-white">Searching for Captain...</h2>

    <div className="flex justify-center">
      <div className="animate-spin border-b-4 border-blue-500 rounded-full h-12 w-12"></div>
    </div> */}

     {ride == null && (
    <div className="text-center mt-4 text-gray-300">
            <h2 className="text-xl font-semibold text-white">Searching for Captain...</h2>

    <div className="flex justify-center">
      <div className="animate-spin border-b-4 border-blue-500 rounded-full h-12 w-12"></div>
    </div>
    </div>
    )}

    {ride != null && (
        <div>{ride.user.name}</div>
    )}
 
    {/* 🔹 Back Button */}
    <button
      onClick={handleBack}
      className="bg-gray-700 px-5 py-2 rounded text-white"
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
