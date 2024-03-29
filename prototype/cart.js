const { Board } = require("../models");
const { Op } = require("sequelize");
const client = require("../middleware/redis.conn");

class C {}

C.prototype.addCartItem = async (userId, postId) => {
  await client.sadd(`cart:${userId}`, postId);
};

C.prototype.getCartItems = async (userId) => {
  return await client.smembers(`cart:${userId}`);
};

C.prototype.removeCartItem = async (userId, postId) => {
  return await client.srem(`cart:${userId}`, postId);
};

module.exports = C;
