import UserModel from "../models/user.js";
import UserActivityModel from "../models/userActivity.js";
import bcrypt from "bcryptjs";

// Get all users
export const getUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: error.message });
	}
};

// Get a specific user by ID
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserModel.findById(id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ message: error.message });
	}
};

// Create a new user
export const createUser = async (req, res) => {
	try {
		const { name, email, phone_number, password, role } = req.body;

		// Basic validation
		if (!name || !email || !phone_number || !password || !role) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Check if the user already exists
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		const user = await UserModel.create({
			name,
			email,
			phone_number,
			password: hashedPassword,
			role,
		});

		// Log user activity when the user is created
		await UserActivityModel.create({
			user_id: user._id,
			login_time: Date.now(),
		});

		res.status(201).json({ message: "User created successfully", user });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: error.message });
	}
};

// Update a user by ID
export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;

		// Optional: Perform additional validation on updatedData

		const user = await UserModel.findByIdAndUpdate(id, updatedData, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: error.message });
	}
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserModel.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Delete associated user activity logs if desired
		await UserActivityModel.deleteMany({ user_id: id });

		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ message: error.message });
	}
};
