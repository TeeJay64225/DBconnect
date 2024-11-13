import express from "express";
import {
	getReceiptItems,
	getReceiptItem,
	createReceiptItem,
	updateReceiptItem,
	deleteReceiptItem,
} from "../controllers/receiptItem.controller.js";

const router = express.Router();

router.get("/", getReceiptItems);
router.get("/:id", getReceiptItem);
router.post("/", createReceiptItem);
router.put("/:id", updateReceiptItem);
router.delete("/:id", deleteReceiptItem);

export default router;
