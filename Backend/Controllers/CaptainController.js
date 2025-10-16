const bcrypt = require("bcrypt");
const CaptainModel = require("../Models/CaptainModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// =========================
// Register Captain
// =========================
const Register = async (req, res) => {
  try {
    const { name, email, password, vehicle } = req.body;

    // Check if vehicle plate already exists
    const existing = await CaptainModel.findOne({ "vehicle.plateNumber": vehicle.plateNumber });
    if (existing) {
      return res.status(400).json({ message: "Vehicle plate number already registered" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create captain
    const captain = await CaptainModel.create({ name, email, password: hash, vehicle });

    // Create JWT token
    const token = jwt.sign({ email: captain.email, id: captain._id }, JWT_SECRET, { expiresIn: "1h" });

    // Remove password from response
    const { password: _, ...captainData } = captain.toObject();

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ captain: captainData, token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// Login Captain
// =========================
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: captain.email, id: captain._id }, JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...captainData } = captain.toObject();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ captain: captainData, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// Captain Profile
// =========================
const CaptainProfile = async (req, res) => {
  try {
    if (!req.captain) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    res.status(200).json(req.captain);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const LogoutCaptain=(req,res)=>{
  try{
    res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
    res.status(200).send({msg:"Captain logged out successfully"});
  }catch(error){
    console.log(error);
    res.status(500).send({msg:"user is not log out"});
  }
}


module.exports = { Register, Login, CaptainProfile,LogoutCaptain};
