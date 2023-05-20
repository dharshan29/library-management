const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

router.get(`/`, async (req, res) => {
	const userList = await User.find().select("-passwordHash");

	if (!userList) {
		res.status(500).json({ success: false });
	}
	res.send(userList);
});

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

// User Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		const secret = process.env.secret;
		if (!user) {
			return res.status(400).send("The user not found");
		}

		if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
			const token = jwt.sign(
				{
					userId: user.id,
					isAdmin: user.isAdmin,
				},
				secret,
				{ expiresIn: "4d" }
			);
			return res.status(200).send({ user: user.name, token: token });
		} else {
			return res.status(400).send("password is wrong");
		}
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
