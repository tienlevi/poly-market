import { Router } from "express";
import MarketSchema from "../model/market.js";

const router = Router();

router.get("/poly-market", async (req, res) => {
  try {
    const data = await MarketSchema.find(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/poly-market", async (req, res) => {
  try {
    const data = await MarketSchema.create(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
