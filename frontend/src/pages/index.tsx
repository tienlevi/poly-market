/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
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
        const res = await fetch("http://localhost:8080/api/poly-market");
        const data = await res.json();
        setToken(data[0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(token);

  const refreshData = () => {
    console.log("Refresh data");
  };

  const checkTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 9 && minutes === 51) {
      refreshData();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [checkTime]);

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị loading khi dữ liệu đang được tải
  }

  const data = [
    {
      name: "Apr",
      donaldTrump: token?.tokens[0]?.price[0] * 100 || 0,
      Harris: token?.tokens[1]?.price[0] * 100 || 0,
    },
    {
      name: "May",
      donaldTrump: token?.tokens[0]?.price[1] * 100 || 0,
      Harris: token?.tokens[1]?.price[1] * 100 || 0,
    },
    {
      name: "Jun",
      donaldTrump: token?.tokens[0]?.price[2] * 100 || 0,
      Harris: token?.tokens[1]?.price[2] * 100 || 0,
    },
    {
      name: "Jul",
      donaldTrump: token?.tokens[0]?.price[3] * 100 || 0,
      Harris: token?.tokens[1]?.price[3] * 100 || 0,
    },
  ];

  return (
    <div className="p-4">
      <div className="text-[23px] font-bold">{token?.title}</div>
      <LineChart width={1200} height={400} data={data} className="mt-2">
        <Line type="monotone" dataKey="donaldTrump" stroke="#ff5952" />
        <Line type="monotone" dataKey="Harris" stroke="#1652f0" />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
      <div className="block mt-5">
        <div className="flex justify-between w-[600px]">
          <h1 className="text-left text-[#828282]">Outcome</h1>
          <h1 className="text-left text-[#828282]">Change</h1>
        </div>
        <div className="flex flex-col w-[600px]">
          {token?.tokens.map((item: any) => (
            <div
              className="flex items-center justify-between my-2"
              key={item.token_id}
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
              <p className="text-[24px] font-bold">{item.price[3] * 100}%</p>
            </div>
          ))}
          <p className="text-[25px] font-bold">
            {token?.tokens[0]?.price[3] * 100 >
              token?.tokens[1]?.price[3] * 100 && "Donald Trump Win"}
            {token?.tokens[0]?.price[3] * 100 <
              token?.tokens[1]?.price[3] * 100 && "Harris Win"}
          </p>
        </div>
      </div>
      <button onClick={checkTime}>Check Time</button>
    </div>
  );
}
