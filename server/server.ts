import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/db";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

const allowedOrigins = [
  'http://localhost:5173',
  'https://reactive-todos-front.onrender.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  })
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
