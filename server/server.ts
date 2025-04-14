import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/db";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies if needed
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../client/dist"));
app.use(cookieParser());
app.use("/api", routes);
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
