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
  try {
    const bid = await Bid.findById(req.params.bidId).populate("gigId");

    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const gig = bid.gigId;
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (gig.status === "assigned") {
      return res.status(400).json({ message: "Gig already assigned" });
    }
    bid.status = "hired";
    await bid.save();

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    gig.status = "assigned";
    await gig.save();
    res.json({ message: "Freelancer Hired successfully" });
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
