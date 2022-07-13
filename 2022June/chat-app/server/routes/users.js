var express = require('express');
var router = express.Router();

let users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
  var username = req.body.username;
  if (username && username !== '') {
    users.push(username);
    console.log(`User ${username} connected`);
    res.json({result: 'success', username: username});
  } else {
    res.json({error: 'Username required'})
  }
});

module.exports = router;
