const express=require("express");
const router=express.Router();
const {Register,Login}=require("../Controllers/CaptainController");

router.post("/Login/captain",Login);
router.post("/Register/captain",Register);

module.exports=router;