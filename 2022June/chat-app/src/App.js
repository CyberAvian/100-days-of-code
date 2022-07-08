import React, { Component } from 'react';
import Menu from './Menu';
import UserInput from './UserInput';
import Message from './Message';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      username: "TestUser",
      messages: [],
    });

    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleKeyPressed(e) {
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
    return (
      <div className='App' id='app'>
        <h1>Chat App</h1>
        <Menu username={this.state.username}
              clickHandler={this.props.clickHandler} />
        <div className='chatbox' id="chatbox">
          {this.state.messages}
        </div>
        <UserInput  keyDownHandler={this.handleKeyPressed}
                    clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App;
