import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3100/api/v1/" });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

export const fetchBook = (id) => API.get(`books/${id}`);
export const updateBook = (id, data) => API.put(`books/${id}`, data);
export const deleteBook = (id) => API.delete(`books/${id}`);
export const fetchBooks = (number) => API.get(`books?page=${number}`);
export const fetchBooksBySearch = (search) =>
	API.get(`books/search?searchQuery=${search}`);
export const fetchBorrowedBooks = (id) => API.get(`books/borrowed-books/${id}`);
export const postBook = (data) => API.post(`books`, data);
export const borrowBook = (data) => API.post(`books/borrow`, data);
export const returnBook = (data) => API.post(`books/return`, data);

export const login = (data) => API.post("users/login", data);
export const register = (data) => API.post("users/register", data);
