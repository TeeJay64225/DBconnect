import ReceiptModel from "../models/receipt.js"; // Adjust the path if necessary

export const getReceipts = async (req, res) => {
	try {
		const receipts = await ReceiptModel.find().populate("client_id");
		res.status(200).json(receipts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getReceipt = async (req, res) => {
	try {
		const { id } = req.params;
		const receipt = await ReceiptModel.findById(id).populate("client_id");
		if (!receipt) {
			return res.status(404).json({ message: "Receipt not found" });
		}
		res.status(200).json(receipt);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createReceipt = async (req, res) => {
	try {
		const receipt = await ReceiptModel.create(req.body);
		res.status(201).json(receipt);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateReceipt = async (req, res) => {
	try {
		const { id } = req.params;
		const receipt = await ReceiptModel.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!receipt) {
			return res.status(404).json({ message: "Receipt not found" });
		}
		res.status(200).json(receipt);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteReceipt = async (req, res) => {
	try {
		const { id } = req.params;
		const receipt = await ReceiptModel.findByIdAndDelete(id);
		if (!receipt) {
			return res.status(404).json({ message: "Receipt not found" });
		}
		res.status(200).json({ message: "Receipt deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
