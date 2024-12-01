
const mongoose = require("mongoose");
const URL = "mongo atlas url";

const mongoose = require('mongoose');
const URL = "mongo atlas url"


const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
