import mongoose from "mongoose";
import Bid from "../models/bidModel.js";
import Gig from "../models/gigModel.js";

export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fileds are required" });
    }
    const gig = await Gig.findById(gigId);
    if (!gig || !gig.status === "open") {
      return res.status(404).json({
        message: "Gig not available",
      });
    }

    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(403).json({ message: "Cannot bid on your own gig" });
    }
    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBidsForGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gigId: gig._id })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const bid = await Bid.findById(req.params.bidId).session(session);

      if (!bid) {
        throw new Error("Bid not found");
      }

      const gig = await Gig.findById(bid.gigId).session(session);

      if (!gig) {
        throw new Error("Gig not found");
      }

      // Only owner can hire
      if (gig.ownerId.toString() !== req.user._id.toString()) {
        throw new Error("Not authorized");
      }

      // 1. Hire selected bid
      bid.status = "hired";
      await bid.save({ session });

      // 2. Reject others
      await Bid.updateMany(
        { gigId: gig._id, _id: { $ne: bid._id } },
        { $set: { status: "rejected" } },
        { session }
      );

      // 3. Close gig
      gig.status = "closed";
      await gig.save({ session });
    });

    session.endSession();
    res.json({ message: "Freelancer hired successfully (transaction-safe)" });

  } catch (error) {
    session.endSession();
    console.error("TRANSACTION ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user._id })
      .populate("gigId", "title budget status")
      .sort({ createdAt: -1 });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
