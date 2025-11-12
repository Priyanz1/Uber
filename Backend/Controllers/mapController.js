const service=require("../service");

const getCoordinates= async (req,res,next)=>{
  try{
    const {address}= req.body;
    const coordinates=await service.getAddress(address);
    res.status(200).json(coordinates);
  }catch(err){
    console.error(err);
    res.status(404).json({msg:"location not found"});
  }
}

const getDistanceAndTime= async (req,res,next)=>{

  try{
    const {pickup,destination}= req.body;
    const distanceAndTime=await service.getDistanceAndTime(pickup,destination);
    res.status(200).json(distanceAndTime);
  }catch(err){
    console.error(err);
    res.status(404).json({msg:"distance and time not found"});
  }
}

const getAutoSuggestions = async (req, res, next) => {
  try {
    const { input } = req.body; // ✅ You can also use req.query if you prefer GET
    if (!input || input.trim() === "") {
      return res.status(400).json({ msg: "Input is required" });
    }

    const autoSuggestions = await service.getAutoSuggestions(input);

    // ✅ Check if we got valid data back
    if (!autoSuggestions || autoSuggestions.length === 0) {
      return res.status(404).json({ msg: "No auto suggestions found" });
    }

    res.status(200).json({
      success: true,
      suggestions: autoSuggestions,
    });
  } catch (err) {
    console.error("Error in getAutoSuggestions:", err.message);
    res.status(500).json({
      success: false,
      msg: "Failed to fetch auto suggestions",
      error: err.message,
    });
  }
};


const calculateFare = async (req,res,next)=>{
  try{
    const { distance, duration, vehicleType='car' } = req.body;
    const fareBreakdown = service.getFare(distance, duration, vehicleType);
    res.status(200).json({
      success: true,
      data: {
        distance: {
          kilometers: parseFloat((distance/1000).toFixed(2)),
          meters: distance
        },
        duration: {
          minutes: parseFloat((duration/60).toFixed(2)),
          seconds: duration
        },
        vehicleType,
        fare: fareBreakdown,
        breakdown: {
          distance_fare: fareBreakdown.distance_fare,
          time_fare: fareBreakdown.time_fare,
          base_fare: fareBreakdown.base_fare,
          total_fare: fareBreakdown.total_fare
        }
      }
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message:'Error calculating fare'});
  }
}

module.exports={getCoordinates,getDistanceAndTime,getAutoSuggestions, calculateFare};  