const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");

// User registration
router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Check if the username already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: "Username already exists" });
		}
		// Hash the password
		const hashedPassword = await bcrypt.hashSync(password, 10);

		// Create a new user
		let newUser = new User({
			name,
			email,
			passwordHash: hashedPassword,
		});

		newUser = await newUser.save();

		if (!newUser) return res.status(404).send("the user cannot be created!");

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
