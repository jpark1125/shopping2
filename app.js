const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const util = require("./utils");
const Router = require("./routes");
const client = require("./middleware/redis.conn");
const { sequelize } = require("./models");
require("dotenv").config();

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", Router.userRouter);
app.use("/api/v1", Router.BoardRoute);
app.use("/api/v2", Router.CartRoute);

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

const check_redis_health = async () => {
  setInterval(async () => {
    try {
      const res = await client.ping();
      if (res !== "PONG") {
        throw new Error("Redis ping did not return PONG");
      }
      console.log("Redis is connected successfully.");
    } catch (error) {
      console.error("Redis connection error: ", error);
      process.exit(1); // Redis 연결 실패 시 프로세스 종료
    }
  }, 60000 * 3);
};

const server_boot = async () => {
  try {
    util.jwt.Init(process.env.ACCESS_KEY, process.env.REFRESH_KEY);
    await db.sequelize.authenticate();
    app.listen(3000, "0.0.0.0");
  } catch (error) {
    console.log("boot-error", error);
    process.exit(0);
  } finally {
    check_mysql_health(); //mysql 연결 체크
    check_redis_health();
  }
};
module.exports = { server_boot };
