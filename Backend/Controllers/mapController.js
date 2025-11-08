const getAddress= async (req,res)=>{
  try{
    const {address}= req.query;
    const coordinates=await service.getAddress(address);
    res.status(200).json(coordinates);
  }catch(err){
    console.error(err);
    res.status(404).json({msg:"location not found"});
  }
}
module.exports={getAddress};