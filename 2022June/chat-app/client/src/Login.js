import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./Login.css";

class Login extends Component {
  #socket = io();

  constructor(props) {
    super(props);

    this.state = {
      username: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = event.target.username.value;
    if (username) {
      this.#socket.emit('user login', username);
      event.target.username.value = '';

      this.setState({
        username: username,
      });
    }
  }

  componentDidMount() {
    let username = document.getElementById('username');
    username.focus();
  }

  render() {
    let username = this.state.username;

    return (
      <div className="login">
        {username && (
          <Navigate to='/chat' replace={true} state={username} />
        )};
        <h1>Chat App Login</h1>
        <form name="loginForm" className="form" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="Enter a username..." name="username" id="username" required />
          <button type="submit" aria-label="submitUsername">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
