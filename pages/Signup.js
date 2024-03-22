import React from "react";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e",
      paper: "#303030",
    },
    text: {
      primary: "#c5c5c5",
    },
    primary: {
      main: "#0000ff",
    },
  },
});

const Signup = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : createTheme()}>
      <CssBaseline />
      <SignUpForm />
    </ThemeProvider>
  );
};

const SignUpForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" />

      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
