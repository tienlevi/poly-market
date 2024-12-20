import { NextApiRequest, NextApiResponse } from "next";

const polyMarketApi = process.env.NEXT_PUBLIC_POLY_MARKET as string;

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.body;

  try {
    const response = await fetch(polyMarketApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`,
      },
      body: JSON.stringify({ title: title || "TienNguyen" }),
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
