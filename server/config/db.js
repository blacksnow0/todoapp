const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Database connection error", error);
    process.exit(1);
  }
};

module.exports = connectDb;
