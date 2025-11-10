const axios = require('axios');
const RidingModel = require('./Models/RidengModel');


const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;


const getAddress = async (address) => {
  if (!GOOGLE_API_KEY) {
    throw new Error('Google Maps API key not configured. Please set GOOGLE_MAPS_API_KEY');
  }
  if (!address) {
    throw new Error('Address is required');
  }

  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    { params: { address, key: GOOGLE_API_KEY } }
  );

  const data = response.data;
  if (data.status !== 'OK' || data.results.length === 0) {
    throw new Error('Location not found');
  }

  const location = data.results[0].geometry.location;
  const formattedAddress = data.results[0].formatted_address;

  return {
    latitude: location.lat,
    longitude: location.lng,
    address: formattedAddress,
    originalAddress: address
  };
};


const getDistanceAndTime = async (pickup, destination) => {
    if (!GOOGLE_API_KEY) {
      throw new Error('Google Maps API key not configured. Please set GOOGLE_MAPS_API_KEY');
    }
    if (!pickup || !destination) {
      throw new Error('Both pickup and destination are required');
    }
  
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/distancematrix/json',
      {
        params: {
          origins: pickup,
          destinations: destination,
          units: 'metric',
          key: GOOGLE_API_KEY,
        },
      }
    );
  
    const data = response.data;
    if (data.status !== 'OK') {
      throw new Error('Invalid request to Google Maps API');
    }
  
    const element = data.rows?.[0]?.elements?.[0];
    if (!element || element.status !== 'OK') {
      throw new Error('Could not calculate route between the provided locations');
    }
  
    const distance = element.distance;
    const duration = element.duration;
  
    return {
      pickup,
      destination,
      distance: {
        text: distance.text,
        value: distance.value,
      },
      duration: {
        text: duration.text,
        value: duration.value,
      }
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


