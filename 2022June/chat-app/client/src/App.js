import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SocketContext } from './socket';
import Login from './Login';
import Chat from './Chat';
import './App.css';

const App = () => {
  const socket = useContext(SocketContext);

  const [username, setUsername] = useState(null);
  const [socketid, setSocketid] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.on('set id', (socketid) => {
      setSocketid(socketid);
    });

    socket.on('set username', (username) => {
      setUsername(username);
    });

    socket.on('set error', (error) => {
      setError(error);
    });

    return () => socket.disconnect();
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let username = event.target.username.value;
    if (username) {
      socket.emit('set data', 'username', username);
    }
  }

  return (
    <Routes>
      <Route index path="/" element={<Login username={username} error={error} submitHandler={handleSubmit} />} />
      <Route path="/chat" element={<Chat  username={username} />} />
    </Routes>
  );
}


// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: null,
//       socketId: null,
//       error: null,
//     }

//     // this.socket.on('user connect', (response) => {
//     //   var username = response.username;
//     //   var socketId = response.socketId;

//     //   fetch('http://localhost:9000/users', {
//     //     method: 'POST',
//     //     headers: {'Content-Type': 'application/json'},
//     //     body: JSON.stringify({username: username, socketId: socketId})
//     //   })
//     //   .then(res => res.json())
//     //   .then(body => {this.handleResponse(body)});
//     // });

//     this.socket.on('id', (socketId) => {
//       this.setState({
//         socketId: socketId,
//       });
//     });

//     this.socket.on('update username', (username) => {
//       this.setState({
//         username: username,
//       });
//     });

//     this.socket.on('set error', (error) => {
//       this.setState({
//         error: error,
//       });
//     });

//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   // handleSubmit(event) {
//   //   event.preventDefault();
//   //   let username = event.target.username.value;
//   //   if (username) {
//   //     this.socket.emit('user connect');
//   //     event.target.username.value = '';
//   //   }
//   // }

//   handleSubmit(event) {
//     event.preventDefault();
//     let username = event.target.username.value;
//     if (username) {
//       this.socket.emit('set data', 'username', username);
//     }
//   }

//   // handleResponse(response) {
//   //   if (response.username) {
//   //     var username = response.username;
//   //     username = username[0].toUpperCase() + username.slice(1);
//   //   } else {
//   //     // Default response for invalid username is null
//   //     username = response.username;
//   //   }

//   //   this.setState({
//   //     username: username,
//   //     error: response.error,
//   //   });
//   // }

//   render() {
//     return (
//       <Routes>
//         <Route index path="/" element={<Login username={this.state.username}
//                                               error={this.state.error}
//                                               submitHandler={this.handleSubmit} />} />
//         <Route path="/chat" element={<Chat  username={this.state.username} />} />
//       </Routes>
//     );
//   }
// }

export default App;
