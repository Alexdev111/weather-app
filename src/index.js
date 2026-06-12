import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./style.css";

const root = ReactDOMClient.createRoot(document.getElementById("app"));
root.render(<App />);
