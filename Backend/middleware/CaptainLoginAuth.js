const jwt = require("jsonwebtoken");
const CaptainModel = require("../Models/CaptainModel");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const CaptainLoginAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    if (!token) {
      return res.status(401).json({ msg: "Login first" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const captain = await CaptainModel.findOne({ email: decoded.email }).select("-password");

    if (!captain) {
      return res.status(404).json({ msg: "Captain not found" });
    }

    req.captain = captain;
    next();
  } catch (err) {
    console.error("Captain auth error:", err.message);
    res.status(401).json({ msg: "Token is not valid or expired" });
  }
};

module.exports = CaptainLoginAuth;
