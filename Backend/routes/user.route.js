const express = require("express");
require("dotenv").config();
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");



router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) return res.status(400).send({ msg: "User already Present. Go login" });

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = await User({ name, email, password: hashedPassword });

        newUser.save();

        res.status(200).send({ success: true, msg: "User Created Successfully" });

    } catch (error) {
        console.log({ msg: error });
        res.send({ success: false, msg: error }).status(500);
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).send({ msg: "User not Present. Go Register" });

        const isPasswordCorrect= await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect) return res.status(400).send({ msg: "Password Not Matched" });

        const token = jwt.sign({ userID:user._id },process.env.SecretKey)
        const expiryTime = new Date(Date.now() + 3600000);
        res.cookie('token', token, { httpOnly: true,expires:expiryTime });

        res.status(200).send({ success: true, msg: "User Login Successfully",user,token:token });

    } catch (error) {
        console.log({ msg: error });
        res.send({ success: false, msg: error }).status(500);
    }
})


module.exports=router;