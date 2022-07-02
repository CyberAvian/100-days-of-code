import React, { Component } from "react";
import Cipher from "./Cipher";

class App extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Caesar's Cipher</h1>
          <hr />
        </div>
        <Cipher />
      </div>
    )
  }
}

export default App;