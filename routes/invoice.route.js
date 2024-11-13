import express from "express";
import {
	getInvoices,
	getInvoice,
	createInvoice,
	updateInvoice,
	deleteInvoice,
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.post("/", createInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;
