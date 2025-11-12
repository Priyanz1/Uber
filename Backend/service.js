const axios = require('axios');
const RidingModel = require('./Models/RidengModel');

 


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

 
 

const calculateFare = (distanceInKm, durationInMinutes, vehicleType) => {
  const rates = {
    auto: { name: 'Auto Rickshaw', baseFare: 15, perKm: 12, perMinute: 1, description: 'Economical 3-wheeler' },
    car: { name: 'Standard Car', baseFare: 25, perKm: 20, perMinute: 2, description: '4-wheeler sedan' },
    bike: { name: 'Motorcycle', baseFare: 20, perKm: 15, perMinute: 1.5, description: '2-wheeler bike' },
  };

  const rate = rates[vehicleType] || rates.car;

  const distanceFare = distanceInKm * rate.perKm;
  const timeFare = durationInMinutes * rate.perMinute;
  const totalFare = rate.baseFare + distanceFare + timeFare;

  return {
    vehicle_name: rate.name,
    vehicle_description: rate.description,
    base_fare: rate.baseFare,
    distance_fare: parseFloat(distanceFare.toFixed(2)),
    time_fare: parseFloat(timeFare.toFixed(2)),
    total_fare: parseFloat(totalFare.toFixed(2)),
    currency: 'INR',
    vehicle_type: vehicleType,
    pricing: { per_km: rate.perKm, per_minute: rate.perMinute },
  };
};

const getFare = (distance, duration, vehicleType = 'car') => {
  if (!distance || !duration) {
    throw new Error('Distance and duration are required');
  }
  const distanceInKm = distance / 1000;
  const durationInMinutes = duration / 60;
  return calculateFare(distanceInKm, durationInMinutes, vehicleType);
};

const getAutoSuggestions = async (input) => {
    if (!input) throw new Error('input is required');
  
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error('Google Maps API key not configured');
  
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  
    const response = await axios.get(url, {
      params: { input, key: apiKey }
    });
  
    if (response.data.status !== 'OK') {
      throw new Error('Auto suggestions not found');
    }
  
    return response.data.predictions;
  };  


const createRide = async ({ user, pickup, destination, vehicleType = 'car' }) => {
  if (!user || !pickup || !destination) {
    throw new Error('data not received');
  }
  const summary = await getDistanceAndTime(pickup, destination);
  const distanceMeters = summary.distance.value;
  const durationSeconds = summary.duration.value;
  const fareBreakdown = getFare(distanceMeters, durationSeconds, vehicleType);

  const ride = await RidingModel.create({
    user,
    pickup,
    destination,
    fare: fareBreakdown.total_fare, 
    distance: distanceMeters,
    duration: durationSeconds,
    status: 'pending',
  });
  return ride;
};

module.exports = { getAddress, getDistanceAndTime, getFare, getAutoSuggestions, createRide };


