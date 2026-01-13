import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import gigRoutes from "./routes/gigRoutes.js";
dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://gigflow-frontend-gamma.vercel.app"
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/api/gigs", gigRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bids",bidRoutes);
app.get("/api/test-protected",protect,(req,res)=>{
    res.json({
        message:"You are authorized",
        user:req.user
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});