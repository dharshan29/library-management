import { Container } from "@mui/material";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import BookDetails from "./Pages/BookDetails";
import Admin from "./Pages/Admin";
import Auth from "./Pages/Auth";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
	const user = JSON.parse(localStorage.getItem("profile"));
	const token = user?.token;
	const [isAdmin, setIsAdmin] = useState(false);
	const [userId, setUserId] = useState();

	useEffect(() => {
		if (token) {
			let tokenId = jwt_decode(token);
			setUserId(tokenId.userId);
			setIsAdmin(tokenId.isAdmin);
		}
	}, [token]);

	return (
		<BrowserRouter>
			<Container>
				<Header />
				<Routes>
					<Route
						path="/"
						element={
							!isAdmin ? <Home userId={userId} /> : <Navigate to="/admin" />
						}
					/>
					<Route
						path="/search"
						element={
							!isAdmin ? <Home userId={userId} /> : <Navigate to="/admin" />
						}
					/>
					<Route
						path="/books/:id"
						element={
							!isAdmin ? (
								<BookDetails userId={userId} />
							) : (
								<Navigate to="/admin" />
							)
						}
					/>
					<Route
						path="/admin"
						element={isAdmin ? <Admin /> : <Navigate to="/" />}
					/>
					<Route
						path="/login"
						element={!user ? <Auth page="login" /> : <Navigate to="/" />}
					/>
					<Route
						path="/register"
						element={!user ? <Auth page="register" /> : <Navigate to="/" />}
					/>
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
