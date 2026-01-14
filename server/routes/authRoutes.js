import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// New routes for cookie-based auth
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

export default router;
