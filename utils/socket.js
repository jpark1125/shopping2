const socketIo = require("socket.io");

const Socket = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("사용자 연결");

    socket.on("chat message", (msg) => {
      console.log("메시지:", msg);
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("사용자가 연결을 끊었습니다.");
    });
  });

  return io;
};

module.exports = Socket;
