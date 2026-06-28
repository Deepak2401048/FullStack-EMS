import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
