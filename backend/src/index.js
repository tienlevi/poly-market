import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router/index.js";
import Connect from "./config/connect.js";

const app = express();
Connect();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", router);

app.listen(8080, () => {
  console.log("Server is running on port http://localhost:8080");
});
