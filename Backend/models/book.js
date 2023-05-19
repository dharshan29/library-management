const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	description: { type: String },
	selectedFile: { type: String },
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

bookSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

bookSchema.set("toJSON", {
	virtuals: true,
});

exports.Book = mongoose.model("Book", bookSchema);
