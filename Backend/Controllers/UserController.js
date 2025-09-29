const bcrypt=require("bcrypt");
const Login=(req,res)=>{
    const {email,password}= req.body;
    const user=UserModel.findOne({email:email}).select("+password");
    if(!user){
      return res.json({msg:"Invalid Email or Password"});
    }

    const isMatch=bcrypt.compare(password,user.password);
    if(!isMatch){
       return res.json({msg:"Invalid Email or Password"});
    }
    jwt.sign({email:email},"secret");
    // jwt.verify({password:user.password},"secret");
    


}
module.exports = Login;