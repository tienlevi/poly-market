import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const api = process.env.URL_MONGODB;

async function Connect() {
  await mongoose
    .connect(api, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(mongoose.version);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

export default Connect;
