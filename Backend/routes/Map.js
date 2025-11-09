const express = require("express");
const router = express.Router();
const { getCoordinates, getDistanceAndTime } = require("../Controllers/mapController");
const CaptainLoginAuth = require("../middleware/CaptainLoginAuth");
const { getFare } = require("../service");

router.post("/getcoordinates",CaptainLoginAuth, getCoordinates);
router.post("/distancetime",CaptainLoginAuth, getDistanceAndTime);
router.post("/calculatefare",CaptainLoginAuth, getFare);
module.exports = router;