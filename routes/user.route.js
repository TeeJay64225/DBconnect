import express from "express";
import bcrypt from "bcrypt"; // Ensure bcrypt is installed and imported
import UserModel from "../models/user.js";
import {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Controller functions
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Sign Up Route
router.post("/signup", async (req, res) => {
	try {
		const { name, email, phone_number, password, role } = req.body;

		// Check if the user already exists
		const existingUser = await UserModel.findOne({ phone_number });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists." });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create a new user
		const newUser = new UserModel({
			name,
			email,
			phone_number,
			password: hashedPassword,
			role,
		});

		// Save the user to the database
		await newUser.save();
		res.status(201).json({ message: "User registered successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Login Route
router.post("/login", async (req, res) => {
	try {
		const { phone_number, password } = req.body;

		const user = await UserModel.findOne({ phone_number });
		if (!user) {
			return res.status(400).json({ message: "User not found." });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid credentials." });
		}

		res.status(200).json({ message: "Login successful", role: user.role });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
