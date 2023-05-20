const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	category: { type: String },
	selectedFile: { type: String },
	quantity: {
		type: Number,
		required: true,
	},
	borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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
