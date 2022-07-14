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
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const resetMessageBox = () => {
      var messageBox = document.getElementById('messageBox');
      messageBox.innerText = '';
      messageBox.focus();
    }

    resetMessageBox();

    socket.on('users update', (users) => {
      var userElements = [];
      users.forEach(user => {
        var userElement = <p key={user.socketid}>{user.username}</p>
        userElements.push(userElement);
      });
      setUsers(userElements);
    });
  
    socket.on('messages update', (message) => {
      var pastMessages = messages.filter((message) => {
        if (message.username === username) {
          return message;
        }
      });
      var messageElement = <Message key={`${username}-${pastMessages.length}`} text={message.message} />
      var newMessages = messages.concat(messageElement);
      setMessages(newMessages);
    });
  
    socket.on('set error', (error) => {
      setError(error);
    });
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
          {messages}
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

// class Chat extends Component {
//   socket = io();

//   constructor(props) {
//     super(props)

//     this.state = ({
//       users: [],
//       messages: [],
//       error: null,
//     });

//     // this.updateUsers = this.updateUsers.bind(this);
//     // this.setMessages = this.setMessages.bind(this);
//     // this.setUsers = this.setUsers.bind(this);

//     this.socket.on('update users', (users) => {
//       this.setState({
//         users: users,
//       });
//     });
  
//     this.socket.on('update messages', (messages) => {
//       this.setState({
//         messages: messages,
//       });
//     });
  
//     this.socket.on('set error', (error) => {
//       this.setState({
//         error: error,
//       });
//     });

//     this.socket.on('user connect', (username, socket_id) => {
//       this.setUsers();
//     });

//     this.socket.on('message sent', (message) => {
//       this.setMessages(message);
//     });
//   }

//   // setUsers() {
//   //   fetch('http://localhost:9000/users')
//   //   .then(res => res.json())
//   //   .then(data => {
//   //     for (var user in data) {
//   //       this.updateUsers(user);
//   //     }
//   //   });
//   // }

//   // updateUsers(username) {
//   //   var users = [...this.state.users];
//   //   var userElement = <p key={username}>{username}</p>
//   //   users.push(userElement);

//   //   console.log(users);

//   //   this.setState({
//   //     users: users,
//   //   })
//   // }

//   // setMessages(message) {
//   //   var messages = [...this.state.messages];
//   //   messages.push(<Message text={message.message} key={message.key} />);

//   //   this.setState({
//   //     messages: messages,
//   //   });
//   // }

//   resetMessageBox(messageBox) {
//     messageBox.innerText = '';
//     messageBox.focus();
//   }

//   componentDidMount() {
//     console.log('mounted');
//     this.resetMessageBox(document.getElementById('messageBox'));
//     this.socket.emit('user connect', this.props.username);
//   }

//   render() {
//     var username = this.props.username;

//     return (
//       <div className='chat' id='chat'>
//         {!username && (
//           <Navigate to="/" replace={true} />
//         )}
//         <h1>Chat App</h1>
//         <Menu username={username} />
//         <div className='chatwindow'>
//           <div className='chatbox' id="chatbox">
//             {this.state.messages.message}
//           </div>
//           <div className='userlist' id='userlist'>
//             <h2>Users Online</h2>
//             {this.state.users.username}
//           </div>
//         </div>
//         <UserInput username={username} />
//       </div>
//     );
//   }
// }

export default Chat;
