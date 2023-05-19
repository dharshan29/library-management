const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv/config");

// middleware
app.use(express.json());

// Routes
const usersRoutes = require("./routes/users");
const booksRoutes = require("./routes/books");

const api = process.env.API_URL;

app.use(`${api}/users`, usersRoutes);
app.use(`${api}/books`, booksRoutes);

mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => {
		console.log("database connection is ready...");
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(3000, () => {
	console.log("server is running at localhost:3000");
});
