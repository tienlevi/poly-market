import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const api = process.env.URL_MONGODB;

async function Connect() {
  await mongoose
    .connect(api, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(mongoose.version);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

export default Connect;
