import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
	client_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Client",
		required: true,
	},
	invoice_number: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		required: true,
	},
	due_date: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: ["Unpaid", "Paid", "Overdue"],
		default: "Unpaid",
	},
	description: {
		type: String,
		required: true,
	},
	total_amount: {
		type: mongoose.Decimal128,
		default: 0.0,
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
	custom_email: String,
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);
export default InvoiceModel;
