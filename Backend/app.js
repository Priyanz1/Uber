
require('dotenv').config();

const express=require("express");
const app = express();
const cors = require("cors");
const UserRouting= require("./routes/UserRouting");
const CaptainRouting= require("./routes/CaptainRouting");
const MapRouting = require("./routes/Map");
const CreateRiding = require("./routes/CreateRiding")
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/dbconnect");
connectDB();

// CORS configuration to fix policy violations

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

  
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use("/users",UserRouting);
app.use("/captain",CaptainRouting);
app.use("/map", MapRouting);
app.use("/ride", CreateRiding);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`System is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
})

// module.exports = app;


