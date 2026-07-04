const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(
      "❌ Missing MongoDB connection string. Set MONGO_URI or MONGODB_URI in your environment.",
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log("\n💡 Tip: Ensure MongoDB is installed and running locally.");
    console.log(
      "   Check your .env file for the correct MONGO_URI or MONGODB_URI.",
    );
    console.log(
      "   If using MongoDB Atlas, make sure your IP is allowlisted.\n",
    );
    process.exit(1);
  }
};

module.exports = connectDB;
