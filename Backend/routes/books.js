const express = require("express");
const { Book } = require("../models/book");
const { User } = require("../models/user");
const router = express.Router();

router.get("/search", async (req, res) => {
	const { searchQuery } = req.query;
	try {
		const title = new RegExp(searchQuery, "i");
		const books = await Book.find({ title });

		res.json({ data: books });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.get("/", async (req, res) => {
	const { page } = req.query;

	try {
		const LIMIT = 9;
		const startIndex = (Number(page) - 1) * LIMIT;

		const total = await Book.countDocuments({});

		const books = await Book.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);

		res.status(200).json({
			data: books,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);

		if (!book) {
			return res
				.status(404)
				.json({ message: "The Book with the given ID was not found." });
		}

		res.status(200).send(book);
	} catch (error) {
		res.status(500).send("Server Error");
	}
});

router.post("/", async (req, res) => {
	try {
		let book = new Book({
			title: req.body.title,
			author: req.body.author,
			category: req.body.category,
			selectedFile: req.body.selectedFile,
			quantity: req.body.quantity,
			borrowedBy: req.body.borrowedBy,
		});
		book = await book.save();

		if (!book) return res.status(404).send("the Book cannot be created!");

		res.status(200).send(book);
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
});

router.post("/borrow", async (req, res) => {
	const { bookId, userId } = req.body;

	try {
		const book = await Book.findById(bookId);

		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		if (book.quantity === 0) {
			return res.status(400).json({ message: "Book is not available" });
		}

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "user not found" });
		}

		if (book.borrowedBy.includes(userId)) {
			return res
				.status(400)
				.json({ message: "Book is already borrowed by the user" });
		}

		book.borrowedBy.push(userId);

		book.quantity--;

		await book.save();

		res.status(200).json({ message: "Book borrowed successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
});

router.post("/return", async (req, res) => {
	const { bookId, userId } = req.body;

	try {
		const book = await Book.findById(bookId);

		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (!book.borrowedBy.includes(userId)) {
			return res
				.status(400)
				.json({ message: "You need to borrow the book first" });
		}

		book.borrowedBy = book.borrowedBy.filter(
			(id) => id.toString() !== userId.toString()
		);

		book.quantity++;

		await book.save();

		res.status(200).json({ message: "Book returned successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
});

router.get("/borrowed-books/:userId", async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const borrowedBooks = await Book.find({ borrowedBy: userId }).select(
			"title author _id selectedFile"
		);

		res.status(200).json({ borrowedBooks });
	} catch (error) {
		res.status(500).json({ message: "Server Error" });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const book = await Book.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
				selectedFile: req.body.selectedFile,
				quantity: req.body.quantity,
				borrowedBy: req.body.borrowedBy,
			},
			{ new: true }
		);

		if (!book) return res.status(404).send("the book cannot be created!");

		res.send(book);
	} catch (error) {
		res.status(500).send("Server Error");
	}
});

router.delete("/:id", (req, res) => {
	Book.findByIdAndRemove(req.params.id)
		.then((book) => {
			if (book) {
				return res
					.status(200)
					.json({ success: true, message: "the book is deleted" });
			} else {
				return res
					.status(404)
					.json({ success: false, message: "book not found" });
			}
		})
		.catch((err) => {
			return res.status(400).json({ success: false, error: err });
		});
});

module.exports = router;
