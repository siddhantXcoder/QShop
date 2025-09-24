const mongoose = require("mongoose");
require("dotenv").config();


const DB_URI = process.env.DB_URI || "mongodb+srv://salvesiddhant49_db_user:GHztdBFxtB678YYI@cluster0.6b5u2po.mongodb.net/quick_shop";

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error in DB connection:", error);
        process.exit(1); 
    }
};

module.exports = connectDB;
