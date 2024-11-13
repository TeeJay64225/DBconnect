import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
	invoice_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Invoice",
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	unit_price: {
		type: mongoose.Decimal128,
		required: true,
	},
	tax: {
		type: mongoose.Decimal128,
		default: 0.0,
	},
	discount: {
		type: mongoose.Decimal128,
		default: 0.0,
	},
	sub_total: {
		type: mongoose.Decimal128,
		required: true,
	},
});

const InvoiceItemModel = mongoose.model("InvoiceItem", invoiceItemSchema);
export default InvoiceItemModel;
