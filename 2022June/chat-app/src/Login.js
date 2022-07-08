import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  handleChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  render() {
    return (
      <div className="login">
        <form>
          <label for="username">Username:</label>
          <input type="text" placeholder="Enter a username..." name="username" id="username" />
          <button type="submit" aria-label="submitUsername">Submit</button>
        </form>
      </div>
    );
  }
}