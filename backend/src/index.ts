import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import path from "path";

import userRoutes from "./resources/users/users.routes";
import authRoutes from "./resources/auth/auth.routes";
import myHotelRoutes from "./resources/my-hotels/my-hotels.routes";
import hotelsRoutes from "./resources/hotels/hotels.routes";
import myBookingsRoutes from "./resources/my-bookings/my-bookings.routes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/my-bookings", myBookingsRoutes);

app.get("*", async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

const PORT = parseInt(process.env.PORT || "7000");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on localhost:${PORT}`);
});
