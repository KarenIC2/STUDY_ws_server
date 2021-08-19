import WebSocket, { WebSocketServer } from "ws";
// import { createServer } from 'https';

// const server = createServer();

const wss = new WebSocketServer({ port: 3000 });
// const wss = new WebSocketServer({ server });
// server.listen(3000);

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    // console.log(message);

    let clients = wss.clients;

    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Close connected");
  });
});
