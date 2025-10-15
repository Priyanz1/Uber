const express=require("express");
const router=express.Router();
const {Register,Login, CaptainProfile}=require("../Controllers/CaptainController");
const CaptainLoginAuth = require("../middleware/CaptainLoginAuth");

router.post("/login",Login);
router.post("/Register",Register);
router.get("/profile", CaptainLoginAuth, CaptainProfile);


module.exports=router;