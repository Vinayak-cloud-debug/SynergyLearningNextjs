import mongoose from "mongoose";

const connection = async () => {
  try{
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  }
  catch(err){
    console.error("MongoDB connection error:", err);
  }
}
export default connection;