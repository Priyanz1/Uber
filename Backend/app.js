const express=require("express");
const app = express();
const UserRouting= require("./routes/UserRouting");
const cookieParser = require("cookie-parser");




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 
app.use("/",UserRouting);

module.exports = app;


