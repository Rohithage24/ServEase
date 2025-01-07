import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Router } from "react-router-dom"; // Import BrowserRouter
import { AuthProvider } from "./context/auth"; // Adjust the path as needed
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
      <App />
        {/* <BrowserRouter>
            
                <App />{<Router />}
            
        </BrowserRouter> */}
    </AuthProvider>
);