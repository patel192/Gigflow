import express from "express";
import { createGig,getGigs,getMyGigs } from "../controllers/gigController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect,createGig);
router.get("/my",protect,getMyGigs);
router.get("/",getGigs);

export default router;