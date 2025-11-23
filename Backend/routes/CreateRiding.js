const express=require("express");
const router=express.Router();
const LoginAuth = require("../middleware/UserLoginAuth");
const { createRide, fareCon, comfirmRide } = require("../Controllers/RideController");
const CaptainLoginAuth = require("../middleware/CaptainLoginAuth");
router.post("/create",LoginAuth,createRide);
router.get("/getfare",LoginAuth,fareCon);
router.post("/comfirm",CaptainLoginAuth,comfirmRide);
module.exports=router;