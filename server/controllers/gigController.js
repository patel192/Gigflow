import Gig from "../models/gigModel.js";

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });
    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getGigs = async (req, res) => {
  try {
    const keyword = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};
    const gigs = await Gig.find({ status: "open", ...keyword })
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
