const express = require("express");
const router = express.Router();
const { getAddress, getDistanceAndTime, getFare } = require("../service");
const CaptainLoginAuth = require("../middleware/CaptainLoginAuth");

router.post("/getcode",CaptainLoginAuth, getAddress);

router.post("/distance",CaptainLoginAuth, getDistanceAndTime);

router.post("/fare", getFare);

module.exports = router;