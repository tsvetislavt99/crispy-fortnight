import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
const port = process.env.PORT || 3030;

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTP!');
});

// Create a WebSocket server by attaching it to the HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received message:', message);
    ws.send('Server received your message: ' + message);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

  ws.send('Welcome to the WebSocket server!');
});

// Start the HTTP server
server.listen(port, () => {
  console.log('HTTP server listening on ' + port);
});
