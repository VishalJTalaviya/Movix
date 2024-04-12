const mongoose = require('mongoose');
const URL = "mongodb+srv://movix:VishaL0202@cluster0.1jzvmro.mongodb.net/movix"

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
