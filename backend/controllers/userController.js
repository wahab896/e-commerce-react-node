import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

//POST /api/user/auth
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists && (await userExists.matchPassword(password))) {
    //user details correct and authenticated
    generateToken(res, userExists._id);
    res.json({
      _id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export { authUser, logoutUser };
