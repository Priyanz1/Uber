const UserModel=require("../Models/UserModel");
const LoginAuth= async (req,res,next)=>{
  const token=req.cookies.token;
  if(!token){
    res.json({msg:"login first"});
  }
  const user=await UserModel.findOne({})

}
module.exports = LoginAuth;