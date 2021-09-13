require('dotenv').config();


const express=require('express');
const mongoose = require("mongoose");
const bodyParser= require('body-parser');
const cors=require("cors");
const app=express();

const bookRoutes= require("./routes/book")
const userRoutes= require("./routes/user")

const http = require('http').Server(app);
//Database connection
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("DB connected");
});

//middlewares
app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/api",bookRoutes)
app.use("/api",userRoutes)



const port=process.env.PORT|| 8000;

http.listen(port,()=>{
    console.log(`http :${port}`);
});