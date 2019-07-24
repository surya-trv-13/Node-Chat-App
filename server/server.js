const path = require('path'); // this package is of node it self...
const socketIO = require('socket.io'); // This is for sending message from client to server and server to client...
const http = require('http'); //This is to create http server
const express = require('express');

const pathPublic = path.join(__dirname , '../public'); // This will reduce the file path of ../ with the original path...
const port = process.env.PORT || 1200;
const app = express();
var server = http.createServer(app);

app.use(express.static(pathPublic));

server.listen(port,() => {
  console.log(`Server Started on ${port}`);
});
