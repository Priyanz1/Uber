const express = require("express");
const router = express.Router();
const { getCoordinates, getDistanceAndTime, gtAutoSuggestions, calculateFare } = require("../Controllers/mapController");
// const CaptainLoginAuth = require("../middleware/CaptainLoginAuth");
const LoginAuth = require("../middleware/UserLoginAuth");

// router.post("/getcoordinates",CaptainLoginAuth, getCoordinates);
// router.post("/distancetime",CaptainLoginAuth, getDistanceAndTime);
// router.post("/calculatefare",CaptainLoginAuth, calculateFare);
// router.post("/get-suggestions",CaptainLoginAuth, gtAutoSuggestions);
// module.exports = router;

router.post("/getcoordinates", LoginAuth,getCoordinates);
router.post("/distancetime",LoginAuth, getDistanceAndTime);
router.post("/calculatefare",LoginAuth, calculateFare);
router.post("/get-suggestions",LoginAuth, gtAutoSuggestions);
module.exports = router;