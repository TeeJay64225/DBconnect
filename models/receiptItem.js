import mongoose from "mongoose";

const receiptItemSchema = new mongoose.Schema({
	receipt_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Receipt",
		required: true,
	},
	product_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	discount: {
		type: mongoose.Decimal128,
		default: 0.0,
	},
	subtotal: {
		type: mongoose.Decimal128,
		required: true,
	},
});

const ReceiptItemModel = mongoose.model("ReceiptItem", receiptItemSchema);
export default ReceiptItemModel;
