import { isValidObjectId } from "mongoose";

const checkObjectById = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Invalid object Id of: " + req.params.id);
  }
  next();
};

export default checkObjectById;
