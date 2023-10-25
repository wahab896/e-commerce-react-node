import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import users from "../users.js";
const router = express.Router();

// console.log("start", users);

const getUser = (userName) => {
  console.log({ users });
  return users.find((u) => u.userName === userName);
};

const setUser = (user) => {
  const password = bcrypt.hashSync(user.password, 10);
  const newUser = { ...user, password, userId: users.length + 1 };
  // console.log({ newUser, users });
  users.push(newUser);
};

const comparePassword = (enteredPass, existingPass) => {
  return bcrypt.compareSync(enteredPass, existingPass);
};

router.route("/login").post((req, res) => {
  const { userName, password } = req.body;

  const user = getUser(userName);
  console.log({ user });
  if (!comparePassword(password, user.password)) {
    res.status(400);
    throw new Error("Username or password is incorrect");
  } else {
    delete user.password;

    //Jwt and cookie.
    console.log("token", process.env.JWT_SECRET);
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("jwt_token", token);
    res.status(201);
    return res.redirect("/welcome");
  }
});

router.route("/create").post((req, res) => {
  const { userName, password } = req.body;

  if (!userName && !password) {
    res.status(404);
    throw new Error("Username or password is missing");
  }
  setUser({ userName, password });
  res.status(201);
  return res.redirect("/");
});

export default router;
