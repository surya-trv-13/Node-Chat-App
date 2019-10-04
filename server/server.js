const path = require('path'); // this package is of node it self...
const socketIO = require('socket.io'); // This is for sending message from client to server and server to client...
const http = require('http'); //This is to create http server
const express = require('express');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {User} = require('./utils/users');

const pathPublic = path.join(__dirname , '../public'); // This will reduce the file path of ../ with the original path...
const port = process.env.PORT || 1200;
const app = express();
var server = http.createServer(app); // This create a http server initially it was creating server in listen(...) method
var io = socketIO(server);
var users = new User();

io.on('connection',(socket) => {            // This is a built in event listner it will execute when the said event happens then this method calls

  socket.on('join',(params,callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
    return callback('Name or room is empty');
  }
  socket.join(params.room);
  users.removeUser(socket.id);                      //Remove the user from any other room initially present...
  users.addUser(socket.id , params.name , params.room);

  io.to(params.room).emit('updateUserList',users.getUserList(params.room));     //  Update the list after each user joins
  socket.emit('newMessage',generateMessage('ADMIN','Welcome to Chat App'));     //  Welcome message to the user who joins
  socket.broadcast.to(params.room).emit('newMessage',generateMessage('ADMIN',`${params.name} has Joined`)); //  Notification to other members in the room
  callback();
  });


  socket.on('createMessage',(message,callback) => {   // This is to recieve the message from the client ...//the callback argument is the function called in the socket.emit in the index.js
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
        socket.emit('newOwnMessage',generateMessage(user.name,message.text)); //Change 1
        socket.broadcast.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
    callback(); //Here the callback function get called for which it got the message
  });

  socket.on('geolocation',(coords) => {
    var user = users.getUser(socket.id);

    if(user){
      socket.emit('newOwnLocationMessage',generateLocationMessage(user.name , coords.latitude , coords.longitude)); //Change 4
      socket.broadcast.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name , coords.latitude , coords.longitude));
    }
  });

  socket.on('disconnect',() => {
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('ADMIN', `${user.name} left the room`))
    }
  });
});


app.use(express.static(pathPublic));

server.listen(port,() => {
  console.log(`Server Started on ${port}`);
});



/**************************************Example*******************************************************/
// socket.emit('newMessage',{    //This is the custom emit an event from server and send it to the client...
//   text : 'Not so far',         // This isthe data which we pass along with the event
//   createdAt : 123,
//   from : 'SuryaTRV'
// });


/*------------Socket.IO Rooms----------------*/
//Socket.join('Room Name');  // This is the in-built method of socket which helps in sending or recieving data only from that room only OR This joins you in that given Room
//Socket.leave('Room Name'); // This is in-built method of socket which helps a member to leave a given room ...

//Similar to the join there is a method called to('Room Name') which helps in sending the data/messages to the room the user allocated
/*
* io.emit --> io.to('Room Name').emit
* socket.broadcast.emit --> socket.broadcast.to('Room Name').emit
* socket.emit is as it is
*/
