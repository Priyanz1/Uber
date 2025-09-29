const express=require("express");
const Login = require("../Controllers/UserController");
const router=express.Router();
router.post("/UserLogin",Login);

module.exports = router;

