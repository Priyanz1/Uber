const express=require("express");
const {Login,Register} = require("../Controllers/UserController");
const router=express.Router();
router.post("/login/user",Login);
router.post("/Register/user",Register);

module.exports = router;

