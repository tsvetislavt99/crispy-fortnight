import WebSocket, { WebSocketServer } from 'ws';
const port = process.env.PORT || 3030;

const wss = new WebSocketServer({ port });

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
