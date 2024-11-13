import express from "express";
import {
	getReceipts,
	getReceipt,
	createReceipt,
	updateReceipt,
	deleteReceipt,
} from "../controllers/receipt.controller.js";

const router = express.Router();

router.get("/", getReceipts);
router.get("/:id", getReceipt);
router.post("/", createReceipt);
router.put("/:id", updateReceipt);
router.delete("/:id", deleteReceipt);

export default router;
