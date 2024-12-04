import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./context/UserContext";
import App from "./app";



ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
