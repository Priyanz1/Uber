
const service=require("../service");

const createRide=async (req,res,next)=>{
  const { userId, pickup, destination, vehicleType } = req.body;
 try{
  const ride = await service.createRide({ user: req.user._id, pickup, destination, vehicleType });
  return res.status(201).json(ride);
}catch(err){
  console.error(err);
  res.status(404).json({msg:"riding not created"});
}
}
module.exports={createRide};