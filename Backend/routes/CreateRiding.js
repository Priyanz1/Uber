const express=require("express");
const router=express.Router();
const LoginAuth = require("../middleware/UserLoginAuth");
const { createRide, fareCon } = require("../Controllers/RideController");
router.post("/create",LoginAuth,createRide);
router.get("/getfare",LoginAuth,fareCon);
module.exports=router;