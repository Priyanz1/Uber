const express=require("express");
const router=express.Router();
const {Register,Login, CaptainProfile, LogoutCaptain}=require("../Controllers/CaptainController");
const CaptainLoginAuth = require("../middleware/CaptainLoginAuth");

router.post("/login",Login);
router.post("/Register",Register);
router.get("/profile", CaptainLoginAuth, CaptainProfile);
router.get("/logout",CaptainLoginAuth,LogoutCaptain);

module.exports=router;