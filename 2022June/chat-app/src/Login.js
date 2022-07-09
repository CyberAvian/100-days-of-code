import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import "./Login.css";

class Login extends Component {

  componentDidMount() {
    let username = document.getElementById('username');
    username.focus();
  }

  render() {
    let error = this.props.error;
    let user = this.props.user;
    let submitHandler = this.props.submitHandler;

    console.log(error);
    console.log(user);

    return (
      <div className="login">
        <h1>Chat App Login</h1>
        {error && <p>{error}</p>}
        {user && (
          <Navigate to="/chat" replace={true} />
        )}
        <form name="loginForm" className="form" onSubmit={(event) => submitHandler(event)}>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="Enter a username..." name="username" id="username" />
          <button type="submit" aria-label="submitUsername">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
