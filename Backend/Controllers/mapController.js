const service=require("../service");
const getCoordinates= async (req,res)=>{
  try{
    const {address}= req.query;
    const coordinates=await service.getAddress(address);
    res.status(200).json(coordinates);
  }catch(err){
    console.error(err);
    res.status(404).json({msg:"location not found"});
  }
}
const getDistanceAndTime= async (req,res)=>{
  try{
    const {pickup,destination}= req.query;
    const distanceAndTime=await service.getDistanceAndTime(pickup,destination);
    res.status(200).json(distanceAndTime);
  }catch(err){
    console.error(err);
    res.status(404).json({msg:"distance and time not found"});
  }
}
module.exports={getCoordinates,getDistanceAndTime};  