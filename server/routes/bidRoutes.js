import express from "express";
import { createBid,getBidsForGig,hireBid,getMyBids } from "../controllers/bidController.js";
import {protect} from "../middleware/authMiddleware.js";


const router = express.Router();



router.post("/",protect,createBid);
router.get("/my",protect,getMyBids);
router.get("/:gigId",protect,getBidsForGig);
router.patch("/:bidId/hire",protect,hireBid);


export default router;