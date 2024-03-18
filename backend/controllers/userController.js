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

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw "User already exists";
  }
  const newUser = await User.create({ name, email, password });

  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { authUser, logoutUser, registerUser };
