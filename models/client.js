import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	address1: String,
	address2: String,
	town: String,
	country: String,
	postcode: String,
	phone: String,
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const ClientModel = mongoose.model("Client", clientSchema);
export default ClientModel;
