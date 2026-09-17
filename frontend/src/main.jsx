import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";


const savedTheme =
  localStorage.getItem("planwise-theme") || "light";

if (savedTheme === "system") {

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light"
  );

} else {

  document.documentElement.setAttribute(
    "data-theme",
    savedTheme
  );

}


createRoot(document.getElementById("root")).render(

  <StrictMode>
    <App />
  </StrictMode>

);