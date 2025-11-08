const express=require("express");
const router=express.Router();
const LoginAuth = require("../middleware/UserLoginAuth");
router.post("/create",LoginAuth,createRide);