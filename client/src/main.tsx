import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

const PUBLISHABLE_KEY = "pk_test_bmVhdC1rYXR5ZGlkLTc2LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);