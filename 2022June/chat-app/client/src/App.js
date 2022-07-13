import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      error: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = event.target.username.value;
    if (username) {
      fetch('http://localhost:9000/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username})
      })
      .then(res => res.json())
      .then(body => {this.handleResponse(body)});

      event.target.username.value = '';
    }
  }

  handleResponse(response) {
    if (response.result === 'success') {
      var username = response.username;
      username = username[0].toUpperCase() + username.slice(1);
      this.setState({
        username: username,
      })
    } else {
      this.setState({
        error: response.error,
      })
    }
  }

  render() {
    return (
      <Routes>
        <Route index path="/" element={<Login username={this.state.username}
                                              error={this.state.error}
                                              submitHandler={this.handleSubmit} />} />
        <Route path="/chat" element={<Chat username={this.state.username}/>} />
      </Routes>
    );
  }
}

export default App;
