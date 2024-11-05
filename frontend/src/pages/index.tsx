"use client";
import { FormattedPrice } from "@/utils/formatted";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Home() {
  const [token, setToken] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://poly-market.onrender.com/api/poly-market"
        );
        const data = await res.json();
        setToken(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const harrisPrices = token[0].price?.map((pri: any) => (pri || 0) * 100);
  const donaldTrumpPrice = token[1].price?.map((pri: any) => (pri || 0) * 100);

  const data = token[0].price.map((_: any, index: number) => {
    const donaldTrump = donaldTrumpPrice ? donaldTrumpPrice[index] : 0;
    const harris = harrisPrices ? harrisPrices[index] : 0;
    return {
      day: index + 1,
      donaldTrump: donaldTrump,
      Harris: harris,
    };
  });

  return (
    <div className="p-4">
      <div className="text-[23px] font-bold">
        Presidential Election Winner 2024
      </div>
      <LineChart width={1200} height={400} data={data} className="mt-2">
        <Line type="monotone" dataKey="donaldTrump" stroke="#ff5952" />
        <Line type="monotone" dataKey="Harris" stroke="#1652f0" />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <XAxis dataKey="day" />
        <YAxis />
      </LineChart>
      <div className="block mt-5">
        <div className="flex justify-between w-[600px]">
          <h1 className="text-left text-[#828282]">Outcome</h1>
          <h1 className="text-left text-[#828282]">Change</h1>
        </div>
        <div className="flex flex-col w-[600px]">
          {token?.map((item: any) => (
            <div
              className="flex items-center justify-between my-2"
              key={item._id}
            >
              <div className="flex">
                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  alt=""
                />
                <div className="ml-2">
                  <p className="text-[20px]">{item.tokenName}</p>
                </div>
              </div>
              <p className="text-[24px] font-bold">
                {FormattedPrice(item.price.at(-1))}%
              </p>
            </div>
          ))}
          <p className="text-[25px] font-bold">
            {token[1].price.at(-1) * 100 > token[0].price.at(-1) * 100 &&
              "Donald Trump Win"}
            {token[0].price.at(-1) * 100 > token[1].price.at(-1) * 100 &&
              "Harris Win"}
          </p>
        </div>
      </div>
    </div>
  );
}
