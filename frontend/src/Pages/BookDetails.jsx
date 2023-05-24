import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { borrowBook, fetchBook, returnBook } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const BookDetails = ({ userId }) => {
	const [book, setBook] = useState();

	let { id } = useParams();
	const navigate = useNavigate();

	const getBook = async () => {
		try {
			const book = await fetchBook(id);
			setBook(book.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleBorrow = async () => {
		try {
			await borrowBook({ bookId: id, userId });
		} catch (error) {
			console.log(error);
		}
	};

	const handleReturn = async () => {
		try {
			await returnBook({ bookId: id, userId });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBook();
	}, [handleBorrow, handleReturn]);
	return (
		<Box sx={{ width: "60%", margin: "auto", marginTop: 4 }}>
			<Typography sx={{ textAlign: "center" }} variant="h4">
				Book Details
			</Typography>
			<Paper sx={{ padding: 2 }}>
				<Stack alignItems="center">
					<img height="200px" width="180px" src={book?.selectedFile} alt="" />
				</Stack>
				<List>
					<ListItem divider>
						<ListItemText primary="name" />
						<ListItemText primary={book?.title} />
					</ListItem>
					<ListItem divider>
						<ListItemText primary="id" />
						<ListItemText primary={book?.id} />
					</ListItem>
					<ListItem divider>
						<ListItemText primary="author" />
						<ListItemText primary={book?.author} />
					</ListItem>
					<ListItem divider>
						<ListItemText primary="Quantity" />
						<ListItemText primary={book?.quantity} />
					</ListItem>
				</List>
				<Stack flexDirection="row" justifyContent="space-between">
					<Button variant="contained" onClick={handleBorrow}>
						Borrow
					</Button>
					<Button variant="contained" onClick={handleReturn}>
						Return
					</Button>
					<Button variant="outlined" onClick={() => navigate(-1)}>
						Go Back
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
};

export default BookDetails;
