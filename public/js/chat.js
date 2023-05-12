$(function(){
// Make Connection
const socket = io.connect('http://localhost:3000')

// Button & Input
const message = $("#message")
const username = $("#username")
const chatroom = $("#chatroom")
const feedback = $("#feedback")
const send_message = $("#send_message")
const send_username = $("#send_username")

//Emit message
send_message.click(function(){
  socket.emit('new_message', {message : message.val()})
})

message.keypress(function (e) {
  if (e.which == 13) {
    socket.emit('new_message', {message : message.val()})
  }
});   

// Listen on new_message
socket.on("new_message", (data) => {
  feedback.html('');
  message.val('');
  chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
})

// Emit a username
send_username.click(function(){
  socket.emit('change_username', {username : username.val()})
})

// Emit typing
message.bind("keypress", () => {
  socket.emit('typing')
})

// Listen on typing
socket.on('typing', (data) => {
  feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
})
});


