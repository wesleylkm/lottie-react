import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

// ! is use here, because I can sure that root exist in the html file
const root = ReactDOM.createRoot(container!);

// We need StrictMode here, so our code can work with <OffScreen />
// And follow best practice
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
