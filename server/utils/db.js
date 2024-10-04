const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017"

const connectDB  = async () => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
