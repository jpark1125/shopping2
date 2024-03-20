const express = require("express");
const app = express();
const cors = require("cors");

const util = require("./utils");
const Router = require("./routes");
const client = require("./middleware/redis.conn");
require("dotenv").config();

//socket 관련부분
const { createServer } = require("node:http");
//const { join } = require("node:path");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("새로운 클라이언트가 연결되었습니다.");

  socket.on("chat message", (message) => {
    console.log("받은 메시지:", message);

    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("클라이언트가 연결을 끊었습니다.");
  });
});

//여기까지 socket

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const socket_boot = async () => {
  server.listen(3002, "0.0.0.0");
};

module.exports = { socket_boot };
