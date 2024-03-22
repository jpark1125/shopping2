const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const util = require(".././utils");
const Router = require("./routes");
const client = require("../middleware/redis.conn");
const { sequelize } = require("./models");
require("dotenv").config();

//socket 관련부분

const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});

// io.on("connection", (socket) => {
//   console.log("admin이 연결되었습니다.");

//   socket.on("chat message", (message) => {
//     console.log("받은 메시지:", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("admin이 연결을 끊었습니다.");
//   });
// });

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
//여기까지 socket

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", Router.userRouter);
app.use("/api/v1", Router.BoardRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello world3001</h1>");
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("데이터베이스 연결");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const check_mysql_health = async () => {
  setInterval(async () => {
    try {
      await db.sequelize.authenticate();
    } catch (error) {
      console.log("db ping error : ", error);
      process.exit(0);
    }
  }, 60000 * 3);
};

const admin_boot = async () => {
  try {
    util.jwt.Init(process.env.ACCESS_KEY, process.env.REFRESH_KEY);
    await db.sequelize.authenticate();
    app.listen(3001, "0.0.0.0");
  } catch (error) {
    console.log("boot-error", error);
    process.exit(0);
  } finally {
    check_mysql_health();
  }
};
module.exports = { admin_boot };
