const express = require("express");
const router = express.Router();
const { getCoordinates, getDistanceAndTime, gtAutoSuggestions } = require("../Controllers/mapController");
const CaptainLoginAuth = require("../middleware/CaptainLoginAuth");
const { getFare } = require("../service");

router.post("/getcoordinates",CaptainLoginAuth, getCoordinates);
router.post("/distancetime",CaptainLoginAuth, getDistanceAndTime);
router.post("/calculatefare",CaptainLoginAuth, getFare);
router.post("/get-suggestions",CaptainLoginAuth, gtAutoSuggestions);
module.exports = router;