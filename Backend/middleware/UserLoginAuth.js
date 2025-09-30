const UserModel=require("../Models/UserModel");
const LoginAuth= async (req,res,next)=>{
 try{
    const token=req.cookies.token;
    if(!token){
      res.json({msg:"login first"});
    }
    const decoded= jwt.verify(token,"secret");
    const user=await UserModel.findOne({email:decoded.email});
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    req.user=user;
    next();
 }catch(err){
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
 }

}
module.exports = LoginAuth;