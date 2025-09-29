const express=require("express");
const app = express();
const UserRouting= require("./routes/UserRouting");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use("/",UserRouting);

module.exports = app;


