import React, { useState, useRef, useEffect } from "react";

const recommendedPlaces = [
  "Times Square, New York",
  "Central Park, New York",
  "Empire State Building, New York",
  "Brooklyn Bridge, New York",
  "Statue of Liberty, New York",
  "Wall Street, New York",
];

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

  const pickupRef = useRef();
  const destinationRef = useRef();

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target)) {
        setShowPickupDropdown(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setShowDestinationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPickup = recommendedPlaces.filter((place) =>
    place.toLowerCase().includes(pickup.toLowerCase())
  );

  const filteredDestination = recommendedPlaces.filter((place) =>
    place.toLowerCase().includes(destination.toLowerCase())
  );

  const handleRequestRide = () => {
    alert(`Ride requested from "${pickup}" to "${destination}"`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Uber</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Profile
        </button>
      </header>

      {/* Map Section */}
      <div className="flex-1 relative">
        <img
          src="https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png"
          alt="Map"
          className="w-full h-full object-cover"
        />

        {/* Inputs Overlay */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-white p-5 rounded-xl shadow-lg">
          {/* Pickup */}
          <div className="mb-4 relative" ref={pickupRef}>
            <label className="text-gray-600 font-semibold">Pick Up</label>
            <input
              type="text"
              placeholder="Enter pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onFocus={() => setShowPickupDropdown(true)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {showPickupDropdown && filteredPickup.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                {filteredPickup.map((place, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setPickup(place);
                      setShowPickupDropdown(false);
                    }}
                    className="p-3 cursor-pointer hover:bg-gray-100"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination */}
          <div className="mb-4 relative" ref={destinationRef}>
            <label className="text-gray-600 font-semibold">Destination</label>
            <input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setShowDestinationDropdown(true)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {showDestinationDropdown && filteredDestination.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                {filteredDestination.map((place, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setDestination(place);
                      setShowDestinationDropdown(false);
                    }}
                    className="p-3 cursor-pointer hover:bg-gray-100"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={handleRequestRide}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            Request Ride
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home