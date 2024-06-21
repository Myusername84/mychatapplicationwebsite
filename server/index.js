const { createServer } = require('http');
const { Server } = require("socket.io");

let httpServer = createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.io server");
});

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3001'
  }
});

let data = ['Hello', 'World'];

io.on("connection", (socket) => {
  console.log('Socket server connected');
  
  socket.emit('getData', data);

  socket.on('getInput', (response) => {
    data.push(response);
    io.emit('getData', data);
  });
});

httpServer.listen(3000, () => {
  console.log('Listening...');
});
