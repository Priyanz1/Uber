import React, { useState, useRef, useEffect } from "react";

const recommendedPlaces = [
  "Times Square, New York",
  "Central Park, New York",
  "Empire State Building, New York",
  "Brooklyn Bridge, New York",
  "Statue of Liberty, New York",
  "Wall Street, New York",
];

const vehicles = [
  {
    id: 1,
    name: "Uber Go",
    description: "Affordable rides for daily travel",
    price: "$12",
    image: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
  },
  {
    id: 2,
    name: "Uber Premier",
    description: "Comfortable sedans with top drivers",
    price: "$18",
    image: "https://cdn-icons-png.flaticon.com/512/743/743131.png",
  },
  {
    id: 3,
    name: "Uber XL",
    description: "Spacious rides for groups or luggage",
    price: "$25",
    image: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
  },
];

function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const pickupRef = useRef();
  const destinationRef = useRef();

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
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination.");
      return;
    }
    setShowVehicleSelection(true);
  };

  const handleConfirmRide = () => {
    alert(
      `Ride confirmed!\n\nFrom: ${pickup}\nTo: ${destination}\nVehicle: ${selectedVehicle.name}`
    );
    setShowVehicleSelection(false);
    setPickup("");
    setDestination("");
    setSelectedVehicle(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://maps.gstatic.com/tactile/omnibox/map.png')",
      }}
    >

      <div className="absolute inset-0 bg-opacity-30 z-0"></div>

     
      <header className="relative z-10 bg-white/90 shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Uber</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Profile
        </button>
      </header>

      
      <div className="flex-1 relative z-10 flex justify-center items-start pt-10">
        {!showVehicleSelection ? (
          <div className="w-11/12 max-w-md bg-white p-5 rounded-xl shadow-lg">
        
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
                <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
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
                <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
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
        ) : (
          <div className="w-11/12 max-w-md bg-white p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Choose Your Vehicle</h2>
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`flex items-center justify-between border p-3 rounded-lg cursor-pointer transition ${
                    selectedVehicle?.id === vehicle.id
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-12 h-12"
                    />
                    <div>
                      <h3 className="font-bold">{vehicle.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {vehicle.description}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">{vehicle.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowVehicleSelection(false)}
                className="w-1/2 border border-gray-400 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleConfirmRide}
                disabled={!selectedVehicle}
                className={`w-1/2 py-3 rounded-lg font-semibold ${
                  selectedVehicle
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
