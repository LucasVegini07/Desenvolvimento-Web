import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Router } from "react-router-dom";
import history from "./history";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#f1e6fe#",
      main: "#BB86FC",
      dark: "#7a13f9",
    },
    secondary: {
      light: "#ebc0c7",
      main: "#cf6679",
      dark: "#832939",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router history={history}>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
