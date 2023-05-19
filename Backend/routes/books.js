const express = require("express");
const { Book } = require("../models/book");
const router = express.Router();

router.get(`/`, async (req, res) => {
	const BookList = await Book.find();

	if (!BookList) {
		res.status(500).json({ success: false });
	}
	res.status(200).send(BookList);
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
	let book = new Book({
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
		selectedFile: req.body.selectedFile,
	});
	book = await book.save();

	if (!book) return res.status(404).send("the Book cannot be created!");

	res.status(200).send(book);
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
