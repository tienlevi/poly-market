import { NextApiRequest, NextApiResponse } from "next";

const polyMarketApi = process.env.NEXT_PUBLIC_POLY_MARKET as string;

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(polyMarketApi, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`,
      },
    });
    console.log(process.env.NEXT_PUBLIC_CRON_SECRET);

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
