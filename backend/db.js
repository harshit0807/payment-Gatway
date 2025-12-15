const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/phonepe_payments");

        console.log("MongoDB Connected Successfully");
        
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
