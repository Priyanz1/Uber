const http=require("http");
const express=require("express");
const app=require("./app");
const router=http.createServer(app);

router.listen(3000,()=>{
    console.log("System is running on http://localhost:3000");
})

