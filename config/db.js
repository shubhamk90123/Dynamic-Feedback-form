const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("MongoDB URI missing. Set MONGO_URI (or MONGODB_URI).");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
