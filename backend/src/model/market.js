import mongoose from "mongoose";

const Market = new mongoose.Schema({
  title: { type: String, require: true },
  tokens: [
    {
      tokenId: { type: String },
      tokenName: { type: String },
      image: { type: String },
      outcome: { type: Boolean },
      price: { type: [Number] },
    },
  ],
});

const MarketSchema = mongoose.model("Markets", Market);

export default MarketSchema;
