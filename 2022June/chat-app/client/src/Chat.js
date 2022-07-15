import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { SocketContext } from './socket';
import Menu from './Menu';
import UserInput from './UserInput';
import Message from './Message';
import './Chat.css';

const Chat = ({ username }) => {
  const socket = useContext(SocketContext);

  const [users, setUsers] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [messageElements, setMessageElements] = useState([]);
  const [error, setError] = useState(null);

  // Runs once on mount
  useEffect(() => {
    const resetMessageBox = () => {
      var messageBox = document.getElementById('messageBox');
      messageBox.innerText = '';
      messageBox.focus();
    }

    resetMessageBox();

    // Populate users
    socket.emit('get data', 'users');

    socket.on('get users', (users) => {
      var userElements = [];
      users.forEach(user => {
        var userElement = <p key={user.socketid}>{user.username}</p>
        userElements.push(userElement);
      });
      setUsers(userElements);
    });

    // Populate messages
    socket.emit('get data', 'messages');

    socket.on('get messages', (messages) => {updateMessages(...messages)});

    // Update when a user connects or disconnects
    const updateUsers = (user) => {
      setUsers(existingUsers => {
        var userElement = <p key={user.socketid}>{user.username}</p>
        return [...existingUsers, userElement];
      });
    }

    socket.on('update users', updateUsers);

    // Update when a user sends a new message
    function updateMessages(...args) {
      setMessageElements((existingElements, index) => {
        var messageElements = [];
        var elementCount = existingElements.length;

        args.forEach((message) => {
          console.log(message);
          // Determine sender to position message in chatbox
          var sender = message.username === username ? 'self' : 'other';
          // Determine if the sender of the message needs displayed in chatbox
          var showUsername = 'show';
          // Should show username only if the message wasn't sent by the user and wasn't sent by the same user who sent the previous message in the list
          if (message.username === username || ( messageList[index - 1] && message.username === messageList[index - 1].username )) {
            console.log(message.username === username);
            console.log(messageList[index - 1]);
            console.log(( messageList[index - 1] && message.username === messageList[index - 1].username ));
            showUsername = 'hide';
          }

          var messageElement = <Message key={`${message.username}-${elementCount + messageElements.length}`} 
                                      username={message.username}
                                      text={message.message}
                                      sender={sender}
                                      showUsername={showUsername} />
          messageElements.push(messageElement);
        });

        return [...existingElements, messageElements];
      });

      setMessageList(existingMessages => {return [...existingMessages, arguments];});
    }
 
    socket.on('update messages', updateMessages);
    
    socket.on('set error', (error) => {
      setError(error);
      alert(error);
    });

    return () => {
      socket.off('get users');
      socket.off('get messages');
      socket.off('update users');
      socket.off('update messages');
      socket.off('set error');
      socket.disconnect();
    }
  }, []);

  return (
    <div className='chat' id='chat'>
      {!username && (
        <Navigate to="/" replace={true} />
      )}
      <h1>Chat App</h1>
      <Menu username={username} />
      <div className='chatwindow'>
        <div className='chatbox' id="chatbox">
          {messageElements}
        </div>
        <div className='userlist' id='userlist'>
          <h2>Users Online</h2>
          {users}
        </div>
      </div>
      <UserInput username={username} />
    </div>
  );
}

export default Chat;
