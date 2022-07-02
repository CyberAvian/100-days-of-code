import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import Clock from "./clock";
import "./index.css";

var root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <div id="container">
    <Clock />
  </div>
)