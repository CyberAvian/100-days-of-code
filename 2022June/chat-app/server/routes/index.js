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
    var socketId = socket.id;
    var user = null;

    // Send socket id to user
    console.log(`Connected Socket: ${socket.id}`);
    io.emit('id', socket.id);

    // // Update user list on connect
    // socket.on('set user', (username) => {
    //   var error = null;

    //   if (username && username !== '') {
    //     users.push({username: user, socketId: socketId});
    //     console.log(`Connected User: ${user}`)
    //     io.emit('update users', users);
    //   } else {
    //     error = 'Username required';
    //     io.emit('set error', error);
    //   }
    // });

    // // Update messages on message send
    // socket.on('set message', (message) => {
    //   var error = null;

    //   if (message && message !== '') {
    //     messages.push({username: user, message: message});
    //     console.log(`Message Sent: ${user}: ${message}`);
    //     io.emit('update messages', messages);
    //   } else {
    //     error = 'Message required';
    //     io.emit('set error', error);
    //   }
    // });

    // Update username or messages depending on the data sent from the client
    socket.on('set data', (type, content) => {
      var error = null;
      console.log(type, content);

      if (content) {
        switch (type) {
          case 'username':
            user = content;
            users.push({username: user, socketid: socketid});
            console.log(`Connected User: ${user}`);
            io.emit('update username', user);
            break;
          case 'users fetch':
            console.log(`All Users Sent`);
            io.emit('users fetch', users);
            break;
          case 'users update':
            console.log(`Sent new user to all clients`);
            socket.broadcast.emit('users update', user);
          case 'messages fetch':
            console.log('Sent all messages');
            socket.emit('messages fetch', messages);
          case 'messages update':
            messages.push({username: user, message: message});
            console.log(`Message Sent: ${user}: ${message}`);
            io.emit('messages update', content);   
            break;
          default:
            error = 'server error';
            io.emit('set error', error);
        }
      } else {
        error = `${type} required`;
        io.emit('set error', error);
      }
    });

    // Update user list on disconnect
    socket.on('disconnect', () => {
      users.pop({username: user, socketId: socketId});
      console.log(`Disconnected User: ${user}`);
      io.emit('update users', users);
    });
  });
  return router;
};
