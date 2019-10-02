var socket = io(); //This io() is present in the /socket.io/socket.io.js and used to open websocket connection for communication between client and server

socket.on('connect',function()  {       // This is to do the stuff when event occur in client side ... (notice here event is connect rather than connection in server.js)
  console.log('Connected to server!');  // We are using regular function instead of arrow function as it will not run in phone or other browser than chrome
});

socket.on('disconnect',function()  {    // this is for the disconnect event to happen from the serevr this event listener will get caleed in the client side...
  console.log('disconnected from the server');
});

/*****************Fetching the Message from the Server**************************************************************/
socket.on('newMessage',function(newM) { // This is for listening event emitted from the server in the client side
                                        // here ES6 features doesn't work so do basic syntax

    var formatedTime = moment(newM.createdAt).format('h:mm a'); //using moment.js

    var template = jQuery('#message-text').html(); // This take the html document from the given id...
    var html = Mustache.render(template,{           //  This helps in rendering the data to be passed in the html document format....inside {{}}
      text : newM.text,
      from : newM.from,
      createdAt : formatedTime
    });

    jQuery('#messages').append(html);
});

/****************Fetching the Location Message from the Server*******************************************************/
socket.on('newLocationMessage',function(newLocationM) {
  var formatedTime = moment(newLocationM.createdAt).format('h:mm a');

  var template = jQuery('#message-location-text').html();
  var html = Mustache.render(template,{
    from : newLocationM.from ,
    createdAt : formatedTime ,
    url : newLocationM.url
  });

  jQuery('#messages').append(html);
});

/********************************************JQUERY***********************************************/
var messageTextbox = jQuery('[name=message]');

//Emiting message from the client to the server...
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from : 'User',
    text : messageTextbox.val()
    },function(data){
      messageTextbox.val('');
    });
});

//Emiting message from the client to the server...
var locationButton = jQuery('#locationButton');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Location can\'t fetched from the browser');
  }

  locationButton.attr('disabled','disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('geolocation',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location...')
  });
});


/***************************************Examples***************************************************************/

/*-------------------Sending acknowledgement------------*/
// socket.emit('createMessage',{
//   from : 'Surya',
//   text : 'Hii'
// },function(data){                       //<--This function is used as acknowledgement to the user if the data sent to the server is valid or any kind of validation the programmer want to convey to the client in the frontend...
//   console.log('SEEN',data);
// });
