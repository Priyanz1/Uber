const express = require("express");
const router = express.Router();
const { getCoordinates, getDistanceAndTime, calculateFare, getAutoSuggestions } = require("../Controllers/mapController");
const LoginAuth = require("../middleware/UserLoginAuth");


// router.post("/getcoordinates",CaptainLoginAuth, getCoordinates);
// router.post("/distancetime",CaptainLoginAuth, getDistanceAndTime);
// router.post("/calculatefare",CaptainLoginAuth, calculateFare);
// router.post("/get-suggestions",CaptainLoginAuth, gtAutoSuggestions);
// module.exports = router;

router.get("/getcoordinates",LoginAuth,getCoordinates);
router.get("/distancetime", LoginAuth,getDistanceAndTime);
router.get("/getsuggestions",LoginAuth,getAutoSuggestions);
module.exports = router;