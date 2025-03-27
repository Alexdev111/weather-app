// import React from "react"
// import * as ReactDOMClient from 'react-dom/client';
// import App from "./App"
// import './style.css'

// const app = ReactDOMClient.createRoot(document.getElementById("app"))
// app.render(<App />)
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App"; // Numele corect cu literă mare
import "./style.css";

const root = ReactDOMClient.createRoot(document.getElementById("app"));
root.render(<App />);
