import express from "express";
import {
  createPayroll,
  deletePayroll,
  getAll,
  getPayroll,
  updatePayroll,
} from "../controllers/payrollController.js";
const router = express.Router();
// import { newBon } from "../validators/bonValidator.js";
// import { runValidation } from "../validators/index.js";
import { verifyAdmin } from "../helpers/verifyToken.js";

//create
router.post("/", verifyAdmin, createPayroll);

//update
router.put("/:id", verifyAdmin, updatePayroll);

//delete
router.delete("/:id", verifyAdmin, deletePayroll);

//get one
// router.get("/find/:id", verifyAdmin, getPayroll);

//getAll
router.get("/:workerId", verifyAdmin, getAll);

//stats
// router.get("/stats", verifyAdmin, getStats);

//xxxxxxxx

export default router;
