import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Menu from './Menu';
import UserInput from './UserInput';
import Message from './Message';
import './Chat.css';

class Chat extends Component {
  #socket = io();

  constructor(props) {
    super(props)

    this.state = ({
      username: null,
      messages: [],
    });

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.#socket.on('user login', (username) => {
      username = username[0].toUpper() + username.slice(1);
      this.setState({
        username: username,
      });
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.setMessages();
    }

    this.scrollChatBox();
  }

  handleClick(e) {
    this.setMessages();
    e.preventDefault();
  }

  scrollChatBox() {
    var chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  setMessages() {
    var messages = [...this.state.messages];
    var messageBox = document.getElementById('messageBox');
    messages.push(<Message text={messageBox.innerText} />);

    this.resetMessageBox(messageBox);

    this.setState({
      messages: messages,
    });
  }

  resetMessageBox(messageBox) {
    messageBox.innerText = '';
    messageBox.focus();
  }

  componentDidMount() {
    this.resetMessageBox(document.getElementById('messageBox'));
  }

  render() {
    var username = this.props.username;
    return (
      <div className='chat' id='chat'>
        {!username && (
          <Navigate to="/" replace={true} />
        )}
        <h1>Chat App</h1>
        <Menu username={username}
              clickHandler={this.props.clickHandler} />
        <div className='chatwindow'>
          <div className='chatbox' id="chatbox">
            {this.state.messages}
          </div>
          <div className='userlist' id='userlist'>
            <p>Users Online</p>
            {username}
          </div>
        </div>
        <UserInput clickHandler={this.handleClick} keyPressHandler={this.handleKeyPress} />
      </div>
    );
  }
}

export default Chat;
