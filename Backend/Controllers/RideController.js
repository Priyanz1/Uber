const createRide=(req,res)=>{
  const {pickup,destination,vehicle,otp}=req.body;
  if(!pickup || !destination || !vehicle || !otp){
    return res.json({msg:"data not recevied"});
  }
  
}