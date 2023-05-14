const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const five = require("johnny-five");

const PORT = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const board = new five.Board();
let note = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/component.html");
});

io.on("connection", (socket) => {
  console.log("Front connected to websocket");
  note = 0;

  const INTERVAL_ID = setInterval(() => {
    io.emit("sending note", note);
  }, 1000);
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

board.on("ready", () => {
  console.log("arduino its ready");

  const led = new five.Led();
  led.blink(1000);

  const proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7,
  });

  proximity.on("change", () => {
    const { centimeters, inches } = proximity;
    console.log("Proximity: ");
    console.log("  cm  : ", centimeters);
    console.log("  in  : ", inches);
    console.log("-----------------");
    note = centimeters;
  });
});
