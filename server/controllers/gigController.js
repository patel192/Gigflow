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
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(gigs);
  } catch (err) {
    res.json(500).json({
      message: err.message,
    });
  }
};
export const updateGig = async (req,res) => {
  const {title,description,budget} = req.body;
  try{
  const gig = await Gig.findById(req.params.id);
  if(!gig){
    return res.status(404).json({message:"Gig Not Found"});
  }
  if(gig.ownerId.toString() !== req.user._id.toString()){
    return res.status(403).json({message:"Not Authrized"});
  }
  gig.title = title || gig.title;
  gig.description = description || gig.description;
  gig.budget = budget || gig.budget;

  const updatedGig = await gig.save();
  res.json(updatedGig);
  }catch(err){
res.status(500).json({message:err.message});
  }
}
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
