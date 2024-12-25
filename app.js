




const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketio(server);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files correctly
app.use(express.static(path.join(__dirname, 'public')));

// Handle a new socket connection
io.on('connection', (socket) => {
    socket.on('send-location',(data)=>{
        io.emit('receive-location', {id: socket.id, ...data})
    })
    socket.on('disconnect',()=>{
        io.emit('user-disconnected',socket.id)
    })
  console.log('Socket connected:', socket.id); // Log connection
});

// Serve the main page
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
