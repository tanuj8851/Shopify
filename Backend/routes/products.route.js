const express = require("express");
require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const Product = require("../models/product.model");



router.get("/product",async(req,res)=>{
try {
    const product= await Product.find();
    res.status(200).send({success:true,product});
} catch (error) {
    console.log(error)
    res.send({success:false,msg:error});
}
})

module.exports=router;