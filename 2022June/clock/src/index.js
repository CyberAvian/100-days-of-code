import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import Clock from "./clock";
import App from "./app";
import "./index.css";

var root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <div id="container">
    <App />
  </div>
)