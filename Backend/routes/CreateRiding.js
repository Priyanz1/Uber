const express=require("express");
const router=express.Router();
const LoginAuth = require("../middleware/UserLoginAuth");
const { createRide } = require("../Controllers/RideController");
router.post("/create",LoginAuth,createRide);
module.exports=router;