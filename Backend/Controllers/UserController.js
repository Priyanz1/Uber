const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../Models/UserModel");


const Login= async (req,res)=>{
    const {email,password}= req.body;
    const user=await UserModel.findOne({email:email}).select("+password");
    if(!user){
      return res.json({msg:"Invalid Email or Password"});
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
       return res.json({msg:"Invalid Email or Password"});
    }
   const token= jwt.sign({email:email},"secret");

   res.cookie("token", token, {
    httpOnly: true,
    secure: true, 
    sameSite: "strict",
    maxAge: 60 * 60 * 1000
  });

  res.json({ message: "Logged in successfully" });
    // jwt.verify({password:user.password},"secret");
    


}
module.exports = Login;