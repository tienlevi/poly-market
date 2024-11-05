import cron from "node-cron";
import MarketSchema from "../model/market.js";

function Schedule() {
  const task = cron.schedule(
    "0 7 * * *",
    async () => {
      const donaldTrumpPrice = Math.random();
      const harrisPrice = 1 - donaldTrumpPrice;

      try {
        const donaldTrump = await MarketSchema.findOne({
          _id: "672994266551e6ea8468cba4",
        });
        const harris = await MarketSchema.findOne({
          _id: "6729940c6551e6ea8468cba2",
        });
        donaldTrump.price.push(donaldTrumpPrice);
        harris.price.push(harrisPrice);
        console.log("donaldTrump", donaldTrump.price);
        console.log("Harris", harris.price);

        await donaldTrump.save();
        await harris.save();
      } catch (error) {
        console.log(error);
      }
    },
    { timezone: "Asia/Ho_Chi_Minh" }
  );

  return task;
}

export default Schedule;
