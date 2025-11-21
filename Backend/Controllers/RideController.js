
const service=require("../service");
const {sendMessageToSocketId}=require("../socket");

const createRide=async (req,res,next)=>{
  const {  pickup, destination, vehicleType } = req.body;
 try{
  const ride = await service.createRide({ user: req.user._id, pickup, destination, vehicleType });
  res.status(201).json(ride);
  const pickupCoords = await service.getAddress(pickup);
  console.log(pickupCoords);
  const captainsInRadius = await service.getCaptainInTheRadius(pickupCoords.lat, pickupCoords.lng, 2);
   ride.otp="";

    captainsInRadius.map(async (captain) =>
      sendMessageToSocketId(captain.socketId, { 
        event: 'new-ride',
        data:ride
       })
    )
  
}catch(err){
  console.error(err);
  res.status(404).json({msg:"riding not created"});
}
}

const fareCon = async (req, res) => {
  try {
    const { pickup, destination } = req.query;

    const fare = await service.getFare(pickup, destination);

    res.json({ success: true, fare });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports={createRide,fareCon};