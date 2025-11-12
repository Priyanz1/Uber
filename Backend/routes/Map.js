const express = require("express");
const router = express.Router();
const { getCoordinates, getDistanceAndTime, gtAutoSuggestions, calculateFare, getAutoSuggestions } = require("../Controllers/mapController");
// const CaptainLoginAuth = require("../middleware/CaptainLoginAuth");
const LoginAuth = require("../middleware/UserLoginAuth");

// router.post("/getcoordinates",CaptainLoginAuth, getCoordinates);
// router.post("/distancetime",CaptainLoginAuth, getDistanceAndTime);
// router.post("/calculatefare",CaptainLoginAuth, calculateFare);
// router.post("/get-suggestions",CaptainLoginAuth, gtAutoSuggestions);
// module.exports = router;

router.get("/getcoordinates",getCoordinates);
router.get("/distancetime", getDistanceAndTime);
router.get("/calculatefare",LoginAuth, calculateFare);
router.get("/getsuggestions", getAutoSuggestions);
module.exports = router;