// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";
// import UserContext from "./context/UserContext";
// import CaptainContext from "./context/CaptainContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <CaptainContext>
//     <UserContext>
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   </UserContext>
//   </CaptainContext>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import UserContext from "./context/UserContext";
import CaptainContext from "./context/CaptainContext";
import SocketProvider from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <CaptainContext>
        <UserContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContext>
      </CaptainContext>
    </SocketProvider>
  </React.StrictMode>
);
