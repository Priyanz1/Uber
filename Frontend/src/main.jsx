import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import UserContext from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContext>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </UserContext>
);
