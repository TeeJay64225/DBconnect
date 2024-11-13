import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	login_time: {
		type: Date,
		default: Date.now,
	},
	logout_time: {
		type: Date,
		default: null,
	},
});

const UserActivityModel = mongoose.model("UserActivity", userActivitySchema);
export default UserActivityModel;
