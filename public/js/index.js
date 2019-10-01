var socket = io(); //This io() is present in the /socket.io/socket.io.js and used to open websocket connection for communication between client and server

socket.on('connect',function()  {       // This is to do the stuff when event occur in client side ... (notice here event is connect rather than connection in server.js)
  console.log('Connected to server!');  // We are using regular function instead of arrow function as it will not run in phone or other browser than chrome

// socket.emit('createMessage',{
//     to : 'IJenny',
//     text : 'Far from you'
//   });
});

socket.on('disconnect',function()  {    // this is for the disconnect event to happen from the serevr this event listener will get caleed in the client side...
  console.log('disconnected from the server');
});

socket.on('newMessage',function(newM) { // This is for listening event emitted from the server in the client side
  console.log('Message is ',newM);     // here ES6 features doesn't work so do basic syntax

  var li = jQuery('<li></li>');
  li.text(`${newM.from}:${newM.text}`);

  jQuery('#message').append(li);
});

socket.on('newLocationMessage',function(newLocationM) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');

  a.attr('href',newLocationM.url);
  li.text(`${newLocationM.from}: `);
  li.append(a);
  jQuery('#message').append(li);
});

/*-------------------Sending acknowledgement------------*/
// socket.emit('createMessage',{
//   from : 'Surya',
//   text : 'Hii'
// },function(data){                       //<--This function is used as acknowledgement to the user if the data sent to the server is valid or any kind of validation the programmer want to convey to the client in the frontend...
//   console.log('SEEN',data);
// });


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from : 'User',
    text : jQuery('[name=message]').val()
    },function(data){

    });
});

var locationButton = jQuery('#locationButton');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Location can\'t fetched from the browser');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('geolocation',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function(){
    alert('Location is disabled for this webSite!')
  });
});
