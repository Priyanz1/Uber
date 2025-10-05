const express=require("express");
const {Login,Register} = require("../Controllers/UserController");
const router=express.Router();
router.post("/login",Login);
router.post("/Register",Register);


module.exports = router;

