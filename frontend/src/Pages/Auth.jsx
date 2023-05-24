import {
	Box,
	Button,
	FormControl,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../api";

const initialState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = ({ page }) => {
	const [formData, setFormData] = useState(initialState);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });

		if (page === "register" && e.target.name === "confirmPassword") {
			if (formData.password !== e.target.value) {
				setError(true);
			} else {
				setError(false);
			}
		}
	};

	const clear = () => {
		setFormData({ name: "", email: "", password: "", confirmPassword: "" });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (page === "login") {
				const auth = await login(formData);
				localStorage.setItem("profile", JSON.stringify(auth?.data));
				if (auth.data) {
					clear();
					navigate("/");
				}
			} else {
				const auth = await register(formData);
				if (auth.status === 201) {
					clear();
					navigate("/login");
				}
			}
		} catch (error) {
			console.log(error.response);
		}
	};

	// const isFormEmpty = Object.keys(formData)
	// 	.filter((key) => key !== "confirmpassword")
	// 	.some((key) => formData[key] === "");

	return (
		<Box>
			<Paper sx={{ width: "400px", margin: "auto", padding: 2, marginTop: 4 }}>
				<Typography variant="h4" textTransform="capitalize">
					{page}
				</Typography>
				<form onSubmit={handleSubmit}>
					<FormControl sx={{ width: "100%" }}>
						<Typography>Name</Typography>
						<TextField
							placeholder="Name"
							name="name"
							onChange={handleChange}
							type="text"
						/>
						<Typography>Email</Typography>
						<TextField
							placeholder="Email"
							name="email"
							type="email"
							onChange={handleChange}
						/>
						<Typography>Password</Typography>
						<TextField
							placeholder="Password"
							name="password"
							type="password"
							onChange={handleChange}
						/>
						{page === "register" && (
							<>
								<Typography>Confirm Password</Typography>
								<TextField
									placeholder="ConfirmPassword"
									name="confirmPassword"
									type="password"
									onChange={handleChange}
								/>
								{error && (
									<Typography sx={{ color: "red" }}>
										Password does not match
									</Typography>
								)}
							</>
						)}
						<Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
							{page}
						</Button>
					</FormControl>
				</form>
				{page === "register" && (
					<Typography>
						Already have an account? <Link to="/login">Login</Link>
					</Typography>
				)}
				{page === "login" && (
					<Typography>
						New User? <Link to="/register">Register</Link>
					</Typography>
				)}
			</Paper>
		</Box>
	);
};

export default Auth;
