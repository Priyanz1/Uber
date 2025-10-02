const express=require("express");
const app = express();

const UserRouting= require("./routes/UserRouting");
const CaptainRouting= require("./routes/CaptainRouting");
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/dbconnect");
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use("/",UserRouting);
app.use("/",CaptainRouting);

app.listen(3000,()=>{
    console.log("System is running on http://localhost:3000");
})

// module.exports = app;


