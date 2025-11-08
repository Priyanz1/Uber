
require('dotenv').config();

const express=require("express");
const app = express();
const cors = require("cors");
const UserRouting= require("./routes/UserRouting");
const CaptainRouting= require("./routes/CaptainRouting");
const MapRouting = require("./routes/Map");
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/dbconnect");
connectDB();

// CORS configuration to fix policy violations
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control'
    ],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 200
}));

  
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use("/users",UserRouting);
app.use("/captain",CaptainRouting);
app.use("/map", MapRouting);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`System is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
})

// module.exports = app;


