const jwt = require("jsonwebtoken");
const CaptainModel = require("../Models/CaptainModel");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const CaptainLoginAuth = async (req, res, next) => {
  try {
    // Get token from cookie or authorization header
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token ||
      (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

    if (!token) {
      return res.status(401).json({ msg: "Login required" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find captain by ID
    const captain = await CaptainModel.findById(decoded.id).select("-password");

    if (!captain) {
      return res.status(404).json({ msg: "Captain not found" });
    }

   
    req.captain = captain;
    next();
  } catch (err) {
    console.error("Captain auth error:", err.name, err.message);

    
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired, please login again" });
    }

    res.status(401).json({ msg: "Invalid token, authorization denied" });
  }
};

module.exports = CaptainLoginAuth;
