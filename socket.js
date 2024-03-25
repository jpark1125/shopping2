const express = require("express");
const app = express();
const cors = require("cors");
const Router = require("./routes");
const client = require("./middleware/redis.conn");
require("dotenv").config();
const path = require("path");

const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(cors());
app.use(express.json());

app.post("/api/chatroom", async (req, res) => {
  try {
    const { clientId, adminId } = req.body;
    const roomId = clientId + "_" + adminId;

    console.log(
      `create room: ${roomId}, Client: ${clientId}, Admin: ${adminId}`
    );

    await client.sadd("chatRooms", roomId);
    await client.hset(`chatRoom:${roomId}`, {
      createdAt: new Date().toISOString(),
      participants: JSON.stringify([clientId, adminId]),
    });
    res.json({ message: "Chat room created successfully", roomId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

io.on("connection", (socket) => {
  console.log("새로운 클라이언트가 연결되었습니다.");

  socket.on("join_room", async ({ roomId, userId }) => {
    try {
      const roomData = await client.hgetall(`chatRoom:${roomId}`);
      if (roomData) {
        console.log("room:", roomData);
        const participants = JSON.parse(roomData.participants);
        if (participants.includes(userId)) {
          socket.join(roomId);
          console.log(`[WebSocket] Socket joined room: ${roomId}`);
        } else {
          console.log(
            `[WebSocket] denied for user: ${userId} to room: ${roomId}`
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("chat msg", async ({ roomId, userId, msg }) => {
    try {
      const roomData = await client.hgetall(`chatRoom:${roomId}`);
      if (roomData) {
        const participants = JSON.parse(roomData.participants);
        if (participants.includes(userId)) {
          const messageData = JSON.stringify({
            userId,
            msg,
            timestamp: new Date().toISOString(),
          });

          await client.rpush(`chatRoom:${roomId}:messages`, messageData);
          io.to(roomId).emit("chat msg", { userId, msg });
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("클라이언트가 연결을 끊었습니다.");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const socket_boot = async () => {
  server.listen(3002, "0.0.0.0", () => {});
};

module.exports = { socket_boot };
