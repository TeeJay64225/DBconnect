import InvoiceModel from "../models/invoice.js";

export const getInvoices = async (req, res) => {
	try {
		const invoices = await InvoiceModel.find().populate("client_id");
		res.status(200).json(invoices);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getInvoice = async (req, res) => {
	try {
		const { id } = req.params;
		const invoice = await InvoiceModel.findById(id).populate("client_id");
		if (!invoice) {
			return res.status(404).json({ message: "Invoice not found" });
		}
		res.status(200).json(invoice);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createInvoice = async (req, res) => {
	try {
		const invoice = await InvoiceModel.create(req.body);
		res.status(201).json(invoice);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateInvoice = async (req, res) => {
	try {
		const { id } = req.params;
		const invoice = await InvoiceModel.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!invoice) {
			return res.status(404).json({ message: "Invoice not found" });
		}
		res.status(200).json(invoice);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteInvoice = async (req, res) => {
	try {
		const { id } = req.params;
		const invoice = await InvoiceModel.findByIdAndDelete(id);
		if (!invoice) {
			return res.status(404).json({ message: "Invoice not found" });
		}
		res.status(200).json({ message: "Invoice deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
