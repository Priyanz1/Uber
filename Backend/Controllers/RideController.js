
const service=require("../service");

const createRide=async (req,res,next)=>{
 try{
  const ride=await service.createRide(req.body);
  return res.status(201).json(ride);
}catch(err){
  console.error(err);
  res.status(404).json({msg:"riding not created"});
}
}
module.exports={createRide};