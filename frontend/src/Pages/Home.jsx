import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import BookItem from "../Components/BookItem";

const books = [
	{
		author: "jdsl",
		name: "hello hi dhs",
		image:
			"https://www.shutterstock.com/image-vector/stack-books-theme-image-1-600w-1146044810.jpg",
	},
	{
		author: "jdsl",
		name: "hello hi dhs",
		image:
			"https://www.shutterstock.com/image-vector/stack-books-theme-image-1-600w-1146044810.jpg",
	},
	{
		author: "jdsl",
		name: "hello hi dhs",
		image:
			"https://www.shutterstock.com/image-vector/stack-books-theme-image-1-600w-1146044810.jpg",
	},
	{
		author: "jdsl",
		name: "hello hi dhs",
		image:
			"https://www.shutterstock.com/image-vector/stack-books-theme-image-1-600w-1146044810.jpg",
	},
	{
		author: "jdsl",
		name: "hello hi dhs",
		image:
			"https://www.shutterstock.com/image-vector/stack-books-theme-image-1-600w-1146044810.jpg",
	},
];

const Home = () => {
	return (
		<Box sx={{ marginTop: 2 }}>
			<Typography variant="h6">Book List</Typography>
			<Grid container spacing={4}>
				{books.map((book, index) => (
					<Grid key={index} item xs={12} sm={6} md={4}>
						<BookItem book={book} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default Home;
