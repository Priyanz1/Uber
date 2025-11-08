const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../Models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET || JWT_SECRET;


const Login= async (req,res)=>{
try{
  const {email,password}= req.body;
  const user=await UserModel.findOne({email:email}).select("+password");
  if(!user){
    return res.json({msg:"Invalid Email or Password"});
  } 
  const isMatch= await bcrypt.compare(password,user.password);
  if(!isMatch){
     return res.json({msg:"Invalid Email or Password"});
  }
  const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
    expiresIn: "1h"
  });

 res.cookie("token", token, {
  httpOnly: true,
  secure: true, 
  sameSite: "strict",
  maxAge: 60 * 60 * 1000
});

res.json({user,token});

}catch (err) {
  console.error(err);
  res.status(500).json({ msg: "Server error" });
}


}


const Register=async (req,res)=>{
try {
  const {name,email,password} =req.body;
  
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }
  const hash =await bcrypt.hash(password, 10);
  const user=await UserModel.create({
    name,
    email,
    password:hash
  });

  const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({user,token});
  
} catch (error) {
  console.error(error);
  res.status(500).json({ msg: "Server error" });
}

}

const UserProfile=async (req, res, next) => {
    res.status(200).json(req.user);
}

const LogoutUser= (req,res)=>{
  try{
    res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
    res.status(200).send({msg:"user logged out successfully"});
  }catch(error){
    console.log(error);
    res.status(500).send({msg:"user is not log out"});
  }
}

module.exports ={Login,Register,UserProfile,LogoutUser};