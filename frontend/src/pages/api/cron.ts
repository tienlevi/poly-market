import { NextApiRequest, NextApiResponse } from "next";

const polyMarketApi = process.env.NEXT_PUBLIC_POLY_MARKET as string;

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(polyMarketApi);
    const data = await response.json();
    const authHeader = req.headers["authorization"];
    if (
      !process.env.NEXT_PUBLIC_CRON_SECRET ||
      authHeader !== `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`
    ) {
      return res.status(401).json({ success: false });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
