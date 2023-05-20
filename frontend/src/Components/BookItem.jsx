import { Box, Typography } from "@mui/material";
import React from "react";

const BookItem = ({ book }) => {
	return (
		<Box
			sx={{
				height: "400px",
				width: "300px",
				margin: "auto",
				paddingX: "20px",
				cursor: "pointer",
				borderRadius: 3,
				"&:hover": {
					boxShadow: "-2px 5px 39px 6px rgba(0,0,0,0.55)",
				},
			}}
		>
			<img
				src={book.image}
				style={{
					width: "100%",
					objectFit: "contain",
				}}
				alt=""
			/>
			<Typography variant="body1">{book.name}</Typography>
		</Box>
	);
};

export default BookItem;
