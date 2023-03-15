import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);

reportWebVitals();
