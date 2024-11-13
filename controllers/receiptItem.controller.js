import ReceiptItemModel from "../models/receiptItem.js"; // Adjust the path if necessary

export const getReceiptItems = async (req, res) => {
	try {
		const receiptItems = await ReceiptItemModel.find()
			.populate("receipt_id")
			.populate("product_id");
		res.status(200).json(receiptItems);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getReceiptItem = async (req, res) => {
	try {
		const { id } = req.params;
		const receiptItem = await ReceiptItemModel.findById(id)
			.populate("receipt_id")
			.populate("product_id");
		if (!receiptItem) {
			return res.status(404).json({ message: "Receipt item not found" });
		}
		res.status(200).json(receiptItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createReceiptItem = async (req, res) => {
	try {
		const receiptItem = await ReceiptItemModel.create(req.body);
		res.status(201).json(receiptItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateReceiptItem = async (req, res) => {
	try {
		const { id } = req.params;
		const receiptItem = await ReceiptItemModel.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!receiptItem) {
			return res.status(404).json({ message: "Receipt item not found" });
		}
		res.status(200).json(receiptItem);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteReceiptItem = async (req, res) => {
	try {
		const { id } = req.params;
		const receiptItem = await ReceiptItemModel.findByIdAndDelete(id);
		if (!receiptItem) {
			return res.status(404).json({ message: "Receipt item not found" });
		}
		res.status(200).json({ message: "Receipt item deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
