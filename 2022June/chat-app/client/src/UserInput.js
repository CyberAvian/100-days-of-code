import { io } from 'socket.io-client';
import './UserInput.css';

function UserInput({ username }) {

  const socket = io();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }

    scrollChatBox();
  }

  const handleClick = (event) => {
    event.preventDefault();
    sendMessage();
  }

  const scrollChatBox = () => {
    var chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  const sendMessage = () => {
    const messageBox = document.getElementById('messageBox');
    var message = messageBox.innerText;

    if (message) {
      fetch('http://localhost:9000/messages', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, message: message})
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          socket.emit('message sent', data);
        }
      });

      messageBox.innerText = '';
    }
  }

  return (
    <div className='UserInput'>
      <form id='messageForm' name='messageForm'>
        <div    id="messageBox"
                aria-label="messageBox"
                contentEditable="true"
                data-text="Type here..."
                onKeyPress={handleKeyPress}></div>
        <button type="submit" 
                aria-label="messageSend" 
                id='messageSend'
                onClick={handleClick}>Send</button>
      </form>
    </div>
  );
}

export default UserInput;
