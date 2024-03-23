const express = require("express");
const app = express();
const cors = require("cors");
const Router = require("./routes");
const client = require("./middleware/redis.conn");
require("dotenv").config();

const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");
const { emit } = require("process");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

app.post("/api/create-chat-room", async (req, res) => {
  const { clientId, adminId } = req.body;
  const roomId = clientId + "_" + adminId; // 채팅방 id

  // 채팅방 생성 확인 콘솔
  console.log(`create room: ${roomId}, Client: ${clientId}, Admin: ${adminId}`);

  //레디스 붙여서 채팅방 디비 만들고 룸 만들기\
  await client.sadd("chatRooms", roomId);

  //채팅방 데이터
  await client.hset(`chatRoom:${roomId}`, {
    createdAt: new Date().toISOString(),
    isActive: "true",
    title: "채팅방 제목",
  });

  //여기까지
  res.json({ message: "Chat room created successfully", roomId });
});

// 소켓쪽
io.on("connection", (socket) => {
  console.log("새로운 클라이언트가 연결되었습니다.");

  socket.on("join_room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`[WebSocket] Socket joined room: ${roomId}`);
  });

  // 메시지 전송
  socket.on("chat msg", async ({ roomId, userId, msg }) => {
    const messageData = JSON.stringify({
      userId,
      msg,
      timestamp: new Date().toISOString(),
    });

    await client.rpush(`chatRoom:${roomId}:messages`, messageData);

    io.to(roomId).emit("chat msg", { userId, msg });
  });

  // 연결 해제
  socket.on("disconnect", () => {
    console.log("클라이언트가 연결을 끊었습니다.");
  });
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const socket_boot = async () => {
  server.listen(3002, "0.0.0.0", () => {});
};

module.exports = { socket_boot };
