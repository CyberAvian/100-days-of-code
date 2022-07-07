import React, { Component } from 'react';
import Menu from './Menu';
import UserInput from './UserInput';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Chat App</h1>
        <Menu userName="TestUser" />
        <div className='chatbox'></div>
        <UserInput />
      </div>
    );
  }
}

export default App;
