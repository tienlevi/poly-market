import { Router } from "express";
import MarketSchema from "../model/market.js";
import Schedule from "../utils/schedule.js";

const router = Router();

router.get("/poly-market", async (req, res) => {
  try {
    const data = await MarketSchema.find(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/poly-market-price", async (req, res) => {
  const { price } = req.body;
  try {
  } catch (error) {
    console.log(error);
  }
});

export default router;
