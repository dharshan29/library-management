import {
	Box,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
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
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import BookItem from "../Components/BookItem";
import { fetchBooks, fetchBooksBySearch, fetchBorrowedBooks } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = ({ userId }) => {
	const [books, setBooks] = useState();
	const [borrowedBooks, setBorrowedBooks] = useState();
	const [currentpage, setCurrentPage] = useState(1);
	const [noOfPages, setNoOfPages] = useState(1);
	const [search, setSearch] = useState("");

	const navigate = useNavigate();
	const query = useQuery();
	const searchQuery = query.get("searchQuery");

	const handleBook = (id) => {
		navigate(`/books/${id}`);
	};

	const getAllBooks = async () => {
		const books = await fetchBooks(currentpage);
		setBooks(books.data.data);
		setNoOfPages(books.data.numberOfPages);
	};

	const getAllBorrowedBooks = async () => {
		if (userId) {
			const books = await fetchBorrowedBooks(userId);
			setBorrowedBooks(books.data.borrowedBooks);
		}
	};

	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			searchPost();
		}
	};

	const searchPost = async () => {
		try {
			const books = await fetchBooksBySearch(search);
			navigate(`/search?searchQuery=${search || "none"}`);
			setBooks(books.data.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		getAllBooks();
		getAllBorrowedBooks();
	}, [currentpage]);

	return (
		<Box sx={{ marginTop: 2 }}>
			<Stack flexDirection="row" justifyContent="space-between">
				<Typography variant="h4" sx={{ paddingY: 2 }}>
					Book List
				</Typography>
				<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment">Search</InputLabel>
					<OutlinedInput
						id="outlined-adornment"
						type="text"
						onKeyPress={handleKeyPress}
						onChange={(e) => setSearch(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton aria-label="search" edge="end">
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						}
						label="search"
					/>
				</FormControl>
			</Stack>
			<Grid container spacing={4}>
				{books?.map((book, index) => (
					<Grid key={index} item xs={12} sm={6} md={4}>
						<BookItem book={book} />
					</Grid>
				))}
			</Grid>
			{!searchQuery && (
				<Pagination
					sx={{ width: "fit-content", margin: "auto", paddingY: 2 }}
					count={noOfPages}
					page={currentpage}
					onChange={handleChange}
					color="primary"
				/>
			)}
			<Box>
				<Typography variant="h4" sx={{ paddingY: 2 }}>
					Borrowed Books
				</Typography>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Image</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Id</TableCell>
								<TableCell>Author</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{borrowedBooks?.map((book) => (
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
									<TableCell>
										<Button
											variant="contained"
											onClick={() => handleBook(book.id)}
										>
											View
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};

export default Home;
