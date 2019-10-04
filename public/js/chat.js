var socket = io(); //This io() is present in the /socket.io/socket.io.js and used to open websocket connection for communication between client and server

function autoScroll(){
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function()  {       // This is to do the stuff when event occur in client side ... (notice here event is connect rather than connection in server.js)
                                        // We are using regular function instead of arrow function as it will not run in phone or other browser than chrome
  var params = jQuery.deparam(window.location.search);

  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }
  });
});

socket.on('updateUserList', function(user) {
  var ul = jQuery('<ul></ul>');

  user.forEach(function(u) {
    ul.append(jQuery('<li></li>').text(u));
  })

  jQuery('#users').html(ul);
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
    autoScroll();
});

//Change 2
socket.on('newOwnMessage',function(newM) {
  var formatedTime = moment(newM.createdAt).format('h:mm a');

  var template = jQuery('#message-own-text').html();
  var html = Mustache.render(template,{
    text : newM.text,
    from : newM.from,
    createdAt : formatedTime
  });

  jQuery('#messages').append(html);
  autoScroll();
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
  autoScroll();
});

//Change 5
socket.on('newOwnLocationMessage',function(newLocationM) {
  var formatedTime = moment(newLocationM.createdAt).format('h:mm a');

  var template = jQuery('#message-own-location-text').html();
  var html = Mustache.render(template,{
    from : newLocationM.from ,
    createdAt : formatedTime ,
    url : newLocationM.url
  });

  jQuery('#messages').append(html);
  autoScroll();
});

/********************************************JQUERY***********************************************/
var messageTextbox = jQuery('[name=message]');

//Emiting message from the client to the server...
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
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
