import React, { Component } from "react";
import {
  Route,
  Routes,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Clock from "./clock";
import Promodoro from "./promodoro";
import "./app.css";

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="clock-container">
          <div className="nav">
            <ul>
              <li><NavLink to="/clock">Clock</NavLink></li>
              <li><NavLink to="/promodoro">Promodoro</NavLink></li>
            </ul>
          </div>
          <div className="routes">
            <Routes>
              <Route path="/clock" element={<Clock/>}/>
              <Route path="/promodoro" element={<Promodoro/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;