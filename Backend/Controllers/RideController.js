
const service=require("../service");

const createRide=async (req,res,next)=>{
  const {  pickup, destination, vehicleType } = req.body;
 try{
  const ride = await service.createRide({ user: req.user._id, pickup, destination, vehicleType });
  return res.status(201).json(ride);
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