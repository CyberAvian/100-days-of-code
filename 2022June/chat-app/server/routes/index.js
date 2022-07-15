var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

users = [];
messages = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    var socketid = socket.id;
    var user = null;

    const sendError = (errorMessage) => {
      socket.emit('set error', errorMessage);
    }

    // Send socket id to user
    console.log(`Connected Socket: ${socket.id}`);
    socket.emit('set id', socket.id);

    // Update username or messages depending on the data sent from the client
    socket.on('set data', (type, content) => {
      if (content) {
        switch (type) {
          case 'username':
            user = content;
            users.push({username: user, socketid: socketid});
            console.log(`Connected User: ${user}`);
            socket.emit('set username', user);
            break;
          case 'user':
            console.log(`Sent new user to all clients`);
            io.emit('update users', user);
            break;
          case 'message':
            messageObj = {username: user, message: content};
            messages.push(messageObj);
            console.log(`Message Sent: ${user}: ${content}`);
            io.emit('update messages', messageObj);
            break;
          default:
            console.log(`server error on set ${type} data`);
            sendError('server error')
            break;
        }
      } else {
        console.log(error);
        sendError(`${type} required`);
      }
    });

    // Fetch all stored data (mostly used for new connections setting initial data)
    socket.on('get data', (type) => {
      switch (type) {
        case 'users':
          console.log(`Sent current user list`);
          io.emit('get users', users);
          break;
        case 'messages':
          console.log('Sent current message list');
          socket.emit('get messages', messages);
          break;
        default:
          console.log(`server error on get ${type} data`);
          sendError('server error');
          break;
      }
    });

    // Update user list on disconnect
    socket.on('disconnect', () => {
      users.pop({username: user, socketid: socketid});
      console.log(`Disconnected User: ${user}`);
      socket.emit('update users', users);
    });
  });
  return router;
};
