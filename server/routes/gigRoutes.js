import express from "express";
import { createGig,getGigs,getMyGigs,updateGig} from "../controllers/gigController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect,createGig);
router.get("/my",protect,getMyGigs);
router.patch("/:id",protect,updateGig)
router.get("/",getGigs);

export default router;