import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
const port = process.env.PORT || 3030;

const wss = new WebSocketServer({ noServer: true });

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();

    req.on('upgrade', (req, socket, head) => {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    });
  })
  .listen(port);

wss.on('connection', function connection(ws) {
  ws.on('message', function message(message) {
    const data = JSON.parse(message);

    if (data.type === 'message') {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', data: data.data }));
        }
      });
    }
  });
});
