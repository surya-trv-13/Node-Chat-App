var socket = io(); //This io() is present in the /socket.io/socket.io.js and used to open websocket connection for communication between client and server

socket.on('connect',function()  {       // This is to do the stuff when event occur in client side ... (notice here event is connect rather than connection in server.js)
  console.log('Connected to server!');  // We are using regular function instead of arrow function as it will not run in phone or other browser than chrome

socket.emit('createMessage',{
    to : 'IJenny',
    text : 'Far from you'
  });
});

socket.on('disconnect',function()  {    // this is for the disconnect event to happen from the serevr this event listener will get caleed in the client side...
  console.log('disconnected from the server');
});

socket.on('newMessage',function(newM) { // This is for listening event emitted from the server in the client side
  console.log('Message is ',newM);     // here ES6 features doesn't work so do basic syntax
});
