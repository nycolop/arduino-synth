const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const Component = require("./Component");

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send(Component);
});

io.on("connection", (socket) => {
  console.log("Front connected to websocket");

  // Then
  let note = 10;

  io.emit("sending note", note);
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
