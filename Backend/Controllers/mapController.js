const service=require("../service");

const getCoordinates= async (req,res,next)=>{
  try{
    const {address}= req.query;
    const coordinates=await service.getAddress(address);
    res.status(200).json(coordinates);
  }catch(err){
    console.error(err);
    res.status(404).json({msg:"location not found"});
  }
}

const getDistanceAndTime= async (req,res,next)=>{

  try{
    const {pickup,destination}= req.query;
    const distanceAndTime=await service.getDistanceAndTime(pickup,destination);
    res.status(200).json(distanceAndTime);
  }catch(err){
    console.error(err);
    res.status(404).json({msg:"distance and time not found"});
  }
}

const getAutoSuggestions = async (req, res, next) => {
  try {
    const { input } = req.query; // ✅ You can also use req.query if you prefer GET
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



module.exports={getCoordinates,getDistanceAndTime,getAutoSuggestions};  