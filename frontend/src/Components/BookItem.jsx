import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BookItem = ({ book }) => {
	const navigate = useNavigate();
	const handleBook = () => {
		navigate(`/books/${book.id}`);
	};
	return (
		<Box
			sx={{
				height: "400px",
				width: "300px",
				margin: "auto",
				paddingX: "20px",
				paddingTop: "20px",
				cursor: "pointer",
				borderRadius: 3,
				"&:hover": {
					boxShadow: "-2px 5px 39px 6px rgba(0,0,0,0.55)",
				},
			}}
			onClick={handleBook}
		>
			<img
				src={book.selectedFile}
				style={{
					width: "100%",
					height: "80%",
					objectFit: "contain",
				}}
				alt=""
			/>
			<Typography
				variant="body1"
				sx={{
					textTransform: "uppercase",
					fontWeight: "bold",
					textAlign: "center",
					paddingTop: "10px",
				}}
			>
				{book.title}
			</Typography>
		</Box>
	);
};

export default BookItem;
