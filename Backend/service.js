const axios = require('axios');
const RidingModel = require('./Models/RidengModel');
const crypto = require('crypto');

 


// 🧭 Get coordinates using OpenCage
const getAddress = async (address) => {
  const OPENCAGE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!OPENCAGE_API_KEY) {
    throw new Error("OpenCage API key not configured. Please set OPENCAGE_API_KEY");
  }

  if (!address) {
    throw new Error("Address is required");
  }

  const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
    params: {
      q: address,
      key: OPENCAGE_API_KEY,
    },
  });

  const data = response.data;

  if (!data.results || data.results.length === 0) {
    throw new Error("Location not found");
  }

  const location = data.results[0].geometry;
  const formattedAddress = data.results[0].formatted;

  return {
    lat: location.lat,
    lng: location.lng,
    address: formattedAddress,
    originalAddress: address,
  };
};

// 🚗 Get distance and time using OpenRouteService
const getDistanceAndTime = async (pickup, destination) => {
  const ORS_API_KEY = process.env.ORS_API_KEY;
  if (!ORS_API_KEY) throw new Error("OpenRouteService API key not configured.");
  if (!pickup || !destination) throw new Error("Both pickup and destination are required");

  const location1 = await getAddress(pickup);
  const location2 = await getAddress(destination);

  console.log("Start:", `${location1.lng},${location1.lat}`);
  console.log("End:", `${location2.lng},${location2.lat}`);

  const response = await axios.get("https://api.openrouteservice.org/v2/directions/driving-car", {
    headers: { Authorization: ORS_API_KEY },
    params: {
      start: `${location1.lng},${location1.lat}`,
      end: `${location2.lng},${location2.lat}`,
    },
  });

  const data = response.data;
  if (!data.features || !data.features.length)
    throw new Error("Route not found");

  const summary = data.features[0].properties.summary;

  return {
    pickup,
    destination,
    distance_km: (summary.distance / 1000).toFixed(2),
    duration_min: (summary.duration / 60).toFixed(2),
  };
};

 
 const getFare=async (pickup, destination)=>{

  if (!pickup || !destination) {
      throw new Error('Pickup and destination are required');
  }

  const distanceTime = await getDistanceAndTime(pickup, destination);
  const distanceKm = parseFloat(distanceTime.distance_km);
const durationMin = parseFloat(distanceTime.duration_min);

  const baseFare = {
      auto: 30,
      car: 50,
      moto: 20
  };

  const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8
  };

  const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5
  };

  const fare = {
      auto: Math.round(baseFare.auto + ((distanceKm ) * perKmRate.auto) + ((durationMin) * perMinuteRate.auto)),
      car: Math.round(baseFare.car + ((distanceKm) * perKmRate.car) + ((durationMin) * perMinuteRate.car)),
      moto: Math.round(baseFare.moto + ((distanceKm) * perKmRate.moto) + ((durationMin) * perMinuteRate.moto))
  };

  return fare;
}


const getAutoSuggestions = async (input) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) throw new Error("Geoapify API key not configured");

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    input
  )}&limit=5&apiKey=${apiKey}`;

  const { data } = await axios.get(url);

  if (!data || !data.features || data.features.length === 0) {
    return [];
  }

  // Return only the useful info
  return data.features.map((f) => ({
    name: f.properties.formatted,
    lat: f.geometry.coordinates[1],
    lon: f.geometry.coordinates[0],
  }));
};



const getOtp=async (num)=>{
  function generateOtp(num) {
      const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
      return otp;
  }
  return generateOtp(num);
}

const createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('data not received');
  }

  const fare = await getFare(pickup, destination);
  const otp = await getOtp(6);

  if (!fare || !fare[vehicleType]) {
    throw new Error('Invalid fare data');
  }

  const ride = await RidingModel.create({
    user,
    pickup,
    destination,
    otp,
    fare: fare[vehicleType],
  });

  return ride;
};


module.exports = { getAddress, getDistanceAndTime, getFare, getAutoSuggestions, createRide };


