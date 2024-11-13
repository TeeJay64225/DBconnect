import InvoiceItemModel from "../models/invoiceItem.js"; // Adjust the path if necessary

export const getInvoiceItems = async (req, res) => {
	try {
		const invoiceItems = await InvoiceItemModel.find().populate("invoice_id");
		res.status(200).json(invoiceItems);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getInvoiceItem = async (req, res) => {
	try {
		const { id } = req.params;
		const invoiceItem = await InvoiceItemModel.findById(id).populate(
			"invoice_id"
		);
		if (!invoiceItem) {
			return res.status(404).json({ message: "Invoice item not found" });
		}
		res.status(200).json(invoiceItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createInvoiceItem = async (req, res) => {
	try {
		const invoiceItem = await InvoiceItemModel.create(req.body);
		res.status(201).json(invoiceItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateInvoiceItem = async (req, res) => {
	try {
		const { id } = req.params;
		const invoiceItem = await InvoiceItemModel.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!invoiceItem) {
			return res.status(404).json({ message: "Invoice item not found" });
		}
		res.status(200).json(invoiceItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteInvoiceItem = async (req, res) => {
	try {
		const { id } = req.params;
		const invoiceItem = await InvoiceItemModel.findByIdAndDelete(id);
		if (!invoiceItem) {
			return res.status(404).json({ message: "Invoice item not found" });
		}
		res.status(200).json({ message: "Invoice item deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
