const express = require("express");
const app = express();
require("dotenv").config();
const port= process.env.port || 8080;
const connection = require("./Config/db");
const userRouter = require("./routes/user.route");
const productRouter= require("./routes/products.route");
const authenticateToken= require("./middlewares/user.middleware");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(express.json())
app.use("/User",userRouter);
app.use(authenticateToken);
app.use("/Products",productRouter);


app.get("/",(req,res)=>{
    res.send({
        success:true,
        createdFor:"Shopify",
        createdBy:"Tanuj Kumar"
    })
})



app.listen(port,async()=>{
console.log(`App is running on port ${port}`)
try {
    await connection
    console.log("DB COnnection");
} catch (error) {
    console.log({msg:error});
}


})