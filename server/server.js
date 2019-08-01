const path = require('path'); // this package is of node it self...
const socketIO = require('socket.io'); // This is for sending message from client to server and server to client...
const http = require('http'); //This is to create http server
const express = require('express');

const pathPublic = path.join(__dirname , '../public'); // This will reduce the file path of ../ with the original path...
const port = process.env.PORT || 1200;
const app = express();
var server = http.createServer(app); // This create a http server initially it was creating server in listen(...) method
var io = socketIO(server);

io.on('connection',(socket) => {            // This is a built in event listner it will execute when the said event happens then this method calls
  console.log('New User Connected');

  socket.emit('newEmail',{      //This is the custom emit an event from server and send it to the client...
    text : 'Hey There I ma using Node.JS',   // This isthe data which we pass along with the event
    createdAt : 123
  });

  socket.emit('newMessage',{
    text : 'Not so far',
    createdAt : 123,
    from : 'SuryaTRV'
  });

  socket.on('createEmail',(newMail) => {
    console.log('Email is ',newMail);
  });

  socket.on('createMessage',(newMessage) => {
    console.log('Message to',newMessage.to,'is',newMessage.text);
  });

  socket.on('disconnect',() => {
    console.log('Disconnected User'); // To print the message/or any stuff to execute in the server side after a disconnetion happens in the connection of a user...
  })
})

app.use(express.static(pathPublic));

server.listen(port,() => {
  console.log(`Server Started on ${port}`);
});
