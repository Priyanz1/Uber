const express=require("express");
const router=express.Router();
const {Register,Login}=require("../Controllers/CaptainController");

router.post("/login",Login);
router.post("/Register",Register);

module.exports=router;