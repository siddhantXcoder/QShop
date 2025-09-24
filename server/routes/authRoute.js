const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

require("dotenv").config();

//register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if(!username || !email || !password || !role){
            return res.status(400).json({
                success: false,
                message:"Fill all fields",
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await user.save({ username, email, password, role });

        res.status(201).json({
            success: true,
            message: "Registered successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong: " + error,
        });
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Password does not match",
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong during login: " + error,
        });
    }
});

module.exports = router;