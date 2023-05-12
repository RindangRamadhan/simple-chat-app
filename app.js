const express = require('express')
const { Server } = require("socket.io");

const app = express()
const port = 3000


// Template Engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.static('public'))

// Route
app.get('/', (req, res) => {
  res.render('index')
})

// Listen Port
server = app.listen(port, () => {
  console.log(`app listening on  http://localhost:${port}`)
})

// Init Socket.io
const io = new Server(server);

// Listen on Every Connection
io.on('connection', (socket) => {
  console.log("New user joined")

  // Set default username 
  socket.username = GenerateUsername(5)

  // Listen on change_username
  socket.on('change_username', (data) => {
    socket.username = data.username
  })

  // Listen on new_message
  socket.on('new_message', (data) => {
    // Broadcast new message
    io.sockets.emit('new_message', {message : data.message, username : socket.username});
  })

  // Listen on typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {username : socket.username})
  })
})

function GenerateUsername(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result = '';
  let counter = 0;


  for (let i = counter; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

