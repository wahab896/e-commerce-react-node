import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Unauthorized request, token verification failed");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized request, no token found");
  }
});

const admin = (req, res, next) => {
  if (req?.user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Unauthorized access, Admin privileges required");
  }
};

export { protect, admin };
