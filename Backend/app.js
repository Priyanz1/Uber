const express=require("express");
const app = express();
const cors = require("cors");
const UserRouting= require("./routes/UserRouting");
const CaptainRouting= require("./routes/CaptainRouting");
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/dbconnect");
connectDB();
app.use(cors({
    origin: ["http://localhost:5173", "https://yourfrontend.com"], // allowed frontends
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use("/users",UserRouting);
app.use("/captain",CaptainRouting);

app.listen(3000,()=>{
    console.log("System is running on http://localhost:3000");
})

// module.exports = app;


