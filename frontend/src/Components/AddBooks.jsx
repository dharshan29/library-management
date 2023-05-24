import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import FileBase from "react-file-base64";
import { fetchBook, postBook, updateBook } from "../api";

const AddBooks = ({ open, handleClose, id }) => {
	const [bookData, setBookData] = useState({
		title: "",
		author: "",
		category: "",
		selectedFile: "",
		quantity: 0,
	});

	const handleSubmit = async () => {
		try {
			if (id) {
				const data = await updateBook(id, bookData);
				console.log(data);
			} else {
				const data = await postBook(bookData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getBook = async () => {
		try {
			const book = await fetchBook(id);
			setBookData(book.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (id) {
			getBook();
			console.log("hi");
		}
	}, [id]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{
				"& .MuiPaper-root": {
					padding: 2,
				},
			}}
		>
			<DialogTitle sx={{ textTransform: "uppercase" }}>
				{id ? "ADD" : "EDIT"} BOOK
			</DialogTitle>
			<form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Typography variant="h6">
					{/* {currentId ? "Editing" : "Creating"} a memory */}
				</Typography>

				<TextField
					sx={{ marginBottom: 1 }}
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={bookData.title}
					onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
				/>
				<TextField
					sx={{ marginBottom: 1 }}
					name="author"
					variant="outlined"
					label="author"
					fullWidth
					value={bookData.author}
					onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
				/>
				<TextField
					sx={{ marginBottom: 1 }}
					name="category"
					variant="outlined"
					label="category"
					fullWidth
					value={bookData.category}
					onChange={(e) =>
						setBookData({ ...bookData, category: e.target.value })
					}
				/>
				<TextField
					sx={{ marginBottom: 1 }}
					name="quantity"
					variant="outlined"
					label="quantity"
					fullWidth
					type="number"
					value={bookData.quantity}
					onChange={(e) =>
						setBookData({ ...bookData, quantity: e.target.value })
					}
				/>
				<Box sx={{ marginBottom: 1 }}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) => {
							setBookData({ ...bookData, selectedFile: base64 });
						}}
					/>
				</Box>
				<Button
					sx={{ marginBottom: 1 }}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					// onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Dialog>
	);
};

export default AddBooks;
