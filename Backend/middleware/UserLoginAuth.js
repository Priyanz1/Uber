const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const LoginAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
      return res.status(401).json({ msg: "Login first" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ msg: "Token is not valid or expired" });
  }
};

module.exports = LoginAuth;
