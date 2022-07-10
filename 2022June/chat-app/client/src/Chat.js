import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Menu from './Menu';
import UserInput from './UserInput';
import Message from './Message';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      username: null,
      messages: [],
    });

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setUsername = this.setUsername.bind(this);
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

  setUsername() {
    if (this.props.username) {
      let username = this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1);
      this.setState({
        username: username,
      });
    }
  }

  componentDidMount() {
    this.resetMessageBox(document.getElementById('messageBox'));
    this.setUsername();
  }

  render() {
    return (
      <div className='chat' id='chat'>
        {!this.props.username && (
          <Navigate to="/" replace={true} />
        )}
        <h1>Chat App</h1>
        <Menu username={this.state.username}
              clickHandler={this.props.clickHandler} />
        <div className='chatwindow'>
          <div className='chatbox' id="chatbox">
            {this.state.messages}
          </div>
          <div className='userlist' id='userlist'>
            <p>Users Online</p>
            {this.state.username}
          </div>
        </div>
        <UserInput clickHandler={this.handleClick} keyPressHandler={this.handleKeyPress} />
      </div>
    );
  }
}

export default Chat;
