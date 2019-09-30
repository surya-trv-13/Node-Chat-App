const path = require('path'); // this package is of node it self...
const socketIO = require('socket.io'); // This is for sending message from client to server and server to client...
const http = require('http'); //This is to create http server
const express = require('express');

const {generateMessage} = require('./utils/message');
const pathPublic = path.join(__dirname , '../public'); // This will reduce the file path of ../ with the original path...
const port = process.env.PORT || 1200;
const app = express();
var server = http.createServer(app); // This create a http server initially it was creating server in listen(...) method
var io = socketIO(server);

io.on('connection',(socket) => {            // This is a built in event listner it will execute when the said event happens then this method calls
  console.log('New User Connected');


  // socket.emit('newMessage',{    //This is the custom emit an event from server and send it to the client...
  //   text : 'Not so far',         // This isthe data which we pass along with the event
  //   createdAt : 123,
  //   from : 'SuryaTRV'
  // });
  /**************************************************************************/
  //This is for the welcome message to the user...
  socket.emit('newMessage',generateMessage('ADMIN','Welcome to Chat App'));

  //This is for the notifiction to other user of joining of other member in the group
  socket.broadcast.emit('newMessage',generateMessage('ADMIN','New User Joined'));


  socket.on('createMessage',(message,callback) => {   // This is to recieve the message from the client ...//the callback argument is the function called in the socket.emit in the index.js
    io.emit('newMessage',generateMessage(message.from,message.text));

    callback('From the ADMIN'); //Here the callback function get called for which it got the message
  });


  socket.on('disconnect',() => {
    console.log('Disconnected User'); // To print the message/or any stuff to execute in the server side after a disconnetion happens in the connection of a user...
  });
});


app.use(express.static(pathPublic));

server.listen(port,() => {
  console.log(`Server Started on ${port}`);
});
