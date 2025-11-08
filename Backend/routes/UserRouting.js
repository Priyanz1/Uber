const express=require("express");
const {Login,Register, UserProfile, LogoutUser} = require("../Controllers/UserController");
const LoginAuth = require("../middleware/UserLoginAuth");
const router=express.Router();
router.post("/login",Login);
router.post("/Register",Register);
router.get("/profile",LoginAuth,UserProfile);
router.get("/logout",LoginAuth,LogoutUser);

module.exports = router;
