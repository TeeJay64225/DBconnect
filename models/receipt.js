import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
	client_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Client",
		required: true,
	},
	receipt_number: {
		type: String,
		required: true,
		unique: true,
	},
	receipt_date: {
		type: Date,
		required: true,
	},
	due_date: {
		type: Date,
		required: true,
	},
	total: {
		type: mongoose.Decimal128,
		required: true,
	},
	tax_rate: {
		type: mongoose.Decimal128,
		default: 0.15,
	},
	tax: {
		type: mongoose.Decimal128,
		default: 0.0,
	},
	grand_total: {
		type: mongoose.Decimal128,
		default: 0.0,
	},
	payment_method: {
		type: String,
		enum: ["credit-card", "bank-transfer", "paypal"],
		required: true,
	},
	message: {
		type: String,
	},
});

const ReceiptModel = mongoose.model("Receipt", receiptSchema);
export default ReceiptModel;
