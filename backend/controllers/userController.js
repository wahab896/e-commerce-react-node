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

const getUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

const getUserById = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.params.id).select("-password");
  if (existingUser) {
    res.json(existingUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.params.id);

  if (existingUser) {
    if (existingUser.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin User");
    }
    await User.deleteOne({ _id: existingUser.id });
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, logoutUser, registerUser, getUsers, deleteUser, getUserById };
