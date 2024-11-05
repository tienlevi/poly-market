import mongoose from "mongoose";

const Market = new mongoose.Schema(
  {
    title: { type: String, require: true },
    tokenId: { type: String },
    tokenName: { type: String },
    image: { type: String },
    outcome: { type: Boolean },
    price: { type: [Number] },
  },
  { timestamps: true, versionKey: false }
);

// "_id": "671f409cfe2694c9f4cf5749"

const MarketSchema = mongoose.model("Markets", Market);

export default MarketSchema;
