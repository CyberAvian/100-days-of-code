import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      user: null,
      error: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = event.target.username.value;
    if (user !== "") {
      this.setState({ user });
    } else {
      this.setState({ error: "Please enter a value" });
    }
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    let { user, error } = this.state;
    let login = <Login  user={user} error={error} submitHandler={this.handleSubmit} />
    let chat = <Chat username={user} clickHandler={this.props.clickHandler} />
    console.log(this.state.users);

    return (
      // <div className='App'>
      //   <h1>Users</h1>
      //   {this.state.users.map(user => 
      //     <div key={user.id}>{user.username}</div>
      //   )}
      // </div>
      <Routes>
        <Route index path="/" element={login} />
        <Route path="/chat" element={chat} />
      </Routes>
    );
  }
}

export default App;
