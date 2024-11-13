import express from "express";
import {
	getInvoiceItems,
	getInvoiceItem,
	createInvoiceItem,
	updateInvoiceItem,
	deleteInvoiceItem,
} from "../controllers/invoiceItem.controller.js";

const router = express.Router();

router.get("/", getInvoiceItems);
router.get("/:id", getInvoiceItem);
router.post("/", createInvoiceItem);
router.put("/:id", updateInvoiceItem);
router.delete("/:id", deleteInvoiceItem);

export default router;
