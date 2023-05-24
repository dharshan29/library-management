import React from "react";
import {
	AppBar,
	Avatar,
	Button,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const user = JSON.parse(localStorage.getItem("profile"));

	const navigate = useNavigate();

	return (
		<AppBar position="static">
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
					Library Management System
				</Typography>
				<Stack flexDirection="row" gap={1}>
					{user ? (
						<Avatar
							sx={{ bgcolor: deepOrange[500], textTransform: "capitalize" }}
						>
							{user.user[0]}
						</Avatar>
					) : (
						<Button
							color="error"
							variant="contained"
							onClick={() => navigate("/login")}
						>
							Login
						</Button>
					)}
					{user && (
						<Button
							color="error"
							variant="contained"
							onClick={() => {
								localStorage.clear();
								setTimeout(() => {
									navigate("/");
								}, 1000);
							}}
						>
							Logout
						</Button>
					)}
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
