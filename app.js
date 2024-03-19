const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const util = require("./utils");
const Router = require("./routes");
const client = require("./middleware/redis.conn");
const { sequelize } = require("./models");
require("dotenv").config();

const http = require("http");
const server = http.createServer(app);
const Socket = require("./utils/socket");
const io = Socket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", Router.userRouter);
app.use("/api/v1/b", Router.BoardRoute);

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

const server_boot = async () => {
  try {
    util.jwt.Init(process.env.ACCESS_KEY, process.env.REFRESH_KEY);
    await db.sequelize.authenticate();
    app.listen(3000, "0.0.0.0");
  } catch (error) {
    console.log("boot-error", error);
    process.exit(0);
  } finally {
    check_mysql_health(); // checking mysql health check
  }
};
module.exports = { server_boot };
