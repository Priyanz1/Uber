const express = require("express");
const router = express.Router();
const { getCoordinates, getDistanceAndTime, calculateFare, getAutoSuggestions } = require("../Controllers/mapController");
const LoginAuth = require("../middleware/UserLoginAuth");


router.get("/getcoordinates",LoginAuth,getCoordinates);
router.get("/distancetime", LoginAuth,getDistanceAndTime);
router.get("/getsuggestions",LoginAuth,getAutoSuggestions);
module.exports = router;