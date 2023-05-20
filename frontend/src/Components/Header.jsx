import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
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
				<Button color="error" variant="contained">
					Login
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
