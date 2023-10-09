import express from "express";
import {
  getEmployees,
  addEmployees,
  getEmployee,
  updateEmployees,
  deleteEmployees,
} from "./employeeController.js";
const router = express.Router();
// console.log({ router });

router.route("/employee").get(getEmployees).post(addEmployees);
router
  .route("/employee/:id")
  .get(getEmployee)
  .put(updateEmployees)
  .delete(deleteEmployees);

export default router;
