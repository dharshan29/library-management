import { Container } from "@mui/material";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";

function App() {
	return (
		<BrowserRouter>
			<Container>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
