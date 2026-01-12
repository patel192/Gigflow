import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, resizeBy, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return resizeBy.status(401).json({ message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
