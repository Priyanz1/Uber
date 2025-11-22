
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
const { initializeSocket } = require("./socket");
connectDB();


app.use(cors({
  origin: [
    "http://localhost:5173",
     "http://localhost:5174",
    "https://4nhvrj8j-5174.inc1.devtunnels.ms"
  ],
  credentials: true
}));

  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use("/users",UserRouting);
app.use("/captain",CaptainRouting);
app.use("/map", MapRouting);
app.use("/ride", CreateRiding);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
    console.log(`System is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
})

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
initializeSocket(server, corsOptions);

// module.exports = app;