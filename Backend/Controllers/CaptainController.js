   const bcrypt=require("bcrypt");
   const CaptainModel=require("../Models/CaptainModel");
   const jwt=require("jsonwebtoken");
   const Register=async (req,res)=>{
    const { name, email, password, vehicle } = req.body;
    const existing = await CaptainModel.findOne({ "vehicle.plateNumber": vehicle.plateNumber });
    if (existing) {
      return res.status(400).json({ message: "Vehicle plate number already registered" });
    }
        const hash=await bcrypt.hash(password,10);
        const captain=await CaptainModel.create({name,email,password:hash,vehicle});
        const token=jwt.sign({email:email},"secret");
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:60*60*1000});
        res.status(200).json({captain,token});
    }
    const Login=async (req,res)=>{
        const {email,password}=req.body;
        const captain=await CaptainModel.findOne({email});
        if(!captain){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const isMatch=await bcrypt.compare(password,captain.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const token=jwt.sign({email:email},"secret");
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:60*60*1000});
        res.status(200).json({captain,token});
    }
    module.exports={Register,Login};