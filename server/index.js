const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server, path: '/' });

wss.on('connection', (ws) => {
  console.log('a user connected');

  ws.id = generateId();

  ws.on('message', (message) => {
    console.log('message: ' + message);

    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${ws.id}: ${message}`);
      }
    });
  });
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});

// Helper to generate a short random ID like socket.io ID substring
function generateId() {
  return Math.random().toString(36).substr(2, 2);
}
