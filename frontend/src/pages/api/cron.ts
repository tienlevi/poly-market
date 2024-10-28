import { NextApiRequest, NextApiResponse } from "next";

const polyMarketApi = "https://poly-market.onrender.com/api/poly-market";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(polyMarketApi);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
