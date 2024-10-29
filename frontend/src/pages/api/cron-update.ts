import { NextApiRequest, NextApiResponse } from "next";

const polyMarketApi = process.env.NEXT_PUBLIC_POLY_MARKET as string;

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { title } = req.body;
  try {
    const response = await fetch(polyMarketApi, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: title || "TienRonaldo" }),
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
