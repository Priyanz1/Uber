const mongoose = require("mongoose");

async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Uber";
    await mongoose.connect(mongoURI); 
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
