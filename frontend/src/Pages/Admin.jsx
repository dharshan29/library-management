import {
	Box,
	Button,
	Pagination,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddBooks from "../Components/AddBooks";
import { deleteBook, fetchBooks } from "../api";

const Admin = () => {
	const [open, setOpen] = useState(false);
	const [books, setBooks] = useState();
	const [id, setId] = useState(null);
	const [currentpage, setCurrentPage] = useState(1);
	const [noOfPages, setNoOfPages] = useState(1);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	const getAllBooks = async () => {
		const books = await fetchBooks(currentpage);
		setBooks(books.data.data);
		setNoOfPages(books.data.numberOfPages);
	};

	const handleDelete = async (id) => {
		const data = await deleteBook(id);
	};

	useEffect(() => {
		getAllBooks();
	}, [currentpage, handleDelete]);

	return (
		<Box>
			<Stack alignItems="flex-end">
				<Button
					variant="contained"
					sx={{ marginTop: 2 }}
					onClick={() => {
						setId(null);
						handleOpen();
					}}
				>
					Add
				</Button>
			</Stack>
			<AddBooks open={open} handleClose={handleClose} id={id} />
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography variant="h5">Image</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h5">Title</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h5">Id</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h5">Author</Typography>
							</TableCell>
							<TableCell>
								<Typography variant="h5">Quantity</Typography>
							</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{books?.map((book) => (
							<TableRow key={book.id}>
								<TableCell>
									<img
										src={book.selectedFile}
										height="120px"
										width="100px"
										alt=""
									/>
								</TableCell>
								<TableCell>{book.title}</TableCell>
								<TableCell>{book.id}</TableCell>
								<TableCell>{book.author}</TableCell>
								<TableCell>{book.quantity}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										sx={{ marginRight: 2 }}
										onClick={() => {
											setId(book.id);
											handleOpen();
										}}
									>
										Edit
									</Button>
									<Button
										variant="contained"
										onClick={() => handleDelete(book.id)}
									>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				sx={{ width: "fit-content", margin: "auto", paddingY: 2 }}
				count={noOfPages}
				page={currentpage}
				onChange={handleChange}
				color="primary"
			/>
		</Box>
	);
};

export default Admin;
