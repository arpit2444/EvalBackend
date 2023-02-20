const express = require("express");
const cors= require("cors")
require('dotenv').config()
const {connection} = require("./db");
const {userRouter} = require("./routes/userRoute");
const {postRouter} = require("./routes/postroutes");
const {authorization} = require("./Middleware/authentication")

const app = express();
app.use(express.json())

app.use("/users",userRouter)
app.use(authorization)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
     await connection
    console.log("server is running")
})


