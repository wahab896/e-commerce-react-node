import express from "express";
import path from "path";
import employeeRouter from "./employeeRouter.js";
console.log("testing!! Hiii");

const port = 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const _dirname = path.resolve();
console.log({ _dirname });

app.use("/api", employeeRouter);

app.use("/test", express.static(path.join(_dirname, "/public")));

app.get("/", (req, res) => {
  res.send("<h2>Hello World</h2>..<i>italic</i>");
});

app.use((err, req, res, next) => {
  // Log the error
  console.error(err);

  // Send a friendly error message to the user
  res.status(500).json({ msg: err.message, stack: err.stack });
});

app.listen(port, () => {
  console.log(`Running...........${port}`);
});
