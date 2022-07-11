import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import './App.css';

class App extends Component {

  render() {
    return (
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    );
  }
}

export default App;
