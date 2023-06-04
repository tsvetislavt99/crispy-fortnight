import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
const port = process.env.PORT || 3030;

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTP!');
});

// Create a WebSocket server by attaching it to the HTTP server
const wss = new WebSocketServer({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  ws.on('message', function message(message) {
    const data = JSON.parse(message);

    if (data.type === 'message') {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: 'message',
              data: data.data,
              sender: data.sender,
            }),
          );
        }
      });
    }
  });
});

// Start the HTTP server
server.listen(port, () => {
  console.log('HTTP server listening on ' + port);
});
