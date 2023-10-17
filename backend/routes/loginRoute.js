import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

const getUser = (userName) => {
  return { userId: 123, password: "123456", userName };
};

router.route("/").post((req, res) => {
  console.log("router to login");
  const { userName, password } = req.body;

  const user = getUser(userName);
  if (user.password !== password) {
    res.status(400);
    throw new Error("Username or password is incorrect");
  } else {
    delete user.password;

    //Jwt and cookie.
    console.log('token', process.env.JWT_SECRET)
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("jwt_token", token);
    res.status(201);
    return res.redirect("/welcome");
  }
});

export default router;