const axios = require('axios');

// Use environment variable for Google Maps API key
const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getAddress = async (req, res) => {
  try {
    // Check if API key is configured
    if (!GOOGLE_API_KEY) {
      return res.status(500).json({ 
        error: 'Google Maps API key not configured. Please set GOOGLE_MAPS_API_KEY in your .env file' 
      });
    }

    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ 
        success: false, 
        message: 'Address is required' 
      });
    }

    // Call Google Maps Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address,
          key: GOOGLE_API_KEY,
        },
      }
    );

    const data = response.data;

    if (data.status !== 'OK' || data.results.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Location not found' 
      });
    }

    const location = data.results[0].geometry.location;
    const formattedAddress = data.results[0].formatted_address;

    res.json({
      success: true,
      data: {
        latitude: location.lat,
        longitude: location.lng,
        address: formattedAddress,
        originalAddress: address
      }
    });
  } catch (err) {
    console.error('Geocoding error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing address' 
    });
  }
};

const getDistanceAndTime = async (req, res) => {
  try {
    // Check if API key is configured
    if (!GOOGLE_API_KEY) {
      return res.status(500).json({ 
        error: 'Google Maps API key not configured. Please set GOOGLE_MAPS_API_KEY in your .env file' 
      });
    }

    const { pickup, destination } = req.body;
    
    if (!pickup || !destination) {
      return res.status(400).json({ 
        success: false, 
        message: 'Both pickup and destination are required' 
      });
    }

    // Call Google Maps Distance Matrix API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json`,
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
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request to Google Maps API' 
      });
    }

    if (data.rows[0].elements[0].status !== 'OK') {
      return res.status(404).json({ 
        success: false, 
        message: 'Could not calculate route between the provided locations' 
      });
    }

    const element = data.rows[0].elements[0];
    const distance = element.distance;
    const duration = element.duration;

    res.json({
      success: true,
      data: {
        pickup: pickup,
        destination: destination,
        distance: {
          text: distance.text,
          value: distance.value 
        },
        duration: {
          text: duration.text,
          value: duration.value 
        },
        estimated_fare: calculateEstimatedFare(distance.value, duration.value)
      }
    });
  } catch (err) {
    console.error('Distance calculation error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error calculating distance and time' 
    });
  }
};

// Helper function to calculate estimated fare
const calculateEstimatedFare = (distanceInMeters, durationInSeconds) => {
  const baseFare = 2.50; // Base fare in USD
  const perKmRate = 1.50; // Rate per kilometer
  const perMinuteRate = 0.25; // Rate per minute
  
  const distanceInKm = distanceInMeters / 1000;
  const durationInMinutes = durationInSeconds / 60;
  
  const distanceFare = distanceInKm * perKmRate;
  const timeFare = durationInMinutes * perMinuteRate;
  
  const totalFare = baseFare + distanceFare + timeFare;
  
  return {
    base_fare: baseFare,
    distance_fare: parseFloat(distanceFare.toFixed(2)),
    time_fare: parseFloat(timeFare.toFixed(2)),
    total_fare: parseFloat(totalFare.toFixed(2)),
    currency: 'USD'
  };
};

const getFare = async (req, res) => {
  try {
    const { distance, duration, vehicleType = 'standard' } = req.body;
    
    if (!distance || !duration) {
      return res.status(400).json({ 
        success: false, 
        message: 'Distance and duration are required' 
      });
    }

    // Convert distance from meters to kilometers
    const distanceInKm = distance / 1000;
    
    // Convert duration from seconds to minutes
    const durationInMinutes = duration / 60;

    // Base fare calculation
    const baseFare = calculateFare(distanceInKm, durationInMinutes, vehicleType);

    res.json({
      success: true,
      data: {
        distance: {
          kilometers: parseFloat(distanceInKm.toFixed(2)),
          meters: distance
        },
        duration: {
          minutes: parseFloat(durationInMinutes.toFixed(2)),
          seconds: duration
        },
        vehicleType: vehicleType,
        fare: baseFare,
        breakdown: {
          distance_fare: baseFare.distance_fare,
          time_fare: baseFare.time_fare,
          base_fare: baseFare.base_fare,
          total_fare: baseFare.total_fare
        }
      }
    });
  } catch (err) {
    console.error('Fare calculation error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error calculating fare' 
    });
  }
};

// Helper function to calculate fare based on distance and time
const calculateFare = (distanceInKm, durationInMinutes, vehicleType) => {
  // Three vehicle types with different pricing
  const rates = {
    auto: {
      name: "Auto Rickshaw",
      baseFare: 15, // Base fare in rupees
      perKm: 12,    // 1km = 12 rupees
      perMinute: 1, // Per minute rate
      description: "Economical 3-wheeler"
    },
    car: {
      name: "Standard Car",
      baseFare: 25, // Base fare in rupees
      perKm: 20,    // 1km = 20 rupees
      perMinute: 2, // Per minute rate
      description: "4-wheeler sedan"
    },
    bike: {
      name: "Motorcycle",
      baseFare: 20, // Base fare in rupees
      perKm: 15,    // 1km = 15 rupees
      perMinute: 1.5, // Per minute rate
      description: "2-wheeler bike"
    }
  };

  const rate = rates[vehicleType] || rates.car;
  
  // Calculate fare components
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
    pricing: {
      per_km: rate.perKm,
      per_minute: rate.perMinute
    }
  };
};

const getAutoSuggestions = async (input) => {
  if(!input) return res.status(400).json({msg:"input is required"});
  const apiKey=process.env.GOOGLE_MAPS_API_KEY;
  const url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if(response.data.status === 'OK') {
    return response.data.predictions;
  }else{
    throw new Error('Auto suggestions not found');
  }
  } catch (err) {
    console.error(err);
  throw err;
  }
};
module.exports = { getAddress, getDistanceAndTime, getFare, getAutoSuggestions };
