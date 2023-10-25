import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import employeeRouter from "./employeeRouter.js";
import loginRouter from "./routes/loginRoute.js";

console.log("testing!! Hiiii");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve();
console.log({ __dirname });

app.use("/api", employeeRouter);

app.use("/test", express.static(path.join(__dirname, "/public")));
app.use("/user", loginRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/login.html"));
});
app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/create.html"));
});

app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/welcome.html"));
});
// app.get("/", (req, res) => {
//   res.send("<h2>Hello World</h2>..<i>italics</i>");
// });

app.use((err, req, res, next) => {
  // Log the error
  console.error(err);

  // Send a friendly error message to the user
  res.status(500).json({ msg: err.message, stack: err.stack });
});

app.listen(port, () => {
  console.log(`Running...........${port}`);
});